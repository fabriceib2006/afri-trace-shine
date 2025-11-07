import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  location: z.string().trim().min(1, "Location is required").max(200),
  category: z.string().min(1, "Please select a category"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000)
});

const FeedbackSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      feedbackSchema.parse(formData);
      toast.success("Thank you for your feedback! We'll review it shortly.");
      setFormData({
        name: "",
        email: "",
        location: "",
        category: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="feedback" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
              Community Feedback & Reporting
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your voice matters. Report concerns, share feedback, or ask questions about mining
              operations in your area.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info Card */}
            <Card className="border-secondary/50 bg-gradient-to-br from-secondary/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Why Report?</CardTitle>
                </div>
                <CardDescription>
                  Your feedback helps us maintain transparency and accountability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-sustainability/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sustainability font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Environmental Concerns</h4>
                    <p className="text-sm text-muted-foreground">
                      Report water quality, air quality, or land use issues
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-trust/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-trust font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Social Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Share feedback on community benefits and employment
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-destructive font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Compliance Issues</h4>
                    <p className="text-sm text-muted-foreground">
                      Report suspected violations or safety concerns
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>
                      All reports are reviewed within 48 hours. For urgent safety issues, please
                      contact local authorities immediately.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>
                  Fill out the form below to share your concerns or feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location/Mining Site</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="District or specific mining area"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Feedback Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="environmental">Environmental Concern</SelectItem>
                        <SelectItem value="social">Social Impact</SelectItem>
                        <SelectItem value="compliance">Compliance Issue</SelectItem>
                        <SelectItem value="corruption">Corruption Report</SelectItem>
                        <SelectItem value="general">General Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Please provide details about your feedback or concern..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
