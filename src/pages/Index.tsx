import { motion } from 'framer-motion';
import ModernNavigation from '@/components/ModernNavigation';
import ModernHero from '@/components/ModernHero';
import ModernProjects from '@/components/ModernProjects';
import ModernAbout from '@/components/ModernAbout';
import ModernContact from '@/components/ModernContact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <ModernNavigation />
      
      {/* Main Content */}
      <main>
        <ModernHero />
        <ModernProjects />
        <ModernAbout />
        <ModernContact />
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border/20 bg-muted/5 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-br from-secondary/5 to-muted/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-content mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div 
              className="text-2xl font-bold gradient-text-vibrant"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Ankur Bag
            </motion.div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-6">
                <span>&copy; 2024 All rights reserved</span>
                <span className="hidden md:block">•</span>
                <span>Made with precision & passion</span>
              </div>
              
              <motion.div 
                className="flex items-center gap-1 font-mono text-xs"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available for new projects
              </motion.div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-4 right-16 w-4 h-4 border border-primary/20 rotate-45 animate-pulse-glow" />
          <div className="absolute bottom-4 left-16 w-3 h-3 bg-accent/20 rounded-full animate-float" />
        </div>
      </footer>
    </div>
  );
};

export default Index;
