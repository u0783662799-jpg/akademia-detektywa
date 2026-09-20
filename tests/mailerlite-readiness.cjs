const assert = require('node:assert/strict');
const { mkdirSync } = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_BASE_URL || 'http://localhost:3127';
const realGtm = process.env.TEST_REAL_GTM === '1';
assert(['localhost', '127.0.0.1'].includes(new URL(base).hostname));

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const consent of [true, false]) {
      const context = await browser.newContext();
      if (consent) await context.addCookies([{ name: 'amd_cookie_consent', value: 'true', url: base }]);
      const page = await context.newPage();
      let mode = 'failure', requests = 0, release;
      const hits = [];
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname.endsWith('google-analytics.com') || /\/g\/collect$/.test(url.pathname)) {
          for (const line of (route.request().postData() || '').split(/\r?\n/)) {
            const params = new URLSearchParams(url.search);
            for (const [key, value] of new URLSearchParams(line)) params.set(key, value);
            if (params.get('en')) hits.push(Object.fromEntries(params));
          }
          return route.fulfill({ status: 204 });
        }
        if (url.hostname.endsWith('googletagmanager.com') && !realGtm) return route.abort();
        if (url.hostname.endsWith('mailerlite.com')) {
          if (url.pathname.endsWith('/subscribe')) {
            requests++;
            assert.equal(url.searchParams.get('callback'), 'mlWebformSubmitted', 'preserve provider JSONP callback');
            const reply = () => route.fulfill({ contentType: 'text/javascript', body: `mlWebformSubmitted(${JSON.stringify({ success: mode === 'success' || mode === 'held' })});` });
            if (mode === 'network') return route.abort();
            if (mode === 'held') { release = reply; return; }
            return reply();
          }
          if (url.pathname.endsWith('/takel')) return route.fulfill({ body: '{}' });
          if (url.pathname.endsWith('/webforms.min.js')) await new Promise(r => setTimeout(r, 2000));
        }
        return route.continue();
      });
      await page.goto(base + '/darmowa-zagadka', { waitUntil: 'domcontentloaded' });
      const hero = page.locator('#mlb2-40808156_dark');
      assert(await hero.locator('button.primary').isDisabled());
      await page.waitForFunction(() => !document.querySelector('button.primary').disabled);
      const leads = () => page.evaluate(() => (window.dataLayer || []).filter(e => e.event === 'amd_generate_lead'));
      await hero.locator('button.primary').click();
      assert.equal(requests, 0);
      for (const variant of ['dark', 'light']) {
        const root = page.locator('#mlb2-40808156_' + variant);
        await root.locator('input[type=email]').fill('qa@example.com');
        await root.locator('input[type=checkbox]').check();
        mode = 'failure';
        await root.locator('button.primary').click();
        await root.locator('.ml-server-error').filter({ hasText: 'Nie udało' }).waitFor();
        const before = (await leads()).length;
        mode = 'network';
        await root.locator('button.primary').click();
        await root.locator('.ml-server-error').filter({ hasText: 'Nie otrzymaliśmy potwierdzenia' }).waitFor();
        assert.equal((await leads()).length, before);
        mode = 'held';
        release = undefined;
        await root.locator('button.primary').click();
        await page.waitForTimeout(300);
        assert(release);
        assert(!(await root.locator('.ml-server-error').isVisible()));
        const count = requests;
        await root.locator('form').evaluate(form => form.requestSubmit());
        const other = page.locator('#mlb2-40808156_' + (variant === 'dark' ? 'light' : 'dark'));
        assert(await other.locator('button.primary').isDisabled());
        await other.locator('form').evaluate(form => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
        await page.waitForTimeout(100);
        assert.equal(requests, count);
        assert.equal((await leads()).length, before);
        await release();
        await root.locator('.row-success').waitFor({ state: 'visible' });
        assert(await root.locator('.row-success').innerText().then(text => text.includes('SPAM')));
        await page.evaluate(v => window['ml_webform_success_40808156_' + v](), variant);
        const events = await leads();
        assert.equal(events.length, before + (consent ? 1 : 0));
        if (consent) {
          assert.equal(events.at(-1).form_id, variant === 'dark' ? 'free_puzzle_hero' : 'free_puzzle_bottom');
          assert.equal(events.at(-1).lead_type, 'free_puzzle');
          assert(!JSON.stringify(events).includes('qa@example.com'));
        }
      }
      await page.setViewportSize({ width: 390, height: 844 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      const clicks = await page.evaluate(() => (window.dataLayer || []).filter(e => e.event === 'amd_click_download_puzzle'));
      assert.equal(clicks.length, consent ? 7 : 0);
      if (realGtm) {
        await page.waitForTimeout(7000);
        const leadHits = hits.filter(hit => hit.en === 'generate_lead');
        assert.equal(leadHits.length, consent ? 2 : 0);
        for (const variant of consent ? ['dark', 'light'] : []) {
          const formId = variant === 'dark' ? 'free_puzzle_hero' : 'free_puzzle_bottom';
          const matching = leadHits.filter(hit => hit['ep.form_id'] === formId);
          assert.equal(matching.length, 1);
          const hit = matching[0];
          assert.equal(hit.tid, 'G-V817XGHG8Q');
          assert.equal(hit['ep.event_category'], 'lead');
          assert.equal(hit['ep.event_label'], 'mailer_lite_' + variant);
          assert.equal(hit['ep.location'], variant === 'dark' ? 'landing_hero_form' : 'landing_bottom_form');
          assert.equal(hit['ep.lead_type'], 'free_puzzle');
        }
        assert(!JSON.stringify(hits).includes('qa@example.com'));
        assert.equal(hits.filter(hit => hit.en === 'click_download_puzzle').length, consent ? 7 : 0);
        assert.equal(hits.filter(hit => hit.en === 'page_view').length, consent ? 1 : 0);
        console.log('PASS real GTM, intercepted GA4: consent=' + consent + ', lead hits=' + leadHits.length + ', correct ID/parameters, no duplicate page view/CTA, no email in hits; nothing sent to Google');
      }
      mkdirSync('screenshots', { recursive: true });
      await page.screenshot({ path: 'screenshots/mailerlite-ready-mobile.png', fullPage: true });
      await page.locator('header a[href="/"]').first().click();
      await page.waitForURL(base + '/');
      await page.goBack();
      await page.waitForFunction(() => { const button = document.querySelector('button.primary'); return button && !button.disabled; });
      console.log('PASS consent=' + consent + ': delayed readiness, invalid submit, provider/network failure, pending resubmit, hero/bottom success, callback deduplication, CTA counts, no PII, mobile width, SPA return');
      await context.close();
    }
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.route('**/*', route => /mailerlite|googletagmanager|google-analytics/.test(new URL(route.request().url()).hostname) ? route.abort() : route.continue());
    await page.goto(base + '/darmowa-zagadka');
    await page.getByRole('status').filter({ hasText: 'Nie udało się załadować' }).first().waitFor({ timeout: 22000 });
    assert(await page.locator('button.primary').first().isDisabled());
    console.log('PASS blocked MailerLite: visible load failure, submit remains disabled');
    await context.close();
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
