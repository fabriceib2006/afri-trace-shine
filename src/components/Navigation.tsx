import { Button } from "@/components/ui/button";
import { Mountain, Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="h-8 w-8 text-secondary" />
            <span className="text-2xl font-heading font-bold text-primary">
              AfriTrace
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('verify')}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Verify
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection('education')}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Learn
            </button>
            <button
              onClick={() => scrollToSection('feedback')}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Report
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left py-2 text-foreground hover:text-secondary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('verify')}
              className="block w-full text-left py-2 text-foreground hover:text-secondary transition-colors"
            >
              Verify
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className="block w-full text-left py-2 text-foreground hover:text-secondary transition-colors"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection('education')}
              className="block w-full text-left py-2 text-foreground hover:text-secondary transition-colors"
            >
              Learn
            </button>
            <button
              onClick={() => scrollToSection('feedback')}
              className="block w-full text-left py-2 text-foreground hover:text-secondary transition-colors"
            >
              Report
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
