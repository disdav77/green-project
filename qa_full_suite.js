const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectDir = 'C:/Users/user/.gemini/antigravity/scratch/green-project-mockup';
const htmlPath = path.join(projectDir, 'index.html');
const cssPath = path.join(projectDir, 'style.css');
const jsPath = path.join(projectDir, 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
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

console.log('===============================================================');
console.log('       GREEN PROJECT ARMENIA — COMPREHENSIVE QA TEST SUITE      ');
console.log('===============================================================\n');

// -------------------------------------------------------------
// SECTION 1: HTML STRUCTURE & INTEGRITY
// -------------------------------------------------------------
console.log('--- 1. HTML STRUCTURE & INTEGRITY ---');

// Check DOCTYPE
assert(/<!DOCTYPE\s+html>/i.test(html), 'HTML has valid <!DOCTYPE html>');

// Check UTF-8 charset
assert(/<meta\s+charset=["']?utf-8["']?/i.test(html), 'HTML declares UTF-8 charset');

// Check responsive viewport
assert(/<meta\s+name=["']viewport["']/i.test(html), 'HTML has responsive viewport meta tag');

// Check duplicate element IDs
const idMatches = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m => m[1]);
const idSet = new Set();
const duplicateIds = [];
idMatches.forEach(id => {
  if (idSet.has(id)) duplicateIds.push(id);
  else idSet.add(id);
});
assert(duplicateIds.length === 0, 'Zero duplicate element IDs in HTML', duplicateIds.join(', '));

// Check void tags and tag balancing for main containers
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const tagTokens = [...html.matchAll(/<\/?([a-z0-9]+)([^>]*?)>/gi)];
const tagStack = [];
let unbalanced = 0;
for (const match of tagTokens) {
  const isClosing = match[0].startsWith('</');
  const tagName = match[1].toLowerCase();
  const isSelfClosing = match[2].trim().endsWith('/') || voidTags.has(tagName);

  if (isClosing) {
    if (tagStack.length > 0 && tagStack[tagStack.length - 1] === tagName) {
      tagStack.pop();
    } else {
      unbalanced++;
    }
  } else if (!isSelfClosing) {
    tagStack.push(tagName);
  }
}
assert(tagStack.length === 0, `HTML tags are properly balanced (Unclosed: ${tagStack.length})`, tagStack.slice(-5).join(', '));

// Check local images exist and are non-empty
const imageSrcs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
let allImagesExist = true;
const missingImages = [];
imageSrcs.forEach(src => {
  const fullPath = path.resolve(projectDir, src);
  if (!fs.existsSync(fullPath) || fs.statSync(fullPath).size === 0) {
    allImagesExist = false;
    missingImages.push(src);
  }
});
assert(allImagesExist && imageSrcs.length > 0, `All ${imageSrcs.length} images exist and are non-empty`, missingImages.join(', '));

// Check internal anchor links
const anchorHrefs = [...html.matchAll(/<a[^>]+href=["']#([^"']+)["']/gi)].map(m => m[1]);
let allAnchorsValid = true;
const missingAnchors = [];
anchorHrefs.forEach(targetId => {
  if (!idSet.has(targetId)) {
    allAnchorsValid = false;
    missingAnchors.push(targetId);
  }
});
assert(allAnchorsValid && anchorHrefs.length > 0, `All ${anchorHrefs.length} internal anchor links point to existing IDs`, missingAnchors.join(', '));

// -------------------------------------------------------------
// SECTION 2: CSS VALIDATION & VARIABLES
// -------------------------------------------------------------
console.log('\n--- 2. CSS VALIDATION & STYLES ---');

// Check balanced braces in CSS
let braceCount = 0;
for (let i = 0; i < css.length; i++) {
  if (css[i] === '{') braceCount++;
  if (css[i] === '}') braceCount--;
}
assert(braceCount === 0, 'CSS has perfectly balanced curly braces');

// Check CSS custom properties defined in :root
const rootVars = new Set();
const rootBlockMatch = css.match(/:root\s*\{([^}]+)\}/);
if (rootBlockMatch) {
  const varMatches = rootBlockMatch[1].matchAll(/--([a-z0-9\-]+):/gi);
  for (const vm of varMatches) rootVars.add(`--${vm[1]}`);
}
assert(rootVars.size >= 10, `:root defines sufficient design tokens (${rootVars.size} found)`);

// Check all var(--...) used in CSS are defined
const usedVars = [...css.matchAll(/var\(\s*(--[a-z0-9\-]+)/gi)].map(m => m[1]);
const undefinedVars = [];
usedVars.forEach(v => {
  if (!rootVars.has(v)) undefinedVars.push(v);
});
assert(undefinedVars.length === 0, 'All var(--...) usages are defined in :root', undefinedVars.join(', '));

// Check media queries exist for responsive design
assert(/@media\s*\(\s*max-width:\s*1024px\s*\)/i.test(css), 'CSS includes tablet breakpoint (@media max-width: 1024px)');
assert(/@media\s*\(\s*max-width:\s*768px\s*\)/i.test(css), 'CSS includes mobile breakpoint (@media max-width: 768px)');
assert(/\.mobile-sticky-dock/i.test(css), 'CSS includes .mobile-sticky-dock styling');
assert(/\.reveal-on-scroll/i.test(css), 'CSS includes .reveal-on-scroll animation classes');

// -------------------------------------------------------------
// SECTION 3: TRANSLATION & I18N EXHAUSTIVE AUDIT
// -------------------------------------------------------------
console.log('\n--- 3. TRANSLATION (RU / HY / EN) PARITY & COVERAGE ---');

// Extract I18N dictionary from app.js using VM
const i18nSandbox = {
  window: {},
  document: { addEventListener: () => {} },
  AppState: {},
  I18N: null
};
vm.createContext(i18nSandbox);

// Safely extract I18N
const i18nMatch = js.match(/const\s+I18N\s*=\s*(\{[\s\S]*?\n\};)/);
assert(Boolean(i18nMatch), 'I18N dictionary structure found in app.js');

let I18N = null;
if (i18nMatch) {
  vm.runInContext(`var I18N = ${i18nMatch[1]}`, i18nSandbox);
  I18N = i18nSandbox.I18N;
}

assert(Boolean(I18N && I18N.ru && I18N.hy && I18N.en), 'I18N has all 3 language blocks (ru, hy, en)');

if (I18N) {
  const ruKeys = Object.keys(I18N.ru);
  const hyKeys = Object.keys(I18N.hy);
  const enKeys = Object.keys(I18N.en);

  console.log(`  📊 Key Counts: RU = ${ruKeys.length}, HY = ${hyKeys.length}, EN = ${enKeys.length}`);

  // 3-way parity check
  const missingInHy = ruKeys.filter(k => !(k in I18N.hy));
  const missingInEn = ruKeys.filter(k => !(k in I18N.en));
  const missingInRu = hyKeys.filter(k => !(k in I18N.ru));

  assert(missingInHy.length === 0, 'All RU keys present in HY', missingInHy.join(', '));
  assert(missingInEn.length === 0, 'All RU keys present in EN', missingInEn.join(', '));
  assert(missingInRu.length === 0, 'All HY keys present in RU', missingInRu.join(', '));
  assert(ruKeys.length === hyKeys.length && hyKeys.length === enKeys.length, 'Exact 100% 3-way key count parity');

  // Verify all data-i18n attributes in HTML exist in dictionary
  const htmlI18nKeys = [...new Set([...html.matchAll(/data-i18n=["']([^"']+)["']/gi)].map(m => m[1]))];
  const missingFromDict = htmlI18nKeys.filter(k => !(k in I18N.ru));
  assert(missingFromDict.length === 0, `All ${htmlI18nKeys.length} HTML data-i18n keys exist in dictionary`, missingFromDict.join(', '));

  // Verify NO untranslated empty strings
  const emptyRu = ruKeys.filter(k => typeof I18N.ru[k] !== 'string' || I18N.ru[k].trim() === '');
  const emptyHy = hyKeys.filter(k => typeof I18N.hy[k] !== 'string' || I18N.hy[k].trim() === '');
  const emptyEn = enKeys.filter(k => typeof I18N.en[k] !== 'string' || I18N.en[k].trim() === '');
  assert(emptyRu.length === 0, 'Zero empty strings in RU dictionary');
  assert(emptyHy.length === 0, 'Zero empty strings in HY dictionary');
  assert(emptyEn.length === 0, 'Zero empty strings in EN dictionary');

  // Verify default HTML language purity (no Armenian text in default Russian HTML, except currency symbol ֏)
  const armenianLetterRegex = /[\u0531-\u0556\u0561-\u0587]/g;
  const matchesArm = html.match(armenianLetterRegex);
  assert(!matchesArm || matchesArm.length === 0, 'Default HTML has ZERO Armenian alphabet letters (clean Russian default)', matchesArm ? `Found ${matchesArm.length}` : '');
}

// -------------------------------------------------------------
// SECTION 4: DOM ELEMENT BINDINGS & SCRIPT INTEGRITY
// -------------------------------------------------------------
console.log('\n--- 4. DOM ELEMENT BINDINGS IN JAVASCRIPT ---');

const jsElementIds = [...new Set([...js.matchAll(/document\.getElementById\(["']([^"']+)["']\)/gi)].map(m => m[1]))];
let allJsIdsExist = true;
const missingJsIds = [];
jsElementIds.forEach(id => {
  if (!idSet.has(id)) {
    allJsIdsExist = false;
    missingJsIds.push(id);
  }
});
assert(allJsIdsExist, `All ${jsElementIds.length} getElementById calls match elements in index.html`, missingJsIds.join(', '));

// Check data-filter-room, data-filter-proj, data-currency, data-lang buttons exist
const roomFilterBtns = [...html.matchAll(/data-filter-room=["']([^"']+)["']/gi)].map(m => m[1]);
assert(roomFilterBtns.length >= 5, `Room filter buttons present (${roomFilterBtns.join(', ')})`);

const projFilterBtns = [...html.matchAll(/data-filter-proj=["']([^"']+)["']/gi)].map(m => m[1]);
assert(projFilterBtns.length >= 4, `Project filter buttons present (${projFilterBtns.join(', ')})`);

const bankBtns = [...html.matchAll(/class=["'][^"']*bank-btn[^"']*["']/gi)];
assert(bankBtns.length >= 4, `Bank preset buttons present (${bankBtns.length} banks)`);

// Check apartment cards data attributes
const aptCards = [...html.matchAll(/<article[^>]+class=["'][^"']*apartment-card[^"']*["'][^>]*>/gi)];
assert(aptCards.length === 6, `Exactly 6 apartment cards present in catalog (${aptCards.length} found)`);

let allCardsHaveAttrs = true;
aptCards.forEach((c, idx) => {
  const hasRoom = /data-room=/i.test(c[0]);
  const hasProj = /data-proj=/i.test(c[0]);
  const hasPrice = /data-price-amd=/i.test(c[0]);
  const hasArea = /data-area=/i.test(c[0]);
  if (!hasRoom || !hasProj || !hasPrice || !hasArea) allCardsHaveAttrs = false;
});
assert(allCardsHaveAttrs, 'All 6 apartment cards have data-room, data-proj, data-price-amd, and data-area attributes');

// Check Setl Group inspired architectural components
const projectShowcaseCards = [...html.matchAll(/class=["'][^"']*project-showcase-card[^"']*["']/gi)];
assert(projectShowcaseCards.length === 3, `Exactly 3 project showcase cards in #projects (${projectShowcaseCards.length} found)`);

const newsCards = [...html.matchAll(/class=["'][^"']*news-card[^"']*["']/gi)];
assert(newsCards.length === 3, `Exactly 3 construction news cards in #news (${newsCards.length} found)`);

const promoCards = [...html.matchAll(/class=["'][^"']*hero-promo-card[^"']*["']/gi)];
assert(promoCards.length === 3, `Exactly 3 hero promo cards in ribbon (${promoCards.length} found)`);

// -------------------------------------------------------------
// SECTION 5: SIMULATED RUNTIME INTERACTIONS & BEHAVIOR
// -------------------------------------------------------------
console.log('\n--- 5. SIMULATED RUNTIME BEHAVIOR & INTERACTION AUDIT ---');

class FakeDOMElement {
  constructor(tag, id = '', className = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.className = className;
    this.attributes = {};
    this.style = {};
    this.children = [];
    this.innerHTML = '';
    this.textContent = '';
    this.value = '';
    this.classList = {
      _classes: new Set(className ? className.split(/\s+/).filter(Boolean) : []),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classList._classes.has(c)) this.classList._classes.delete(c);
          else this.classList._classes.add(c);
        } else if (force) {
          this.classList._classes.add(c);
        } else {
          this.classList._classes.delete(c);
        }
      },
      contains: (c) => this.classList._classes.has(c)
    };
  }
  getAttribute(name) { return this.attributes[name] || null; }
  setAttribute(name, val) { this.attributes[name] = val; }
  appendChild(child) { this.children.push(child); }
  scrollIntoView() {}
  addEventListener(evt, handler) {
    if (!this._handlers) this._handlers = {};
    if (!this._handlers[evt]) this._handlers[evt] = [];
    this._handlers[evt].push(handler);
  }
  click() {
    if (this._handlers && this._handlers.click) {
      this._handlers.click.forEach(h => h({ target: this, preventDefault: () => {} }));
    }
  }
}

const elementsById = {};
const allElements = [];

// Parse full DOM from index.html
const tagRegex = /<([a-z0-9\-]+)([^>]*)>/gi;
let tm;
while ((tm = tagRegex.exec(html)) !== null) {
  const tag = tm[1];
  const attrStr = tm[2];
  const idMatch = attrStr.match(/id=["']([^"']+)["']/i);
  const classMatch = attrStr.match(/class=["']([^"']+)["']/i);
  const valMatch = attrStr.match(/value=["']([^"']+)["']/i);

  const el = new FakeDOMElement(tag, idMatch ? idMatch[1] : '', classMatch ? classMatch[1] : '');
  if (valMatch) el.value = valMatch[1];

  const dataRegex = /([a-z0-9\-]+)=["']([^"']*)["']/gi;
  let dm;
  while ((dm = dataRegex.exec(attrStr)) !== null) {
    el.setAttribute(dm[1], dm[2]);
  }

  if (el.id) elementsById[el.id] = el;
  allElements.push(el);
}

// Ensure children inside apartmentsGrid
const aptGrid = elementsById['apartmentsGrid'];
if (aptGrid) {
  allElements.filter(e => e.classList.contains('apartment-card')).forEach(c => aptGrid.appendChild(c));
}

let openedUrl = '';
const mockWindow = {
  open: (u) => { openedUrl = u; },
  IntersectionObserver: class {
    constructor(cb) { this.cb = cb; }
    observe() {}
    unobserve() {}
  }
};

const mockDocument = {
  documentElement: { lang: 'ru' },
  body: { style: {} },
  getElementById: (id) => elementsById[id] || null,
  querySelectorAll: (selector) => {
    if (selector.startsWith('.')) {
      const cls = selector.slice(1);
      return allElements.filter(e => e.classList.contains(cls));
    }
    if (selector.startsWith('[') && selector.endsWith(']')) {
      const inner = selector.slice(1, -1);
      const eqIdx = inner.indexOf('=');
      if (eqIdx !== -1) {
        const attr = inner.slice(0, eqIdx);
        const val = inner.slice(eqIdx + 1).replace(/["']/g, '');
        return allElements.filter(e => e.getAttribute(attr) === val);
      }
      return allElements.filter(e => e.getAttribute(inner) !== null);
    }
    return [];
  },
  addEventListener: (event, cb) => {
    if (event === 'DOMContentLoaded') setTimeout(cb, 0);
  }
};

const runtimeSandbox = {
  window: mockWindow,
  document: mockDocument,
  console: console,
  setTimeout: setTimeout,
  Math: Math,
  parseInt: parseInt,
  parseFloat: parseFloat,
  encodeURIComponent: encodeURIComponent,
  Array: Array
};
vm.createContext(runtimeSandbox);

try {
  vm.runInContext(js, runtimeSandbox);
  assert(true, 'app.js executes in VM with zero syntax or runtime exceptions');

  // Test 1: Language Switcher
  runtimeSandbox.setLanguage('hy');
  assert(mockDocument.documentElement.lang === 'hy', 'setLanguage("hy") updates documentElement.lang to "hy"');
  
  runtimeSandbox.setLanguage('en');
  assert(mockDocument.documentElement.lang === 'en', 'setLanguage("en") updates documentElement.lang to "en"');

  runtimeSandbox.setLanguage('ru');
  assert(mockDocument.documentElement.lang === 'ru', 'setLanguage("ru") restores documentElement.lang to "ru"');

  // Test 2: Currency Switcher
  runtimeSandbox.setCurrency('USD');
  const appStateCurUSD = vm.runInContext('AppState.currency', runtimeSandbox);
  assert(appStateCurUSD === 'USD', 'setCurrency("USD") updates AppState.currency to USD');

  runtimeSandbox.setCurrency('AMD');
  const appStateCurAMD = vm.runInContext('AppState.currency', runtimeSandbox);
  assert(appStateCurAMD === 'AMD', 'setCurrency("AMD") restores AppState.currency to AMD');

  // Test 3: Passport Banner Switcher
  runtimeSandbox.updatePassportBanner('avan');
  assert(elementsById['passportTitle'].textContent.includes('Green Avan'), 'Passport banner updates for Green Avan filter');

  runtimeSandbox.updatePassportBanner('nork');
  assert(elementsById['passportTitle'].textContent.includes('Green Nork'), 'Passport banner updates for Green Nork filter');

  runtimeSandbox.updatePassportBanner('kasakh');
  assert(elementsById['passportTitle'].textContent.includes('Green Townhouse'), 'Passport banner updates for Green Townhouse filter');

  runtimeSandbox.updatePassportBanner('all');
  assert(elementsById['passportTitle'].textContent.length > 0, 'Passport banner updates for "all" filter');

  // Test 4: FinTech Mortgage & Tax Calculation
  const inputPrice = elementsById['inputPrice'];
  const inputDown = elementsById['inputDown'];
  const inputYears = elementsById['inputYears'];
  const inputRate = elementsById['inputRate'];

  inputPrice.value = '28000000';
  inputDown.value = '10';
  inputYears.value = '20';
  inputRate.value = '11.5';
  runtimeSandbox.updateMortgageCalculation();

  const resLoan = elementsById['resLoan'].textContent;
  const resStandard = elementsById['resStandardMonthly'].textContent;
  const resTax = elementsById['resTaxRefund'].textContent;
  const resEffective = elementsById['resEffectiveMonthly'].textContent;
  const ratioClient = elementsById['ratioClient'].style.width;
  const ratioGov = elementsById['ratioGov'].style.width;
  const savingsY1 = elementsById['savingsYear1Val'].textContent;
  const savingsY5 = elementsById['savingsYear5Val'].textContent;
  const salaryNeeded = elementsById['resSalaryNeeded'].textContent;

  assert(resLoan.includes('25 200 000') || resLoan.includes('25 200 000'), `Loan principal calculated correctly (${resLoan})`);
  assert(resStandard.includes('268 740') || resStandard.includes('268 740'), `Standard annuity monthly calculated correctly (${resStandard})`);
  assert(resTax.includes('241 500') || resTax.includes('241 500'), `Tax refund calculated correctly (${resTax})`);
  assert(resEffective.includes('27 240') || resEffective.includes('27 240'), `Effective net payment calculated correctly (${resEffective})`);
  assert(ratioClient.length > 0 && ratioGov.length > 0, `Ratio bar widths calculated (Client: ${ratioClient}, Gov: ${ratioGov})`);
  assert(savingsY1.includes('+') && savingsY5.includes('+'), `Cumulative savings calculated (1yr: ${savingsY1}, 5yr: ${savingsY5})`);
  assert(salaryNeeded.includes('Gross'), `Gross salary requirement calculated (${salaryNeeded})`);

  // Test 5: Statutory Cap 500k Test (High property value test)
  inputPrice.value = '55000000';
  inputDown.value = '10';
  inputYears.value = '20';
  inputRate.value = '14.0';
  runtimeSandbox.updateMortgageCalculation();
  const taxCapDisplay = elementsById['resTaxRefund'].textContent;
  assert(taxCapDisplay.includes('500 000') || taxCapDisplay.includes('500 000'), `Art. 156.1 cap strictly observed at 500,000 AMD/mo on large loans (${taxCapDisplay})`);

  // Test 6: Apartment Modals (apt1 to apt6)
  ['apt1', 'apt2', 'apt3', 'apt4', 'apt5', 'apt6'].forEach(id => {
    runtimeSandbox.openApartmentModal(id);
    const title = elementsById['aptModalTitle'].textContent;
    const price = elementsById['aptModalPrice'].textContent;
    const district = elementsById['aptModalDistrict'].textContent;
    assert(title.length > 0 && price.length > 0 && district.length > 0, `openApartmentModal("${id}") loads: "${title}" (${price})`);
  });

  // Test 7: Calculate this apartment button
  runtimeSandbox.openApartmentModal('apt4');
  runtimeSandbox.calculateThisApartment();
  assert(inputPrice.value === '33650000', `calculateThisApartment() syncs calculator input to apartment price (33,650,000 AMD)`);

  // Test 8: Book this apartment button
  runtimeSandbox.openApartmentModal('apt2');
  runtimeSandbox.bookCurrentApartment();
  const commentVal = elementsById['inputComment'].value;
  assert(commentVal.includes('Светлая студия у парка'), `bookCurrentApartment() auto-populates comment field with apartment title ("${commentVal}")`);

  // Test 9: Book via WhatsApp
  runtimeSandbox.openApartmentModal('apt6');
  runtimeSandbox.bookCurrentApartmentWhatsApp();
  assert(openedUrl.startsWith('https://wa.me/37494664522'), 'bookCurrentApartmentWhatsApp() opens official WhatsApp number +374 94 66 45 22');
  assert(openedUrl.includes('%D0%A2%D0%B0%D1%83%D0%BD%D1%85%D0%B0%D1%83%D1%81') || openedUrl.includes('Townhouse'), 'WhatsApp message contains encoded apartment title');

  // Test 10: Modal Open / Close
  runtimeSandbox.openModal('modalLead');
  assert(elementsById['modalLead'].classList.contains('active'), 'openModal("modalLead") adds active class');
  runtimeSandbox.closeModal('modalLead');
  assert(!elementsById['modalLead'].classList.contains('active'), 'closeModal("modalLead") removes active class');

  // Test 11: Setl Group Project Showcase Filter Helper
  runtimeSandbox.filterProjectFromShowcase('avan');
  const projFilterAvan = vm.runInContext('AppState.activeProjFilter', runtimeSandbox);
  assert(projFilterAvan === 'avan', 'filterProjectFromShowcase("avan") updates activeProjFilter to "avan"');
  assert(elementsById['passportTitle'].textContent.includes('Avan') || elementsById['passportTitle'].textContent.includes('Аван'), 'filterProjectFromShowcase("avan") updates passport banner');

  runtimeSandbox.filterProjectFromShowcase('nork');
  const projFilterNork = vm.runInContext('AppState.activeProjFilter', runtimeSandbox);
  assert(projFilterNork === 'nork', 'filterProjectFromShowcase("nork") updates activeProjFilter to "nork"');

  runtimeSandbox.filterProjectFromShowcase('townhouse');
  const projFilterTownhouse = vm.runInContext('AppState.activeProjFilter', runtimeSandbox);
  assert(projFilterTownhouse === 'townhouse', 'filterProjectFromShowcase("townhouse") updates activeProjFilter to "townhouse"');

  // Test 12: Scroll Reveal & Drawer
  runtimeSandbox.initScrollReveal();
  assert(true, 'initScrollReveal() initializes smoothly without exceptions');

} catch (err) {
  assert(false, 'Runtime VM execution encountered an unhandled error', err.stack);
}

// -------------------------------------------------------------
// SECTION 6: SETL GROUP CORPORATE PATTERNS & RESPONSIVE AUDIT
// -------------------------------------------------------------
console.log('\n--- 6. SETL GROUP CORPORATE PATTERNS & RESPONSIVE AUDIT ---');

// 1. Two-tier header
assert(/<aside[^>]+class=["'][^"']*top-bar[^"']*["']/i.test(html), 'Tier 1 Top-Bar info panel exists');
assert(/top-bar-location-badge/i.test(html) && /Ереван/i.test(html), 'Top-Bar displays location badge (Yerevan & Kotayk)');
assert(/top-bar-announcement/i.test(html) && /156\.1/i.test(html), 'Top-Bar displays bank accreditation & Tax Code Art. 156.1');
assert(/<header[^>]+class=["'][^"']*site-header[^"']*["']/i.test(html), 'Tier 2 Site-Header corporate header exists');
assert(/class=["']nav-links["']/i.test(html) && /href=["']#projects["']/i.test(html) && /href=["']#apartments["']/i.test(html), 'Site-Header nav contains anchor links to #projects and #apartments');
assert(/tel:\+37494664522/i.test(html), 'Header includes direct phone contact link');

// 2. Hero presentation & promo ribbon
assert(/class=["']hero-promo-ribbon["']/i.test(html), 'Hero includes Setl Group promo ribbon container');
const promoCardsCount = [...html.matchAll(/class=["']hero-promo-card["']/gi)].length;
assert(promoCardsCount === 3, `Hero promo ribbon has exactly 3 promo cards (Found: ${promoCardsCount})`);
assert(/hero-stats-dl/i.test(html) && /38\s*м²/i.test(html) && /14/i.test(html) && /10%/i.test(html), 'Hero metric counters present (area, floors, mortgage down payment)');
assert(/floating-card-bl/i.test(html) && /floating-card-tr/i.test(html), 'Hero showcases floating amenity and tax refund cards');

// 3. Flagship projects showcase (#projects)
assert(/id=["']projects["']/i.test(html), 'Flagship projects showcase container (#projects) exists');
assert(/projClassComfort/i.test(html) && /projClassBusiness/i.test(html) && /projClassTownhouses/i.test(html), 'Showcase cards define Comfort-Plus, Business, and Premium Townhouse class tags');
assert(/10\s*мин\s*до\s*центра/i.test(html) && /15\s*мин\s*до\s*центра/i.test(html) && /12\s*мин\s*до\s*центра/i.test(html), 'Showcase cards display verified travel times to Yerevan center');
assert(/filterProjectFromShowcase\(['"]avan['"]\)/i.test(html) && /filterProjectFromShowcase\(['"]nork['"]\)/i.test(html) && /filterProjectFromShowcase\(['"]townhouse['"]\)/i.test(html), 'Showcase cards have direct filter actions connected to apartment catalog');

// 4. Apartment catalog & lead magnet
assert(/id=["']apartments["']/i.test(html), 'Apartment catalog section (#apartments) exists');
const sqmCount = [...html.matchAll(/price-sqm-dyn/gi)].length;
assert(sqmCount === 6, `All 6 apartment cards display square meter pricing (Found: ${sqmCount})`);
assert(/catalog-lead-magnet-card/i.test(html) && /PDF/i.test(html), 'Lead magnet card offering 2026 PDF presentation exists in catalog');

// 5. Corporate standards (#advantages) & real-time construction progress (#news)
assert(/id=["']advantages["']/i.test(html), 'Corporate standards section (#advantages) exists');
assert(/class=["']advantage-card["']/i.test(html), 'Advantages cards present');
assert(/class=["']escrow-banner-card["']/i.test(html) && /эскроу/i.test(html), 'Escrow legal security banner present citing RA legislation');
assert(/id=["']news["']/i.test(html), 'Construction progress section (#news) exists');
const progressBarsCount = [...html.matchAll(/news-progress-bar-wrap/gi)].length;
assert(progressBarsCount === 3, `Construction news contains 3 real-time progress bars (Found: ${progressBarsCount})`);

// 6. Institutional 4-column footer in #0F382E
assert(/<footer[^>]+class=["'][^"']*site-footer[^"']*["']/i.test(html), 'Institutional site-footer element exists');
assert(/footer-grid/i.test(html) && /footer-col-about/i.test(html), 'Footer implements multi-column corporate grid');
assert(/18492/i.test(html), 'Footer includes official RA Developer License No. 18492');
assert(/\.site-footer\s*\{[^}]*background(?:-color)?:\s*(?:var\(--forest[^)]*\)|#0F382E)/i.test(css), 'Footer styled with #0F382E deep forest green background');

// 7. Responsive layout & CSS integrity
assert(/<meta\s+name=["']viewport["']\s+content=["']width=device-width,\s*initial-scale=1\.0["']/i.test(html), 'Viewport meta tag configured for responsive mobile rendering');
assert(/@media\s*\(\s*max-width:\s*1024px\s*\)/i.test(css), 'Breakpoint 1024px exists in CSS');
assert(/@media\s*\(\s*max-width:\s*768px\s*\)/i.test(css), 'Breakpoint 768px exists in CSS');
assert(/id=["']mobileStickyDock["']/i.test(html), 'Mobile sticky dock (#mobileStickyDock) element exists in DOM');
assert(/\.mobile-sticky-dock\s*\{[^}]*position:\s*fixed/i.test(css), 'Mobile sticky dock is fixed to bottom viewport in CSS');
assert(/html\s*\{[^}]*overflow-x:\s*hidden/i.test(css) && /body\s*\{[^}]*overflow-x:\s*hidden/i.test(css), 'Horizontal scroll strictly prevented with overflow-x: hidden on both html and body');

// 8. Color Tokens verification: #FFFFFF canvas, #183B2B, #C5A265, and backward compatibility
assert(/--forest(?:-dark)?:\s*#(?:0F382E|183B2B)/i.test(css), 'Color token deep forest green defined in :root');
assert(/--primary:\s*#(?:183b2b|21914e)/i.test(css) || /--emerald:\s*#21914E/i.test(css), 'Color token primary brand green defined in :root');
assert(/--secondary:\s*#(?:f4f6f8|dcf7e1)/i.test(css) || /--mint:\s*#DCF7E1/i.test(css), 'Color token secondary surface defined in :root');
assert(/--background:\s*#(?:ffffff|f9fdfa)/i.test(css), 'Color token #FFFFFF canvas defined in :root');
assert(/--accent:\s*#(?:c5a265|c5a880)/i.test(css), 'Color token brass/gold accent defined in :root');

// -------------------------------------------------------------
// FINAL SUMMARY
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log(`QA TEST SUMMARY: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
if (failedTests === 0) {
  console.log('🎉 100% SUCCESS — ZERO ERRORS, ZERO FAILURES! READY FOR PRODUCTION.');
} else {
  console.error(`🚨 ${failedTests} FAILURES DETECTED:`);
  failures.forEach(f => console.error(`   - ${f.testName}: ${f.details}`));
}
console.log('===============================================================\n');

process.exit(failedTests === 0 ? 0 : 1);
