import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/HeroSection';
import CompanyBar from '@/components/home/CompanyBar';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedJobs from '@/components/home/FeaturedJobs';
import CTABanner from '@/components/home/CTABanner';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CompanyBar />
      <CategoryGrid />
      <FeaturedJobs />
      <CTABanner />
      <Footer />
    </div>
  );
}
