import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, X, Minus } from 'lucide-react';

const MinimalHero = () => {
  const services = [
    "Branding and Identity",
    "UI/UX and Product Design", 
    "Social Media Marketing",
    "SEO Optimization"
  ];

  return (
    <section className="split-screen relative overflow-hidden">
      {/* Contact Button - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 right-8 z-20"
      >
        <Button variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10">
          <div className="w-8 h-8 bg-white rounded-full mr-2"></div>
          Contact Now
        </Button>
      </motion.div>

      {/* Buy Astra Button - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <Button variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10">
          BUY "ASTRA"
        </Button>
      </motion.div>

      {/* Left Side - Light with Services Menu */}
      <div className="split-light flex flex-col justify-center items-start p-16 relative">
        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-12 left-12 w-4 h-4"
        >
          <Plus className="w-4 h-4 text-foreground/30" />
        </motion.div>
        
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/3 right-12 w-8 h-8 bg-foreground rounded-full"
        ></motion.div>

        <motion.div
          className="w-3 h-3 bg-foreground rounded-full absolute bottom-1/3 left-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        ></motion.div>

        {/* Services Menu */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex items-center justify-between group cursor-pointer hover:pl-4 transition-all duration-300"
            >
              <span className="text-lg font-light text-foreground/80 group-hover:text-foreground">
                {service}
              </span>
              <Minus className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Center Large Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-[12rem] font-bold text-foreground/10 leading-none tracking-tighter">
            Astra
            <span className="text-xs align-top ml-2">®</span>
          </h1>
          <div className="mt-4 space-y-1">
            <div className="text-sm text-foreground/60">Full-service</div>
            <div className="text-sm text-foreground/60">Creative Agency</div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Dark Space Theme */}
      <div className="split-dark star-field flex flex-col justify-center items-end p-16 relative">
        {/* Enhanced Star Field with More Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-16 right-16 w-6 h-6"
        >
          <Plus className="w-6 h-6 text-white/40" />
        </motion.div>

        <motion.div
          className="absolute top-1/4 left-16 w-2 h-2 bg-white/60 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        ></motion.div>

        <motion.div
          className="absolute bottom-1/4 right-20 w-4 h-4 border border-white/40 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-right space-y-8 max-w-md"
        >
          <div className="space-y-4">
            <h2 className="text-6xl font-light text-primary-foreground leading-tight">
              Space of Creative
              <br />
              Solutions
            </h2>
          </div>
        </motion.div>

        {/* Additional Decorative Elements */}
        <motion.div
          className="absolute bottom-12 left-12 w-3 h-3 bg-white/50 rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        ></motion.div>
      </div>

      {/* Made in Framer Badge - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-4 right-4 z-20"
      >
        <div className="glass-card px-3 py-1 text-xs text-white/60">
          Made in Framer
        </div>
      </motion.div>
    </section>
  );
};

export default MinimalHero;