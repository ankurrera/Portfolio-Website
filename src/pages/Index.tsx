import { motion } from 'framer-motion';
import AstraHero from '@/components/AstraHero';
import AstraStats from '@/components/AstraStats';
import AstraServices from '@/components/AstraServices';
import AstraFounder from '@/components/AstraFounder';
import MinimalContact from '@/components/MinimalContact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">      
      {/* Main Content */}
      <main>
        <AstraHero />
        <AstraStats />
        <AstraServices />
        <AstraFounder />
        <MinimalContact />
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-muted/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div 
              className="text-lg font-heading font-medium text-foreground"
              whileHover={{ scale: 1.02 }}
            >
              Astra Creative Agency
            </motion.div>
            
            <div className="flex items-center gap-8 text-xs font-mono text-muted-foreground">
              <div>&copy; 2024 All rights reserved</div>
              <div>Made in Framer</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
