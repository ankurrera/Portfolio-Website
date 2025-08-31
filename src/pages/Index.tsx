import { motion } from 'framer-motion';
import AstraHero from '@/components/AstraHero';
import AstraAbout from '@/components/AstraAbout';
import AstraServices from '@/components/AstraServices';
import AstraContact from '@/components/AstraContact';

const Index = () => {
  return (
    <div className="min-h-screen bg-space-light">
      {/* Main Content */}
      <main>
        <AstraHero />
        <AstraAbout />
        <AstraServices />
        <AstraContact />
      </main>
      
      {/* Footer */}
      <footer className="bg-space-dark border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div 
              className="text-2xl font-black text-white"
              whileHover={{ scale: 1.02 }}
            >
              Astra<sup className="text-sm font-light">®</sup>
            </motion.div>
            
            <div className="flex items-center gap-8 text-xs font-mono text-white/50">
              <div>&copy; 2024 Astra Creative Agency</div>
              <div>Made in Framer</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
