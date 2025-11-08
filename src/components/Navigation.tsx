import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-bold text-primary">AfriTrace</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection('verify')} className="text-foreground hover:text-primary transition-colors">
              {t('nav.verify')}
            </button>
            <button onClick={() => scrollToSection('community')} className="text-foreground hover:text-primary transition-colors">
              {t('nav.community')}
            </button>
            <button onClick={() => scrollToSection('education')} className="text-foreground hover:text-primary transition-colors">
              {t('nav.education')}
            </button>
            <button onClick={() => scrollToSection('feedback-section')} className="text-foreground hover:text-primary transition-colors">
              {t('nav.report')}
            </button>
            
            <LanguageSwitcher />
            
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate('/dashboard')} className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.dashboard')}
                </Button>
                <Button variant="ghost" onClick={handleSignOut} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.signOut')}
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')}>{t('nav.signIn')}</Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <div className="mb-4">
              <LanguageSwitcher />
            </div>
            <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection('verify')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              {t('nav.verify')}
            </button>
            <button onClick={() => scrollToSection('community')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              {t('nav.community')}
            </button>
            <button onClick={() => scrollToSection('education')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              {t('nav.education')}
            </button>
            <button onClick={() => scrollToSection('feedback-section')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
              {t('nav.report')}
            </button>
            {user ? (
              <>
                <Button variant="ghost" onClick={() => { navigate('/dashboard'); setIsOpen(false); }} className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.dashboard')}
                </Button>
                <Button variant="ghost" onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.signOut')}
                </Button>
              </>
            ) : (
              <Button onClick={() => { navigate('/auth'); setIsOpen(false); }} className="w-full">
                {t('nav.signIn')}
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
