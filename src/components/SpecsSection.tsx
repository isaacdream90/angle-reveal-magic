import { motion } from 'framer-motion';

const specs = [
  { label: 'Speaker Size', value: '40mm', unit: 'Mylar' },
  { label: 'Frequency', value: '20Hz-20kHz', unit: 'Range' },
  { label: 'Battery Life', value: '10', unit: 'Hours' },
  { label: 'S/N Ratio', value: '>75', unit: 'dB' },
];

const SpecsSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Technical Data
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            <span className="text-gradient">Precision</span> Engineered
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group hover:border-primary/50 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <span className="text-muted-foreground text-sm tracking-wider uppercase block mb-2">
                  {spec.label}
                </span>
                <div className="text-3xl md:text-5xl font-display font-bold text-gradient mb-1">
                  {spec.value}
                </div>
                <span className="text-foreground/60 text-sm">
                  {spec.unit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-12 rounded-3xl bg-card/30 backdrop-blur-sm border border-border/30"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Crafted for <span className="text-gradient">Perfection</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The SX-809 headphones are patented (Patent No. 101677, filed in Italy 
                in June 2014), guaranteeing originality and quality. Every component 
                is designed for an immersive and detailed listening experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['UHF/RF System', 'FM Modulation', 'RGB LED Lights', 'SPB Speakers', 'THD <1%', 'Channel Separation >30dB'].map((feature, i) => (
                <span 
                  key={feature}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecsSection;