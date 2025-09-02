import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, Float, OrbitControls } from '@react-three/drei';

// Space Objects Component
const SpaceObjects = () => {
  return (
    <>
      {/* Main Large Sphere */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
        </Sphere>
      </Float>

      {/* Smaller Floating Sphere */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[0.3, 16, 16]} position={[3, -1, -1]}>
          <meshStandardMaterial color="#333333" roughness={0.2} metalness={0.9} />
        </Sphere>
      </Float>

      {/* Tiny Accent Spheres */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere args={[0.1, 8, 8]} position={[-2, 1, 1]}>
          <meshStandardMaterial color="#666666" />
        </Sphere>
      </Float>

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4169E1" />
    </>
  );
};

const AstraHero = () => {
  const [displayText, setDisplayText] = useState([]);
  const fullText = 'Astra';
  const [showCursor, setShowCursor] = useState(true);
  
  const scrollToWork = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(prev => [...prev, fullText[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(timer);
        // Cursor blink after typing complete
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 150);

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
              transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
              className="flex items-center justify-between py-4 border-b border-border/30 group cursor-pointer"
            >
              <motion.span 
                className="text-lg font-medium text-foreground group-hover:text-primary transition-colors overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
              >
                {service.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.8 + index * 0.15 + charIndex * 0.02,
                      ease: "easeOut"
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
              <motion.div
                className="text-foreground/60 group-hover:text-foreground transition-colors"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.15 }}
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

        {/* 3D Space Objects */}
        <div className="absolute inset-0 opacity-70">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <SpaceObjects />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
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
              transition={{ duration: 0.6, delay: 1.8 }}
              className="text-right mb-8"
            >
              <div className="text-sm text-white/60 mb-2">Reach out to start</div>
              <div className="text-sm text-white/60">your project</div>
            </motion.div>

            <motion.div 
              className="text-hero font-heading text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              {'Space of Creative'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 2.1 + index * 0.03,
                    ease: "easeOut"
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <br />
              {'Solutions'.split('').map((char, index) => (
                <motion.span
                  key={index + 100}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 2.6 + index * 0.03,
                    ease: "easeOut"
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
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
          className="text-astra-title font-heading text-foreground/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {displayText.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.8 + index * 0.1,
                ease: [0.6, 0.01, -0.05, 0.95]
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {showCursor && (
            <motion.span 
              className="inline-block border-r-4 border-foreground/90 ml-2"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </motion.h1>
      </div>

        {/* Subtitle */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center pointer-events-none z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="space-y-2"
        >
          <motion.div className="text-lg font-medium text-foreground/60">
            {'Full-service'.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 3.6 + index * 0.02,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                {char === '-' ? '-' : char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
          <motion.div className="text-lg font-medium text-foreground/60">
            {'Creative Agency'.split('').map((char, index) => (
              <motion.span
                key={index + 100}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 3.9 + index * 0.02,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AstraHero;