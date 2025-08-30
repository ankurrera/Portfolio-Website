import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send, MessageCircle, Globe } from 'lucide-react';
import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ankurr.era@gmail.com',
      href: 'mailto:ankurr.era@gmail.com',
      color: 'primary'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+919002278769',
      href: 'tel:+919002278769',
      color: 'secondary'
    },
    {
      icon: MapPin,
      label: 'India',
      value: 'Kolkata, WB',
      href: '#',
      color: 'accent'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your next project to life? Let's create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-semibold text-foreground">
                Let's Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always excited to discuss new opportunities, innovative projects, 
                or just have a conversation about technology and development.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass hover:glow-cyan transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-full bg-${info.color}/10 glow-${info.color === 'primary' ? 'cyan' : info.color === 'secondary' ? 'purple' : 'green'} group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className={`w-6 h-6 text-${info.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Contact Methods */}
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-semibold text-foreground">
                Prefer Other Channels?
              </h4>
              <div className="flex gap-4">
                <Button variant="outline" className="glow-cyan flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="glow-purple flex-1">
                  <Globe className="w-4 h-4 mr-2" />
                  Calendar
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="glass glow-purple">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="bg-surface-glass border-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ankurr.era@example.com"
                        className="bg-surface-glass border-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, ideas, or just say hello!"
                      rows={6}
                      className="bg-surface-glass border-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
                      required
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full glow-cyan text-lg py-6"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>

                {/* Response Time Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20"
                >
                  <p className="text-sm text-accent font-medium text-center">
                    ⚡ I typically respond within 24 hours
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-40 h-40 border-2 border-accent/20 rotate-12 animate-rotate-slow" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse-glow" />
      <div className="absolute top-1/2 left-0 w-2 h-32 bg-gradient-cyber animate-cyber-scan" />
    </section>
  );
};

export default ContactSection;