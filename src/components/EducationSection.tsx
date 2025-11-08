import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const EducationSection = () => {
  const { t } = useTranslation();
  const [selectedResource, setSelectedResource] = useState<number | null>(null);

  const resources = [
    {
      id: 'blockchain',
      icon: BookOpen,
      color: "text-trust",
      bgColor: "bg-trust/10",
      content: "Blockchain technology creates an immutable record of every transaction in the mineral supply chain. Each block contains verified information about the mineral's origin, processing, and transportation. This ensures that once data is recorded, it cannot be altered, providing unprecedented transparency and trust in the mineral certification process."
    },
    {
      id: 'heritage',
      icon: Video,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      content: "Rwanda's mining sector has transformed significantly over the past decade. Through sustainable practices and community engagement, mining operations now contribute to local development while preserving natural resources. This documentary showcases real stories of communities benefiting from responsible mining, including infrastructure development, job creation, and environmental conservation efforts."
    },
    {
      id: 'certification',
      icon: FileText,
      color: "text-sustainability",
      bgColor: "bg-sustainability/10",
      content: "The International Conference on the Great Lakes Region (ICGLR) established comprehensive standards for conflict-free mineral certification. This guide explains the certification process, including site inspection, chain of custody documentation, and third-party audits. Understanding these standards helps ensure your minerals are ethically sourced and compliant with international regulations."
    },
    {
      id: 'esg',
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
      content: "Environmental, Social, and Governance (ESG) frameworks are revolutionizing African mining operations. These comprehensive guidelines address environmental protection, community welfare, worker safety, and transparent governance. Mining companies implementing strong ESG practices demonstrate reduced environmental impact, improved community relations, and better long-term sustainability. This report examines successful ESG implementations across African mining operations."
    },
    {
      id: 'geology',
      icon: BookOpen,
      color: "text-trust",
      bgColor: "bg-trust/10",
      content: "Africa's geological diversity makes it one of the world's richest mineral regions. This course introduces the formation processes of major mineral deposits, including the role of tectonic activity, volcanic processes, and weathering. Learn to identify different mineral types, understand geological mapping, and appreciate the unique characteristics of African mineral formations. Topics include ore genesis, mineral identification, and sustainable extraction methods."
    },
    {
      id: 'stories',
      icon: Video,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      content: "Real voices from mining communities tell powerful stories of transformation. Meet families whose lives changed through fair employment, students attending schools built by mining revenue, and healthcare workers serving clinics funded by community development programs. These authentic narratives demonstrate how responsible mining creates lasting positive impact, from improved education access to economic empowerment and social infrastructure development."
    }
  ];

  const getTopics = (id: string) => {
    const topicsMap: Record<string, string[]> = {
      'blockchain': ['blockchain', 'supplyChain', 'transparency'],
      'heritage': ['sustainability', 'community', 'heritage'],
      'certification': ['icglr', 'certification', 'ethics'],
      'esg': ['esg', 'governance', 'impact'],
      'geology': ['geology', 'science', 'education'],
      'stories': ['community', 'impact', 'stories']
    };
    return topicsMap[id] || [];
  };

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
              {t('education.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('education.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => setSelectedResource(index)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${resource.bgColor}`}>
                        <Icon className={`h-6 w-6 ${resource.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-semibold uppercase tracking-wide ${resource.color}`}>
                            {t(`education.resources.${resource.id}.type`)}
                          </span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <CardTitle className="text-xl mb-2">
                          {t(`education.resources.${resource.id}.title`)}
                        </CardTitle>
                        <CardDescription className="mb-3">
                          {t(`education.resources.${resource.id}.description`)}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1">
                          {getTopics(resource.id).map((topic, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                            >
                              {t(`education.topics.${topic}`)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {t('education.accessResource')}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Resource Detail Dialog */}
          <Dialog open={selectedResource !== null} onOpenChange={() => setSelectedResource(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              {selectedResource !== null && (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${resources[selectedResource].bgColor}`}>
                        {(() => {
                          const Icon = resources[selectedResource].icon;
                          return <Icon className={`h-6 w-6 ${resources[selectedResource].color}`} />;
                        })()}
                      </div>
                      <div>
                        <span className={`text-xs font-semibold uppercase tracking-wide ${resources[selectedResource].color} block mb-1`}>
                          {t(`education.resources.${resources[selectedResource].id}.type`)}
                        </span>
                        <DialogTitle className="text-left">
                          {t(`education.resources.${resources[selectedResource].id}.title`)}
                        </DialogTitle>
                      </div>
                    </div>
                    <DialogDescription className="text-left">
                      {t(`education.resources.${resources[selectedResource].id}.description`)}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="text-foreground leading-relaxed">
                      {resources[selectedResource].content}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {getTopics(resources[selectedResource].id).map((topic, i) => (
                        <span
                          key={i}
                          className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {t(`education.topics.${topic}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-heading font-bold mb-3">
                  {t('education.learnMore')}
                </h3>
                <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                  {t('education.learnMoreDescription')}
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  {t('education.exploreLibrary')}
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
