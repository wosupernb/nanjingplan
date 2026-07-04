import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/pages/HomePage/sections/HeroSection';
import OverviewSection from '@/pages/HomePage/sections/OverviewSection';
import DayDetailSection from '@/pages/HomePage/sections/DayDetailSection';
import TransportSection from '@/pages/HomePage/sections/TransportSection';
import BookingSection from '@/pages/HomePage/sections/BookingSection';
import TipsSection from '@/pages/HomePage/sections/TipsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero 首屏 */}
        <section id="hero" className="w-full">
          <HeroSection />
        </section>

        {/* 行程总览 */}
        <section id="overview" className="w-full py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <OverviewSection />
          </div>
        </section>

        {/* 逐日详情 Day1-3 */}
        <section id="day1" className="w-full py-32 bg-slate-100">
          <div className="container mx-auto px-6 md:px-12">
            <DayDetailSection />
          </div>
        </section>

        {/* 交通票务 */}
        <section id="transport" className="w-full py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <TransportSection />
          </div>
        </section>

        {/* 景点预约提醒 */}
        <section id="booking" className="w-full py-32 bg-slate-100">
          <div className="container mx-auto px-6 md:px-12">
            <BookingSection />
          </div>
        </section>

        {/* 避坑指南 */}
        <section id="tips" className="w-full py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <TipsSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
