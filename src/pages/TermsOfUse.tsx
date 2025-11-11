import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Scale, AlertTriangle, CheckCircle2, XCircle, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const TermsOfUse = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              {t('terms.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('terms.lastUpdated')}
            </p>
          </div>

          <div className="space-y-8">
            {/* Acceptance */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('terms.acceptance')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('terms.acceptanceDesc')}
              </p>
            </section>

            {/* Platform Use */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('terms.platformUse')}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('terms.eligibility')}</h3>
                  <p className="text-sm text-foreground/70">{t('terms.eligibilityDesc')}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('terms.accountResp')}</h3>
                  <p className="text-sm text-foreground/70">{t('terms.accountRespDesc')}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('terms.prohibited')}</h3>
                  <p className="text-sm text-foreground/70">{t('terms.prohibitedDesc')}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('terms.compliance')}</h3>
                  <p className="text-sm text-foreground/70">{t('terms.complianceDesc')}</p>
                </div>
              </div>
            </section>

            {/* Mining Data */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('terms.miningData')}
                </h2>
              </div>
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">{t('terms.dataAccuracy')}</h3>
                  <p className="text-sm text-foreground/70">{t('terms.dataAccuracyDesc')}</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">{t('terms.thirdPartyData')}</h3>
                  <p className="text-sm text-foreground/70">{t('terms.thirdPartyDataDesc')}</p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold text-foreground mb-1">{t('terms.updates')}</h3>
                  <p className="text-sm text-foreground/70">{t('terms.updatesDesc')}</p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('terms.intellectualProperty')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('terms.intellectualPropertyDesc')}
              </p>
            </section>

            {/* Prohibited Conduct */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="h-6 w-6 text-destructive" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('terms.prohibitedConduct')}
                </h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>{t('terms.reverseEngineering')}</li>
                <li>{t('terms.interfere')}</li>
                <li>{t('terms.scraping')}</li>
                <li>{t('terms.impersonation')}</li>
                <li>{t('terms.maliciousCode')}</li>
              </ul>
            </section>

            {/* Liability */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('terms.liability')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('terms.liabilityDesc')}
              </p>
            </section>

            {/* Termination */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('terms.termination')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('terms.terminationDesc')}
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('terms.governingLaw')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('terms.governingLawDesc')}
              </p>
            </section>

            {/* Terms Changes */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('terms.termsChanges')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('terms.termsChangesDesc')}
              </p>
            </section>

            {/* Contact */}
            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                {t('terms.contactInfo')}
              </h2>
              <p className="text-foreground/80 mb-4">{t('terms.contactInfoDesc')}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>{t('terms.email')}</strong> <a href="mailto:fabriceib2005@gmail.com" className="text-primary hover:underline">fabriceib2005@gmail.com</a>
                </p>
                <p className="text-sm">
                  <strong>{t('terms.phone')}</strong> +250 788 700 484
                </p>
                <p className="text-sm">
                  <strong>{t('terms.address')}</strong>
                </p>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
