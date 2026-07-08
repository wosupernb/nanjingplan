import { memo, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb, ShieldAlert, Clock, Train, Home, Heart, UtensilsCrossed,
  Bike, Moon, ShoppingBag, Bus, MapPin, AlertTriangle, Info, ChevronDown
} from 'lucide-react';
import { MOCK_TIPS } from '@/data/tips';
import type { ITip } from '@/data/tips';
import { useGsapReveal } from '@/hooks/useGsap';

const ICON_MAP: Record<string, typeof Lightbulb> = {
  '🏛️': ShieldAlert,
  '🛍️': ShoppingBag,
  '⏰': Clock,
  '🚇': Train,
  '🏠': Home,
  '🕊️': Heart,
  '🍜': UtensilsCrossed,
  '🚲': Bike,
  '🌃': Moon,
  '🛒': ShoppingBag,
  '🚌': Bus,
  '📍': MapPin,
  '⚠️': AlertTriangle,
  '💡': Lightbulb,
  'ℹ️': Info,
};

const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string; icon: typeof Lightbulb }> = {
  '美食购物': { label: '美食购物', color: 'bg-[#C4A265]/10 text-[#C4A265] border-[#C4A265]/20', bg: 'bg-[#C4A265]/10', icon: ShoppingBag },
  '交通出行': { label: '交通出行', color: 'bg-[#6B7B8C]/10 text-[#6B7B8C] border-[#6B7B8C]/20', bg: 'bg-[#6B7B8C]/10', icon: Bus },
  '景点游玩': { label: '景点游玩', color: 'bg-[#B84233]/10 text-[#B84233] border-[#B84233]/20', bg: 'bg-[#B84233]/10', icon: MapPin },
  '其他': { label: '其他', color: 'bg-[#4A7C6F]/10 text-[#4A7C6F] border-[#4A7C6F]/20', bg: 'bg-[#4A7C6F]/10', icon: Info },
};

const CATEGORY_ORDER = ['美食购物', '交通出行', '景点游玩', '其他'] as const;

function TipCard({ tip, index }: { tip: ITip; index: number }) {
  const IconComp = ICON_MAP[tip.icon] || Lightbulb;
  const cfg = CATEGORY_CONFIG[tip.category] || CATEGORY_CONFIG['其他'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2), ease: [0.16, 1, 0.3, 1] as const }}
      className="card-3d group relative rounded-3xl border border-slate-100 bg-white p-6 will-change-transform"
    >
      <div className="flex items-start gap-4">
        <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:bg-[#C4A265] group-hover:text-white ${cfg.bg} ${tip.category === '美食购物' ? 'text-[#C4A265]' : tip.category === '交通出行' ? 'text-[#6B7B8C]' : tip.category === '景点游玩' ? 'text-[#B84233]' : 'text-[#4A7C6F]'}`}>
          <IconComp className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-800">{tip.title}</h4>
            <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${cfg.color}`}>
              {cfg.label}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">{tip.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(function TipsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [showAll, setShowAll] = useState(false);

  // 区块标题滚动揭示动画（GSAP）
  const headerRef = useGsapReveal<HTMLDivElement>({
    y: 20,
    duration: 0.5,
    start: 'top 85%',
  });
  // 分类筛选标签滚动揭示动画
  const filterRef = useGsapReveal<HTMLDivElement>({
    y: 12,
    duration: 0.4,
    delay: 0.1,
    stagger: 0.05,
    start: 'top 90%',
  });

  const grouped = useMemo(() => {
    const map: Record<string, ITip[]> = {};
    for (const cat of CATEGORY_ORDER) map[cat] = [];
    for (const tip of MOCK_TIPS) {
      const cat = map[tip.category] ? tip.category : '其他';
      map[cat].push(tip);
    }
    return map;
  }, []);

  const filteredTips = useMemo(() => {
    if (activeCategory === '全部') {
      return MOCK_TIPS;
    }
    return grouped[activeCategory] || [];
  }, [activeCategory, grouped]);

  const displayedTips = showAll ? filteredTips : filteredTips.slice(0, 6);

  return (
    <div>
      {/* section header */}
      <div ref={headerRef} className="mb-12 text-center will-change-transform">
        <span className="inline-block rounded-full border border-[#B84233]/20 bg-[#B84233]/10 px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B84233]">
          避坑指南
        </span>
        <h2 className="mt-6 font-serif text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          本地人不会告诉你的 <span className="text-[#B84233]">省钱秘诀</span>
        </h2>
        <p className="mt-4 text-lg font-light leading-relaxed text-slate-500">
          踩过的坑就别再踩了，帮你省下冤枉钱
        </p>
      </div>

      {/* category filter tabs */}
      <div ref={filterRef} className="mb-10 flex flex-wrap items-center justify-center gap-2 will-change-transform">
        {['全部', ...CATEGORY_ORDER].map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-[#B84233] text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
              {cat !== '全部' && (
                <span className="ml-1.5 text-xs opacity-60">
                  {grouped[cat]?.length || 0}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* tips grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {displayedTips.map((tip, i) => (
            <TipCard key={tip.id} tip={tip} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* show more / less */}
      {filteredTips.length > 6 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-600 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
          >
            {showAll ? '收起' : `查看全部 ${filteredTips.length} 条`}
            <ChevronDown className={`size-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
});
