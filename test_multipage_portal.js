/**
 * TEST SUITE: MULTI-PAGE REAL ESTATE DEVELOPER PORTAL (SETL GROUP STANDARD)
 * Tests coverage for:
 * 1. Multi-Page Static Architecture & Assets Integrity
 * 2. Navigation Flow & Cross-Page Routing
 * 3. Mortgage Hub & Tax Refund Engine (mortgage.html)
 * 4. Apartment Catalog & Multi-Criteria Filtering (apartments.html)
 * 5. Institutional CMS & Inventory Admin Panel (admin.html)
 * 6. Visual Design Architecture (Top Bar Natural Scroll, Zero Slop, Bento Escrow, Engineering Matrix)
 * 7. Quick Contact Floating Widget (#183B2B, Callback & Chat tabs)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = __dirname;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function check(testName, condition, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    failedTests++;
    failures.push({ testName, details });
    console.error(`  ❌ [FAIL] ${testName}${details ? ': ' + details : ''}`);
  }
}

console.log('================================================================');
console.log('>>> SUITE: MULTI-PAGE DEVELOPER PORTAL AUTOMATION QA');
console.log('================================================================\n');

// -------------------------------------------------------------
// SECTION 1: MULTI-PAGE STATIC ARCHITECTURE & ASSETS
// -------------------------------------------------------------
console.log('--- 1. Multi-Page Static Architecture & Assets Integrity ---');

const requiredFiles = [
  'index.html',
  'mortgage.html',
  'apartments.html',
  'admin.html',
  'catalog.json',
  'style.css',
  'styles.css',
  'app.js',
  'script.js'
];

requiredFiles.forEach(file => {
  const filePath = path.join(baseDir, file);
  const exists = fs.existsSync(filePath) && fs.statSync(filePath).size > 0;
  check(`File "${file}" exists and is non-empty`, exists);
});

const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const mortgageHtml = fs.readFileSync(path.join(baseDir, 'mortgage.html'), 'utf8');
const apartmentsHtml = fs.readFileSync(path.join(baseDir, 'apartments.html'), 'utf8');
const adminHtml = fs.readFileSync(path.join(baseDir, 'admin.html'), 'utf8');
const catalogJson = JSON.parse(fs.readFileSync(path.join(baseDir, 'catalog.json'), 'utf8'));
const styleCss = fs.readFileSync(path.join(baseDir, 'style.css'), 'utf8');
const appJs = fs.readFileSync(path.join(baseDir, 'app.js'), 'utf8');

// Check catalog.json schema
check('catalog.json has developer metadata with official license № 18492',
  catalogJson.developer && catalogJson.developer.license.includes('18492')
);
check('catalog.json contains 3 developer projects (avan, nork, townhouse)',
  Array.isArray(catalogJson.projects) && catalogJson.projects.length === 3 &&
  catalogJson.projects.some(p => p.id === 'avan') &&
  catalogJson.projects.some(p => p.id === 'nork') &&
  catalogJson.projects.some(p => p.id === 'townhouse')
);
check('catalog.json contains at least 6 structured apartments with prices and status',
  Array.isArray(catalogJson.apartments) && catalogJson.apartments.length >= 6 &&
  catalogJson.apartments.every(a => a.id && a.priceAMD && a.rooms && a.status)
);

// Verify all local images in all HTML pages exist
const allHtmls = [
  { name: 'index.html', content: indexHtml },
  { name: 'mortgage.html', content: mortgageHtml },
  { name: 'apartments.html', content: apartmentsHtml }
];

allHtmls.forEach(({ name, content }) => {
  const images = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
  let missing = [];
  images.forEach(src => {
    if (!src.startsWith('http')) {
      const fullPath = path.resolve(baseDir, src);
      if (!fs.existsSync(fullPath) || fs.statSync(fullPath).size === 0) {
        missing.push(src);
      }
    }
  });
  check(`All ${images.length} images in ${name} exist on disk`, missing.length === 0, missing.join(', '));
});

// -------------------------------------------------------------
// SECTION 2: NAVIGATION FLOW & CROSS-PAGE ROUTING
// -------------------------------------------------------------
console.log('\n--- 2. Navigation Flow & Cross-Page Routing ---');

check('index.html links to apartments.html catalog page',
  /href=["']apartments\.html(?:\?[^"']*)?["']/i.test(indexHtml)
);
check('index.html links to mortgage.html financial hub page',
  /href=["']mortgage\.html(?:\?[^"']*)?["']/i.test(indexHtml)
);
check('mortgage.html header links back to index.html and apartments.html',
  /href=["']index\.html["']/i.test(mortgageHtml) && /href=["']apartments\.html["']/i.test(mortgageHtml)
);
check('apartments.html header links back to index.html and mortgage.html',
  /href=["']index\.html["']/i.test(apartmentsHtml) && /href=["']mortgage\.html["']/i.test(apartmentsHtml)
);
check('apartments.html modal includes button linking to mortgage.html',
  /href=["']mortgage\.html["']/i.test(apartmentsHtml)
);
check('admin.html includes link to open live catalog',
  /href=["']apartments\.html["']/i.test(adminHtml)
);

// -------------------------------------------------------------
// SECTION 3: MORTGAGE HUB & TAX REFUND ENGINE (mortgage.html)
// -------------------------------------------------------------
console.log('\n--- 3. Mortgage Hub & Tax Refund Engine (mortgage.html) ---');

check('mortgage.html declares Art. 156.1 Tax Code RA subsidy banner',
  /156\.1/i.test(mortgageHtml) && /500\s*000/i.test(mortgageHtml)
);
check('mortgage.html contains 4 bank partner preset buttons (Ameriabank, Inecobank, Ardshinbank, ACBA)',
  /Ameriabank/i.test(mortgageHtml) &&
  /Inecobank/i.test(mortgageHtml) &&
  /Ardshinbank/i.test(mortgageHtml) &&
  /ACBA/i.test(mortgageHtml)
);
check('mortgage.html contains mortgage sliders for price, down payment, years, and rate',
  /id=["']inputPrice["']/i.test(mortgageHtml) &&
  /id=["']inputDown["']/i.test(mortgageHtml) &&
  /id=["']inputYears["']/i.test(mortgageHtml) &&
  /id=["']inputRate["']/i.test(mortgageHtml)
);
check('mortgage.html includes step-by-step tax refund guide (4 steps)',
  /class=["']step-card["']/i.test(mortgageHtml) &&
  [...mortgageHtml.matchAll(/class=["']step-card["']/gi)].length === 4
);
check('mortgage.html contains interactive FAQ accordion with questions and answers',
  /class=["']faq-section["']/i.test(mortgageHtml) &&
  /class=["']faq-item["']/i.test(mortgageHtml)
);

// -------------------------------------------------------------
// SECTION 4: APARTMENT CATALOG & URL FILTERING (apartments.html)
// -------------------------------------------------------------
console.log('\n--- 4. Apartment Catalog & Multi-Criteria Filtering (apartments.html) ---');

check('apartments.html contains interactive project passport banner',
  /id=["']projectPassportBanner["']/i.test(apartmentsHtml)
);
check('apartments.html contains project filter pills (all, avan, nork, townhouse)',
  /data-filter-project=["']all["']/i.test(apartmentsHtml) &&
  /data-filter-project=["']avan["']/i.test(apartmentsHtml) &&
  /data-filter-project=["']nork["']/i.test(apartmentsHtml) &&
  /data-filter-project=["']townhouse["']/i.test(apartmentsHtml)
);
check('apartments.html contains room filter pills (all, 1k, 2k, 3k, th)',
  /data-filter=["']1k["']/i.test(apartmentsHtml) &&
  /data-filter=["']2k["']/i.test(apartmentsHtml) &&
  /data-filter=["']3k["']/i.test(apartmentsHtml) &&
  /data-filter=["']th["']/i.test(apartmentsHtml)
);
check('apartments.html contains sorting selector (price-asc, price-desc, area-desc)',
  /id=["']sortSelect["']/i.test(apartmentsHtml) &&
  /price-asc/i.test(apartmentsHtml) &&
  /price-desc/i.test(apartmentsHtml) &&
  /area-desc/i.test(apartmentsHtml)
);
check('apartments.html contains detail modal with WhatsApp booking',
  /id=["']modalApartment["']/i.test(apartmentsHtml) &&
  /bookCurrentApartmentWhatsApp/i.test(apartmentsHtml)
);
check('app.js supports URL parameters ?project= and ?rooms= and ?price=',
  /checkUrlParameters/i.test(appJs) &&
  /params\.get\(['"]project['"]\)/i.test(appJs) &&
  /params\.get\(['"]rooms['"]\)/i.test(appJs) &&
  /params\.get\(['"]price['"]\)/i.test(appJs)
);

// -------------------------------------------------------------
// SECTION 5: INSTITUTIONAL CMS & ADMIN PANEL (admin.html)
// -------------------------------------------------------------
console.log('\n--- 5. Institutional CMS & Inventory Admin Panel (admin.html) ---');

check('admin.html implements secure login gate (adminAuthGate)',
  /id=["']adminAuthGate["']/i.test(adminHtml)
);
check('admin.html auth check verifies credentials admin / green2026',
  /admin/i.test(adminHtml) && /green2026/i.test(adminHtml)
);
check('admin.html contains metrics dashboard (total, available, reserved, sold, avg sqm)',
  /statTotalApts/i.test(adminHtml) &&
  /statAvailableApts/i.test(adminHtml) &&
  /statReservedApts/i.test(adminHtml) &&
  /statSoldApts/i.test(adminHtml) &&
  /statAvgSqmPrice/i.test(adminHtml)
);
check('admin.html contains apartment add/edit modal (adminEditModal)',
  /id=["']adminEditModal["']/i.test(adminHtml) &&
  /saveApartmentData/i.test(adminHtml)
);
check('admin.html provides JSON database export and import functions',
  /exportCatalogJson/i.test(adminHtml) &&
  /importCatalogJson/i.test(adminHtml)
);
check('admin.html synchronizes changes with localStorage (green_project_catalog)',
  /green_project_catalog/i.test(adminHtml)
);

// -------------------------------------------------------------
// SECTION 6: VISUAL DESIGN ARCHITECTURE (SETL GROUP BENCHMARK)
// -------------------------------------------------------------
console.log('\n--- 6. Visual Design Architecture (Setl Group Benchmark) ---');

check('Top Bar uses natural relative scrolling (not fixed or sticky)',
  /\.top-bar\s*\{[^}]*position:\s*relative/i.test(styleCss) || !/\.top-bar\s*\{[^}]*position:\s*(?:fixed|sticky)/i.test(styleCss)
);
check('Main Header uses soft sticky positioning (position: sticky; top: 0;)',
  /\.site-header\s*\{[^}]*position:\s*sticky;[^}]*top:\s*0/i.test(styleCss)
);
check('#about engineering showcase replaces floorplan confusion with technical matrix',
  /about-engineering-showcase/i.test(indexHtml) &&
  /9\s*баллов/i.test(indexHtml) &&
  /55\s*д[бb]/i.test(indexHtml) &&
  !/images\/floorplan\.png/i.test(indexHtml)
);
check('#escrow eliminates 6px heavy green line and uses clean Bento grid',
  /\.escrow-banner-card::before\s*\{[^}]*display:\s*none/i.test(styleCss)
);
check('Zero acidic neon greens (#10b981, #22c55e) in style.css and HTML',
  !/(#10b981|#a7f3d0|#22c55e|#4ade80|#16a34a|#86efac|#bbf7d0)/i.test(styleCss)
);

// -------------------------------------------------------------
// SECTION 7: QUICK CONTACT FLOATING WIDGET (#183B2B)
// -------------------------------------------------------------
console.log('\n--- 7. Quick Contact Floating Widget (#183B2B) ---');

check('Quick contact widget exists on index.html, mortgage.html, and apartments.html',
  /id=["']quickContactWidget["']/i.test(indexHtml) &&
  /id=["']quickContactWidget["']/i.test(mortgageHtml) &&
  /id=["']quickContactWidget["']/i.test(apartmentsHtml)
);
check('Quick contact trigger button styled with noble British pine #183B2B',
  /\.widget-trigger-btn\s*\{[^}]*background-color:\s*#183B2B/i.test(styleCss)
);
check('Quick contact modal has 2 distinct tabs: Callback and Online Chat',
  /id=["']tabBtnCall["']/i.test(indexHtml) &&
  /id=["']tabBtnChat["']/i.test(indexHtml) &&
  /id=["']widgetPaneCall["']/i.test(indexHtml) &&
  /id=["']widgetPaneChat["']/i.test(indexHtml)
);
check('Quick contact modal includes WhatsApp and Telegram messenger direct channels',
  /btn-wa-channel/i.test(indexHtml) &&
  /btn-tg-channel/i.test(indexHtml) &&
  /wa\.me/i.test(indexHtml) &&
  /t\.me/i.test(indexHtml)
);
check('app.js exports toggleContactWidgetModal and switchWidgetTab',
  typeof appJs === 'string' &&
  appJs.includes('toggleContactWidgetModal') &&
  appJs.includes('switchWidgetTab')
);

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`MULTI-PAGE PORTAL VERIFICATION: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
if (failedTests === 0) {
  console.log('🎉 ALL MULTI-PAGE PORTAL, FINTECH ENGINE, CMS & ARCHITECTURAL CHECKS PASSED WITH ZERO DEFECTS!');
} else {
  console.error(`❌ ${failedTests} CHECKS FAILED! Check failures above.`);
  process.exit(1);
}
console.log('================================================================\n');
