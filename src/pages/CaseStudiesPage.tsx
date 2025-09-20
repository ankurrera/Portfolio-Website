import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';

interface CaseStudy {
  id: string;
  title: string;
  content: string;
  challenges: string | null;
  solutions: string | null;
  results: string | null;
  created_at: string;
  projects: {
    title: string;
    technologies: string[];
  } | null;
}

const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('/case-studies');
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select(`
          *,
          projects (
            title,
            technologies
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading case studies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-content mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl font-bold">Case Studies</h1>
          </div>
        </div>
      </header>

      {/* Case Studies */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        {caseStudies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No case studies found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="space-y-4">
                      <CardTitle className="text-2xl">{caseStudy.title}</CardTitle>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {formatDate(caseStudy.created_at)}
                        </div>
                        
                        {caseStudy.projects && (
                          <Badge variant="outline">
                            {caseStudy.projects.title}
                          </Badge>
                        )}
                      </div>

                      {caseStudy.projects?.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.projects.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Overview */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Overview</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {caseStudy.content}
                      </p>
                    </div>

                    {/* Challenges */}
                    {caseStudy.challenges && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Challenges</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {caseStudy.challenges}
                        </p>
                      </div>
                    )}

                    {/* Solutions */}
                    {caseStudy.solutions && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Solutions</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {caseStudy.solutions}
                        </p>
                      </div>
                    )}

                    {/* Results */}
                    {caseStudy.results && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Results</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {caseStudy.results}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CaseStudiesPage;