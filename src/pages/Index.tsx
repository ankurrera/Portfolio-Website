import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectSection from '@/components/ProjectSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* 3D Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-primary/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="text-2xl font-heading font-bold gradient-text mb-4 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              Cyber.Portfolio
            </motion.div>
            <div className="text-muted-foreground text-center md:text-right">
              <p>&copy; 2024 Alex Chen. All rights reserved.</p>
              <p className="text-sm mt-1">Built with cutting-edge technology & passion</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
