import { motion } from 'framer-motion';

const AstraStats = () => {
  const stats = [
    {
      label: 'Launched Projects',
      value: '30',
      description: 'Projects were launched successful since 2008.'
    },
    {
      label: 'Client Satisfaction', 
      value: '53',
      description: 'Percentage of our fully satisfied clients.'
    },
    {
      label: 'Year of Establishment',
      value: '1996', 
      description: 'The year the two founders launched а first project: "Sonora" website for IT startup.'
    },
    {
      label: 'Team of Pilots',
      value: '32',
      description: 'Experienced professionals working together.'
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </div>
              <div className="text-6xl font-heading font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AstraStats;