import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/pages/HomePage/sections/HeroSection';
import OverviewSection from '@/pages/HomePage/sections/OverviewSection';
import DayDetailSection from '@/pages/HomePage/sections/DayDetailSection';
import BudgetSection from '@/pages/HomePage/sections/BudgetSection';
import TransportSection from '@/pages/HomePage/sections/TransportSection';
import BookingSection from '@/pages/HomePage/sections/BookingSection';
import TipsSection from '@/pages/HomePage/sections/TipsSection';
import ChecklistSection from '@/pages/HomePage/sections/ChecklistSection';

export default function HomePage() {
  const [sidebarMargin, setSidebarMargin] = useState(0);

  const handleSidebarStateChange = useCallback(
    ({ scrolled, expanded }: { scrolled: boolean; expanded: boolean }) => {
      // 桌面端：sidebar 激活时让出对应 margin
      if (scrolled && window.innerWidth >= 769) {
        setSidebarMargin(expanded ? 240 : 64);
      } else {
        setSidebarMargin(0);
      }
    },
    []
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBF8F3' }}>
      <Header onStateChange={handleSidebarStateChange} />

      <main className="sidebar-content" style={{ marginLeft: `${sidebarMargin}px` }}>
        <section id="hero" className="w-full">
          <HeroSection />
        </section>

        <section id="overview" className="w-full py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#FBF8F3' }}>
          <div className="absolute inset-0 bg-plum-pattern opacity-30 pointer-events-none" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <OverviewSection />
          </div>
        </section>

        <section id="day-section" className="w-full relative overflow-hidden" style={{ backgroundColor: '#fff' }}>
          <div className="absolute inset-0 bg-cloud-pattern opacity-5 pointer-events-none" />
          <DayDetailSection />
        </section>

        <section id="budget" className="w-full py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#FBF8F3' }}>
          <div className="absolute inset-0 bg-plum-pattern opacity-20 pointer-events-none" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <BudgetSection />
          </div>
        </section>

        <section id="transport" className="w-full py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#fff' }}>
          <div className="container mx-auto px-6 md:px-12">
            <TransportSection />
          </div>
        </section>

        <section id="booking" className="w-full py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#FBF8F3' }}>
          <div className="absolute inset-0 bg-plum-pattern opacity-25 pointer-events-none" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <BookingSection />
          </div>
        </section>

        <section id="tips" className="w-full py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#fff' }}>
          <div className="container mx-auto px-6 md:px-12">
            <TipsSection />
          </div>
        </section>

        <section id="checklist" className="w-full py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#FBF8F3' }}>
          <div className="absolute inset-0 bg-plum-pattern opacity-20 pointer-events-none" />
          <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
            <ChecklistSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
