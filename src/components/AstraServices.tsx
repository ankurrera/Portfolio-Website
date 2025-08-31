import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Palette, Code, Smartphone, Zap, Globe, BarChart3 } from 'lucide-react';

const AstraServices = () => {
  const services = [
    {
      id: '01',
      title: 'Branding and Identity',
      description: 'Complete brand strategy, logo design, and visual identity systems that resonate with your target audience.',
      icon: Palette,
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy']
    },
    {
      id: '02', 
      title: 'UI/UX and Product Design',
      description: 'User-centered design solutions that create intuitive and engaging digital experiences.',
      icon: Smartphone,
      features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing']
    },
    {
      id: '03',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      icon: Code,
      features: ['Frontend Development', 'Backend Systems', 'E-commerce', 'CMS Solutions']
    },
    {
      id: '04',
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence and reach.',
      icon: BarChart3,
      features: ['SEO Optimization', 'Social Media', 'Content Strategy', 'Analytics']
    },
    {
      id: '05',
      title: 'Performance Optimization',
      description: 'Speed up your digital platforms and improve user experience with technical optimization.',
      icon: Zap,
      features: ['Site Speed', 'Core Web Vitals', 'Performance Audits', 'Technical SEO']
    },
    {
      id: '06',
      title: 'Global Solutions',
      description: 'International expansion support with localization and multi-market strategies.',
      icon: Globe,
      features: ['Localization', 'Multi-language', 'Cultural Adaptation', 'Global Strategy']
    }
  ];

  return (
    <section id="services" className="min-h-screen bg-gradient-to-b from-space-light to-space-light/50 py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 text-accent border-accent">
              What We Do
            </Badge>
            <h2 className="text-display text-foreground mb-6">
              Services
            </h2>
          </motion.div>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            We offer comprehensive digital solutions that help businesses thrive in the modern landscape. 
            From strategy to execution, we're your partner in digital transformation.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="space-card group cursor-pointer h-full overflow-hidden relative">
                  <div className="p-8">
                    
                    {/* Service Number & Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="text-6xl font-black text-accent/20 group-hover:text-accent/40 transition-colors duration-500"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        /{service.id}
                      </motion.div>
                      <motion.div
                        className="p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="w-6 h-6 text-accent" />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <motion.h3
                      className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      {service.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-muted-foreground mb-6 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      {service.description}
                    </motion.p>

                    {/* Features */}
                    <motion.div
                      className="space-y-2 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      {service.features.map((feature, featureIndex) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-60"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </motion.div>

                    {/* Learn More Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <Button
                        variant="ghost"
                        className="group/btn text-accent hover:text-accent hover:bg-accent/10 p-0 h-auto font-semibold"
                      >
                        Learn More
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to transform your digital presence? Let's discuss your project and create something amazing together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Button 
              className="glow-button bg-accent text-white hover:bg-accent/90 px-8 py-6 rounded-full text-lg font-semibold"
              size="lg"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AstraServices;