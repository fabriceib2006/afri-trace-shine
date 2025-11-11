import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Database, Eye, UserCheck, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('privacy.lastUpdated')}
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.intro')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('privacy.introDesc')}
              </p>
            </section>

            {/* Information Collected */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.infoCollected')}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('privacy.personalInfo')}</h3>
                  <p className="text-sm text-foreground/70">{t('privacy.personalInfoDesc')}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('privacy.usageData')}</h3>
                  <p className="text-sm text-foreground/70">{t('privacy.usageDataDesc')}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('privacy.miningData')}</h3>
                  <p className="text-sm text-foreground/70">{t('privacy.miningDataDesc')}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('privacy.feedbackData')}</h3>
                  <p className="text-sm text-foreground/70">{t('privacy.feedbackDataDesc')}</p>
                </div>
              </div>
            </section>

            {/* How We Use */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.howWeUse')}
                </h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>{t('privacy.verify')}</li>
                <li>{t('privacy.improve')}</li>
                <li>{t('privacy.communicate')}</li>
                <li>{t('privacy.comply')}</li>
                <li>{t('privacy.analyze')}</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.dataSharing')}
                </h2>
              </div>
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">{t('privacy.authorities')}</h3>
                  <p className="text-sm text-foreground/70">{t('privacy.authoritiesDesc')}</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">{t('privacy.partners')}</h3>
                  <p className="text-sm text-foreground/70">{t('privacy.partnersDesc')}</p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold text-foreground mb-1">{t('privacy.serviceProviders')}</h3>
                  <p className="text-sm text-foreground/70">{t('privacy.serviceProvidersDesc')}</p>
                </div>
                <div className="border-l-4 border-muted pl-4">
                  <h3 className="font-semibold text-foreground mb-1">{t('privacy.legalRequirements')}</h3>
                  <p className="text-sm text-foreground/70">{t('privacy.legalRequirementsDesc')}</p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.dataSecurity')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('privacy.dataSecurityDesc')}
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.yourRights')}
                </h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>{t('privacy.accessRight')}</li>
                <li>{t('privacy.deleteRight')}</li>
                <li>{t('privacy.exportRight')}</li>
                <li>{t('privacy.withdrawRight')}</li>
                <li>{t('privacy.objectRight')}</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.dataRetention')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('privacy.dataRetentionDesc')}
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.childrenPrivacy')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('privacy.childrenPrivacyDesc')}
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.internationalTransfers')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('privacy.internationalTransfersDesc')}
              </p>
            </section>

            {/* Policy Changes */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('privacy.policyChanges')}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {t('privacy.policyChangesDesc')}
              </p>
            </section>

            {/* Contact */}
            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                {t('privacy.contactUs')}
              </h2>
              <p className="text-foreground/80 mb-4">{t('privacy.contactUsDesc')}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>{t('privacy.email')}</strong> <a href="mailto:fabriceib2005@gmail.com" className="text-primary hover:underline">fabriceib2005@gmail.com</a>
                </p>
                <p className="text-sm">
                  <strong>{t('privacy.phone')}</strong> +250 788 700 484
                </p>
                <p className="text-sm">
                  <strong>{t('privacy.address')}</strong>
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

export default PrivacyPolicy;
