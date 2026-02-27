#!/bin/bash

# Upload images to Cloudflare R2
# Make sure you have wrangler installed: npm install -g wrangler
# And you're logged in: wrangler login

BUCKET_NAME="astrologer-images"
IMAGES_DIR="./images"

echo "🚀 Uploading images to Cloudflare R2..."
echo "📦 Bucket: $BUCKET_NAME"
echo "📁 Source: $IMAGES_DIR"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found!"
    echo "📥 Install it with: npm install -g wrangler"
    exit 1
fi

# Check if images directory exists
if [ ! -d "$IMAGES_DIR" ]; then
    echo "❌ Images directory not found!"
    echo "📥 Run 'node scripts/download-images.js' first"
    exit 1
fi

# Upload services images
echo "📤 Uploading services images..."
for file in $IMAGES_DIR/services/*.webp; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  ⬆️  $filename"
        wrangler r2 object put "$BUCKET_NAME/services/$filename" --file "$file"
    fi
done

# Upload astrologers images
echo ""
echo "📤 Uploading astrologers images..."
for file in $IMAGES_DIR/astrologers/*.webp; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  ⬆️  $filename"
        wrangler r2 object put "$BUCKET_NAME/astrologers/$filename" --file "$file"
    fi
done

# Upload blog images
echo ""
echo "📤 Uploading blog images..."
for file in $IMAGES_DIR/blog/*.webp; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  ⬆️  $filename"
        wrangler r2 object put "$BUCKET_NAME/blog/$filename" --file "$file"
    fi
done

# Upload background images
echo ""
echo "📤 Uploading background images..."
for file in $IMAGES_DIR/backgrounds/*.webp; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  ⬆️  $filename"
        wrangler r2 object put "$BUCKET_NAME/backgrounds/$filename" --file "$file"
    fi
done

echo ""
echo "✅ Upload complete!"
echo ""
echo "📋 Next steps:"
echo "1. Get your R2 public URL from Cloudflare Dashboard"
echo "2. Add to .env: REACT_APP_R2_BASE_URL=https://pub-xxxxx.r2.dev"
echo "3. Update mockData.js to use R2 URLs"
echo ""
echo "🔗 Example URL: https://pub-xxxxx.r2.dev/services/birth-chart.webp"

