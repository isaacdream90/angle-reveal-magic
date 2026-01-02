import { useState, useEffect } from 'react';
import Scene3D from '@/components/Scene3D';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import SpecsSection from '@/components/SpecsSection';
import CTASection from '@/components/CTASection';

const productSections = [
  {
    title: 'Immersive Sound',
    subtitle: '01 — Audio',
    description: 'Custom 50mm titanium-coated drivers deliver studio-quality audio with exceptional clarity across the entire frequency spectrum. Feel every beat, hear every detail.',
    features: [
      'Hi-Res Audio certified',
      'Custom-tuned acoustic chambers',
      'Dynamic bass enhancement',
      'Crystal-clear highs',
    ],
    align: 'left' as const,
  },
  {
    title: 'Silence On Demand',
    subtitle: '02 — Noise Cancellation',
    description: 'Industry-leading active noise cancellation with 8 precision microphones. Block out the world or let it in with transparency mode.',
    features: [
      'Adaptive ANC technology',
      'Transparency mode',
      '8 beam-forming microphones',
      'Wind noise reduction',
    ],
    align: 'right' as const,
  },
  {
    title: 'All-Day Comfort',
    subtitle: '03 — Design',
    description: 'Aerospace-grade aluminum frame with memory foam cushions. Designed for hours of comfortable listening without fatigue.',
    features: [
      'Memory foam ear cushions',
      'Adjustable headband',
      'Lightweight construction',
      'Breathable materials',
    ],
    align: 'left' as const,
  },
  {
    title: 'Endless Power',
    subtitle: '04 — Battery',
    description: 'Up to 60 hours of playback on a single charge. Quick charge gives you 5 hours of listening in just 10 minutes.',
    features: [
      '60-hour battery life',
      'USB-C fast charging',
      '10-min quick charge',
      'Battery optimization AI',
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
    <main className="relative bg-background">
      {/* 3D Scene - Fixed background */}
      <Scene3D scrollProgress={scrollProgress} />
      
      {/* Content sections */}
      <div className="relative z-10">
        <HeroSection />
        
        {productSections.map((section, index) => (
          <ProductSection 
            key={section.title}
            {...section}
            index={index}
          />
        ))}
        
        <SpecsSection />
        <CTASection />
        
        {/* Footer */}
        <footer className="relative z-10 py-12 border-t border-border/30">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 NOVA Audio. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Index;
