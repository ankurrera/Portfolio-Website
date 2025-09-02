import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';

const AstraHero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Astra';
  
  const scrollToWork = () => {
    const element = document.querySelector('#services');
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
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const services = [
    'Branding and Identity',
    'UI/UX and Product Design', 
    'Social Media Marketing',
    'SEO Optimization'
  ];

  return (
    <section className="split-screen relative overflow-hidden">
      {/* Left Side - Light with Services */}
      <div className="split-light flex flex-col justify-center items-start p-8 md:p-16 relative">
        {/* Navigation Icon */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute top-8 left-8 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold"
        >
          W.
        </motion.div>

        {/* Services List */}
        <div className="space-y-8 w-full max-w-md">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-between py-4 border-b border-border/30 group cursor-pointer"
            >
              <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                {service}
              </span>
              <motion.div
                className="text-foreground/60 group-hover:text-foreground transition-colors"
                whileHover={{ x: 4 }}
              >
                <Minus className="w-6 h-6" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-8 transform -rotate-90 origin-bottom-left"
        >
          <div className="text-sm font-mono text-muted-foreground tracking-widest">
            Nominate
          </div>
        </motion.div>
      </div>

      {/* Right Side - Dark Space Theme */}
      <div className="split-dark star-field nebula-bg flex flex-col justify-center items-center p-8 md:p-16 relative overflow-hidden">
        {/* Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-8 right-8"
        >
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            Contact Now
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>

        {/* 3D Spline Model */}
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <div className="w-full h-full max-w-2xl max-h-2xl">
            <iframe 
              src='https://my.spline.design/neurons-zewxjmBKNIJOWtZUfvuaz5c6/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="rounded-lg"
              style={{ minHeight: '600px' }}
            />
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 text-center space-y-8 max-w-lg"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-right mb-8"
            >
              <div className="text-sm text-white/60 mb-2">Reach out to start</div>
              <div className="text-sm text-white/60">your project</div>
            </motion.div>

            <motion.h2 
              className="text-hero font-heading text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Space of Creative
              <br />
              Solutions
            </motion.h2>
          </div>
        </motion.div>

        {/* Bottom Right Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 right-8"
        >
          <div className="text-right">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10 mb-2"
            >
              BUY "ASTRA"
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
            <div className="text-xs text-white/40">Made in Framer</div>
          </div>
        </motion.div>
      </div>

      {/* Large Astra Title Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <motion.h1 
          className="text-astra-title font-heading text-foreground/80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {displayText}
          <span className="border-r-4 border-foreground/80 animate-pulse ml-2"></span>
        </motion.h1>
      </div>

      {/* Subtitle */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center pointer-events-none z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="space-y-2"
        >
          <div className="text-lg font-medium text-foreground/60">Full-service</div>
          <div className="text-lg font-medium text-foreground/60">Creative Agency</div>
        </motion.div>
      </div>
    </section>
  );
};

export default AstraHero;