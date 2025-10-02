'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ParallaxReveal from '@/components/ParallaxReveal';
import ScrollRevealSection from '@/components/ScrollRevealSection';
import Tours from '@/components/Tours';
import Music from '@/components/Music';
import Shop from '@/components/Shop';
import Footer from '@/components/Footer';

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


