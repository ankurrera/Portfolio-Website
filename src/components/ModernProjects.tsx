import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { useRef } from 'react';

const ModernProjects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const projects = [
    {
      id: '01',
      title: 'AI Analytics Dashboard',
      description: 'Real-time data visualization platform with machine learning insights for enterprise clients. Features advanced predictive analytics and automated reporting.',
      tech: ['React', 'TypeScript', 'Python', 'TensorFlow', 'AWS'],
      year: '2024',
      status: 'Live',
      link: '#',
      github: '#',
      featured: true,
      image: '/api/placeholder/600/400'
    },
    {
      id: '02',
      title: 'Blockchain Wallet',
      description: 'Secure multi-chain cryptocurrency wallet with DeFi integration and advanced security features. Built with Web3 technologies.',
      tech: ['Next.js', 'Web3', 'Solidity', 'Node.js', 'PostgreSQL'],
      year: '2023',
      status: 'In Development',
      link: '#',
      github: '#',
      featured: true,
      image: '/api/placeholder/600/400'
    },
    {
      id: '03',
      title: 'E-commerce Platform',
      description: 'Modern shopping experience with AR try-on features and personalized recommendations powered by machine learning.',
      tech: ['Vue.js', 'Express', 'MongoDB', 'AWS', 'Three.js'],
      year: '2023',
      status: 'Live',
      link: '#',
      github: '#',
      featured: false,
      image: '/api/placeholder/600/400'
    },
    {
      id: '04',
      title: 'IoT Management System',
      description: 'Comprehensive platform for monitoring and controlling smart devices across multiple locations with real-time analytics.',
      tech: ['React Native', 'MQTT', 'PostgreSQL', 'Docker', 'Redis'],
      year: '2022',
      status: 'Live',
      link: '#',
      github: '#',
      featured: false,
      image: '/api/placeholder/600/400'
    }
  ];

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section id="work" ref={containerRef} className="py-section bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
          className="absolute bottom-1/4 left-10 w-96 h-96 bg-gradient-to-br from-secondary/5 to-muted/10 rounded-full blur-3xl"
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
            Selected Work
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-8">
            Recent Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of innovative solutions crafted with modern technologies and creative vision.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.filter(project => project.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <Card className="modern-card bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden h-full">
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-bold text-foreground/10">
                        {project.id}
                      </div>
                    </div>
                    
                    {/* Overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-foreground/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <Button size="sm" variant="outline" className="bg-background/20 backdrop-blur-sm border-background/40">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button size="sm" className="bg-background text-foreground hover:bg-background/90">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </motion.div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-muted-foreground">
                            {project.year}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            project.status === 'Live' 
                              ? 'bg-green-500/10 text-green-600' 
                              : 'bg-orange-500/10 text-orange-600'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                          {project.title}
                        </h3>
                      </div>
                      <motion.div
                        whileHover={{ x: 4, y: -4 }}
                        className="opacity-60 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight className="w-6 h-6" />
                      </motion.div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-full font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {projects.filter(project => !project.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="modern-card bg-card/30 backdrop-blur-sm border border-border/30 hover:border-border/60 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {project.year}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'Live' 
                            ? 'bg-green-500/10 text-green-600' 
                            : 'bg-orange-500/10 text-orange-600'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <motion.div
                      whileHover={{ x: 3, y: -3 }}
                      className="opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-muted/30 text-muted-foreground rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs px-2 py-1 text-muted-foreground">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 py-16"
        >
          <h3 className="text-3xl font-bold gradient-text">
            Let's Create Something Amazing
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ready to bring your vision to life? Let's discuss your next project.
          </p>
          <Button 
            className="modern-button bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-full font-medium"
            size="lg"
          >
            Start a Project
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernProjects;