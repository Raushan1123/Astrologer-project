/**
 * Update mockData.js to use Cloudflare R2 URLs
 * Run this after uploading images to R2
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Image URL mappings
const imageMapping = {
  // Services
  'https://images.unsplash.com/photo-1515942661900-94b3d1972591?w=800&q=80&fm=webp&fit=crop&auto=format': 'services/birth-chart.webp',
  'https://images.unsplash.com/photo-1729335511883-29eade10006b?w=800&q=80&fm=webp&fit=crop&auto=format': 'services/career.webp',
  'https://images.unsplash.com/photo-1600429991827-5224817554f8?w=800&q=80&fm=webp&fit=crop&auto=format': 'services/marriage.webp',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80&fm=webp&fit=crop&auto=format': 'services/health.webp',
  'https://images.unsplash.com/photo-1729335511904-9b8690184935?w=800&q=80&fm=webp&fit=crop&auto=format': 'services/vastu.webp',
  'https://images.unsplash.com/photo-1758926384162-b3783d5fa09e?w=800&q=80&fm=webp&fit=crop&auto=format': 'services/palmistry.webp',
  
  // Astrologers
  'https://images.unsplash.com/photo-1554355202-11fbc45c7157?w=400&q=80&fm=webp&fit=crop&auto=format': 'astrologers/indira-pandey.webp',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fm=webp&fit=crop&auto=format': 'astrologers/ram-nath-tiwari.webp',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fm=webp&fit=crop&auto=format': 'astrologers/ankita-pandey.webp',
  
  // Blog
  'https://images.unsplash.com/photo-1515942661900-94b3d1972591?w=600&q=75&fm=webp&fit=crop&auto=format': 'blog/birth-chart-guide.webp',
  'https://images.unsplash.com/photo-1729335511904-9b8690184935?w=600&q=75&fm=webp&fit=crop&auto=format': 'blog/weekly-horoscope.webp',
  
  // Backgrounds
  'https://images.unsplash.com/photo-1766473625788-a22578b1e6e2?w=1920&q=75&fm=webp&fit=crop&auto=format': 'backgrounds/hero-bg.webp',
  'https://images.unsplash.com/photo-1650365449083-b3113ff48337?w=1920&q=75&fm=webp&fit=crop&auto=format': 'backgrounds/cta-bg.webp',
};

async function updateImageUrls() {
  console.log('🔄 Update Image URLs to Cloudflare R2\n');
  
  // Get R2 base URL from user
  const r2BaseUrl = await question('Enter your R2 public URL (e.g., https://pub-xxxxx.r2.dev): ');
  
  if (!r2BaseUrl || !r2BaseUrl.startsWith('http')) {
    console.error('❌ Invalid URL. Please provide a valid R2 public URL.');
    rl.close();
    return;
  }
  
  const baseUrl = r2BaseUrl.replace(/\/$/, ''); // Remove trailing slash
  
  console.log(`\n✅ Using base URL: ${baseUrl}\n`);
  
  // Read mockData.js
  const mockDataPath = path.join(__dirname, '..', 'frontend', 'src', 'mockData.js');
  let content = fs.readFileSync(mockDataPath, 'utf8');
  
  let replacementCount = 0;
  
  // Replace all Unsplash URLs with R2 URLs
  for (const [unsplashUrl, r2Path] of Object.entries(imageMapping)) {
    const r2Url = `${baseUrl}/${r2Path}`;
    
    if (content.includes(unsplashUrl)) {
      content = content.replace(new RegExp(unsplashUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), r2Url);
      replacementCount++;
      console.log(`✅ Replaced: ${r2Path}`);
    }
  }
  
  // Create backup
  const backupPath = mockDataPath + '.backup';
  fs.writeFileSync(backupPath, fs.readFileSync(mockDataPath));
  console.log(`\n💾 Backup created: ${backupPath}`);
  
  // Write updated content
  fs.writeFileSync(mockDataPath, content);
  
  console.log(`\n✅ Updated ${replacementCount} image URLs in mockData.js`);
  console.log(`📁 File: ${mockDataPath}`);
  
  // Update Home.jsx
  const homeJsxPath = path.join(__dirname, '..', 'frontend', 'src', 'pages', 'Home.jsx');
  let homeContent = fs.readFileSync(homeJsxPath, 'utf8');
  
  // Replace background images
  homeContent = homeContent.replace(
    'https://images.unsplash.com/photo-1766473625788-a22578b1e6e2?w=1920&q=75&fm=webp&fit=crop&auto=format',
    `${baseUrl}/backgrounds/hero-bg.webp`
  );
  
  homeContent = homeContent.replace(
    'https://images.unsplash.com/photo-1650365449083-b3113ff48337?w=1920&q=75&fm=webp&fit=crop&auto=format',
    `${baseUrl}/backgrounds/cta-bg.webp`
  );
  
  // Create backup
  fs.writeFileSync(homeJsxPath + '.backup', fs.readFileSync(homeJsxPath));
  fs.writeFileSync(homeJsxPath, homeContent);
  
  console.log(`✅ Updated background images in Home.jsx`);
  
  // Update .env
  const envPath = path.join(__dirname, '..', 'frontend', '.env.local');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  if (!envContent.includes('REACT_APP_R2_BASE_URL')) {
    envContent += `\n# Cloudflare R2 Image CDN\nREACT_APP_R2_BASE_URL=${baseUrl}\n`;
    fs.writeFileSync(envPath, envContent);
    console.log(`✅ Added R2_BASE_URL to .env.local`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ All image URLs updated successfully!');
  console.log('='.repeat(60));
  console.log('\n📋 Next steps:');
  console.log('1. Test locally: npm start');
  console.log('2. Check that all images load from R2');
  console.log('3. Build: npm run build');
  console.log('4. Deploy to production');
  console.log('\n💡 Tip: If something goes wrong, restore from .backup files');
  
  rl.close();
}

updateImageUrls().catch(console.error);

