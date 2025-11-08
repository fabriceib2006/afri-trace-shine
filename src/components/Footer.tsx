import { Mountain, Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="h-8 w-8 text-secondary" />
              <span className="text-2xl font-heading font-bold">AfriTrace</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Building trust in Africa's mineral future through transparency and community engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#verify" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Verify Minerals
                </a>
              </li>
              <li>
                <a href="#community" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Community Impact
                </a>
              </li>
              <li>
                <a href="#education" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Education Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Data Standards
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold mb-4">Contact</h3>
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
          <p>&copy; {new Date().getFullYear()} AfriTrace. All rights reserved.</p>
          <p className="mt-2">
            Built for transparency, powered by community.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;