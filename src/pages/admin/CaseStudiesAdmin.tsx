import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CaseStudyDialog from '@/components/admin/CaseStudyDialog';

interface CaseStudy {
  id: string;
  title: string;
  content: string;
  challenges: string | null;
  solutions: string | null;
  results: string | null;
  project_id: string | null;
  created_at: string;
  projects: {
    title: string;
  } | null;
}

const CaseStudiesAdmin = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select(`
          *,
          projects (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch case studies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingCaseStudy(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (caseStudy: CaseStudy) => {
    if (!confirm(`Are you sure you want to delete "${caseStudy.title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', caseStudy.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Case study deleted successfully",
      });

      fetchCaseStudies();
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive",
      });
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
    return <div className="text-center py-8">Loading case studies...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Case Studies</h1>
          <p className="text-muted-foreground mt-2">
            Create detailed case studies that explain project challenges and solutions.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Case Study
        </Button>
      </div>

      <div className="grid gap-4">
        {caseStudies.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No case studies found. Create your first case study!</p>
            </CardContent>
          </Card>
        ) : (
          caseStudies.map((caseStudy) => (
            <Card key={caseStudy.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
                      {caseStudy.projects && (
                        <Badge variant="secondary">{caseStudy.projects.title}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Created on {formatDate(caseStudy.created_at)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {caseStudy.content}
                </p>

                <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">Challenges:</span>{' '}
                    {caseStudy.challenges ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <span className="font-medium">Solutions:</span>{' '}
                    {caseStudy.solutions ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <span className="font-medium">Results:</span>{' '}
                    {caseStudy.results ? 'Yes' : 'No'}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(caseStudy)}
                    className="gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(caseStudy)}
                    className="gap-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <CaseStudyDialog
        caseStudy={editingCaseStudy}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={() => {
          setIsDialogOpen(false);
          fetchCaseStudies();
        }}
      />
    </div>
  );
};

export default CaseStudiesAdmin;