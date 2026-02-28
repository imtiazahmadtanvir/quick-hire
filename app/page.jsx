import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/HeroSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
