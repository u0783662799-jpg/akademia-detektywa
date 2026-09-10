const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

const base = process.env.TEST_BASE_URL || 'http://localhost:3124';
assert(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Local tests only');
const entries = JSON.parse(fs.readFileSync('app/blog/new-articles.ts', 'utf8').split(' = ')[1].trim().replace(/;$/, ''));
const retained = 'gry-logiczne-zagadki-detektywistyczne-rozwoj-dziecka';
const normalize = value => value.replace(/\r\n/g, '\n');
assert.equal(normalize(fs.readFileSync('app/blog/development-article.tsx', 'utf8')), normalize(execFileSync('git', ['show', 'HEAD:app/blog/development-article.tsx'], { encoding: 'utf8' })));
assert.equal(entries.length, 5);
assert.equal(new Set(entries.map(a => a.slug)).size, 5);
for (const file of ['lib/analytics.ts', 'components/Analytics.tsx', 'components/AnalyticsLink.tsx', 'components/CookieBanner.tsx', 'app/darmowa-zagadka/page.tsx']) {
  assert.equal(normalize(fs.readFileSync(file, 'utf8')), normalize(execFileSync('git', ['show', `HEAD:${file}`], { encoding: 'utf8' })), file);
}

async function main() {
  for (const article of entries) {
    assert(!/[\u2010-\u2015]|fox/i.test(JSON.stringify(article)), article.slug);
    assert(article.content.filter(b => b.type === 'heading').length >= 6);
    assert(fs.existsSync(`public${article.image.src}`));
    const res = await fetch(`${base}/blog/${article.slug}`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert(html.includes(article.title));
    assert(html.includes(`https://malydetektyw.pl/blog/${article.slug}`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    for (const block of article.content.filter(b => b.type === 'heading')) assert(html.includes(block.text));
    console.log(`PASS article: ${article.slug}`);
  }
  assert.equal((await fetch(`${base}/blog/${retained}`)).status, 200);
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const slug of [retained, ...entries.map(a => a.slug)]) assert(sitemap.includes(`/blog/${slug}`));
  const redirects = {
    'zagadki-logiczne-dla-dzieci-8-lat': 'jak-rozwijac-logiczne-myslenie-u-dziecka',
    'zabawa-bez-ekranu-dla-dzieci': 'zabawy-rozwijajace-dla-dzieci',
    'jak-oderwac-dziecko-od-tabletu': 'zabawy-rozwijajace-dla-dzieci',
  };
  for (const [old, target] of Object.entries(redirects)) {
    const res = await fetch(`${base}/blog/${old}`, { redirect: 'manual' });
    assert.equal(res.status, 308);
    assert.equal(new URL(res.headers.get('location'), base).pathname, `/blog/${target}`);
    assert(!sitemap.includes(`/blog/${old}`));
  }
  assert.equal((await fetch(`${base}/blog/prezent-dla-dziecka-10-lat`)).status, 404);
  assert(!sitemap.includes('/blog/prezent-dla-dziecka-10-lat'));
  console.log('PASS sitemap, redirects, retired URL, preserved article and analytics source');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
