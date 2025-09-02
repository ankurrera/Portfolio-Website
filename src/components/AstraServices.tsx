import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const AstraServices = () => {
  const services = [
    {
      id: '/01',
      title: 'Branding and Identity',
      description: 'Complete brand development from concept to implementation, creating memorable identities that resonate with your audience.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy']
    },
    {
      id: '/02', 
      title: 'UI/UX and Product Design',
      description: 'User-centered design solutions that combine aesthetics with functionality for exceptional digital experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
      id: '/03',
      title: 'Social Media Marketing', 
      description: 'Strategic social media campaigns that build engagement, grow communities, and drive meaningful connections.',
      features: ['Content Strategy', 'Campaign Management', 'Analytics', 'Community Building']
    },
    {
      id: '/04',
      title: 'SEO Optimization',
      description: 'Technical and content optimization strategies to improve search visibility and drive organic traffic growth.',
      features: ['Technical SEO', 'Content Optimization', 'Keyword Research', 'Performance Tracking']
    }
  ];

  return (
    <section id="services" className="py-32 bg-muted/10">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-6xl font-heading font-bold text-foreground mb-4">
            Services
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <Card className="minimal-card border-0 bg-transparent hover:bg-card/50 transition-all duration-500">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-b border-border/30 last:border-0">
                    {/* Service Number */}
                    <div className="lg:col-span-1">
                      <div className="text-sm font-mono text-muted-foreground">
                        {service.id}
                      </div>
                    </div>

                    {/* Service Title */}
                    <div className="lg:col-span-4">
                      <h3 className="text-3xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Service Description */}
                    <div className="lg:col-span-5">
                      <div className="space-y-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature) => (
                            <div 
                              key={feature}
                              className="text-sm text-muted-foreground/80"
                            >
                              • {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Service Action */}
                    <div className="lg:col-span-2 flex justify-start lg:justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-foreground hover:text-primary hover:bg-transparent group"
                      >
                        Learn More
                        <motion.div
                          className="ml-2"
                          whileHover={{ x: 4, y: -4 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.div>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AstraServices;