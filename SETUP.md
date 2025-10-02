# Quick Setup Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React & React DOM
- Framer Motion (animations)
- Lenis (smooth scrolling)
- Tailwind CSS (styling)
- TypeScript
- React Icons

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

---

## ✨ What's Included

### Hero Section
- **Glitch Logo.mp4** plays as an animated background
- Smooth fade-in animations with Framer Motion
- CTA buttons with hover effects
- Animated scroll indicator

### Modern Features
- ✅ Smooth scrolling powered by Lenis
- ✅ Framer Motion animations on all sections
- ✅ Mobile-responsive navigation with hamburger menu
- ✅ Dark theme inspired by Martin Garrix's website
- ✅ Tours section with filterable events
- ✅ Music releases with streaming platform links
- ✅ Shop section for merchandise
- ✅ Full social media integration

---

## 🎨 Customization Tips

### Update Your Content

1. **Hero Section** (`components/Hero.tsx`):
   - Change headline text
   - Update CTA button links

2. **Tours** (`components/Tours.tsx`):
   - Add/edit events in the `events` array
   - Modify regions and venues

3. **Music** (`components/Music.tsx`):
   - Update releases in the `releases` array
   - Change album covers (use your images)

4. **Shop** (`components/Shop.tsx`):
   - Add products to the `products` array
   - Update prices and categories

### Change Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#E63946',  // Your main brand color
    },
  },
}
```

### Add More Images

1. Place images in `public/images/`
2. Reference them in components: `/images/your-image.png`

---

## 📱 Mobile Responsive

The website automatically adapts to:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

---

## 🔧 Troubleshooting

### Port Already in Use?

```bash
# Kill the process using port 3000 (Windows)
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Video Not Playing?

- Make sure `Glitch Logo.mp4` is in `public/images/`
- Check browser console for errors
- Try a different browser (Chrome recommended)

### Animations Not Smooth?

- Disable browser extensions
- Check if hardware acceleration is enabled
- Clear browser cache

---

## 🚀 Deploy to Production

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically!

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

---

## 📦 Project Structure

```
dj_website/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation
│   ├── Hero.tsx           # Video hero section
│   ├── Tours.tsx          # Events section
│   ├── Music.tsx          # Releases section
│   ├── Shop.tsx           # Merchandise
│   ├── Footer.tsx         # Footer
│   └── SmoothScrolling.tsx # Lenis wrapper
├── public/
│   └── images/            # Static assets
│       └── Glitch Logo.mp4
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind config
└── next.config.js         # Next.js config
```

---

## 🎯 Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Framer Motion**: Production-ready animation library
- **Lenis**: Smooth scrolling library
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library

---

## 💡 Tips for Success

1. **Keep it Fast**: Optimize images with Next.js Image component
2. **SEO Friendly**: Update metadata in `app/layout.tsx`
3. **Analytics**: Add Google Analytics or Vercel Analytics
4. **Forms**: Use Formspree or EmailJS for contact forms
5. **Performance**: Run Lighthouse audits regularly

---

## 🆘 Need Help?

- Check the [Next.js docs](https://nextjs.org/docs)
- Read [Framer Motion docs](https://www.framer.com/motion/)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)

---

**Built with ❤️ for DJ Rishi**


