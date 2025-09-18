import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const MinimalNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Navigation - Minimal for Astra Style */}
      <motion.nav 
        className="fixed top-0 w-full z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-content mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo/Name - Minimal */}
            <motion.div 
              className="text-lg font-heading font-medium text-foreground"
              whileHover={{ scale: 1.02 }}
            >
              {/* Could be empty or minimal branding */}
            </motion.div>

            {/* Navigation dots indicator (optional) */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="w-2 h-2 rounded-full bg-foreground/20 hover:bg-foreground/60 transition-colors"
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-foreground transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-0.5' : ''
              }`} />
              <span className={`w-5 h-0.5 bg-foreground transition-all duration-300 mt-1 ${
                isOpen ? '-rotate-45 -translate-y-0.5' : ''
              }`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        className={`fixed inset-0 bg-background/95 backdrop-blur-lg z-40 md:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-2xl font-light text-foreground hover:text-muted-foreground transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 20
              }}
              transition={{ 
                duration: 0.3,
                delay: isOpen ? index * 0.1 : 0
              }}
            >
              {item.name}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default MinimalNavigation;