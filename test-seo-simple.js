// Simple test to verify SEO component is imported and used correctly
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing SEO Meta Tags Implementation...\n');

const pages = [
  { file: 'Home.jsx', expectedTitle: 'Vedic Indian Astrology Consultation' },
  { file: 'About.jsx', expectedTitle: 'About Acharyaa Indira Pandey' },
  { file: 'Team.jsx', expectedTitle: 'Our Team' },
  { file: 'Services.jsx', expectedTitle: 'Vedic Astrology Services Ghaziabad' },
  { file: 'Gemstones.jsx', expectedTitle: 'Gemstone Catalog' },
  { file: 'Testimonials.jsx', expectedTitle: 'Client Testimonials' },
  { file: 'Blog.jsx', expectedTitle: 'Astrology Blog' },
  { file: 'Contact.jsx', expectedTitle: 'Contact Us' }
];

let allPassed = true;

pages.forEach(page => {
  const filePath = path.join(__dirname, 'frontend/src/pages', page.file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    const hasSEOImport = content.includes("import SEO from '../components/SEO'");
    const hasSEOComponent = content.includes('<SEO');
    const hasTitleProp = content.includes('title=');
    const hasDescriptionProp = content.includes('description=');
    const containsExpectedText = content.includes(page.expectedTitle);
    
    console.log(`📄 ${page.file}:`);
    console.log(`   ✅ SEO import: ${hasSEOImport ? 'YES' : '❌ NO'}`);
    console.log(`   ✅ SEO component used: ${hasSEOComponent ? 'YES' : '❌ NO'}`);
    console.log(`   ✅ Title prop: ${hasTitleProp ? 'YES' : '❌ NO'}`);
    console.log(`   ✅ Description prop: ${hasDescriptionProp ? 'YES' : '❌ NO'}`);
    console.log(`   ✅ Contains "${page.expectedTitle}": ${containsExpectedText ? 'YES' : '❌ NO'}`);
    
    if (hasSEOImport && hasSEOComponent && hasTitleProp && hasDescriptionProp && containsExpectedText) {
      console.log(`   ✅ PASSED\n`);
    } else {
      console.log(`   ❌ FAILED\n`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`   ❌ Error reading file: ${error.message}\n`);
    allPassed = false;
  }
});

// Check if SEO component exists
const seoComponentPath = path.join(__dirname, 'frontend/src/components/SEO.jsx');
const seoExists = fs.existsSync(seoComponentPath);
console.log(`📦 SEO Component: ${seoExists ? '✅ EXISTS' : '❌ NOT FOUND'}`);

if (seoExists) {
  const seoContent = fs.readFileSync(seoComponentPath, 'utf8');
  const hasUseEffect = seoContent.includes('useEffect');
  const hasDocumentTitle = seoContent.includes('document.title');
  const hasMetaDescription = seoContent.includes('meta[name="description"]');
  
  console.log(`   ✅ Uses useEffect: ${hasUseEffect ? 'YES' : '❌ NO'}`);
  console.log(`   ✅ Updates document.title: ${hasDocumentTitle ? 'YES' : '❌ NO'}`);
  console.log(`   ✅ Updates meta description: ${hasMetaDescription ? 'YES' : '❌ NO'}`);
}

console.log(`\n${'='.repeat(50)}`);
if (allPassed && seoExists) {
  console.log('✅ ALL TESTS PASSED! SEO implementation is correct.');
  console.log('\n📝 Note: Dynamic SEO updates will be visible when you:');
  console.log('   1. Open http://localhost:3000 in a browser');
  console.log('   2. Navigate to different pages');
  console.log('   3. Check browser tab title changes');
  console.log('   4. Inspect page source (Right-click → Inspect → <head>)');
} else {
  console.log('❌ SOME TESTS FAILED. Please review the output above.');
}
console.log('='.repeat(50));

