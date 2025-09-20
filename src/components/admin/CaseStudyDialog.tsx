import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CaseStudy {
  id: string;
  title: string;
  content: string;
  challenges: string | null;
  solutions: string | null;
  results: string | null;
  project_id: string | null;
}

interface Project {
  id: string;
  title: string;
}

interface CaseStudyDialogProps {
  caseStudy: CaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

const CaseStudyDialog: React.FC<CaseStudyDialogProps> = ({
  caseStudy,
  open,
  onOpenChange,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    challenges: '',
    solutions: '',
    results: '',
    project_id: '',
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchProjects();
    }

    if (caseStudy) {
      setFormData({
        title: caseStudy.title,
        content: caseStudy.content,
        challenges: caseStudy.challenges || '',
        solutions: caseStudy.solutions || '',
        results: caseStudy.results || '',
        project_id: caseStudy.project_id || '',
      });
    } else {
      setFormData({
        title: '',
        content: '',
        challenges: '',
        solutions: '',
        results: '',
        project_id: '',
      });
    }
  }, [caseStudy, open]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title')
        .eq('is_archived', false)
        .order('title', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a case study title",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please enter case study content",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const caseStudyData = {
        ...formData,
        project_id: formData.project_id || null,
        challenges: formData.challenges || null,
        solutions: formData.solutions || null,
        results: formData.results || null,
      };

      if (caseStudy) {
        // Update existing case study
        const { error } = await supabase
          .from('case_studies')
          .update(caseStudyData)
          .eq('id', caseStudy.id);

        if (error) throw error;
      } else {
        // Create new case study
        const { error } = await supabase
          .from('case_studies')
          .insert([caseStudyData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Case study ${caseStudy ? 'updated' : 'created'} successfully`,
      });

      onSave();
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: "Error",
        description: `Failed to ${caseStudy ? 'update' : 'create'} case study`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {caseStudy ? 'Edit Case Study' : 'Create Case Study'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Case Study Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter case study title"
              />
            </div>

            <div>
              <Label htmlFor="project_id">Related Project (Optional)</Label>
              <Select value={formData.project_id} onValueChange={(value) => handleInputChange('project_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No project</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="content">Overview *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Provide an overview of the case study"
                rows={4}
              />
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="challenges">Challenges</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => handleInputChange('challenges', e.target.value)}
                placeholder="Describe the challenges faced during this project"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="solutions">Solutions</Label>
              <Textarea
                id="solutions"
                value={formData.solutions}
                onChange={(e) => handleInputChange('solutions', e.target.value)}
                placeholder="Explain the solutions implemented"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="results">Results</Label>
              <Textarea
                id="results"
                value={formData.results}
                onChange={(e) => handleInputChange('results', e.target.value)}
                placeholder="Describe the outcomes and results achieved"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Case Study'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyDialog;