const assert = require('node:assert/strict');
const { mkdirSync, writeFileSync } = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_BASE_URL || 'http://localhost:3139';
assert(['localhost', '127.0.0.1'].includes(new URL(base).hostname));

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const report = { base, checks: [] };
  try {
    for (const width of [390, 700, 701, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
      await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
      const page = await context.newPage();
      await page.goto(base + '/darmowa-zagadka');
      await page.locator('#cookie-consent-panel').waitFor();
      const cover = await page.locator('.free-hero-art img').evaluate(img => ({
        src: img.currentSrc, width: img.clientWidth, loaded: img.complete && img.naturalWidth > 0,
      }));
      assert(cover.loaded);
      if (width <= 700) {
        assert.equal(cover.width, 220);
        assert.equal(new URL(cover.src).searchParams.get('w'), '480');
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.goto(base);
      const backgrounds = await page.locator('.case-preview, .coming-band').evaluateAll(elements => elements.map(el => getComputedStyle(el, '::before').backgroundImage));
      assert.equal(backgrounds.length, 2);
      for (const image of backgrounds) assert.equal(image.includes('w=750'), width <= 700);
      await page.locator('.case-preview').scrollIntoViewIfNeeded();
      mkdirSync('analytics/mobile-image-review', { recursive: true });
      await page.screenshot({ path: `analytics/mobile-image-review/home-${width}.png` });
      report.checks.push({ width, cover, backgrounds });
      await context.close();
    }
    const context = await browser.newContext();
    for (const path of ['/iwo-next-chapter.webp', '/_next/image?url=%2Fiwo-next-chapter.webp&w=750&q=75', '/_next/image?url=%2Fiwo-pdf-cover.webp&w=480&q=75', '/_next/image?url=%2Fiwo-pdf-cover.webp&w=640&q=75']) {
      const response = await context.request.get(base + path, { headers: { accept: 'image/webp' } });
      assert.equal(response.status(), 200);
      report.checks.push({ path, bytes: (await response.body()).length, type: response.headers()['content-type'] });
    }
    const noJS = await browser.newContext({ javaScriptEnabled: false });
    const page = await noJS.newPage();
    await page.goto(base + '/darmowa-zagadka');
    assert.equal(await page.locator('#cookie-consent-panel').count(), 0);
    report.banner = 'Absent without JavaScript; present after hydration in all four viewport checks. External scripts blocked.';
    writeFileSync('analytics/mobile-image-review/results.json', JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
