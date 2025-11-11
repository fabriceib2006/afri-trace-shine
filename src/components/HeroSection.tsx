import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, Users, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-mine.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to verify section
    const element = document.getElementById('verify');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="African mine site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight">
            {t('hero.title')}
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Quick Search */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 bg-background/95 backdrop-blur-sm p-2 rounded-xl shadow-xl">
              <Input
                type="text"
                placeholder="Enter batch or certificate code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 text-base"
              />
              <Button type="submit" size="lg" className="bg-secondary hover:bg-secondary/90 w-full sm:w-auto">
                <Search className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">{t('hero.cta')}</span>
                <span className="sm:hidden">Search</span>
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="bg-background/10 backdrop-blur-md rounded-xl p-6 border border-primary-foreground/20">
              <Shield className="h-10 w-10 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-heading font-bold text-primary-foreground">
                2,547
              </div>
              <div className="text-sm text-primary-foreground/80">
                Verified Minerals
              </div>
            </div>

            <div className="bg-background/10 backdrop-blur-md rounded-xl p-6 border border-primary-foreground/20">
              <Users className="h-10 w-10 text-sustainability mx-auto mb-3" />
              <div className="text-3xl font-heading font-bold text-primary-foreground">
                156
              </div>
              <div className="text-sm text-primary-foreground/80">
                Community Projects
              </div>
            </div>

            <div className="bg-background/10 backdrop-blur-md rounded-xl p-6 border border-primary-foreground/20">
              <TrendingUp className="h-10 w-10 text-trust mx-auto mb-3" />
              <div className="text-3xl font-heading font-bold text-primary-foreground">
                98%
              </div>
              <div className="text-sm text-primary-foreground/80">
                Transparency Score
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
