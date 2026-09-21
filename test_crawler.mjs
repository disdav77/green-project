async function get(url) {
  const res = await fetch(url);
  const text = await res.text();
  return { status: res.status, text };
}

async function testSite() {
  const routes = ['/', '/apartments', '/mortgage', '/projects/avan', '/projects/nork', '/projects/townhouse', '/admin'];
  const allUrlsToCheck = new Set();
  const brokenAssets = [];

  for (const r of routes) {
    const url = 'http://127.0.0.1:3000' + r;
    const { status, text } = await get(url);
    console.log(`Route: ${r.padEnd(22)} | Status: ${status} | Length: ${text.length} chars`);

    // Find all images
    const imgMatches = [...text.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
    for (const src of imgMatches) {
      if (!src.startsWith('data:') && !src.startsWith('http:') && !src.startsWith('https:')) {
        allUrlsToCheck.add(src);
      }
    }

    // Find all links
    const linkMatches = [...text.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
    for (const href of linkMatches) {
      if (href.startsWith('/') && !href.startsWith('//')) {
        allUrlsToCheck.add(href.split('#')[0]);
      }
    }
  }

  console.log(`\nChecking all ${allUrlsToCheck.size} assets & links...`);
  for (const asset of allUrlsToCheck) {
    if (!asset) continue;
    try {
      const res = await fetch('http://127.0.0.1:3000' + asset);
      if (res.status >= 400) {
        console.error(`❌ BROKEN RESOURCE (${res.status}): ${asset}`);
        brokenAssets.push({ asset, status: res.status });
      } else {
        console.log(`✅ OK (${res.status}): ${asset}`);
      }
    } catch (e) {
      console.error(`❌ FAILED TO FETCH: ${asset} - ${e.message}`);
      brokenAssets.push({ asset, error: e.message });
    }
  }

  console.log('\n========================================');
  console.log('SUMMARY OF ASSET CHECK:');
  console.log(`Total checked: ${allUrlsToCheck.size}`);
  console.log(`Broken assets: ${brokenAssets.length}`);
  console.log('========================================');

  if (brokenAssets.length > 0) {
    process.exit(1);
  }
}

testSite().catch((err) => {
  console.error(err);
  process.exit(1);
});
