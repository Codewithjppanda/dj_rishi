# 🎵 DJ Rishi Website - Feature Guide

## 🌟 Multi-Page Structure

Your website now has **6 dedicated pages**:

### 1. **Homepage** (`/`)
- **Glitch Logo Video Hero** - Autoplay background video with smooth fade-in
- **Parallax Logo Reveal** - DJ Rishi Logo Transparent appears with scroll effect
- **DJ Rishi 3D Section** - Scroll-triggered reveal with description
- **Tours Preview** - Upcoming events with filters
- **Music Preview** - Latest releases
- **Shop Preview** - Featured merchandise

### 2. **About Page** (`/about`)
- Hero section with DJ Rishi 3D image
- Story and biography
- Scroll reveal sections showcasing studio and live performances
- Achievement statistics (500+ shows, 50+ countries, 100M+ streams)

### 3. **Music Page** (`/music`)
- Complete discography with album covers
- Filter by year (2025, 2024, 2023)
- Release details (genre, duration, type)
- Streaming platform links (Spotify, Apple Music, YouTube, SoundCloud)
- Hover effects to play tracks

### 4. **Tours Page** (`/tours`)
- Full event calendar
- Filter by region (North America, Asia, Europe, South America)
- Event cards with venue images
- Ticket purchase buttons
- Date, location, and venue information

### 5. **Gallery Page** (`/gallery`)
- Photo grid with category filters
- Categories: Festivals, Live, Studio, Promo, Branding
- Lightbox viewer for full-screen images
- Smooth hover animations
- Features both DJ Rishi logos

### 6. **Contact Page** (`/contact`)
- Contact form (Name, Email, Subject, Message)
- Contact information (Email, Phone, Location)
- DJ Rishi 3D image showcase
- Form validation and submission

---

## 🎨 Special Scroll Effects

### Parallax Logo Reveal
After scrolling past the hero video, you'll see:
- DJ Rishi Logo Transparent fades in
- Scales and moves with scroll position
- Creates a dramatic reveal effect
- Smooth gradient overlays

### Scroll Reveal Sections
Throughout the site, images slide in from sides:
- Left-to-right reveals
- Right-to-left reveals (reverse prop)
- Opacity and scale animations
- Triggered when scrolling into view

---

## 🎬 Animation Details

### Framer Motion Features Used:

1. **Scroll-Triggered Animations** (`whileInView`)
   - Elements animate when they enter viewport
   - Used on all major sections

2. **Parallax Effects** (`useScroll`, `useTransform`)
   - Logo reveal after hero
   - Background images move at different speeds

3. **Hover Interactions** (`whileHover`)
   - Button scale effects
   - Image zoom on gallery items
   - Card lift on event listings

4. **Page Transitions** (`AnimatePresence`)
   - Mobile menu slide-in
   - Lightbox fade-in/out

5. **Staggered Animations**
   - Navigation items fade in sequentially
   - Gallery grid items appear one by one

---

## 🖼️ Image Usage

### DJ Rishi Logo Transparent
- **Location**: Homepage parallax section
- **Effect**: Scroll-triggered reveal with opacity and scale
- **Purpose**: Brand showcase after hero

### DJ Rishi 3D
- **Location**: Homepage scroll section, About page hero, Contact page
- **Effect**: Slide-in from left/right with scale
- **Purpose**: Artist representation and branding

### Gallery Images
- **Location**: All sections throughout the site
- **Effect**: Hover zoom, lightbox viewer
- **Purpose**: Visual storytelling

---

## 📱 Navigation

The header now includes links to all pages:
- **Home** - Main landing page
- **About** - Artist biography
- **Tours** - Event calendar
- **Music** - Discography
- **Gallery** - Photo collection
- **Contact** - Get in touch

### Mobile Navigation
- Hamburger menu on small screens
- Full-screen slide-in menu
- Social media icons included
- Smooth close animation

---

## 🎯 Key Components

### `ParallaxReveal.tsx`
Creates the DJ Rishi Logo reveal effect after hero section:
```tsx
- Sticky positioning
- Scroll-based opacity/scale transforms
- Gradient overlays
- 150vh height for extended scroll area
```

### `ScrollRevealSection.tsx`
Reusable component for image/text reveals:
```tsx
- Configurable direction (reverse prop)
- Scroll-based animations
- Responsive layout
- Used multiple times throughout site
```

---

## 🚀 How Everything Works Together

1. **User lands on homepage**
   - Sees Glitch Logo video hero
   - Smooth fade-in animations

2. **Scrolls down**
   - DJ Rishi Logo Transparent reveals with parallax
   - Smooth scrolling powered by Lenis

3. **Continues scrolling**
   - DJ Rishi 3D section slides in from left
   - Tours section appears with stagger
   - Another gallery image slides from right
   - Music and Shop sections

4. **Navigates to other pages**
   - Smooth page transitions
   - Consistent header/footer
   - Each page has unique hero section

5. **Explores Gallery**
   - Filters by category
   - Clicks image for lightbox
   - Views full-screen with smooth animations

6. **Contacts**
   - Fills out form
   - Sees DJ Rishi 3D image
   - Gets confirmation on submit

---

## 💡 Customization Tips

### Add More Parallax Sections
Copy the `ParallaxReveal` component and change the image:
```tsx
<ParallaxReveal imageSrc="/images/your-image.png" />
```

### Add More Scroll Reveals
Use the `ScrollRevealSection` component anywhere:
```tsx
<ScrollRevealSection
  imageSrc="/images/your-image.png"
  imageAlt="Description"
  title="Your Title"
  description="Your description"
  reverse={true} // For right-to-left
/>
```

### Change Scroll Speed
Edit `components/SmoothScrolling.tsx`:
```tsx
duration: 1.2, // Increase for slower, decrease for faster
```

---

## 🎨 Design Philosophy

The website follows Martin Garrix's aesthetic:
- **Dark theme** - Professional, modern look
- **Bold typography** - Impactful headlines
- **Red accent** (#E63946) - Brand color for CTAs
- **Clean layouts** - Minimal, focused design
- **Smooth animations** - Premium feel
- **High-quality images** - Visual storytelling

---

**Enjoy your new multi-page DJ website with stunning scroll effects!** 🔥

