import { useState, useEffect } from 'react';
import Scene3D from '@/components/Scene3D';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import SpecsSection from '@/components/SpecsSection';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';

const productSections = [
  {
    title: 'RF Silent System',
    subtitle: '01 — Technology',
    description: 'Professional RF technology ensures reliable audio transmission with minimal latency and strong interference resistance. Available in 3, 10, or 45 channel configurations.',
    features: [
      'Multi-channel capability (3/10/45)',
      'Dual PLL frequency stability',
      'Minimal signal dropouts',
      'Indoor & outdoor reliable',
    ],
    align: 'left' as const,
  },
  {
    title: 'Crystal Clear Audio',
    subtitle: '02 — Sound Quality',
    description: '40mm Mylar drivers deliver balanced, high-quality audio across music, speech, and guided instruction. SNR >75dB with less than 1% distortion.',
    features: [
      '30Hz - 20kHz frequency response',
      'Signal-to-Noise Ratio >75dB',
      'Punchy bass for silent discos',
      'Clear vocals for meetings',
    ],
    align: 'right' as const,
  },
  {
    title: 'RGB LED Identification',
    subtitle: '03 — Visual System',
    description: 'Bright RGB LEDs make channel identification effortless in low-light environments. Perfect for silent discos, festivals, and night events.',
    features: [
      'Keypad-controlled LED system',
      'Instant channel identification',
      'Easy switching for users',
      'Reduces staff assistance needs',
    ],
    align: 'left' as const,
  },
  {
    title: 'All-Day Comfort',
    subtitle: '04 — Ergonomics',
    description: 'Lightweight over-ear design with comfortable cushions for extended wear during long events, yoga sessions, or multi-hour conferences.',
    features: [
      'Passive noise isolation',
      'Rotary volume control',
      'Lightweight construction',
      'Perfect for long sessions',
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
      {/* Navbar */}
      <Navbar />
      
      {/* Enhanced multi-layer background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 30%, hsl(270 80% 55% / 0.2) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 30% 70%, hsl(310 100% 60% / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 50% 50%, hsl(220 100% 60% / 0.08) 0%, transparent 70%),
            linear-gradient(180deg, hsl(230 35% 3%) 0%, hsl(240 40% 6%) 50%, hsl(250 45% 4%) 100%)
          `,
        }}
      />
      
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full animate-pulse-glow"
          style={{
            top: '10%',
            right: '10%',
            background: 'radial-gradient(circle, hsl(185 100% 50% / 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full animate-pulse-glow"
          style={{
            bottom: '20%',
            left: '5%',
            background: 'radial-gradient(circle, hsl(310 100% 60% / 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '1s',
          }}
        />
      </div>
      
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
        <footer className="relative z-10 py-12 border-t border-primary/20">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm">
              © 2026 SX-809 Silent Event Headphones. Professional Rental Solutions.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Index;
