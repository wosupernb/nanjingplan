import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MOCK_ITINERARY } from '@/data/itinerary';
import type { IItineraryDay } from '@/data/itinerary';

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

const OVERVIEW_DAYS: OverviewNode[] = [
  {
    id: '0',
    day: 0,
    title: '抵达南京',
    subtitle: '深夜航班',
    date: '7月14日',
    description: 'MU2966 南宁→南京 · 23:25出发',
    anchor: '#hero',
    icon: '✈️',
  },
  ...MOCK_ITINERARY.map((d: IItineraryDay) => ({
    id: d.id,
    day: d.day,
    title: d.title,
    subtitle: d.subtitle,
    date: d.date,
    description: `${d.spots.length} 个景点 · 门票 ¥${d.dailyTotal}`,
    anchor: `#day${d.day}`,
    icon: d.day === 1 ? '🏛️' : d.day === 2 ? '🌿' : '🕊️',
  })),
  {
    id: '4',
    day: 4,
    title: '返程归途',
    subtitle: '火车慢旅',
    date: '7月17日',
    description: 'K1557 南京→南宁 · 14:36出发',
    anchor: '#transport',
    icon: '🚂',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function OverviewSection() {
  const handleNodeClick = (anchor: string) => {
    const id = anchor.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="overview" className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="text-center mb-16 md:mb-20"
      >
        <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-4">
          Itinerary Overview
        </span>
        <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight font-[family-name:var(--font-serif)]">
          行程总览
        </h2>
        <p className="mt-4 text-base font-light text-slate-500 max-w-lg mx-auto leading-relaxed">
          3天2晚，从深夜航班抵达，到火车慢旅归途
        </p>
      </motion.div>

      {/* Desktop: Horizontal pill timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="hidden md:block"
      >
        <div className="flex items-start justify-between gap-3 relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-8 right-8 h-px bg-slate-200" />

          {OVERVIEW_DAYS.map((node) => (
            <motion.button
              key={node.id}
              variants={itemVariants}
              onClick={() => handleNodeClick(node.anchor)}
              className="group flex flex-col items-center text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4 rounded-2xl"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative number */}
              <span className="text-5xl font-light text-slate-200 font-[family-name:var(--font-serif)] mb-2 group-hover:text-slate-200 transition-colors duration-500">
                {String(node.day).padStart(2, '0')}
              </span>

              {/* Pill node */}
              <div className="relative z-10 px-5 py-2.5 rounded-full bg-white border border-slate-100 shadow-sm group-hover:shadow-lg group-hover:border-slate-200 group-hover:bg-slate-50/50 transition-all duration-300">
                <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-700 transition-colors duration-300">
                  {node.title}
                </span>
              </div>

              {/* Date */}
              <span className="mt-2.5 text-[11px] font-medium tracking-widest uppercase text-slate-400">
                {node.date}
              </span>

              {/* Tooltip on hover */}
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 translate-y-2 group-hover:translate-y-0">
                <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-4 text-left">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mobile: Vertical pill list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="md:hidden"
      >
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200" />

          <div className="space-y-6">
            {OVERVIEW_DAYS.map((node) => (
              <motion.button
                key={node.id}
                variants={itemVariants}
                onClick={() => handleNodeClick(node.anchor)}
                className="group flex items-start gap-5 w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 rounded-2xl"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25 }}
              >
                {/* Node dot */}
                <div className="relative z-10 shrink-0 mt-1">
                  <div className="w-[10px] h-[10px] rounded-full bg-slate-300 group-hover:bg-slate-500 group-hover:scale-125 transition-all duration-300" />
                </div>

                {/* Content card */}
                <div className="flex-1 min-w-0 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm group-hover:shadow-md group-hover:border-slate-200 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                      {node.day === 0 ? '出发' : node.day === 4 ? '归途' : `Day ${node.day}`}
                    </span>
                    <ArrowRight className="size-3 text-slate-300" />
                    <span className="text-xs text-slate-400">{node.date}</span>
                  </div>
                  <span className="text-base font-semibold text-slate-800">
                    {node.title}
                  </span>
                  <span className="text-sm text-slate-400 ml-1.5">
                    · {node.subtitle}
                  </span>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default memo(OverviewSection);
