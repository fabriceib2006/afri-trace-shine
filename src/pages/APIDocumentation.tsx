import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Code, Database, Key, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const APIDocumentation = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              {t('apiDocs.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('apiDocs.subtitle')}
            </p>
          </div>

          <div className="grid gap-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-primary" />
                  <CardTitle>{t('apiDocs.overview')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80">
                  {t('apiDocs.overviewDesc')}
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-mono text-foreground">
                    {t('apiDocs.baseUrl')}: <span className="text-primary">https://api.afritrace.rw/v1</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Authentication */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Key className="h-6 w-6 text-primary" />
                  <CardTitle>{t('apiDocs.authentication')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80">
                  {t('apiDocs.authDesc')}
                </p>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <pre className="text-sm text-green-400 overflow-x-auto">
                    <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.afritrace.rw/v1/certificates/verify`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Endpoints */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Code className="h-6 w-6 text-primary" />
                  <CardTitle>{t('apiDocs.endpoints')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Verify Certificate */}
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('apiDocs.verifyEndpoint')}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    {t('apiDocs.verifyDesc')}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">{t('apiDocs.requestBody')}</p>
                      <div className="bg-slate-900 p-3 rounded">
                        <pre className="text-xs text-green-400">
                          <code>{`{
  "certificate_code": "MCIS-2024-001",
  "batch_code": "optional"
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">{t('apiDocs.response')}</p>
                      <div className="bg-slate-900 p-3 rounded">
                        <pre className="text-xs text-green-400">
                          <code>{`{
  "status": "verified",
  "mineral_type": "Coltan",
  "origin": "Rulindo District",
  "mine_site": "Gatsibo Mine",
  "export_date": "2024-09-15",
  "verified_by_rema": true,
  "icglr_compliant": true,
  "certification_status": "Active"
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* List Certificates */}
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('apiDocs.listEndpoint')}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    {t('apiDocs.listDesc')}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">{t('apiDocs.queryParams')}</p>
                      <ul className="text-sm space-y-1 text-foreground/70">
                        <li><code className="bg-muted px-2 py-1 rounded">page</code> - {t('apiDocs.page')}</li>
                        <li><code className="bg-muted px-2 py-1 rounded">limit</code> - {t('apiDocs.limit')}</li>
                        <li><code className="bg-muted px-2 py-1 rounded">mineral_type</code> - {t('apiDocs.mineralType')}</li>
                        <li><code className="bg-muted px-2 py-1 rounded">origin</code> - {t('apiDocs.origin')}</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">{t('apiDocs.exampleRequest')}</p>
                      <div className="bg-slate-900 p-3 rounded">
                        <pre className="text-xs text-green-400">
                          <code>{`GET /certificates?page=1&limit=10&mineral_type=Coltan`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Feedback */}
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('apiDocs.feedbackEndpoint')}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    {t('apiDocs.feedbackDesc')}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">{t('apiDocs.requestBody')}</p>
                      <div className="bg-slate-900 p-3 rounded">
                        <pre className="text-xs text-green-400">
                          <code>{`{
  "title": "Water contamination concern",
  "category": "environmental",
  "description": "Detailed description...",
  "location": "Rulindo District"
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rate Limits */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle>{t('apiDocs.rateLimits')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{t('apiDocs.rateLimitsTitle')}</p>
                      <p className="text-sm text-foreground/70">{t('apiDocs.rateLimitsDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{t('apiDocs.caching')}</p>
                      <p className="text-sm text-foreground/70">{t('apiDocs.cachingDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{t('apiDocs.batch')}</p>
                      <p className="text-sm text-foreground/70">{t('apiDocs.batchDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{t('apiDocs.errorHandling')}</p>
                      <p className="text-sm text-foreground/70">{t('apiDocs.errorHandlingDesc')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Codes */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                  <CardTitle>{t('apiDocs.errorCodes')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { code: "200", desc: t('apiDocs.error200') },
                    { code: "400", desc: t('apiDocs.error400') },
                    { code: "401", desc: t('apiDocs.error401') },
                    { code: "404", desc: t('apiDocs.error404') },
                    { code: "429", desc: t('apiDocs.error429') },
                    { code: "500", desc: t('apiDocs.error500') },
                  ].map((error) => (
                    <div key={error.code} className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <code className="font-mono font-bold text-lg text-foreground">{error.code}</code>
                      <p className="text-sm text-foreground/80">{error.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>{t('apiDocs.needHelp')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">
                  {t('apiDocs.helpDesc')}
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>{t('apiDocs.email')}</strong> <a href="mailto:fabriceib2005@gmail.com" className="text-primary hover:underline">fabriceib2005@gmail.com</a>
                  </p>
                  <p className="text-sm">
                    <strong>{t('apiDocs.phone')}</strong> +250 788 700 484
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

export default APIDocumentation;
