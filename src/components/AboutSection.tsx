import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Palette, Database, Zap, Brain, Rocket } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    { name: 'Frontend', icon: Palette, level: 95, color: 'primary' },
    { name: 'Backend', icon: Database, level: 90, color: 'secondary' },
    { name: 'DevOps', icon: Zap, level: 85, color: 'accent' },
    { name: 'AI/ML', icon: Brain, level: 80, color: 'primary' },
    { name: 'Mobile', icon: Code2, level: 88, color: 'secondary' },
    { name: 'Cloud', icon: Rocket, level: 87, color: 'accent' }
  ];

  const experience = [
    {
      year: '2023 - Present',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Innovation',
      description: 'Leading development of next-generation web applications using cutting-edge technologies.',
      highlights: ['Led team of 8 developers', 'Increased performance by 300%', 'Implemented AI features']
    },
    {
      year: '2021 - 2023',
      title: 'Full Stack Developer',
      company: 'Digital Solutions Inc',
      description: 'Developed and maintained scalable web applications for enterprise clients.',
      highlights: ['Built 15+ production apps', 'Reduced loading time by 60%', 'Mentored junior developers']
    },
    {
      year: '2019 - 2021',
      title: 'Frontend Developer',
      company: 'Creative Agency',
      description: 'Created responsive and interactive user interfaces for diverse client portfolio.',
      highlights: ['Designed 50+ UI components', 'Improved user engagement by 40%', 'Won design awards']
    }
  ];

  return (
    <section id="about" className="py-20 relative">
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
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with a mission to create extraordinary digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-heading font-semibold text-primary">
                Building Tomorrow's Technology Today
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 5 years of experience in full-stack development, I specialize in creating 
                innovative solutions that bridge the gap between cutting-edge technology and user-centered design. 
                My passion lies in transforming complex challenges into elegant, scalable applications.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe in the power of continuous learning and staying ahead of technological trends. 
                Whether it's implementing AI-driven features, optimizing performance, or crafting 
                intuitive user experiences, I bring creativity and technical expertise to every project.
              </p>
            </div>

            {/* Skills Progress */}
            <div className="space-y-6">
              <h4 className="text-2xl font-heading font-semibold text-foreground">
                Core Expertise
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <skill.icon className={`w-5 h-5 text-${skill.color}`} />
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                    <div className="relative">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-${skill.color} glow-${skill.color === 'primary' ? 'cyan' : skill.color === 'secondary' ? 'purple' : 'green'}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground mt-1 block">
                        {skill.level}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h4 className="text-3xl font-heading font-semibold text-secondary">
              Professional Journey
            </h4>
            
            <div className="relative space-y-8">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-cyber" />
              
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2 top-2 w-4 h-4 bg-primary rounded-full glow-cyan transform -translate-x-1/2" />
                  
                  <Card className="glass hover:glow-cyan transition-all duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Badge className="bg-surface-glass text-primary border border-primary/30">
                          {exp.year}
                        </Badge>
                        <h5 className="text-xl font-heading font-semibold text-foreground">
                          {exp.title}
                        </h5>
                        <p className="text-secondary font-medium">
                          {exp.company}
                        </p>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                      
                      <div className="space-y-2">
                        <h6 className="text-sm font-semibold text-accent">Key Achievements:</h6>
                        <ul className="space-y-1">
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" />
    </section>
  );
};

export default AboutSection;