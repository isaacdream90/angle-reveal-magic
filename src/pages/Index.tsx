import { useState, useEffect } from 'react';
import Scene3D from '@/components/Scene3D';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import SpecsSection from '@/components/SpecsSection';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';

const productSections = [
  {
    title: 'Excellent Sound Quality',
    subtitle: '01 — Audio',
    description: 'Equipped with high-quality transducers and 40mm Mylar speakers, the SX-809 delivers rich, dynamic sound with deep and warm bass frequencies. The Super Power Bass (SPB) system enhances every beat.',
    features: [
      'Hi-Res Audio with 40mm Mylar speakers',
      'Super Power Bass (SPB) system',
      'Deep and warm bass frequencies',
      'Crystal-clear sound reproduction',
    ],
    align: 'left' as const,
  },
  {
    title: 'Eye-Catching RGB Lights',
    subtitle: '02 — Visual Experience',
    description: 'Two large RGB LED lights on the ear cups add a unique and eye-catching visual effect, making the SX-809 perfect for silent disco events and nighttime use.',
    features: [
      'Dual RGB LED light system',
      'Multiple color modes',
      'Perfect for silent disco',
      'Nighttime visibility',
    ],
    align: 'right' as const,
  },
  {
    title: 'Ultimate Comfort',
    subtitle: '03 — Design',
    description: 'The ergonomic design, combined with soft, comfortable ear cushions, ensures maximum comfort even during extended listening sessions. Foldable design makes it easy to transport.',
    features: [
      'Soft ear cushions',
      'Ergonomic headband',
      'Foldable design',
      'Lightweight construction',
    ],
    align: 'left' as const,
  },
  {
    title: 'Wireless Freedom',
    subtitle: '04 — Connectivity',
    description: 'UHF/RF wireless technology with FM modulation provides reliable, interference-free audio transmission. Integrated lithium battery offers up to 10 hours of playback.',
    features: [
      'UHF/RF wireless system',
      'FM modulation technology',
      'Up to 10 hours battery life',
      'Channel selector & volume control',
    ],
    align: 'right' as const,
  },
];

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative bg-background overflow-hidden">
      <Navbar />
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-hero pointer-events-none z-0" />
      
      {/* 3D Scene - Fixed background */}
      <Scene3D scrollProgress={scrollProgress} />
      
      {/* Content sections */}
      <div className="relative z-10">
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="features">
          {productSections.map((section, index) => (
            <ProductSection 
              key={section.title}
              {...section}
              index={index}
            />
          ))}
        </section>
        
        <section id="specs">
          <SpecsSection />
        </section>
        
        <section id="cta">
          <CTASection />
        </section>
        
        {/* Footer */}
        <footer className="relative z-10 py-12 border-t border-primary/20">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Silent SX-809. Patent No. 101677. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Index;