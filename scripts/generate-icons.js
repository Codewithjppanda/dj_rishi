// Icon Generation Script for PWA
// This script helps generate PWA icons from a source image

const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('📱 PWA Icon Generator for DJ Rishi\n');
console.log('========================================\n');

console.log('📋 Required Icon Sizes:');
iconSizes.forEach(size => {
  console.log(`   ✓ ${size}x${size}px`);
});

console.log('\n📝 Instructions:');
console.log('   1. Create icons using an online tool like:');
console.log('      • https://realfavicongenerator.net/');
console.log('      • https://www.pwabuilder.com/imageGenerator');
console.log('      • https://favicon.io/');
console.log('');
console.log('   2. Use your DJ Rishi logo as the source image');
console.log('      (Recommended: 512x512px PNG with transparent background)');
console.log('');
console.log('   3. Generate icons for the following sizes:');
iconSizes.forEach(size => {
  console.log(`      • icon-${size}x${size}.png`);
});
console.log('');
console.log('   4. Place all generated icons in: /public/icons/');
console.log('');

console.log('🎨 Design Recommendations:');
console.log('   • Use your brand color (#E63946) as the background');
console.log('   • Add padding around your logo (10-15% on each side)');
console.log('   • Ensure the icon is visible on both light and dark backgrounds');
console.log('   • Test the icon at different sizes');
console.log('');

console.log('✅ Quick Setup (if you have a logo at /public/images/DJ Rishi Logo Transparent.png):');
console.log('   Run: npx pwa-asset-generator /public/images/DJ\\ Rishi\\ Logo\\ Transparent.png /public/icons');
console.log('');

// Check if icons directory exists
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  console.log('📁 Creating icons directory...');
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('   ✓ Directory created: /public/icons/');
} else {
  console.log('✓ Icons directory exists');
  
  // Check which icons are present
  console.log('\n📊 Current Icons Status:');
  let missingIcons = [];
  iconSizes.forEach(size => {
    const iconPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    if (fs.existsSync(iconPath)) {
      console.log(`   ✓ icon-${size}x${size}.png - Found`);
    } else {
      console.log(`   ✗ icon-${size}x${size}.png - Missing`);
      missingIcons.push(size);
    }
  });
  
  if (missingIcons.length > 0) {
    console.log(`\n⚠️  ${missingIcons.length} icon(s) missing. Please generate them.`);
  } else {
    console.log('\n🎉 All icons are present!');
  }
}

console.log('\n========================================');
console.log('For more information, visit:');
console.log('https://web.dev/add-manifest/');
console.log('========================================\n');

