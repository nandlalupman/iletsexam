import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import UniversityMarquee from '@/components/UniversityMarquee';
import CourseShowcase from '@/components/CourseShowcase';
import ResultsSection from '@/components/ResultsSection';
import FeaturesSection from '@/components/FeaturesSection';
import MobileAppFeature from '@/components/MobileAppFeature';
import ScrollExperience from '@/components/ScrollExperience';
import Testimonials from '@/components/Testimonials';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookDemoModal from '@/components/BookDemoModal';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <UniversityMarquee />
      <FeaturesSection />
      <MobileAppFeature />
      <CourseShowcase />
      <ScrollExperience />
      <ResultsSection />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
      <BookDemoModal />
    </main>
  );
}
