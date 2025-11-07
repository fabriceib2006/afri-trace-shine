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

const feedbackSchema = z.object({
  title: z.string().trim().min(3, { message: "Title must be at least 3 characters" }).max(200),
  location: z.string().trim().max(200),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string().trim().min(10, { message: "Description must be at least 10 characters" }).max(1000)
});

const FeedbackSection = () => {
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
    // Scroll to section if user is logged in (coming from login redirect)
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
      toast.error("Please log in to submit feedback");
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
            <h2 className="text-4xl font-bold mb-6">Report & Feedback</h2>
            {!user && (
              <Card className="mb-4 border-blue-500">
                <CardContent className="pt-6">
                  <p className="text-sm mb-4">
                    <strong>Sign in required:</strong> You must be logged in to submit feedback.
                  </p>
                  <Button onClick={() => navigate('/auth')} className="w-full">
                    Sign In or Create Account
                  </Button>
                </CardContent>
              </Card>
            )}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-6 w-6 text-primary mr-2" />
                  <CardTitle>Why Your Report Matters</CardTitle>
                </div>
                <CardDescription>
                  Your feedback helps ensure transparency and accountability in Rwanda's mining sector.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What You Can Report:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Environmental concerns or violations</li>
                    <li>• Social impact on local communities</li>
                    <li>• Certification irregularities</li>
                    <li>• General feedback on mining operations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How It Works:</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Submit your concern or feedback</li>
                    <li>Our team reviews all submissions</li>
                    <li>Appropriate action is taken</li>
                    <li>You receive updates on progress</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit Your Feedback</CardTitle>
              <CardDescription>
                All information is confidential and will be reviewed by authorized personnel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Report Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Brief title for your report"
                    required
                    disabled={!user}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="District or mining site name"
                    disabled={!user}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    disabled={!user}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="environmental">Environmental Concern</SelectItem>
                      <SelectItem value="social">Social Impact</SelectItem>
                      <SelectItem value="certification">Certification Issue</SelectItem>
                      <SelectItem value="other">Other Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Your Message *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe your concern or feedback in detail..."
                    rows={6}
                    required
                    disabled={!user}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={!user || loading}>
                  <Send className="mr-2 h-4 w-4" />
                  {loading ? 'Submitting...' : 'Submit Feedback'}
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
