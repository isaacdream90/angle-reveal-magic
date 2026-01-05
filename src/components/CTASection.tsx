import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] p-12 md:p-20 text-center"
          style={{
            background: 'linear-gradient(135deg, hsl(220 25% 10%) 0%, hsl(220 30% 6%) 100%)',
          }}
        >
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-display tracking-wider uppercase mb-8"
            >
              Professional Rental Solutions
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
            >
              <span className="text-gradient">SX-809</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-xl max-w-xl mx-auto mb-10"
            >
              Perfect for silent discos, conferences, fitness sessions, and large-scale events. 
              Contact us for bulk rental pricing and custom configurations.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-10 py-5 bg-gradient-primary text-primary-foreground font-display font-semibold text-lg rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 glow-effect">
                Get a Quote
              </button>
              <button className="px-10 py-5 border border-border text-foreground font-display font-semibold text-lg rounded-full hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2">
                <span>View Specifications</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
