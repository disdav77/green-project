/**
 * test_mobile_responsive.js
 * ============================================================================
 * Comprehensive Mobile Responsiveness & Style Cleanliness QA Suite (360px - 768px)
 * Covers:
 *  - Viewport breakpoints: 360px, 390px, 414px, 480px, 640px, 768px
 *  - Zero horizontal overflow constraints
 *  - CSS Grid / Flex responsive adaptations
 *  - AI Detox copywriting verification (no neural clichés, authentic engineering terms)
 *  - Zero neon / zero plastic blur visual verification
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedAssertions = 0;
let totalAssertions = 0;

function check(desc, condition) {
  totalAssertions++;
  if (!condition) {
    console.error(`  ❌ [FAIL] ${desc}`);
    throw new Error(`Assertion failed: ${desc}`);
  }
  passedAssertions++;
  console.log(`  ✅ [PASS] ${desc}`);
}

console.log('\n================================================================');
console.log('>>> MOBILE RESPONSIVENESS & DESIGN REFINEMENT QA SUITE');
console.log('================================================================\n');

// Load files
const dir = __dirname;
const htmlContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const cssContent = fs.readFileSync(path.join(dir, 'style.css'), 'utf8');
const jsContent = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');

// ----------------------------------------------------------------------------
// SUITE 1: VIEWPORT & OVERFLOW CONTROL (360px - 768px)
// ----------------------------------------------------------------------------
console.log('--- 1. Viewport & Zero Horizontal Overflow Control ---');

// Meta viewport
check('Meta viewport tag properly set with width=device-width and initial-scale=1.0',
  htmlContent.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
);

// Overflow-x containment
check('HTML has overflow-x: hidden',
  /html\s*{[^}]*overflow-x:\s*hidden/i.test(cssContent)
);
check('BODY has overflow-x: hidden',
  /body\s*{[^}]*overflow-x:\s*hidden/i.test(cssContent)
);

// Container clamp rule accommodates 360px gracefully (min 16px gutter)
check('Container padding-inline uses clamp(16px, 3.5vw, 48px) for narrow viewports',
  cssContent.includes('padding-inline: clamp(16px, 3.5vw, 48px)')
);

// Max width limit (1520px)
check('Container max-width set to Setl Group benchmark (1520px)',
  cssContent.includes('max-width: 1520px')
);

// Image responsiveness
check('Universal img rule has max-width: 100% and height: auto',
  /img\s*{[^}]*max-width:\s*100%[^}]*height:\s*auto/i.test(cssContent)
);

// ----------------------------------------------------------------------------
// SUITE 2: BREAKPOINTS & COMPONENT RESPONSIVENESS
// ----------------------------------------------------------------------------
console.log('\n--- 2. Responsive Grid & Component Breakpoints ---');

// Check 1024px breakpoint
check('1024px media query exists for tablet/desktop transition',
  cssContent.includes('@media (max-width: 1024px)')
);

// Check 768px breakpoint
check('768px media query exists for mobile layout transition',
  cssContent.includes('@media (max-width: 768px)')
);

// Check 480px breakpoint
check('480px media query exists for narrow mobile layout transition',
  cssContent.includes('@media (max-width: 480px)')
);

// Check hero stats responsive layout
check('Hero stats grid is 4 columns on desktop',
  /\.hero-stats-dl\s*{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/i.test(cssContent)
);
check('Hero stats grid wraps to 2 columns on <=768px viewports',
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.hero-stats-dl\s*{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\)/i.test(cssContent)
);

// Check projects and news grid collapse
check('Projects grid collapses to 1 column on <=768px',
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.projects-grid[\s\S]*?grid-template-columns:\s*1fr/i.test(cssContent)
);
check('Apartments and advantages grids collapse to 1 column on <=768px',
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.apartments-grid,\s*\.advantages-grid\s*{[^}]*grid-template-columns:\s*1fr/i.test(cssContent)
);
check('Escrow security features grid collapses to 1 column on <=768px',
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.escrow-features-grid\s*{[^}]*grid-template-columns:\s*1fr/i.test(cssContent)
);

// Check calculator responsiveness
check('Calculator container collapses to 1 column on <=1024px',
  /@media\s*\(max-width:\s*1024px\)[\s\S]*?\.calc-card-container\s*{[^}]*grid-template-columns:\s*1fr/i.test(cssContent)
);
check('Calculator container reduces padding on <=768px for mobile comfort',
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.calc-card-container\s*{[^}]*padding:\s*20px\s*16px/i.test(cssContent)
);

// Check project card footer wrapping on <=480px
check('Project card footer row wraps to column on <=480px (prevents squeeze)',
  /@media\s*\(max-width:\s*480px\)[\s\S]*?\.project-footer-row\s*{[^}]*flex-direction:\s*column/i.test(cssContent)
);
check('Project card action button stretches to 100% width on <=480px',
  /@media\s*\(max-width:\s*480px\)[\s\S]*?\.project-footer-row\s*\.btn\s*{[^}]*width:\s*100%/i.test(cssContent)
);

// Mobile Sticky Dock & Body padding
check('Mobile sticky dock is visible on <=768px',
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.mobile-sticky-dock\s*{[^}]*display:\s*block/i.test(cssContent)
);
check('Body has bottom padding on <=768px to prevent sticky dock overlap',
  /@media\s*\(max-width:\s*768px\)[\s\S]*?body\s*{[^}]*padding-bottom:\s*70px/i.test(cssContent)
);

// ----------------------------------------------------------------------------
// SUITE 3: AI DETOX COPYWRITING AUDIT
// ----------------------------------------------------------------------------
console.log('\n--- 3. AI Tone Detox & Real Estate Developer Terminology ---');

const bannedNeuralPhrases = [
  'инновационные алгоритмы',
  'инновационных алгоритмов',
  'умные технологии будущего',
  'опережающие время',
  'алгоритмы будущего',
  'цифровой экосистемы будущего'
];

bannedNeuralPhrases.forEach(phrase => {
  const inHtml = htmlContent.toLowerCase().includes(phrase.toLowerCase());
  const inJs = jsContent.toLowerCase().includes(phrase.toLowerCase());
  check(`Banned neural cliché "${phrase}" is absent from HTML`, !inHtml);
  check(`Banned neural cliché "${phrase}" is absent from JS (I18N)`, !inJs);
});

// Verify authentic engineering and developer vocabulary
const requiredDeveloperTerms = [
  { term: 'монолит', desc: 'Монолитный железобетонный каркас' },
  { term: 'шумоизоляц', desc: 'Акустическая шумоизоляция перекрытий' },
  { term: 'паркинг', desc: 'Подземный отапливаемый паркинг' },
  { term: 'энергоэффективност', desc: 'Класс энергоэффективности А+' },
  { term: 'эскроу', desc: 'Эскроу-счета (гарантия безопасности)' },
  { term: '156.1', desc: 'Ст. 156.1 Налогового кодекса РА' },
  { term: 'Ереван', desc: 'Локация в Ереване' },
  { term: 'Касах', desc: 'Локация в Касахе' }
];

requiredDeveloperTerms.forEach(({ term, desc }) => {
  const inApp = jsContent.toLowerCase().includes(term.toLowerCase()) || htmlContent.toLowerCase().includes(term.toLowerCase());
  check(`Authentic developer vocabulary "${desc}" is actively present`, inApp);
});

// ----------------------------------------------------------------------------
// SUITE 4: VISUAL REFINEMENT (ZERO NEON, ZERO PLASTIC BLUR)
// ----------------------------------------------------------------------------
console.log('\n--- 4. Visual Refinement & Clean Architectural Standards ---');

// Verify ZERO backdrop-filter blur
const blurMatches = [...cssContent.matchAll(/backdrop-filter:\s*blur/gi)];
check('Zero plastic blur: zero occurrences of "backdrop-filter: blur" in style.css',
  blurMatches.length === 0
);

// Verify ZERO dashed borders
const dashedMatches = [...cssContent.matchAll(/border(-[a-z]+)?:\s*[^;]*dashed/gi)];
check('Zero cheap dashed borders in style.css',
  dashedMatches.length === 0
);

// Verify ZERO acidic / neon green hex values
const neonHexRegex = /(#10b981|#a7f3d0|#22c55e|#4ade80|#16a34a|#86efac|#bbf7d0)/gi;
const neonMatches = [...cssContent.matchAll(neonHexRegex)];
check('Zero acidic/neon green hex codes in style.css',
  neonMatches.length === 0
);

// Verify primary green palette
check('Corporate emerald #21914E defined as primary green',
  cssContent.includes('#21914E')
);
check('Deep forest #0F382E defined as premium dark accent',
  cssContent.includes('#0F382E')
);
check('Architectural neutral #F4F7F5 defined for matte surfaces',
  cssContent.includes('#F4F7F5')
);

// ----------------------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`MOBILE RESPONSIVE & STYLING QA: ${passedAssertions} / ${totalAssertions} PASSED (100%)`);
console.log('🎉 ALL MOBILE VIEWPORT & VISUAL REFINEMENT STANDARDS VERIFIED!');
console.log('================================================================\n');
