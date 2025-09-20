import React, { useEffect, useState } from 'react';
import { Upload, Download, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Resume {
  id: string;
  file_url: string;
  filename: string;
  download_count: number;
  uploaded_at: string;
}

const ResumeAdmin = () => {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCurrentResume();
  }, []);

  const fetchCurrentResume = async () => {
    try {
      const { data, error } = await supabase
        .from('resume')
        .select('*')
        .order('uploaded_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found error
        throw error;
      }

      setCurrentResume(data || null);
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast({
        title: "Error",
        description: "Failed to fetch resume",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `resume-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      // Delete old resume from storage if exists
      if (currentResume) {
        const oldPath = currentResume.file_url.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('resumes')
            .remove([`resumes/${oldPath}`]);
        }

        // Delete old resume record
        await supabase
          .from('resume')
          .delete()
          .eq('id', currentResume.id);
      }

      // Create new resume record
      const { error: insertError } = await supabase
        .from('resume')
        .insert([
          {
            file_url: data.publicUrl,
            filename: file.name,
            download_count: 0,
          },
        ]);

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Resume uploaded successfully",
      });

      fetchCurrentResume();
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Error",
        description: "Failed to upload resume",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentResume) return;

    if (!confirm('Are you sure you want to delete the current resume?')) {
      return;
    }

    try {
      // Delete file from storage
      const filePath = currentResume.file_url.split('/').pop();
      if (filePath) {
        await supabase.storage
          .from('resumes')
          .remove([`resumes/${filePath}`]);
      }

      // Delete record from database
      const { error } = await supabase
        .from('resume')
        .delete()
        .eq('id', currentResume.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });

      setCurrentResume(null);
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading resume...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resume Management</h1>
        <p className="text-muted-foreground mt-2">
          Upload and manage your resume. Visitors can download the latest version from your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Resume */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Current Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentResume ? (
              <>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Filename:</span> {currentResume.filename}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Uploaded:</span> {formatDate(currentResume.uploaded_at)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Downloads:</span> {currentResume.download_count}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.open(currentResume.file_url, '_blank')}
                  >
                    <Download className="w-4 h-4" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="gap-2"
                    onClick={handleDelete}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No resume uploaded yet.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload New Resume */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload New Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="resume-upload">
                Choose PDF file (max 10MB)
              </Label>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="mt-2"
              />
            </div>

            {uploading && (
              <div className="text-sm text-muted-foreground">
                Uploading resume...
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <p>• Uploading a new resume will replace the current one</p>
              <p>• The resume will be immediately available for download</p>
              <p>• All download statistics will be preserved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Statistics */}
      {currentResume && (
        <Card>
          <CardHeader>
            <CardTitle>Download Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold">{currentResume.download_count}</div>
                <div className="text-sm text-muted-foreground">Total Downloads</div>
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold">
                  {Math.ceil((Date.now() - new Date(currentResume.uploaded_at).getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-muted-foreground">Days Since Upload</div>
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold">
                  {currentResume.download_count > 0 
                    ? (currentResume.download_count / Math.max(1, Math.ceil((Date.now() - new Date(currentResume.uploaded_at).getTime()) / (1000 * 60 * 60 * 24)))).toFixed(1)
                    : '0.0'
                  }
                </div>
                <div className="text-sm text-muted-foreground">Downloads per Day</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeAdmin;