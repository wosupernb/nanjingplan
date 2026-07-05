import { useState, useCallback } from 'react';
import { ArrowDown, Search, MapPin } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useGsapHeroIntro, useGsapReveal } from '@/hooks/useGsap';

const NANBO_IMG = '/images/南京博物院_05.jpg';
const ZONGTONGFU_IMG = '/images/总统府_05.jpg';
const JIMINGSI_IMG = '/images/鸡鸣寺.png';
const XUANWUHU_IMG = '/images/玄武湖.png';
const LAOMENDONG_IMG = '/images/老门东_05.jpg';
const FUZIMIAO_IMG = '/images/夫子庙秦淮河_05.jpg';
const MINGXIAOLING_IMG = '/images/明孝陵_05.jpg';
const WUTONG_IMG = '/images/梧桐大道.png';
const ZHONGSHANLING_IMG = '/images/中山陵_02.jpg';
const YINYUETAI_IMG = '/images/音乐台.png';
const TIANWENTAI_IMG = '/images/紫金山天文台_02.jpg';
const JINIANGUAN_IMG = '/images/侵华日军南京大屠杀遇难同胞纪念馆_05.jpg';

const DAY_LABELS = ['抵达南京', '金陵文博线', '钟山深度游', '铭记返程'];

interface StackCard {
  imageUrl: string;
  name: string;
  rotate: string;
  z: string;
  width: string;
  top: string;
  left: string;
}

const STACK_CARDS: StackCard[] = [
  { imageUrl: NANBO_IMG, name: '南京博物院', rotate: '-6deg', z: 'z-10', width: 'w-[175px]', top: '15px', left: '5px' },
  { imageUrl: ZONGTONGFU_IMG, name: '总统府', rotate: '4deg', z: 'z-20', width: 'w-[195px]', top: '5px', left: '190px' },
  { imageUrl: JIMINGSI_IMG, name: '鸡鸣寺', rotate: '-3deg', z: 'z-30', width: 'w-[165px]', top: '25px', left: '370px' },
  { imageUrl: XUANWUHU_IMG, name: '玄武湖', rotate: '5deg', z: 'z-15', width: 'w-[185px]', top: '120px', left: '20px' },
  { imageUrl: LAOMENDONG_IMG, name: '老门东', rotate: '-5deg', z: 'z-25', width: 'w-[215px]', top: '105px', left: '210px' },
  { imageUrl: FUZIMIAO_IMG, name: '夫子庙·秦淮河', rotate: '3deg', z: 'z-35', width: 'w-[175px]', top: '130px', left: '390px' },
  { imageUrl: MINGXIAOLING_IMG, name: '明孝陵', rotate: '-4deg', z: 'z-12', width: 'w-[195px]', top: '250px', left: '5px' },
  { imageUrl: WUTONG_IMG, name: '梧桐大道', rotate: '6deg', z: 'z-22', width: 'w-[165px]', top: '240px', left: '200px' },
  { imageUrl: ZHONGSHANLING_IMG, name: '中山陵', rotate: '-2deg', z: 'z-32', width: 'w-[205px]', top: '260px', left: '360px' },
  { imageUrl: YINYUETAI_IMG, name: '音乐台', rotate: '-7deg', z: 'z-18', width: 'w-[175px]', top: '380px', left: '25px' },
  { imageUrl: TIANWENTAI_IMG, name: '紫金山天文台', rotate: '4deg', z: 'z-28', width: 'w-[185px]', top: '370px', left: '210px' },
  { imageUrl: JINIANGUAN_IMG, name: '纪念馆', rotate: '-1deg', z: 'z-38', width: 'w-[195px]', top: '390px', left: '380px' },
];

