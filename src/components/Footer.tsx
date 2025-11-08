import { Mountain, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="h-8 w-8 text-secondary" />
              <span className="text-2xl font-heading font-bold">AfriTrace</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {t('footer.home')}
                </a>
              </li>
              <li>
                <a href="#verify" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {t('footer.verify')}
                </a>
              </li>
              <li>
                <a href="#community" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {t('footer.community')}
                </a>
              </li>
              <li>
                <a href="#education" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {t('footer.education')}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-bold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/api-docs" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {t('footer.apiDocs')}
                </a>
              </li>
              <li>
                <a href="/data-standards" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {t('footer.dataStandards')}
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-secondary" />
                <span className="text-primary-foreground/80">Fabriceib2005@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-secondary" />
                <span className="text-primary-foreground/80">+250 788 700 484</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-secondary" />
                <span className="text-primary-foreground/80">
                  Kigali, Rwanda<br />
                  KN 4 Ave, Nyarugenge
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          <p className="mt-2">
            {t('footer.builtFor')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
