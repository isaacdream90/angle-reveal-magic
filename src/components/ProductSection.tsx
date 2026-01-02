import { motion } from 'framer-motion';

interface ProductSectionProps {
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  align?: 'left' | 'right' | 'center';
  index: number;
}

const ProductSection = ({ 
  title, 
  subtitle, 
  description, 
  features, 
  align = 'left',
  index 
}: ProductSectionProps) => {
  const alignmentClasses = {
    left: 'items-start text-left md:pr-[50%]',
    right: 'items-end text-right md:pl-[50%]',
    center: 'items-center text-center',
  };

  return (
    <section className="min-h-screen flex items-center relative z-10">
      <div className={`container mx-auto px-6 flex flex-col ${alignmentClasses[align]}`}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-xl"
        >
          <motion.span 
            className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block"
            initial={{ opacity: 0, x: align === 'right' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">{title}</span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
          
          {features && (
            <motion.ul 
              className="space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {features.map((feature, i) => (
                <motion.li 
                  key={i}
                  className="flex items-center gap-3 text-foreground/80"
                  initial={{ opacity: 0, x: align === 'right' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
