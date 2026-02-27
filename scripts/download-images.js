/**
 * Download and optimize images from Unsplash
 * This script downloads all images used in the app and converts them to WebP
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Create images directory
const IMAGES_DIR = path.join(__dirname, '..', 'images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// All images from mockData.js
const images = {
  services: [
    { url: 'https://images.unsplash.com/photo-1515942661900-94b3d1972591?w=800&q=80&fm=webp', name: 'birth-chart.webp' },
    { url: 'https://images.unsplash.com/photo-1729335511883-29eade10006b?w=800&q=80&fm=webp', name: 'career.webp' },
    { url: 'https://images.unsplash.com/photo-1600429991827-5224817554f8?w=800&q=80&fm=webp', name: 'marriage.webp' },
    { url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80&fm=webp', name: 'health.webp' },
    { url: 'https://images.unsplash.com/photo-1729335511904-9b8690184935?w=800&q=80&fm=webp', name: 'vastu.webp' },
    { url: 'https://images.unsplash.com/photo-1758926384162-b3783d5fa09e?w=800&q=80&fm=webp', name: 'palmistry.webp' },
    { url: 'https://images.unsplash.com/photo-1515942661900-94b3d1972591?w=800&q=80&fm=webp', name: 'gemstone.webp' },
    { url: 'https://images.unsplash.com/photo-1729335511904-9b8690184935?w=800&q=80&fm=webp', name: 'childbirth.webp' },
    { url: 'https://images.unsplash.com/photo-1515942661900-94b3d1972591?w=800&q=80&fm=webp', name: 'naming.webp' },
  ],
  astrologers: [
    { url: 'https://images.unsplash.com/photo-1554355202-11fbc45c7157?w=400&q=80&fm=webp', name: 'indira-pandey.webp' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fm=webp', name: 'ram-nath-tiwari.webp' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fm=webp', name: 'ankita-pandey.webp' },
  ],
  blog: [
    { url: 'https://images.unsplash.com/photo-1515942661900-94b3d1972591?w=600&q=75&fm=webp', name: 'birth-chart-guide.webp' },
    { url: 'https://images.unsplash.com/photo-1729335511904-9b8690184935?w=600&q=75&fm=webp', name: 'weekly-horoscope.webp' },
  ],
  backgrounds: [
    { url: 'https://images.unsplash.com/photo-1766473625788-a22578b1e6e2?w=1920&q=75&fm=webp', name: 'hero-bg.webp' },
    { url: 'https://images.unsplash.com/photo-1650365449083-b3113ff48337?w=1920&q=75&fm=webp', name: 'cta-bg.webp' },
  ]
};

/**
 * Download a file from URL
 */
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

/**
 * Download all images
 */
async function downloadAllImages() {
  console.log('📥 Starting image download...\n');
  
  let totalDownloaded = 0;
  let totalSize = 0;

  for (const [category, imageList] of Object.entries(images)) {
    const categoryDir = path.join(IMAGES_DIR, category);
    
    // Create category directory
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    console.log(`\n📁 Downloading ${category} images...`);

    for (const image of imageList) {
      const filepath = path.join(categoryDir, image.name);
      
      try {
        console.log(`  ⬇️  ${image.name}...`);
        await downloadFile(image.url, filepath);
        
        const stats = fs.statSync(filepath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        totalSize += stats.size;
        totalDownloaded++;
        
        console.log(`  ✅ ${image.name} (${sizeKB} KB)`);
      } catch (error) {
        console.error(`  ❌ Failed to download ${image.name}:`, error.message);
      }
    }
  }

  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Download complete!`);
  console.log(`📊 Total images: ${totalDownloaded}`);
  console.log(`💾 Total size: ${totalSizeMB} MB`);
  console.log(`📁 Location: ${IMAGES_DIR}`);
  console.log('='.repeat(50));
  
  console.log('\n📋 Next steps:');
  console.log('1. Review images in ./images/ folder');
  console.log('2. Upload to Cloudflare R2 using: npm run upload-images');
  console.log('3. Or manually upload via Cloudflare Dashboard');
}

// Run the script
downloadAllImages().catch(console.error);

