import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { useRef } from 'react';

// 3D Sphere Component
const FloatingSphere = () => {
  const meshRef = useRef<any>();

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
      <MeshDistortMaterial
        color="#000000"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.1}
      />
    </Sphere>
  );
};

// Services List Component
const ServicesList = () => {
  const services = [
    'Branding and Identity',
    'UI/UX and Product Design', 
    'Social Media Marketing',
    'SEO Optimization'
  ];

  return (
    <div className="space-y-2">
      {services.map((service, index) => (
        <motion.div
          key={service}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          className="service-item cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{service}</span>
            <span className="text-xs text-muted-foreground">—</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Animated Contact Button
const ContactButton = () => {
  return (
    <motion.div
      className="fixed top-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <Button 
        className="glow-button bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
        size="lg"
      >
        Contact Now
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

const AstraHero = () => {
  return (
    <div className="astra-split relative">
      <ContactButton />
      
      {/* Left Side - Light */}
      <div className="astra-light flex flex-col justify-center items-start p-16 relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8 max-w-lg"
        >
          {/* Services List */}
          <ServicesList />
          
          {/* Side Navigation Indicator */}
          <motion.div
            className="absolute left-8 bottom-8 writing-mode-vertical-rl text-xs font-mono text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            W.
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-xs font-mono text-muted-foreground">Scroll</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Dark Space */}
      <div className="astra-dark flex flex-col justify-center items-center p-16 relative overflow-hidden">
        {/* Space Background Effects */}
        <div className="absolute inset-0 space-stars"></div>
        <div className="absolute inset-0 space-nebula"></div>
        
        {/* Floating Stars */}
        <motion.div
          className="absolute top-20 left-20"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-6 h-6 text-white/30" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 right-32"
          animate={{ rotate: -360, scale: [1, 0.8, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-4 h-4 text-white/20" />
        </motion.div>

        {/* 3D Sphere */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingSphere />
          </Canvas>
        </div>

        {/* Main Content */}
        <motion.div
          className="text-center space-y-8 z-10 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Tagline */}
          <motion.div
            className="fade-up text-sm font-light text-white/70 tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Space of Creative Solutions
          </motion.div>

          {/* Main Brand Name */}
          <motion.h1
            className="text-astra-hero text-white font-black"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Astra
            <motion.sup
              className="text-2xl font-light"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              ®
            </motion.sup>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="fade-up delay-2 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="text-lg font-medium text-white/90">Full-service</div>
            <div className="text-lg font-medium text-white/90">Creative Agency</div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <Button 
              className="glow-button bg-white text-black hover:bg-white/90 font-semibold px-8 py-3 rounded-full"
              size="lg"
            >
              Explore Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom Right Info */}
        <motion.div
          className="absolute bottom-8 right-8 text-right space-y-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <div className="text-xs font-mono text-white/50 uppercase tracking-wider">
            BUY "ASTRA"
          </div>
          <div className="text-xs text-white/30">••</div>
        </motion.div>
      </div>
    </div>
  );
};

export default AstraHero;