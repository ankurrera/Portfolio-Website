import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AstraAbout = () => {
  const stats = [
    { number: '30', label: 'Launched Projects', description: 'Projects were launched successful since 2008.' },
    { number: '53%', label: 'Client Satisfaction', description: 'Percentage of our fully satisfied clients.' },
    { number: '1996', label: 'Year of Establishment', description: 'The year the two founders launched а first project: "Sonora" website for IT startup.' },
    { number: '32', label: 'Team of Pilots', description: 'Creative professionals working together.' }
  ];

  const features = [
    'Strategy & Consulting',
    'Brand Identity Design',
    'UI/UX Design',
    'Web Development',
    'Digital Marketing',
    '3D Visualization'
  ];

  return (
    <section className="min-h-screen bg-space-light py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-display text-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Astra
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            We're a full-service agency driven by strategy, design, and technology. 
            From brand foundations to fully developed digital products, we create work 
            that doesn't just look good: it performs, connects, and endures.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <Card className="space-card p-8 h-full text-center group hover:bg-space-dark hover:text-white transition-all duration-500">
                <motion.div
                  className="text-6xl font-black text-accent mb-4 group-hover:text-white transition-colors duration-500"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + 0.1 * index, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-white transition-colors duration-500">
                  {stat.label}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors duration-500 leading-relaxed">
                  {stat.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4 text-accent border-accent">
                Our Expertise
              </Badge>
              <h3 className="text-hero text-foreground mb-6">
                Creative Solutions for
                <br />
                <span className="text-accent">Modern Businesses</span>
              </h3>
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              From concept to completion, we craft digital experiences that captivate, 
              engage, and convert. Our team combines strategic thinking with creative 
              execution to deliver results that exceed expectations.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4">Core Services:</h4>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-3 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Circle */}
              <motion.div
                className="absolute inset-0 border-2 border-accent/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Circle with Glow */}
              <motion.div
                className="absolute inset-8 bg-gradient-to-br from-accent/10 to-transparent rounded-full backdrop-blur-sm border border-accent/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-accent/5 rounded-full animate-pulse"></div>
              </motion.div>
              
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-black text-accent mb-2">15+</div>
                  <div className="text-sm font-medium text-foreground">Years</div>
                  <div className="text-xs text-muted-foreground">Experience</div>
                </motion.div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/30 rounded-full"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AstraAbout;