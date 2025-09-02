import { motion } from 'framer-motion';

const AstraFounder = () => {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Founder Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center">
              <div className="text-6xl font-heading font-bold text-muted-foreground/30">
                MR
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-foreground text-background px-6 py-3 rounded-full"
            >
              <div className="text-sm font-medium">Founder</div>
            </motion.div>
          </motion.div>

          {/* Founder Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-4xl font-heading font-bold text-foreground">
                Michael Rosenberg
              </h3>
              <div className="text-lg text-muted-foreground">
                Founder
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              We're a full-service agency driven by strategy, design, and technology. 
              From brand foundations to fully developed digital products, we create work 
              that doesn't just look good: it performs, connects, and endures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-border"></div>
                <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  Creative Agency
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AstraFounder;