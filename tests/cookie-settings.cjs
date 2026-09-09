const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { mkdirSync, writeFileSync } = require('node:fs');
const base = process.env.TEST_BASE_URL || 'http://localhost:3121';
assert(['localhost', '127.0.0.1', 'malydetektyw.pl'].includes(new URL(base).hostname));
const wait = page => page.waitForTimeout(6500);
const report = { base, at: new Date().toISOString(), scenarios: [], subscriptions: 0 };
const business = ['page_view','click_download_puzzle','generate_lead'];
async function main() {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    for (const scenario of ['accept','decline','revoke','reaccept','dismiss']) {
      const context = await browser.newContext({viewport:{width:scenario==='reaccept'?390:1440,height:900}});
      await context.route('**/*',route=>{
        const u=new URL(route.request().url());
        if(u.hostname.endsWith('mailerlite.com')&&u.pathname.endsWith('/subscribe')) {report.subscriptions++;return route.abort();}
        if(u.hostname.endsWith('mailerlite.com')&&u.pathname.endsWith('/takel'))return route.fulfill({contentType:'application/json',body:'{}'});
        return route.continue();
      });
      const page=await context.newPage(),hits=[],errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('request',r=>{
        const u=new URL(r.url());
        if(!u.hostname.endsWith('google-analytics.com')||!u.pathname.endsWith('/collect'))return;
        for(const line of (r.postData()||'').split(/\r?\n/)){
          const p=new URLSearchParams(u.search);for(const [k,v]of new URLSearchParams(line))p.set(k,v);
          hits.push(Object.fromEntries([...p].filter(([k])=>['tid','en','gcs','gcd','dl','dt'].includes(k)||k.startsWith('ep.'))));
        }
      });
      const events=()=>page.evaluate(()=>(window.dataLayer||[]).filter(e=>/^amd_/.test(e.event||'')).map(e=>({...e})));
      const state=async()=>({
        consent:await page.evaluate(()=>Object.fromEntries(['analytics_storage','ad_storage','ad_user_data','ad_personalization'].map(k=>[k,window.google_tag_data?.ics?.entries?.[k]?.update??window.google_tag_data?.ics?.entries?.[k]?.default]))),
        cookies:(await context.cookies()).map(({name,domain,path,httpOnly,expires,value})=>({name,domain,path,httpOnly,expires,...(name==='amd_cookie_consent'?{value}:{})})),
        events:await events(),hits:hits.slice(),
        loaders:await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('googletagmanager.com/gtm.js')).map(r=>r.name)),
      });
      const check=async(granted)=>{
        const s=await state();
        assert.deepEqual(s.consent,{analytics_storage:granted,ad_storage:false,ad_user_data:false,ad_personalization:false});
        assert.equal(s.loaders.length,1);assert(s.loaders[0].includes('GTM-TKLJFZ7L'));
        const c=s.cookies.find(c=>c.name==='amd_cookie_consent');
        assert.equal(c?.value,String(granted));assert(Math.abs((c.expires-Date.now()/1000)/86400-180)<1);
        if(!granted)assert(!s.cookies.some(c=>/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(c.name)));
        assert(!s.events.some(e=>e.event==='amd_generate_lead'));
        assert(!hits.some(h=>h.en==='generate_lead'));
        for(const h of hits.filter(h=>business.includes(h.en)))assert.equal(h.tid,'G-V817XGHG8Q');
        return s;
      };
      const open=async()=>{
        const button=page.getByRole('button',{name:'Ustawienia cookies',exact:true});
        await button.focus();await page.keyboard.press('Enter');
        await page.getByRole('button',{name:'Zamknij ustawienia cookies',exact:true}).waitFor();
        assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'Zamknij ustawienia cookies');
      };
      const accept=()=>page.getByRole('button',{name:'Accept cookies',exact:true}).click();
      const decline=()=>page.getByRole('button',{name:'Decline cookies',exact:true}).click();
      await page.goto(base+'/darmowa-zagadka');await wait(page);
      const initial=await state();assert.equal(initial.cookies.filter(c=>/^_ga/.test(c.name)).length,0);
      assert(!initial.events.some(e=>['amd_page_view','amd_click_download_puzzle','amd_generate_lead'].includes(e.event)));
      assert.deepEqual(initial.consent,{analytics_storage:false,ad_storage:false,ad_user_data:false,ad_personalization:false});
      let before,after;
      if(scenario==='decline'||scenario==='reaccept')await decline();else await accept();
      await wait(page);
      before=await check(scenario!=='decline'&&scenario!=='reaccept');
      const pvCount=()=>hits.filter(h=>h.en==='page_view').length;
      if(scenario==='accept') {
        assert.equal(pvCount(),1);assert.equal(before.events.filter(e=>e.event==='amd_page_view').length,1);
        await page.locator('.desktop-nav a[href="/blog"]').click();await page.waitForURL(base+'/blog');await wait(page);
        assert.equal(pvCount(),2);
        await page.locator('[data-analytics-label="blog_header_pdf"]').click();await page.waitForURL(base+'/darmowa-zagadka');await wait(page);
        assert.equal(pvCount(),3);assert.equal(hits.filter(h=>h.en==='click_download_puzzle').length,1);
        assert.equal((await events()).filter(e=>e.event==='amd_click_download_puzzle').length,1);
        await page.reload();await wait(page);assert.equal(pvCount(),4);
        await check(true);
      }
      if(scenario==='decline')assert.equal(pvCount(),0);
      if(scenario==='revoke') {
        assert(before.cookies.some(c=>c.name==='_ga'));
        // Synthetic scope fixtures exercise deletion, not subscription or analytics transport.
        await context.addCookies([
          {name:'_ga_scope_test',value:'scope',domain:new URL(base).hostname,path:'/darmowa-zagadka'},
          {name:'necessary_test',value:'keep',url:base},
        ]);
        await page.evaluate(()=>sessionStorage.setItem('amd_pending_navigation_cta',JSON.stringify({eventName:'click_download_puzzle',createdAt:Date.now(),event_label:'must_not_replay'})));
        await open();await decline();await wait(page);after=await check(false);
        assert(after.cookies.some(c=>c.name==='necessary_test'));
        assert.equal(await page.evaluate(()=>sessionStorage.getItem('amd_pending_navigation_cta')),null);
        const n=hits.filter(h=>business.includes(h.en)).length;
        await page.locator('.desktop-nav a[href="/blog"]').click();await page.waitForURL(base+'/blog');await wait(page);
        await page.locator('[data-analytics-label="blog_header_pdf"]').click();await page.waitForURL(base+'/darmowa-zagadka');await wait(page);
        await page.reload();await wait(page);await check(false);
        assert.equal(hits.filter(h=>business.includes(h.en)).length,n);
        await open();await accept();await wait(page);await check(true);
        assert.equal(pvCount(),2);assert(!hits.some(h=>h['ep.event_label']==='must_not_replay'));
      }
      if(scenario==='reaccept') {
        await open();await accept();await wait(page);await check(true);
        assert.equal(pvCount(),1);
        assert.equal((await events()).filter(e=>e.event==='amd_page_view').length,1);
        assert.equal(await page.evaluate(()=>document.activeElement?.textContent?.trim()),'Ustawienia cookies');
      }
      if(scenario==='dismiss') {
        const choice=before.cookies.find(c=>c.name==='amd_cookie_consent');
        const n=(await events()).length;
        await open();await page.keyboard.press('Escape');await wait(page);
        after=await check(true);
        assert.deepEqual(after.cookies.find(c=>c.name==='amd_cookie_consent'),choice);
        assert.equal(after.events.length,n);assert.equal(pvCount(),1);
        assert.equal(await page.evaluate(()=>document.activeElement?.textContent?.trim()),'Ustawienia cookies');
        await open();await page.getByRole('button',{name:'Zamknij ustawienia cookies',exact:true}).click();
        await wait(page);assert.equal((await events()).length,n);assert.equal(pvCount(),1);
      }
      if(scenario==='decline'||scenario==='dismiss') {
        await page.locator('#mlb2-40808156_dark button[type=submit]').click();
        await page.waitForTimeout(500);
        assert.equal(report.subscriptions,0);
        assert(!(await events()).some(e=>e.event==='amd_generate_lead'));
      }
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      assert.deepEqual(errors,[]);
      report.scenarios.push({scenario,initial,before,after,final:await state(),status:'PASS'});
      console.log('PASS',scenario);
      await context.close();
    }
    assert.equal(report.subscriptions,0);
  } finally {
    mkdirSync('docs/audit-evidence',{recursive:true});
    writeFileSync('docs/audit-evidence/cookie-settings-'+(new URL(base).hostname==='malydetektyw.pl'?'production':'local')+'.json',JSON.stringify(report,null,2));
    await browser.close();
  }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
