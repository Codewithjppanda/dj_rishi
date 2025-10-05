const fs = require('fs');
const path = require('path');

// Simple function to create SVG icons
function createMusicIcon(size) {
  const padding = size * 0.15;
  const noteSize = size * 0.6;
  const noteX = size / 2 - noteSize / 4;
  const noteY = size / 2 - noteSize / 3;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <!-- Background -->
  <defs>
    <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E63946;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d62839;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad${size})"/>
  
  <!-- Music Notes -->
  <g fill="white" opacity="0.95">
    <!-- Note 1 -->
    <ellipse cx="${noteX + noteSize * 0.15}" cy="${noteY + noteSize * 0.7}" rx="${noteSize * 0.12}" ry="${noteSize * 0.09}" />
    <rect x="${noteX + noteSize * 0.24}" y="${noteY + noteSize * 0.15}" width="${noteSize * 0.06}" height="${noteSize * 0.58}" rx="${noteSize * 0.03}"/>
    
    <!-- Note 2 -->
    <ellipse cx="${noteX + noteSize * 0.45}" cy="${noteY + noteSize * 0.75}" rx="${noteSize * 0.12}" ry="${noteSize * 0.09}" />
    <rect x="${noteX + noteSize * 0.54}" y="${noteY}" width="${noteSize * 0.06}" height="${noteSize * 0.75}" rx="${noteSize * 0.03}"/>
    
    <!-- Beam connecting notes -->
    <path d="M ${noteX + noteSize * 0.3} ${noteY + noteSize * 0.15} L ${noteX + noteSize * 0.6} ${noteY} L ${noteX + noteSize * 0.6} ${noteY + noteSize * 0.1} L ${noteX + noteSize * 0.3} ${noteY + noteSize * 0.25} Z" />
  </g>
  
  <!-- DJ Rishi Text for larger icons -->
  ${size >= 192 ? `<text x="${size / 2}" y="${size - padding}" font-family="Arial, sans-serif" font-size="${size * 0.08}" font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">DJ RISHI</text>` : ''}
</svg>`;
}

// Icon sizes needed
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '../public/icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('🎵 Creating Music-Themed PWA Icons...\n');

// Create SVG icons
sizes.forEach(size => {
  const svgContent = createMusicIcon(size);
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✓ Created icon-${size}x${size}.svg`);
});

console.log('\n✅ All SVG icons created successfully!');
console.log('\n📝 Note: These are SVG files. For PNG conversion:');
console.log('   1. Open public/icons/convert-to-png.html in your browser');
console.log('   2. Or use an online tool like https://cloudconvert.com/svg-to-png');
console.log('   3. Or keep SVG (many PWAs support SVG icons now)');
console.log('\n🎨 Icons feature a music note design with your brand color (#E63946)');

