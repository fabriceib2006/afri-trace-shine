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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="rounded-xl overflow-hidden shadow-xl h-64 lg:h-auto">
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
                    <CardTitle>{t('Local Employment')}</CardTitle>
                    <CardDescription>{t('Jobs Created')}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('Direct Jobs')}</span>
                      <span className="text-2xl font-bold text-sustainability">3,284</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      85% {t('Local Hiring')}
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
                    <CardTitle>{t('Community Investment')}</CardTitle>
                    <CardDescription>{t('Projects Funded')}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('Total Investment')}</span>
                      <span className="text-2xl font-bold text-trust">$2.8M</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      156 {t('Projects Description')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Environmental Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-sustainability/10 shrink-0">
                    <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-sustainability" />
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight">{t('Environmental Compliance')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-sustainability mb-2">96%</div>
                <Progress value={96} className="h-2 mb-2" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t('Sites Standards')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 shrink-0">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight">{t('Women Empowerment')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-secondary mb-2">42%</div>
                <Progress value={42} className="h-2 mb-2" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t('Women Work force')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight">{t('Local Spending')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">78%</div>
                <Progress value={78} className="h-2 mb-2" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t('Local Suppliers')}
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
