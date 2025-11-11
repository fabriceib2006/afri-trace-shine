import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, CheckCircle2, Globe, Shield, Database, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const DataStandards = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              {t('dataStandards.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('dataStandards.subtitle')}
            </p>
          </div>

          <div className="grid gap-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <CardTitle>{t('dataStandards.overview')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  {t('dataStandards.overviewDesc')}
                </p>
              </CardContent>
            </Card>

            {/* Regulatory Frameworks */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle>{t('dataStandards.regulatory')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-2">{t('dataStandards.rwandaLaw')}</h3>
                  <p className="text-sm text-foreground/70">{t('dataStandards.rwandaLawDesc')}</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="font-semibold text-foreground mb-2">{t('dataStandards.icglr')}</h3>
                  <p className="text-sm text-foreground/70">{t('dataStandards.icglrDesc')}</p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold text-foreground mb-2">{t('dataStandards.oecd')}</h3>
                  <p className="text-sm text-foreground/70">{t('dataStandards.oecdDesc')}</p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold text-foreground mb-2">{t('dataStandards.euRegulation')}</h3>
                  <p className="text-sm text-foreground/70">{t('dataStandards.euRegulationDesc')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Standard Data Fields */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-primary" />
                  <CardTitle>{t('dataStandards.standardFields')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { field: t('dataStandards.certificateId'), desc: t('dataStandards.certificateIdDesc') },
                    { field: t('dataStandards.mineralType'), desc: t('dataStandards.mineralTypeDesc') },
                    { field: t('dataStandards.origin'), desc: t('dataStandards.originDesc') },
                    { field: t('dataStandards.batchCode'), desc: t('dataStandards.batchCodeDesc') },
                    { field: t('dataStandards.exportDate'), desc: t('dataStandards.exportDateDesc') },
                    { field: t('dataStandards.certification'), desc: t('dataStandards.certificationDesc') },
                  ].map((item, idx) => (
                    <div key={idx} className="border-b pb-3 last:border-0">
                      <h4 className="font-semibold text-foreground mb-1">{item.field}</h4>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Quality Standards */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <CardTitle>{t('dataStandards.dataQuality')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: t('dataStandards.accuracy'), desc: t('dataStandards.accuracyDesc') },
                    { title: t('dataStandards.completeness'), desc: t('dataStandards.completenessDesc') },
                    { title: t('dataStandards.timeliness'), desc: t('dataStandards.timelinessDesc') },
                    { title: t('dataStandards.consistency'), desc: t('dataStandards.consistencyDesc') },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interoperability */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle>{t('dataStandards.interoperability')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: t('dataStandards.restfulApi'), desc: t('dataStandards.restfulApiDesc') },
                    { title: t('dataStandards.csvExport'), desc: t('dataStandards.csvExportDesc') },
                    { title: t('dataStandards.ediIntegration'), desc: t('dataStandards.ediIntegrationDesc') },
                    { title: t('dataStandards.blockchainAnchoring'), desc: t('dataStandards.blockchainAnchoringDesc') },
                    { title: t('dataStandards.rmiCompliance'), desc: t('dataStandards.rmiComplianceDesc') },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-foreground/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle>{t('dataStandards.dataSecurity')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: t('dataStandards.encryption'), desc: t('dataStandards.encryptionDesc') },
                    { title: t('dataStandards.accessControl'), desc: t('dataStandards.accessControlDesc') },
                    { title: t('dataStandards.auditLogging'), desc: t('dataStandards.auditLoggingDesc') },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Versioning */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-6 w-6 text-primary" />
                  <CardTitle>{t('dataStandards.dataVersioning')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{t('dataStandards.dataVersioningDesc')}</p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dataStandards.questions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">{t('dataStandards.questionsDesc')}</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>{t('dataStandards.email')}</strong> <a href="mailto:fabriceib2005@gmail.com" className="text-primary hover:underline">fabriceib2005@gmail.com</a>
                  </p>
                  <p className="text-sm">
                    <strong>{t('dataStandards.phone')}</strong> +250 788 700 484
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default DataStandards;
