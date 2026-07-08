import { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { MOCK_ITINERARY } from '@/data/itinerary';
import type { IItineraryDay } from '@/data/itinerary';
import { useGsapReveal } from '@/hooks/useGsap';

interface OverviewNode {
  id: string;
  day: number;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  anchor: string;
  icon: string;
}

const DAY_COLORS: Record<number, string> = {
  1: '#B84233',
  2: '#C4A265',
  3: '#4A7C6F',
  4: '#3D4F5F',
};

const OVERVIEW_DAYS: OverviewNode[] = [
  ...MOCK_ITINERARY.map((d: IItineraryDay) => ({
    id: d.id,
    day: d.day,
    title: d.title,
    subtitle: d.subtitle,
    date: d.date,
    description: `${d.spots.length} 个景点 · 门票 ¥${d.dailyTotal}`,
    anchor: `#day${d.day}`,
    icon: d.day === 1 ? '⛴️' : d.day === 2 ? '🏛️' : d.day === 3 ? '🌿' : '🕊️',
  })),
];

function OverviewSection() {
  const headerRef = useGsapReveal<HTMLDivElement>({
    y: 20,
    duration: 0.6,
    start: 'top 85%',
  });
  const desktopTimelineRef = useGsapReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.1,
    delay: 0.15,
    start: 'top 80%',
  });
  const mobileTimelineRef = useGsapReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.1,
    delay: 0.15,
    start: 'top 90%',
  });

  const handleNodeClick = (anchor: string) => {
    const id = anchor.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getDayColor = (day: number) => DAY_COLORS[day] || '#B84233';

  return (
    <section className="w-full">
      <div ref={headerRef} className="text-center mb-16 md:mb-20 will-change-transform">
        <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#6B7B8C' }}>
          Itinerary Overview
        </span>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight font-[family-name:var(--font-serif)] relative inline-block" style={{ color: '#1A2332' }}>
          行程总览
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #B84233, #C4A265)' }} />
        </h2>
        <p className="mt-8 text-base font-light max-w-lg mx-auto leading-relaxed" style={{ color: '#6B7B8C' }}>
          4天3晚，从浦口半日游到钟山深度游，再到铭记线返程
        </p>
      </div>

      <div
        ref={desktopTimelineRef}
        className="hidden md:block will-change-transform"
      >
        <div className="flex items-start justify-between gap-3 relative perspective-1500">
          <div className="absolute top-5 left-8 right-8 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #C4A265, #B84233)' }} />

          {OVERVIEW_DAYS.map((node) => {
            const dayColor = getDayColor(node.day);
            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node.anchor)}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 rounded-2xl transition-all duration-500 hover:-translate-y-3 will-change-transform relative perspective-1000"
                style={{ '--tw-ring-color': dayColor } as React.CSSProperties}
              >
                <span className="text-5xl font-light font-[family-name:var(--font-serif)] mb-2 transition-all duration-500 group-hover:scale-110" style={{ color: `${dayColor}20` }}>
                  {String(node.day).padStart(2, '0')}
                </span>

                <div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:scale-110"
                  style={{
                    backgroundColor: dayColor,
                    boxShadow: `0 4px 12px ${dayColor}30`,
                  }}
                >
                  <span className="text-lg">{node.icon}</span>
                </div>

                <div className="mt-4 px-5 py-2.5 rounded-full bg-white border card-3d shadow-layered-hover group-hover:shadow-xl transition-all duration-500" style={{ borderColor: `${dayColor}20` }}>
                  <span className="text-sm font-semibold transition-colors duration-300" style={{ color: '#1A2332' }}>
                    {node.title}
                  </span>
                </div>

                <span className="mt-2.5 text-[11px] font-medium tracking-widest uppercase" style={{ color: '#8FA0B0' }}>
                  {node.date}
                </span>

                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-2xl p-4 text-left shadow-layered" style={{ border: `1px solid ${dayColor}15` }}>
                    <p className="text-xs leading-relaxed" style={{ color: '#6B7B8C' }}>
                      {node.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={mobileTimelineRef}
        className="md:hidden will-change-transform"
      >
        <div className="relative perspective-1500">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 rounded-full" style={{ background: 'linear-gradient(180deg, #C4A265, #B84233)' }} />

          <div className="space-y-6">
            {OVERVIEW_DAYS.map((node) => {
              const dayColor = getDayColor(node.day);
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node.anchor)}
                  className="group flex items-start gap-5 w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-2xl transition-all duration-300 hover:translate-x-2 will-change-transform perspective-1000"
                  style={{ '--tw-ring-color': dayColor } as React.CSSProperties}
                >
                  <div className="relative z-10 shrink-0 mt-4">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-125"
                      style={{
                        backgroundColor: dayColor,
                        boxShadow: `0 4px 12px ${dayColor}30`,
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 bg-white rounded-2xl p-4 card-3d shadow-layered-hover group-hover:shadow-xl transition-all duration-500" style={{ border: `1px solid ${dayColor}15` }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: dayColor }}>
                        {node.day === 0 ? '出发' : node.day === 4 ? '归途' : `Day ${node.day}`}
                      </span>
                      <ArrowRight className="size-3" style={{ color: dayColor }} />
                      <span className="text-xs" style={{ color: '#8FA0B0' }}>{node.date}</span>
                    </div>
                    <span className="text-base font-semibold" style={{ color: '#1A2332' }}>
                      {node.title}
                    </span>
                    <span className="text-sm ml-1.5" style={{ color: '#6B7B8C' }}>
                      · {node.subtitle}
                    </span>
                    <p className="mt-1.5 text-xs leading-relaxed" style={{ color: '#8FA0B0' }}>
                      {node.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(OverviewSection);
