import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';

const MinimalHero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const textRevealVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const name = "Ankur";
  const tagline = "Full Stack Developer";

  return (
    <section className="split-screen" ref={ref}>
      {/* Left Side - Light */}
      <div className="split-light flex flex-col justify-center items-start p-16">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="space-y-4">
            <motion.div 
              className="text-xs font-mono tracking-widest text-muted-foreground uppercase overflow-hidden"
              variants={textRevealVariants}
            >
              <motion.div className="text-reveal">
                <motion.div className="text-reveal-inner">
                  {tagline.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={charVariants}
                      transition={{ delay: index * 0.05 }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-display font-heading font-light text-foreground overflow-hidden"
              variants={textRevealVariants}
            >
              <motion.div className="text-reveal">
                <motion.div className="text-reveal-inner gradient-text">
                  {name.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={charVariants}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="inline-block"
                      whileHover={{ 
                        scale: 1.1,
                        color: "#667eea",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.h1>
          </div>
          
          <motion.div 
            className="space-y-6"
            variants={textRevealVariants}
          >
            <motion.p 
              className="text-lg font-light text-muted-foreground max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Crafting digital experiences with precision, creativity, and a passion for clean code.
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Button 
                onClick={scrollToWork}
                variant="minimal" 
                className="group relative overflow-hidden"
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  View Work
                </motion.span>
                <motion.div
                  className="ml-2 relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ x: 4, scale: 1.2 }}
                >
                  →
                </motion.div>
                
                {/* Button hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Dark */}
      <div className="split-dark flex flex-col justify-center items-end p-16">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-right space-y-8 max-w-md"
        >
          <div className="space-y-4">
            <motion.h2 
              className="text-hero font-heading font-light text-primary-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="gradient-cyber"
              >
                Creative
              </motion.div>
              <br />
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="gradient-cyber"
              >
                Solutions
              </motion.div>
            </motion.h2>
          </div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { number: "5+", label: "Years" },
                { number: "50+", label: "Projects" },
                { number: "15+", label: "Clients" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 1 + index * 0.1, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="cursor-pointer"
                >
                  <motion.div 
                    className="text-2xl font-light text-primary-foreground"
                    animate={{ 
                      textShadow: [
                        "0 0 0px rgba(0, 245, 255, 0)",
                        "0 0 10px rgba(0, 245, 255, 0.5)",
                        "0 0 0px rgba(0, 245, 255, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs font-mono text-primary-foreground/60 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.p 
              className="text-sm font-light text-primary-foreground/70 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 text-muted-foreground hover:text-foreground transition-colors group"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Floating background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
};

export default MinimalHero;