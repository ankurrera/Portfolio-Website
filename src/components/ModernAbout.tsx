import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Code, Palette, Zap, Users } from 'lucide-react';
import { useRef } from 'react';

const ModernAbout = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    { 
      category: 'Frontend', 
      items: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind'],
      icon: Code,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    { 
      category: 'Backend', 
      items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker'],
      icon: Zap,
      color: 'from-green-500/20 to-emerald-500/20'
    },
    { 
      category: 'Design', 
      items: ['Figma', 'Adobe XD', 'Framer', 'Principle', 'Sketch'],
      icon: Palette,
      color: 'from-purple-500/20 to-pink-500/20'
    },
    { 
      category: 'Leadership', 
      items: ['Team Management', 'Mentoring', 'Strategy', 'Communication'],
      icon: Users,
      color: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const experiences = [
    { 
      role: 'Senior Full Stack Developer', 
      company: 'Digital Indian Solutions', 
      year: '2024 - Present',
      description: 'Leading development of enterprise-scale applications with modern web technologies.'
    },
    { 
      role: 'Google Map 360 Photographer', 
      company: 'Instanovate', 
      year: '2025',
      description: 'Specialized in creating immersive 360° virtual experiences for businesses.'
    },
    { 
      role: 'Creative Director', 
      company: 'Freelance', 
      year: '2019 - Current',
      description: 'Cinematography and video editing for diverse clients and creative projects.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed', delay: 0 },
    { number: '15+', label: 'Happy Clients', delay: 0.1 },
    { number: '5+', label: 'Years Experience', delay: 0.2 },
    { number: '24/7', label: 'Availability', delay: 0.3 }
  ];

  return (
    <section id="about" ref={containerRef} className="py-section bg-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute top-1/3 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-50px", "150px"]) }}
          className="absolute bottom-1/3 right-10 w-96 h-96 bg-gradient-to-br from-secondary/10 to-muted/20 rounded-full blur-3xl"
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
            About Me
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-8">
            Crafting Digital
            <br />
            Experiences
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.p 
                className="text-xl font-light text-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                I'm a passionate full-stack developer with over 5 years of experience 
                creating digital solutions that matter. My journey combines technical 
                expertise with creative vision.
              </motion.p>
              
              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                From building scalable web applications to integrating AI capabilities, 
                I specialize in crafting user experiences that feel natural and intuitive. 
                Every project is an opportunity to push boundaries and explore new possibilities.
              </motion.p>
              
              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open source projects, or capturing stories through 
                cinematography and visual design.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-6 pt-8 border-t border-border/50"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  className="text-center p-4 rounded-xl bg-background/30 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8"
            >
              <Button 
                className="modern-button bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3"
                size="lg"
              >
                Let's Work Together
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Skills & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="modern-card bg-card/50 backdrop-blur-sm border border-border/30 hover:border-border/60 overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${skillGroup.color}`}>
                          <skillGroup.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <h4 className="font-semibold text-foreground">
                          {skillGroup.category}
                        </h4>
                      </div>
                      
                      <div className="space-y-2">
                        {skillGroup.items.map((item, itemIndex) => (
                          <motion.div 
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                            className="text-sm font-mono text-muted-foreground py-1 px-2 rounded bg-muted/20 inline-block mr-2 mb-2"
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-foreground">Experience</h4>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pl-8 pb-6 border-l-2 border-border/30 last:border-l-0 group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full border-2 border-background group-hover:scale-125 transition-transform duration-300" />
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h5 className="font-semibold text-foreground group-hover:gradient-text transition-all duration-300">
                          {exp.role}
                        </h5>
                        <span className="text-xs font-mono text-muted-foreground bg-muted/20 px-2 py-1 rounded">
                          {exp.year}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {exp.company}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModernAbout;