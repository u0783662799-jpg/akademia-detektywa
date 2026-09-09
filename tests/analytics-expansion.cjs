const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const base = process.env.TEST_BASE_URL || 'http://localhost:3091';
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) {
  throw new Error('Run this intercepted-response test against localhost only.');
}

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    async function session(consent = true, response = 'success') {
      const context = await browser.newContext();
      context.setDefaultTimeout(15000);
      if (consent) await context.addCookies([{ name: 'amd_cookie_consent', value: 'true', url: base }]);
      const page = await context.newPage();
      const pending = [];
      let requests = 0;
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname.endsWith('mailerlite.com') && url.pathname.endsWith('/subscribe')) {
          requests++;
          const reply = () => route.fulfill({
            contentType: 'text/javascript',
            body: `${url.searchParams.get('callback')}(${JSON.stringify({ success: response !== 'failure' })});`,
          });
          if (response === 'held') pending.push(reply);
          else await reply();
        } else if (/googletagmanager\.com|google-analytics\.com/.test(url.hostname)) {
          await route.abort();
        } else if (url.hostname.endsWith('mailerlite.com') && url.pathname.endsWith('/takel')) {
          await route.fulfill({ contentType: 'application/json', body: '{}' });
        } else await route.continue();
      });
      return { context, page, pending, requests: () => requests };
    }
    const events = (page, name) => page.evaluate(name => (window.dataLayer || []).filter(e => e.event === name), name);
    async function ready(page) {
      await page.goto(`${base}/darmowa-zagadka`);
      await page.waitForFunction(() => {
        const form = document.querySelector('form.ml-block-form');
        return window.ml_jQuery && window.ml_jQuery._data(form, 'events')?.submit?.length;
      });
    }
    async function submit(page, variant) {
      const root = page.locator(`#mlb2-40808156_${variant}`);
      await root.locator('input[type=email]').fill('qa@example.com');
      await root.locator('input[type=checkbox]').check();
      await root.locator('button[type=submit]').click();
    }
    async function leadCount(page, count) {
      await page.waitForFunction(count => (window.dataLayer || []).filter(e => e.event === 'amd_generate_lead').length === count, count);
    }
    for (const order of [[1, 0], [0, 1]]) {
      const s = await session(true, 'held');
      await ready(s.page);
      await submit(s.page, 'dark');
      await submit(s.page, 'light');
      assert.equal((await events(s.page, 'amd_generate_lead')).length, 0, 'plain submits are not leads');
      for (let tries = 0; s.pending.length < 2 && tries < 100; tries++) await s.page.waitForTimeout(50);
      assert.equal(s.pending.length, 2);
      await s.pending[order[0]]();
      await leadCount(s.page, 1);
      await s.pending[order[1]]();
      await leadCount(s.page, 2);
      const leads = await events(s.page, 'amd_generate_lead');
      assert.deepEqual(leads.map(e => e.form_id), order.map(i => ['free_puzzle_hero', 'free_puzzle_bottom'][i]));
      for (const [index, variant] of order.map(i => ['dark', 'light'][i]).entries()) {
        assert.deepEqual(leads[index], {
          event: 'amd_generate_lead', event_category: 'lead', event_label: `mailer_lite_${variant}`,
          location: variant === 'dark' ? 'landing_hero_form' : 'landing_bottom_form',
          form_id: variant === 'dark' ? 'free_puzzle_hero' : 'free_puzzle_bottom', lead_type: 'free_puzzle',
        });
      }
      await s.page.evaluate(() => {
        window.ml_webform_success_40808156_dark();
        window.ml_webform_success_40808156_light();
      });
      assert.equal((await events(s.page, 'amd_generate_lead')).length, 2);
      console.log(`PASS response order ${order}: hero, bottom, plain submits, repeated callbacks, PII allowlist`);
      await s.context.close();
    }

    const f = await session(true, 'failure');
    await ready(f.page);
    await f.page.locator('#mlb2-40808156_dark button[type=submit]').click();
    await f.page.waitForTimeout(300);
    assert.equal(f.requests(), 0);
    assert.equal((await events(f.page, 'amd_generate_lead')).length, 0);
    await submit(f.page, 'dark');
    await f.page.waitForTimeout(1000);
    assert.equal(f.requests(), 1);
    assert.equal((await events(f.page, 'amd_generate_lead')).length, 0);
    console.log('PASS invalid form and provider failure: zero leads');
    await f.context.close();

    const ctas = [
      ['/', 'home_footer_pdf'], ['/blog', 'blog_header_pdf'], ['/blog', 'blog_bottom_pdf'],
      ['/blog/zagadki-logiczne-dla-dzieci-8-lat', 'article_header_pdf'],
      ['/blog/zagadki-logiczne-dla-dzieci-8-lat', 'article_bottom_pdf'],
      ['/sklep', 'shop_free_pdf'], ['/darmowa-zagadka', 'landing_jump_to_form'],
    ];
    for (const [path, label] of ctas) {
      const c = await session();
      await c.page.goto(base + path);
      await c.page.waitForFunction(() => (window.dataLayer || []).some(e => e.event === 'amd_page_view'));
      await c.page.locator(`[data-analytics-label="${label}"]`).click();
      await c.page.waitForFunction(() => (window.dataLayer || []).some(e => e.event === 'amd_click_download_puzzle'));
      await c.page.waitForTimeout(350);
      const clicks = await events(c.page, 'amd_click_download_puzzle');
      assert.equal(clicks.length, 1, label);
      assert.equal(clicks[0].event_label, label);
      assert.equal(clicks[0].event_category, 'lead');
      assert.ok(clicks[0].location);
      assert.equal((await events(c.page, 'amd_generate_lead')).length, 0);
      console.log(`PASS CTA ${label}: one click, zero leads`);
      await c.context.close();
    }
    const n = await session();
    await n.page.goto(base + '/blog');
    await n.page.locator('header a.brand[href="/"]').click();
    await n.page.waitForURL(base + '/');
    assert.equal((await events(n.page, 'amd_click_download_puzzle')).length, 0);
    console.log('PASS unrelated navigation: zero CTA events');
    await n.context.close();

    const d = await session(false);
    await ready(d.page);
    await submit(d.page, 'dark');
    await d.page.locator('#mlb2-40808156_dark .row-success').waitFor({ state: 'visible' });
    assert.equal((await events(d.page, 'amd_generate_lead')).length, 0);
    assert.equal((await events(d.page, 'amd_click_download_puzzle')).length, 0);
    console.log('PASS no consent: successful form still works, zero business analytics');
    await d.context.close();
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
