import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const MinimalHero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Ankur';
  
  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="split-screen relative">
      {/* Left Side - Light */}
      <div className="split-light flex flex-col justify-center items-start p-8 md:p-16">
        <div className="space-y-8 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div 
              className="text-xs font-mono tracking-widest text-muted-foreground uppercase fade-up delay-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Full Stack Developer
            </motion.div>
            
            <div className="space-y-2">
              <h1 className="text-display font-heading text-foreground">
                {displayText}
                <span className="border-r-2 border-foreground animate-pulse ml-1"></span>
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-lg font-medium text-muted-foreground"
              >
                Creative Developer
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-lg font-light text-muted-foreground max-w-md leading-relaxed">
              Crafting digital experiences with precision, creativity, and a passion for clean code.
            </p>
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={scrollToWork}
                variant="minimal" 
                className="group"
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Dark with 3D Model */}
      <div className="split-dark star-field flex flex-col justify-center items-center p-8 md:p-16 relative">
        {/* 3D Spline Model */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-lg max-h-lg">
            <iframe 
              src='https://my.spline.design/neurons-zewxjmBKNIJOWtZUfvuaz5c6/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="rounded-lg"
              style={{ minHeight: '400px' }}
            />
          </div>
        </div>

        {/* Overlay Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 text-center space-y-8 max-w-md"
        >
          <div className="space-y-4">
            <motion.h2 
              className="text-hero font-heading text-primary-foreground fade-up delay-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Space of Creative
              <br />
              Solutions
            </motion.h2>
          </div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="grid grid-cols-3 gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="text-2xl font-bold text-primary-foreground">5+</div>
                <div className="text-xs font-mono text-primary-foreground/60 uppercase tracking-widest">
                  Years
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="text-2xl font-bold text-primary-foreground">50+</div>
                <div className="text-xs font-mono text-primary-foreground/60 uppercase tracking-widest">
                  Projects
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <div className="text-2xl font-bold text-primary-foreground">15+</div>
                <div className="text-xs font-mono text-primary-foreground/60 uppercase tracking-widest">
                  Clients
                </div>
              </motion.div>
            </div>
            
            <motion.p 
              className="text-sm font-light text-primary-foreground/70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              Building tomorrow's technology with today's vision. 
              Specializing in modern web applications, AI integration, 
              and seamless user experiences.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToWork}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 text-muted-foreground hover:text-foreground transition-colors z-20"
        animate={{ 
          y: [0, 8, 0],
          opacity: 1 
        }}
        initial={{ opacity: 0 }}
        transition={{ 
          y: { duration: 2, repeat: Infinity },
          opacity: { duration: 0.6, delay: 2.0 }
        }}
      >
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
};

export default MinimalHero;