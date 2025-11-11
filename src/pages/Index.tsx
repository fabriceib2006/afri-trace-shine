import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TraceabilitySection from "@/components/TraceabilitySection";
import CommunitySection from "@/components/CommunitySection";
import EducationSection from "@/components/EducationSection";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <TraceabilitySection />
        <CommunitySection />
        <EducationSection />
        <FeedbackSection />
      </main>
      <Footer />
    </div>;
};
export default Index;