export default function HeroSection() {
  const [searchText, setSearchText] = useState('');
  // Hero 文字内容入场动画（移动端简化）
  const heroTextRef = useGsapHeroIntro<HTMLDivElement>();
  // 右侧图片堆叠卡片入场动画
  const heroCardsRef = useGsapReveal<HTMLDivElement>({
    y: 60,
    duration: 0.9,
    delay: 0.3,
    stagger: 0.08,
    start: 'top 90%',
  });

  const handleSearch = useCallback(() => {
    const trimmed = searchText.trim();
    if (!trimmed) return;

    const keywordMap: [string[], string][] = [
      [['行程', '总览', '概览', '安排'], 'overview'],
      [['day1', '第一天', '文博', '博物院', '总统府', '鸡鸣寺', '玄武湖', '老门东', '夫子庙', '秦淮河'], 'day1'],
      [['day2', '第二天', '钟山', '明孝陵', '梧桐', '中山陵', '音乐台', '天文台'], 'day2'],
      [['day3', '第三天', '铭记', '纪念馆', '科巷', '返程', '南京站'], 'day3'],
      [['预算', '费用', '花费', '价格', '多少钱'], 'budget'],
      [['交通', '机票', '火车', '票务', 'MU2966', 'K1557'], 'transport'],
      [['预约', '提醒', '抢票', '预约时间'], 'booking'],
      [['避坑', '贴士', '注意', '建议', '攻略'], 'tips'],
      [['装备', '清单', '行李', '物品', '准备'], 'checklist'],
    ];

    for (const [keywords, anchor] of keywordMap) {
      if (keywords.some((kw) => trimmed.includes(kw))) {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
    }

    const el = document.getElementById('overview');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [searchText]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#A8B5C1]"
    >
      {/* 背景纹理 */}
      <div className="absolute inset-0 z-0 opacity-[0.06] bg-[radial-gradient(circle_at_50%_50%,_#0F172A_1px,_transparent_1px)] bg-[length:32px_32px]" />

      {/* 左侧装饰巨型数字 */}
      <div className="absolute left-[-8%] top-[15%] z-0 pointer-events-none select-none">
        <span className="text-[28rem] md:text-[40rem] font-bold text-white/8 font-serif leading-none">
          南京
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
          {/* ===== 左栏：文字内容（GSAP 入场动画） ===== */}
          <div
            ref={heroTextRef}
            className="flex flex-col justify-center pt-20 lg:pt-0"
          >
            {/* Pill 标签组 */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="px-5 py-2 rounded-full border border-white/40 text-white text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm font-medium">
                南京 · 旅行攻略
              </span>
              <span className="px-5 py-2 rounded-full border border-white/30 text-white/80 text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm font-medium">
                学生党省钱版
              </span>
            </div>

            {/* 超大衬线标题 */}
            <h1 className="text-6xl md:text-8xl font-light font-serif leading-[1.05] text-white mb-6">
              南京
              <br />
              三日游
            </h1>

            {/* 副标题 */}
            <p className="text-lg md:text-xl text-white/75 font-light tracking-wide mb-4 max-w-md">
              学生党极致省钱版
            </p>

            {/* 装饰横线 */}
            <div className="w-10 h-0.5 bg-white/60 mb-10" />

            {/* 核心信息概览 */}
            <div className="flex flex-wrap gap-6 mb-12">
              {[
                { label: '人均预算', value: '¥1,700', sub: '总控' },
                { label: '出行日期', value: '7.14 - 7.17', sub: '4天3晚' },
                { label: '同行人数', value: '3 人', sub: '结伴出行' },
              ].map((card) => (
                <div
                  key={card.label}
                  className="flex flex-col"
                >
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/45 font-medium mb-1">
                    {card.label}
                  </span>
                  <span className="text-2xl md:text-3xl font-light text-white tabular-nums tracking-tight">
                    {card.value}
                  </span>
                  <span className="text-xs text-white/35 mt-0.5">{card.sub}</span>
                </div>
              ))}
            </div>

            {/* 行程节点 pill 标签 */}
            <div className="flex flex-wrap gap-2 mb-10">
              {DAY_LABELS.map((label, i) => (
                <span
                  key={label}
                  className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/70 text-xs font-medium"
                >
                  Day {i} · {label}
                </span>
              ))}
            </div>

            {/* 玻璃拟态搜索框 */}
            <div className="max-w-sm">
              <div className="bg-white/15 backdrop-blur-xl rounded-full p-2 pl-6 border border-white/20 focus-within:bg-white/25 shadow-2xl transition-colors duration-300 flex items-center gap-2">
                <Search className="size-4 text-white/50 shrink-0" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  placeholder="搜索景点、美食、攻略…"
                  className="bg-transparent border-none outline-none text-white placeholder-white/40 text-sm font-light tracking-wide flex-1 py-1.5"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-white text-slate-800 h-10 w-10 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                  aria-label="搜索"
                >
                  <Search className="size-4" />
                </button>
              </div>
            </div>

            {/* 向下滚动提示（CSS 动画替代 framer-motion 无限循环） */}
            <div className="flex items-center gap-3 mt-16 hero-scroll-hint">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-medium">
                向下探索
              </span>
              <ArrowDown className="w-4 h-4 text-white/40 hero-scroll-arrow" />
            </div>
          </div>

          {/* ===== 右栏：景点图片错位叠放（GSAP 入场动画） ===== */}
          <div
            ref={heroCardsRef}
            className="hidden lg:flex items-center justify-center relative h-[750px]"
          >
            {STACK_CARDS.map((card) => (
              <div
                key={card.name}
                className={`absolute ${card.z} ${card.width} hero-stack-card`}
                style={{
                  top: card.top,
                  left: card.left,
                  transform: `rotate(${card.rotate})`,
                  transformOrigin: 'center center',
                  willChange: 'transform',
                }}
              >
                <div className="bg-white p-4 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0_0_0_0.08)]">
                  <div className="rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-200 relative">
                    <OptimizedImage
                      src={card.imageUrl}
                      alt={card.name}
                      loading="eager"
                      wrapperClassName="w-full aspect-[4/3]"
                      className="transition-transform duration-700 hover:scale-105"
                    />
                    {/* 半透明景点名称标注 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent px-4 py-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3 text-white/80" />
                        <span className="text-sm font-medium text-white tracking-wide">
                          {card.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 浮动装饰元素（CSS 动画替代 framer-motion） */}
            <div className="absolute top-[-15px] right-[20px] z-50 hero-float-slow">
              <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
              </div>
            </div>

            <div className="absolute bottom-[30px] left-[-10px] z-50 hero-float-fast">
              <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
