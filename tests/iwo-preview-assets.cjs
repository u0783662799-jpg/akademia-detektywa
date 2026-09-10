const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const assets = ['iwo-pdf-cover.webp', 'iwo-puzzle-map.webp', 'iwo-puzzle-suspects.webp'];
for (const asset of assets) {
  const bytes = fs.readFileSync(`public/${asset}`);
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
}

let pages = 0;
function inspect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) inspect(file);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8').replace(/%2f/gi, '/').replace(/%2e/gi, '.');
      assert(!/\/(?:pdf-cover\.png|puzzle-(?:map|suspects)\.webp|hero-fox\.png|lis[123]\.png|detektyw\.png|okladka1\.png|kontakt-mess\.png)/.test(html), file);
      pages++;
    }
  }
}
inspect('.next/server/app');
assert(pages > 0);
for (const page of ['index', 'darmowa-zagadka', 'sklep']) {
  assert(fs.readFileSync(`.next/server/app/${page}.html`, 'utf8').includes('iwo-pdf-cover.webp'));
}
const normalize = value => value.replace(/\r\n/g, '\n');
for (const file of ['lib/analytics.ts', 'components/Analytics.tsx', 'components/AnalyticsLink.tsx', 'components/CookieBanner.tsx']) {
  assert.equal(normalize(fs.readFileSync(file, 'utf8')), normalize(execFileSync('git', ['show', `HEAD:${file}`], { encoding: 'utf8' })), file);
}
console.log(`PASS: ${pages} generated pages contain no legacy character previews; all new assets exist; analytics source unchanged`);
