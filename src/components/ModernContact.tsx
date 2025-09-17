import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Calendar } from 'lucide-react';
import { useRef, useState } from 'react';

const ModernContact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@ankurbag.dev',
      href: 'mailto:hello@ankurbag.dev',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kolkata, India',
      href: 'https://maps.google.com/?q=Kolkata,India',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Calendar,
      label: 'Availability',
      value: 'Open for Projects',
      href: 'mailto:hello@ankurbag.dev?subject=Project Inquiry',
      color: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ankurbag', label: 'GitHub', username: '@ankurbag' },
    { icon: Linkedin, href: 'https://linkedin.com/in/ankur-bag', label: 'LinkedIn', username: 'ankur-bag' },
    { icon: Twitter, href: 'https://twitter.com/ankurbag_dev', label: 'Twitter', username: '@ankurbag_dev' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" ref={containerRef} className="py-section bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-30px", "80px"]) }}
          className="absolute bottom-1/4 left-10 w-72 h-72 bg-gradient-to-br from-secondary/5 to-muted/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-content mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-8">
            Let's Create
            <br />
            Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and explore 
            how we can work together to create exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="modern-card bg-card/50 backdrop-blur-sm border border-border/30">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Send a Message
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="modern-input"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="modern-input"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="modern-input"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project..."
                      className="modern-input min-h-[120px] resize-none"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button 
                      type="submit"
                      className="modern-button w-full bg-foreground text-background hover:bg-foreground/90 rounded-full py-3 font-medium"
                      size="lg"
                    >
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="modern-card bg-card/30 backdrop-blur-sm border border-border/20 hover:border-border/40 group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                          <info.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                            {info.label}
                          </div>
                          <a 
                            href={info.href}
                            className="font-medium text-foreground hover:gradient-text transition-all duration-300"
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="modern-card bg-card/30 backdrop-blur-sm border border-border/20">
                <CardContent className="p-8">
                  <h4 className="text-lg font-semibold text-foreground mb-6">
                    Connect With Me
                  </h4>
                  
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-300 group"
                        whileHover={{ x: 8 }}
                      >
                        <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">
                            {social.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {social.username}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="modern-card bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-border/20">
                <CardContent className="p-8 text-center space-y-4">
                  <h4 className="text-xl font-bold gradient-text">
                    Prefer to call?
                  </h4>
                  <p className="text-muted-foreground">
                    Schedule a quick 15-minute call to discuss your project.
                  </p>
                  <Button 
                    variant="outline"
                    className="modern-button border-foreground/20 hover:border-foreground/40 rounded-full px-6"
                  >
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModernContact;