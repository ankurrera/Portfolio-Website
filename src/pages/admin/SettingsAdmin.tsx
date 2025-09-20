import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SiteSettings {
  id?: string;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  meta_title: string;
  meta_description: string;
  og_image_url: string | null;
}

const SettingsAdmin = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    meta_title: 'Portfolio',
    meta_description: 'Professional Portfolio Website',
    og_image_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found error
        throw error;
      }

      if (data) {
        setSettings({
          id: data.id,
          github_url: data.github_url || '',
          linkedin_url: data.linkedin_url || '',
          twitter_url: data.twitter_url || '',
          meta_title: data.meta_title || 'Portfolio',
          meta_description: data.meta_description || 'Professional Portfolio Website',
          og_image_url: data.og_image_url || '',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `og-image-${Date.now()}.${fileExt}`;
      const filePath = `project-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      handleInputChange('og_image_url', data.publicUrl);

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const settingsData = {
        github_url: settings.github_url || null,
        linkedin_url: settings.linkedin_url || null,
        twitter_url: settings.twitter_url || null,
        meta_title: settings.meta_title,
        meta_description: settings.meta_description,
        og_image_url: settings.og_image_url || null,
      };

      if (settings.id) {
        // Update existing settings
        const { error } = await supabase
          .from('site_settings')
          .update(settingsData)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        // Create new settings
        const { error } = await supabase
          .from('site_settings')
          .insert([settingsData]);

        if (error) throw error;

        // Fetch the created record to get the ID
        await fetchSettings();
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your portfolio's social links, SEO settings, and other configurations.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="url"
                value={settings.github_url}
                onChange={(e) => handleInputChange('github_url', e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={settings.linkedin_url}
                onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                type="url"
                value={settings.twitter_url}
                onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                placeholder="https://twitter.com/username"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO & Meta Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meta_title">Page Title</Label>
              <Input
                id="meta_title"
                value={settings.meta_title}
                onChange={(e) => handleInputChange('meta_title', e.target.value)}
                placeholder="Your Portfolio Title"
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Keep it under 60 characters for best SEO results
              </p>
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={settings.meta_description}
                onChange={(e) => handleInputChange('meta_description', e.target.value)}
                placeholder="Brief description of your portfolio"
                maxLength={160}
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Keep it under 160 characters for best SEO results
              </p>
            </div>

            <div>
              <Label>Open Graph Image</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {settings.og_image_url && (
                  <div className="mt-2">
                    <img
                      src={settings.og_image_url}
                      alt="OG Image preview"
                      className="w-48 h-24 object-cover rounded border"
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Recommended size: 1200x630px. This image will be shown when your portfolio is shared on social media.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving || uploading} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdmin;