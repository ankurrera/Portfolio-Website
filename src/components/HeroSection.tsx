import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

const HeroSection = () => {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="container mx-auto px-6 z-10">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-heading font-bold gradient-text leading-tight"
              animate={{ 
                textShadow: [
                  '0 0 10px hsl(195 100% 50% / 0.3)',
                  '0 0 20px hsl(195 100% 50% / 0.5)',
                  '0 0 10px hsl(195 100% 50% / 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              Alex Chen
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-secondary font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Full Stack Developer
            </motion.p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Building the future with{' '}
              <span className="text-primary">cutting-edge technology</span>,{' '}
              <span className="text-secondary">innovative design</span>, and{' '}
              <span className="text-accent">seamless experiences</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button 
              onClick={scrollToProjects}
              className="glow-cyan text-lg px-8 py-4 rounded-full"
              size="lg"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              className="glow-purple text-lg px-8 py-4 rounded-full"
              size="lg"
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex items-center justify-center gap-6 pt-8"
          >
            {[
              { Icon: Github, href: '#', label: 'GitHub' },
              { Icon: Linkedin, href: '#', label: 'LinkedIn' },
              { Icon: Twitter, href: '#', label: 'Twitter' }
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="p-3 rounded-full glass glow-cyan hover:scale-110 transition-all duration-300"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button 
          onClick={scrollToProjects}
          className="p-3 rounded-full glass glow-cyan hover:scale-110 transition-all duration-300"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 border-2 border-primary/30 rotate-45 animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-secondary/30 animate-rotate-slow" />
      <div className="absolute top-1/3 right-10 w-2 h-2 bg-accent rounded-full animate-ping" />
      <div className="absolute bottom-1/3 left-10 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default HeroSection;