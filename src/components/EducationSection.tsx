import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";

const EducationSection = () => {
  const resources = [
    {
      icon: BookOpen,
      title: "Understanding Mineral Traceability",
      description: "Learn how blockchain technology ensures transparency in the mineral supply chain",
      type: "Article",
      color: "text-trust",
      bgColor: "bg-trust/10"
    },
    {
      icon: Video,
      title: "Rwanda's Mining Heritage",
      description: "Documentary on sustainable mining practices and community development",
      type: "Video",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: FileText,
      title: "Geology 101: African Minerals",
      description: "Basic introduction to mineral formation and geological processes",
      type: "Guide",
      color: "text-sustainability",
      bgColor: "bg-sustainability/10"
    },
    {
      icon: FileText,
      title: "ESG in Mining",
      description: "How environmental and social governance creates lasting community benefit",
      type: "Report",
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
              Educational Hub
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore resources about mineral traceability, geology, and community impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${resource.bgColor}`}>
                        <Icon className={`h-6 w-6 ${resource.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-semibold uppercase tracking-wide ${resource.color}`}>
                            {resource.type}
                          </span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-heading font-bold mb-3">
                  Want to Learn More?
                </h3>
                <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                  Access our complete library of educational materials, training programs, and
                  community workshops about responsible mining practices.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Explore Full Library
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
