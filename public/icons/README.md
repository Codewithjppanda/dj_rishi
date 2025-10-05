# PWA Icons for DJ Rishi Music App

This directory should contain PWA icons in the following sizes:

## Required Icons

- `icon-72x72.png` - 72x72 pixels
- `icon-96x96.png` - 96x96 pixels
- `icon-128x128.png` - 128x128 pixels
- `icon-144x144.png` - 144x144 pixels
- `icon-152x152.png` - 152x152 pixels
- `icon-192x192.png` - 192x192 pixels
- `icon-384x384.png` - 384x384 pixels
- `icon-512x512.png` - 512x512 pixels

## How to Generate Icons

### Option 1: Online Generators (Easiest)
1. Visit https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload your DJ Rishi logo (512x512 PNG recommended)
3. Download the generated icons
4. Place them in this directory

### Option 2: Using CLI Tool
```bash
# Install the tool
npm install -g pwa-asset-generator

# Generate icons from your logo
pwa-asset-generator public/images/DJ\ Rishi\ Logo\ Transparent.png public/icons --icon-only
```

### Option 3: Manual Creation
Use image editing software (Photoshop, GIMP, etc.) to resize your logo to each required size.

## Design Tips

- Use a transparent background or your brand color (#E63946)
- Add 10-15% padding around the logo
- Ensure visibility on both light and dark backgrounds
- Test at different sizes before finalizing

## Testing

After generating icons, run:
```bash
node scripts/generate-icons.js
```

This will verify all required icons are present.

