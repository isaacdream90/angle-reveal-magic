import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative z-10">
      <motion.div 
        className="text-center px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.span 
          className="text-primary font-display text-sm tracking-[0.4em] uppercase mb-6 block glow-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Introducing
        </motion.span>
        
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-gradient glow-text">NOVA</span>
          <span className="text-foreground"> PRO</span>
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Experience sound like never before. Immersive audio meets 
          revolutionary design.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <button className="px-8 py-4 bg-gradient-primary text-primary-foreground font-display font-semibold rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 glow-effect">
            Pre-Order Now
          </button>
          <button className="px-8 py-4 neon-border text-foreground font-display font-semibold rounded-full hover:bg-primary/10 transition-all duration-300">
            Learn More
          </button>
        </motion.div>

        {/* Category tags */}
        <motion.div 
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {['Party', 'Fa Ins', 'Cinema', 'Corporate'].map((tag) => (
            <span 
              key={tag}
              className="px-6 py-2 rounded-full border border-primary/30 text-foreground/80 text-sm font-medium hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-primary/80"
        >
          <span className="text-xs tracking-widest uppercase">↓ Scroll to Explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
