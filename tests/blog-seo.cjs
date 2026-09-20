const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Load the article data without starting Next.js or any external integration.
function loadData(file) {
  const source = fs.readFileSync(file, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  const localRequire = name => loadData(path.resolve(path.dirname(file), `${name}.ts`));
  new Function('require', 'module', 'exports', output)(localRequire, module, module.exports);
  return module.exports;
}

async function main() {
  const { articles } = loadData(path.resolve(__dirname, '../app/blog/articles.ts'));
  const slugs = new Set(articles.map(article => article.slug));
  assert.equal(slugs.size, 6);
  const incoming = new Set();
  for (const article of articles) {
    assert.equal(article.relatedSlugs.length, 2);
    assert.equal(new Set(article.relatedSlugs).size, 2);
    for (const slug of article.relatedSlugs) {
      assert(slugs.has(slug), `Missing related article: ${slug}`);
      assert.notEqual(slug, article.slug);
      incoming.add(slug);
    }
    assert(!/[\u2013\u2014]/.test(`${article.seoTitle || ''}${article.seoDescription || ''}`));
  }
  assert.equal(incoming.size, 6, 'Each article has a contextual incoming link');
  assert.equal(new Set(articles.map(a => a.seoTitle ?? a.title)).size, 6);
  assert.equal(new Set(articles.map(a => a.seoDescription ?? a.desc)).size, 6);
  const redirects = await require('../next.config.js').redirects();
  const typo = redirects.filter(r => r.source === '/blog/gry-logiczne-zagadki-detektywistyczne-rozwoj-dziecko');
  assert.equal(typo.length, 1);
  assert.equal(typo[0].permanent, true);
  assert.equal(typo[0].destination, '/blog/gry-logiczne-zagadki-detektywistyczne-rozwoj-dziecka');
  if (process.env.TEST_BASE_URL) {
    const base = process.env.TEST_BASE_URL;
    assert(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
    const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
    const browser = await chromium.launch({ channel: 'chrome', headless: true });
    try {
      const context = await browser.newContext();
      await context.route('**/*', route => {
        const host = new URL(route.request().url()).hostname;
        return ['localhost', '127.0.0.1'].includes(host) ? route.continue() : route.abort();
      });
      const response = await context.request.get(base + typo[0].source, { maxRedirects: 0 });
      assert.equal(response.status(), 308);
      assert.equal(response.headers().location, typo[0].destination);
      const page = await context.newPage();
      for (const article of articles) {
        assert.equal((await page.goto(base + '/blog/' + article.slug)).status(), 200);
        assert.equal(await page.locator('h1').textContent(), article.title);
        assert((await page.title()).startsWith(article.seoTitle ?? article.title));
        assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), article.seoDescription ?? article.desc);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://malydetektyw.pl/blog/' + article.slug);
        assert.deepEqual(await page.locator('.related-reading a').evaluateAll(links => links.map(a => a.getAttribute('href'))), article.relatedSlugs.map(slug => '/blog/' + slug));
        assert.equal(await page.locator('.article-cta a').getAttribute('href'), '/darmowa-zagadka');
      }
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow');
      }
      console.log('PASS: local HTTP 308, all 6 rendered article metadata and links, mobile/desktop overflow');
    } finally {
      await browser.close();
    }
  }
  console.log('PASS: redirect, unique SEO metadata, 12 contextual links, all 6 articles reachable');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
