import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useRef } from 'react';

const ModernHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToProjects = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ankurbag', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/ankur-bag', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@ankurbag.dev', label: 'Email' }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full floating-element"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg floating-element"
          animate={{ 
            rotate: -360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-accent/30 rotate-45 floating-element"
          animate={{ 
            rotate: [45, 225, 45],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-secondary/5 to-muted/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 z-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm font-mono tracking-widest text-muted-foreground uppercase"
          >
            Full Stack Developer & Digital Innovator
          </motion.div>

          {/* Main Heading with Gradient Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none">
              <span className="gradient-text-vibrant">Creative</span>
              <br />
              <span className="text-foreground">Solutions</span>
            </h1>
            
            <motion.h2 
              className="text-2xl md:text-4xl font-light text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Building the future with{' '}
              <span className="gradient-text font-medium">cutting-edge technology</span>
              {' '}and innovative design
            </motion.h2>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center gap-12 py-8"
          >
            {[
              { number: '50+', label: 'Projects' },
              { number: '15+', label: 'Clients' },
              { number: '5+', label: 'Years' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button 
              onClick={scrollToProjects}
              className="modern-button bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-6 rounded-full font-medium"
              size="lg"
            >
              View My Work
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline"
              className="modern-button border-2 border-foreground/20 hover:border-foreground/40 text-lg px-8 py-6 rounded-full font-medium"
              size="lg"
            >
              Download CV
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex items-center justify-center gap-6 pt-8"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.button 
          onClick={scrollToProjects}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 border border-primary/20 rotate-45 animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-16 h-16 border border-accent/20 rounded-full animate-pulse-glow" />
    </section>
  );
};

export default ModernHero;