# DJ Rishi - Official Website

A modern, animated DJ portfolio website built with Next.js, TypeScript, Framer Motion, and Tailwind CSS. Inspired by Martin Garrix's official website design.

## Features

- 🎬 **Video Hero Section** - Stunning Glitch Logo video background
- ✨ **Framer Motion Animations** - Smooth, professional animations throughout
- 🌀 **Parallax Scroll Effects** - DJ Rishi Logo reveal with scroll animations
- 📄 **Multi-Page Architecture** - Dedicated pages for About, Music, Tours, Gallery, Contact
- 📱 **Fully Responsive** - Optimized for all devices
- 🎨 **Modern Dark Theme** - Sleek design with custom color scheme
- 🖱️ **Smooth Scrolling** - Powered by Lenis for buttery smooth navigation
- 🖼️ **Interactive Gallery** - Lightbox image viewer with category filters
- 🎵 **Complete Artist Portfolio** - Tours, Music releases, Shop, and more
- 🔥 **Performance Optimized** - Built with Next.js 14 and App Router

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Icons**: React Icons
- **Font**: Google Fonts (Poppins)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
dj_website/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Homepage with parallax effects
│   ├── about/page.tsx          # About page
│   ├── music/page.tsx          # Music releases page
│   ├── tours/page.tsx          # Tour dates page
│   ├── gallery/page.tsx        # Photo gallery page
│   ├── contact/page.tsx        # Contact form page
│   └── globals.css             # Global styles
├── components/
│   ├── Header.tsx              # Navigation header with multi-page links
│   ├── Hero.tsx                # Video hero section
│   ├── ParallaxReveal.tsx      # DJ Rishi Logo parallax effect
│   ├── ScrollRevealSection.tsx # Scroll-triggered image reveals
│   ├── Tours.tsx               # Tour dates component
│   ├── Music.tsx               # Music releases component
│   ├── Shop.tsx                # Merchandise component
│   ├── Footer.tsx              # Footer with social links
│   └── SmoothScrolling.tsx     # Lenis smooth scroll wrapper
├── public/
│   └── images/                 # Static assets
│       ├── Glitch Logo.mp4     # Hero video
│       ├── DJ Rishi Logo Transparent.png
│       ├── DJ Rishi 3D.png
│       └── gallery*.png
└── package.json
```

## Customization

### Colors

Edit the theme colors in `tailwind.config.js`:

```js
colors: {
  primary: '#E63946',  // Your brand color
  dark: {
    900: '#0a0a23',
    800: '#0f0f2b',
    700: '#171742',
  },
}
```

### Content

- **Hero Section**: Edit `components/Hero.tsx`
- **Tours/Events**: Update the `events` array in `components/Tours.tsx`
- **Music Releases**: Update the `releases` array in `components/Music.tsx`
- **Shop Products**: Update the `products` array in `components/Shop.tsx`

## Build for Production

```bash
npm run build
npm run start
```

## Deployment

Deploy easily on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

© 2025 DJ Rishi. All Rights Reserved.


