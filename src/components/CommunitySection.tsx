import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Briefcase, Heart, Leaf } from "lucide-react";
import communityImage from "@/assets/community-impact.jpg";
import { useTranslation } from "react-i18next";

const CommunitySection = () => {
  const { t } = useTranslation();

  return (
    <section id="community" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
              {t('community.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('community.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src={communityImage}
                alt={t('community.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats Cards */}
            <div className="space-y-6">
              <Card className="border-sustainability/50">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-lg bg-sustainability/10">
                    <Briefcase className="h-6 w-6 text-sustainability" />
                  </div>
                  <div>
                    <CardTitle>{t('community.localEmployment')}</CardTitle>
                    <CardDescription>{t('community.jobsCreated')}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('community.directJobs')}</span>
                      <span className="text-2xl font-bold text-sustainability">3,284</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      85% {t('community.localHiring')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-trust/50">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-lg bg-trust/10">
                    <Heart className="h-6 w-6 text-trust" />
                  </div>
                  <div>
                    <CardTitle>{t('community.communityInvestment')}</CardTitle>
                    <CardDescription>{t('community.projectsFunded')}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('community.totalInvestment')}</span>
                      <span className="text-2xl font-bold text-trust">$2.8M</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      156 {t('community.projectsDescription')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Environmental Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sustainability/10">
                    <Leaf className="h-5 w-5 text-sustainability" />
                  </div>
                  <CardTitle className="text-lg">{t('community.environmentalCompliance')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sustainability mb-2">96%</div>
                <Progress value={96} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {t('community.sitesStandards')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">{t('community.womenEmpowerment')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">42%</div>
                <Progress value={42} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {t('community.womenWorkforce')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{t('community.localSpending')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">78%</div>
                <Progress value={78} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {t('community.localSuppliers')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
