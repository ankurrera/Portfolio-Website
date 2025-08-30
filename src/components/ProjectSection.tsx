import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye } from 'lucide-react';

const ProjectSection = () => {
  const projects = [
    {
      id: 1,
      title: 'AI-Powered Dashboard',
      description: 'A modern analytics dashboard with real-time data visualization and machine learning insights.',
      image: '/api/placeholder/400/300',
      tech: ['React', 'TypeScript', 'Python', 'TensorFlow'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Blockchain Wallet App',
      description: 'Secure cryptocurrency wallet with multi-chain support and DeFi integrations.',
      image: '/api/placeholder/400/300',
      tech: ['Next.js', 'Web3', 'Solidity', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 3,
      title: 'AR Shopping Experience',
      description: 'Augmented reality e-commerce platform for virtual product try-ons.',
      image: '/api/placeholder/400/300',
      tech: ['React Native', 'ARKit', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Smart IoT Platform',
      description: 'Comprehensive IoT management system with real-time monitoring and automation.',
      image: '/api/placeholder/400/300',
      tech: ['Vue.js', 'Express', 'MQTT', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
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
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcase of innovative solutions and cutting-edge technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className={`glass card-3d hover:glow-cyan transition-all duration-500 overflow-hidden ${
                project.featured ? 'md:col-span-2' : ''
              }`}>
                <div className={`${project.featured ? 'md:flex' : ''}`}>
                  {/* Project Image */}
                  <div className={`relative overflow-hidden ${
                    project.featured ? 'md:w-1/2' : ''
                  }`}>
                    <div className="aspect-video bg-gradient-card">
                      <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                        <Eye className="w-16 h-16 text-primary/50" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <Button size="sm" className="glow-cyan">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                        <Button size="sm" variant="outline" className="glow-purple">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={`p-6 ${project.featured ? 'md:w-1/2' : ''}`}>
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-2xl font-heading text-foreground group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </CardTitle>
                        {project.featured && (
                          <Badge className="bg-accent text-accent-foreground glow-green">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0 space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="bg-surface-glass border border-primary/20 text-primary"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Project Links */}
                      <div className="flex gap-4 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="glow-cyan flex-1"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="glow-purple flex-1"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button className="glow-purple text-lg px-8 py-4 rounded-full">
            View All Projects
          </Button>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-10 right-10 w-32 h-32 border border-secondary/20 rotate-45 animate-rotate-slow" />
      <div className="absolute bottom-10 left-10 w-24 h-24 border border-primary/20 animate-pulse-glow" />
    </section>
  );
};

export default ProjectSection;