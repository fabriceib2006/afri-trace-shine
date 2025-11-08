import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const feedbackSchema = z.object({
  title: z.string().trim().min(3, { message: "Title must be at least 3 characters" }).max(200),
  location: z.string().trim().max(200),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string().trim().min(10, { message: "Description must be at least 10 characters" }).max(1000)
});

const FeedbackSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const section = document.getElementById('feedback-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error(t('feedback.signInMessage'));
      navigate('/auth');
      return;
    }
    
    try {
      feedbackSchema.parse(formData);
      
      setLoading(true);
      
      const { error } = await supabase
        .from('feedback_reports')
        .insert({
          user_id: user.id,
          title: formData.title,
          category: formData.category,
          location: formData.location,
          description: formData.description,
          status: 'pending'
        });
      
      setLoading(false);
      
      if (error) {
        toast.error("Failed to submit feedback. Please try again.");
        return;
      }
      
      toast.success("Thank you for your feedback! We will review it shortly.");
      
      setFormData({
        title: "",
        location: "",
        category: "",
        description: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section id="feedback-section" className="py-20 bg-gradient-to-b from-background to-earth-light/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-6">{t('feedback.title')}</h2>
            {!user && (
              <Card className="mb-4 border-blue-500">
                <CardContent className="pt-6">
                  <p className="text-sm mb-4">
                    <strong>{t('feedback.signInRequired')}</strong> {t('feedback.signInMessage')}
                  </p>
                  <Button onClick={() => navigate('/auth')} className="w-full">
                    {t('feedback.signInButton')}
                  </Button>
                </CardContent>
              </Card>
            )}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-6 w-6 text-primary mr-2" />
                  <CardTitle>{t('feedback.whyMatters')}</CardTitle>
                </div>
                <CardDescription>
                  {t('feedback.whyMattersDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('feedback.whatToReport')}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t('feedback.environmental')}</li>
                    <li>• {t('feedback.social')}</li>
                    <li>• {t('feedback.certificationIssues')}</li>
                    <li>• {t('feedback.general')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('feedback.howItWorks')}</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>{t('feedback.step1')}</li>
                    <li>{t('feedback.step2')}</li>
                    <li>{t('feedback.step3')}</li>
                    <li>{t('feedback.step4')}</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('feedback.formTitle')}</CardTitle>
              <CardDescription>
                {t('feedback.formDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('feedback.reportTitle')} *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={t('feedback.reportTitlePlaceholder')}
                    required
                    disabled={!user}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{t('feedback.location')}</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={t('feedback.locationPlaceholder')}
                    disabled={!user}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">{t('feedback.category')} *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    disabled={!user}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('feedback.selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="environmental">{t('feedback.categories.environmental')}</SelectItem>
                      <SelectItem value="social">{t('feedback.categories.social')}</SelectItem>
                      <SelectItem value="certification">{t('feedback.categories.certification')}</SelectItem>
                      <SelectItem value="other">{t('feedback.categories.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t('feedback.message')} *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={t('feedback.messagePlaceholder')}
                    rows={6}
                    required
                    disabled={!user}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={!user || loading}>
                  <Send className="mr-2 h-4 w-4" />
                  {loading ? t('feedback.submitting') : t('feedback.submitButton')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
