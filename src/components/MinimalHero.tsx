import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import TextReveal from './TextReveal';

const MinimalHero = () => {
  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="split-screen">
      {/* Left Side - Light */}
      <div className="split-light flex flex-col justify-center items-start p-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div 
              className="text-xs font-mono tracking-widest text-muted-foreground uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Full Stack Developer
            </motion.div>
            <motion.h1 
              className="text-display font-heading font-light gradient-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Ankur
            </motion.h1>
          </div>
          
          <div className="space-y-6">
            <motion.p 
              className="text-lg font-light text-muted-foreground max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <TextReveal delay={0.8}>
                Crafting digital experiences with precision, creativity, and a passion for clean code.
              </TextReveal>
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Button 
                onClick={scrollToWork}
                variant="minimal" 
                className="group interactive-hover"
              >
                View Work
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Dark with subtle space theme */}
      <div className="split-dark star-field flex flex-col justify-center items-end p-16">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-right space-y-8 max-w-md"
        >
          <div className="space-y-4">
            <motion.h2 
              className="text-hero font-heading font-light glow-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Creative
              <br />
              Solutions
            </motion.h2>
          </div>
          
          <div className="space-y-6">
            <motion.div 
              className="grid grid-cols-3 gap-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="interactive-hover"
              >
                <div className="text-2xl font-light text-primary-foreground">5+</div>
                <div className="text-xs font-mono text-primary-foreground/60 uppercase tracking-widest">
                  Years
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="interactive-hover"
              >
                <div className="text-2xl font-light text-primary-foreground">50+</div>
                <div className="text-xs font-mono text-primary-foreground/60 uppercase tracking-widest">
                  Projects
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="interactive-hover"
              >
                <div className="text-2xl font-light text-primary-foreground">15+</div>
                <div className="text-xs font-mono text-primary-foreground/60 uppercase tracking-widest">
                  Clients
                </div>
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-sm font-light text-primary-foreground/70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <TextReveal delay={1.2}>
                Building tomorrow's technology with today's vision. Specializing in modern web applications, AI integration, and seamless user experiences.
              </TextReveal>
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToWork}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 text-muted-foreground hover:text-foreground transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
};

export default MinimalHero;