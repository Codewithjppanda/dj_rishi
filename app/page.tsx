'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Lazy load components that are below the fold
const ParallaxReveal = dynamic(() => import('@/components/ParallaxReveal'), {
  loading: () => <div className="h-96" />,
});

const ScrollRevealSection = dynamic(() => import('@/components/ScrollRevealSection'), {
  loading: () => <div className="h-96" />,
});

const Tours = dynamic(() => import('@/components/Tours'), {
  loading: () => <div className="h-96" />,
});

const Music = dynamic(() => import('@/components/Music'), {
  loading: () => <div className="h-96" />,
});

const Shop = dynamic(() => import('@/components/Shop'), {
  loading: () => <div className="h-96" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-96" />,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ParallaxReveal />
      <ScrollRevealSection
        imageSrc="/images/DJ Rishi 3D.png"
        imageAlt="DJ Rishi 3D"
        title="Experience the Sound"
        description="Immerse yourself in a world where beats meet innovation. DJ Rishi brings you unforgettable performances that blend cutting-edge technology with raw musical talent."
      />
      <Tours />
      <ScrollRevealSection
        imageSrc="/images/gallery1.png"
        imageAlt="DJ Performance"
        title="Electrifying Performances"
        description="From intimate club nights to massive festival stages, every performance is crafted to create moments that last a lifetime. Join the journey."
        reverse
      />
      <Music />
      <Shop />
      <Footer />
    </main>
  );
}


