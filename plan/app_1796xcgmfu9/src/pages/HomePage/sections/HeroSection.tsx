import { useState, useCallback, useMemo } from 'react';
import { ArrowDown, Search, MapPin } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useGsapHeroIntro, useGsapReveal, useGsapDepthParallax, useGsapScrollProgress } from '@/hooks/useGsap';

function useMergedRef<T>(...refs: (React.Ref<T> | null)[]): React.RefCallback<T> {
  return useCallback((node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

const NANBO_IMG = '/images/南京博物院_05.jpg';
const ZONGTONGFU_IMG = '/images/总统府_05.jpg';
const JIMINGSI_IMG = '/images/鸡鸣寺.jpg';
const XUANWUHU_IMG = '/images/玄武湖.jpg';
const LAOMENDONG_IMG = '/images/老门东_05.jpg';
const FUZIMIAO_IMG = '/images/夫子庙秦淮河_05.jpg';
const MINGXIAOLING_IMG = '/images/明孝陵_05.jpg';
const WUTONG_IMG = '/images/梧桐大道.jpg';
const ZHONGSHANLING_IMG = '/images/中山陵_02.jpg';
const YINYUETAI_IMG = '/images/音乐台.jpg';
const TIANWENTAI_IMG = '/images/紫金山天文台_02.jpg';
const JINIANGUAN_IMG = '/images/侵华日军南京大屠杀遇难同胞纪念馆_05.jpg';

const DAY_LABELS = ['浦口半日游', '金陵文博线', '钟山深度游', '铭记返程'];

interface StackCard {
  imageUrl: string;
  name: string;
  rotate: string;
  z: string;
  width: string;
  top: string;
  left: string;
  depth: number;
}

const STACK_CARDS: StackCard[] = [
  { imageUrl: NANBO_IMG, name: '南京博物院', rotate: '-6deg', z: 'z-10', width: 'w-[175px]', top: '15px', left: '5px', depth: 0.15 },
  { imageUrl: ZONGTONGFU_IMG, name: '总统府', rotate: '4deg', z: 'z-20', width: 'w-[195px]', top: '5px', left: '190px', depth: 0.25 },
  { imageUrl: JIMINGSI_IMG, name: '鸡鸣寺', rotate: '-3deg', z: 'z-30', width: 'w-[165px]', top: '25px', left: '370px', depth: 0.35 },
  { imageUrl: XUANWUHU_IMG, name: '玄武湖', rotate: '5deg', z: 'z-15', width: 'w-[185px]', top: '120px', left: '20px', depth: 0.2 },
  { imageUrl: LAOMENDONG_IMG, name: '老门东', rotate: '-5deg', z: 'z-25', width: 'w-[215px]', top: '105px', left: '210px', depth: 0.3 },
  { imageUrl: FUZIMIAO_IMG, name: '夫子庙·秦淮河', rotate: '3deg', z: 'z-35', width: 'w-[175px]', top: '130px', left: '390px', depth: 0.4 },
  { imageUrl: MINGXIAOLING_IMG, name: '明孝陵', rotate: '-4deg', z: 'z-12', width: 'w-[195px]', top: '250px', left: '5px', depth: 0.12 },
  { imageUrl: WUTONG_IMG, name: '梧桐大道', rotate: '6deg', z: 'z-22', width: 'w-[165px]', top: '240px', left: '200px', depth: 0.22 },
  { imageUrl: ZHONGSHANLING_IMG, name: '中山陵', rotate: '-2deg', z: 'z-32', width: 'w-[205px]', top: '260px', left: '360px', depth: 0.32 },
  { imageUrl: YINYUETAI_IMG, name: '音乐台', rotate: '-7deg', z: 'z-18', width: 'w-[175px]', top: '380px', left: '25px', depth: 0.18 },
  { imageUrl: TIANWENTAI_IMG, name: '紫金山天文台', rotate: '4deg', z: 'z-28', width: 'w-[185px]', top: '370px', left: '210px', depth: 0.28 },
  { imageUrl: JINIANGUAN_IMG, name: '纪念馆', rotate: '-1deg', z: 'z-38', width: 'w-[195px]', top: '390px', left: '380px', depth: 0.38 },
];

function PlumPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 8 + Math.random() * 8,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 10,
      opacity: 0.2 + Math.random() * 0.3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="plum-petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
            <ellipse cx="10" cy="6" rx="4" ry="5" fill="#C4A265" opacity="0.6" transform="rotate(0 10 10)" />
            <ellipse cx="10" cy="6" rx="4" ry="5" fill="#C4A265" opacity="0.6" transform="rotate(72 10 10)" />
            <ellipse cx="10" cy="6" rx="4" ry="5" fill="#C4A265" opacity="0.6" transform="rotate(144 10 10)" />
            <ellipse cx="10" cy="6" rx="4" ry="5" fill="#C4A265" opacity="0.6" transform="rotate(216 10 10)" />
            <ellipse cx="10" cy="6" rx="4" ry="5" fill="#C4A265" opacity="0.6" transform="rotate(288 10 10)" />
            <circle cx="10" cy="10" r="2" fill="#B84233" opacity="0.8" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [searchText, setSearchText] = useState('');
  const heroTextRef = useGsapHeroIntro<HTMLDivElement>();
  const heroCardsRef = useGsapReveal<HTMLDivElement>({
    y: 60,
    duration: 0.9,
    delay: 0.3,
    stagger: 0.08,
    start: 'top 90%',
    rotationX: 5,
  });
  const progressRef = useGsapScrollProgress<HTMLDivElement>();

  const heroParallaxRef = useGsapDepthParallax<HTMLDivElement>(
    STACK_CARDS.map((card, i) => ({
      selector: `.hero-card-${i}`,
      speed: card.depth,
    }))
  );

  const mergedCardsRef = useMergedRef<HTMLDivElement>(heroCardsRef, heroParallaxRef);

  const handleSearch = useCallback(() => {
    const trimmed = searchText.trim();
    if (!trimmed) return;

    const keywordMap: [string[], string][] = [
      [['行程', '总览', '概览', '安排'], 'overview'],
      [['day1', '第一天', '浦口', '轮渡', '中山码头', '浦口火车站', '下关', '背影'], 'day1'],
      [['day2', '第二天', '文博', '博物院', '总统府', '鸡鸣寺', '玄武湖', '老门东', '夫子庙', '秦淮河'], 'day2'],
      [['day3', '第三天', '钟山', '明孝陵', '梧桐', '中山陵', '音乐台', '紫金山', '灵谷寺', '头陀岭'], 'day3'],
      [['day4', '第四天', '铭记', '纪念馆', '科巷', '返程', '南京站'], 'day4'],
      [['预算', '费用', '花费', '价格', '多少钱'], 'budget'],
      [['交通', '机票', '火车', '票务', 'K1557'], 'transport'],
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
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A2332 0%, #2A3A4A 30%, #3D4F5F 60%, #2A3A4A 100%)',
      }}
    >
      {/* 滚动进度条 */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left"
        style={{ background: 'linear-gradient(90deg, #B84233, #C4A265)' }}
      />

      {/* 云纹背景 */}
      <div className="absolute inset-0 z-0 bg-cloud-pattern opacity-100" />

      {/* 梅花飘落 */}
      <PlumPetals />

      {/* 渐变光效 - 营造深度 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(184,66,51,0.4) 0%, transparent 70%)', transform: 'translate(-50%, -30%)' }} />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(196,162,101,0.3) 0%, transparent 70%)', transform: 'translate(30%, 0)' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(74,124,111,0.5) 0%, transparent 70%)' }} />
      </div>

      {/* 左侧装饰巨型汉字 - 南京 */}
      <div className="absolute left-[-5%] top-[10%] z-0 pointer-events-none select-none hero-bg-text" aria-hidden="true">
        <span
          className="text-[20rem] md:text-[36rem] font-bold leading-none"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            color: 'transparent',
            WebkitTextStroke: '1px rgba(196,162,101,0.08)',
            textShadow: '0 0 60px rgba(184,66,51,0.05)',
          }}
        >
          金陵
        </span>
      </div>

      {/* 右侧装饰印章 */}
      <div className="absolute right-8 top-20 z-0 pointer-events-none hidden md:block" aria-hidden="true">
        <div
          className="w-16 h-16 rounded border-2 flex items-center justify-center"
          style={{ borderColor: 'rgba(184,66,51,0.25)', background: 'rgba(184,66,51,0.05)' }}
        >
          <span
            className="text-2xl font-bold"
            style={{ color: 'rgba(184,66,51,0.5)', fontFamily: "'Noto Serif SC', serif" }}
          >
            宁
          </span>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
          {/* ===== 左栏：文字内容（GSAP 3D入场动画） ===== */}
          <div
            ref={heroTextRef}
            className="flex flex-col justify-center pt-20 lg:pt-0"
          >
            {/* Pill 标签组 */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span
                className="px-5 py-2 rounded-full border text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm font-medium"
                style={{ borderColor: 'rgba(184,66,51,0.4)', color: '#D4574A', background: 'rgba(184,66,51,0.08)' }}
              >
                金陵 · 旅行攻略
              </span>
            </div>

            {/* 超大衬线标题 */}
            <h1
              className="text-6xl md:text-8xl font-light font-serif leading-[1.05] mb-6"
              style={{ color: '#F5F0E8', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              南京
              <br />
              <span style={{ color: '#D4574A' }}>四日游</span>
            </h1>

            {/* 副标题 */}
            <p className="text-lg md:text-xl font-light tracking-wide mb-4 max-w-md" style={{ color: 'rgba(245,240,232,0.7)' }}>
              六朝金粉地，金陵帝王州
            </p>

            {/* 装饰横线 - 朱砂金渐变 */}
            <div
              className="w-16 h-0.5 mb-10"
              style={{ background: 'linear-gradient(90deg, #B84233, #C4A265, transparent)' }}
            />

            {/* 行程节点 pill 标签 */}
            <div className="flex flex-wrap gap-2 mb-10">
              {DAY_LABELS.map((label, i) => (
                <span
                  key={label}
                  className="px-4 py-1.5 rounded-full backdrop-blur-sm border text-xs font-medium transition-all duration-300 hover:scale-105 cursor-default"
                  style={{
                    background: i === 0 ? 'rgba(184,66,51,0.15)' : 'rgba(255,255,255,0.06)',
                    borderColor: i === 0 ? 'rgba(184,66,51,0.3)' : 'rgba(255,255,255,0.1)',
                    color: i === 0 ? '#D4574A' : 'rgba(245,240,232,0.6)',
                  }}
                >
                  Day {i + 1} · {label}
                </span>
              ))}
            </div>

            {/* 玻璃拟态搜索框 - 朱砂色主题 */}
            <div className="max-w-sm">
              <div
                className="backdrop-blur-xl rounded-full p-2 pl-6 border focus-within:bg-white/20 shadow-2xl transition-all duration-300 flex items-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(196,162,101,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <Search className="size-4 shrink-0" style={{ color: 'rgba(217,190,130,0.5)' }} />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  placeholder="搜索景点、美食、攻略…"
                  className="bg-transparent border-none outline-none text-white placeholder-white/40 text-sm font-light tracking-wide flex-1 py-1.5"
                  aria-label="搜索攻略内容"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="h-10 w-10 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shrink-0"
                  style={{ background: 'linear-gradient(135deg, #B84233, #D4574A)', color: '#fff' }}
                  aria-label="搜索"
                >
                  <Search className="size-4" />
                </button>
              </div>
            </div>

            {/* 向下滚动提示 */}
            <div className="flex items-center gap-3 mt-16 hero-scroll-hint">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(217,190,130,0.4)' }}>
                探索金陵
              </span>
              <ArrowDown className="w-4 h-4 hero-scroll-arrow" style={{ color: 'rgba(217,190,130,0.4)' }} />
            </div>
          </div>

          {/* ===== 右栏：景点图片错位叠放（3D视差效果） ===== */}
          <div
            ref={mergedCardsRef}
            className="hidden lg:flex items-center justify-center relative h-[750px] perspective-1500"
          >
            {STACK_CARDS.map((card, i) => (
              <div
                key={card.name}
                className={`absolute ${card.z} ${card.width} hero-stack-card hero-card-${i} card-3d`}
                style={{
                  top: card.top,
                  left: card.left,
                  transform: `rotate(${card.rotate})`,
                  transformOrigin: 'center center',
                  willChange: 'transform',
                }}
              >
                <div
                  className="bg-white p-4 rounded-[2rem] overflow-hidden"
                  style={{
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1), 0 0 0 1px rgba(196,162,101,0.1)',
                  }}
                >
                  <div className="rounded-[1.5rem] overflow-hidden aspect-[4/3] bg-slate-200 relative">
                    <OptimizedImage
                      src={card.imageUrl}
                      alt={card.name}
                      loading={i < 4 ? 'eager' : 'lazy'}
                      fetchPriority={i < 4 ? 'high' : 'auto'}
                      wrapperClassName="w-full aspect-[4/3]"
                      className="transition-transform duration-700 hover:scale-105"
                    />
                    {/* 半透明景点名称标注 - 朱砂金色调 */}
                    <div
                      className="absolute bottom-0 left-0 right-0 px-4 py-3"
                      style={{ background: 'linear-gradient(to top, rgba(26,35,50,0.7) 0%, rgba(26,35,50,0.3) 60%, transparent 100%)' }}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3" style={{ color: '#D4574A' }} />
                        <span className="text-sm font-medium tracking-wide" style={{ color: '#F5F0E8' }}>
                          {card.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 浮动装饰 - 印章风格 */}
            <div className="absolute top-[10px] right-[30px] z-50 hero-float-slow">
              <div
                className="w-12 h-12 backdrop-blur-sm rounded-lg border flex items-center justify-center"
                style={{
                  background: 'rgba(184,66,51,0.15)',
                  borderColor: 'rgba(184,66,51,0.3)',
                  boxShadow: '0 4px 16px rgba(184,66,51,0.2)',
                }}
              >
                <span className="text-lg font-bold" style={{ color: '#B84233', fontFamily: "'Noto Serif SC', serif" }}>游</span>
              </div>
            </div>

            <div className="absolute bottom-[40px] left-[0px] z-50 hero-float-fast">
              <div
                className="w-10 h-10 backdrop-blur-sm rounded-full border flex items-center justify-center"
                style={{
                  background: 'rgba(196,162,101,0.12)',
                  borderColor: 'rgba(196,162,101,0.25)',
                  boxShadow: '0 4px 12px rgba(196,162,101,0.15)',
                }}
              >
                <span className="text-sm" style={{ color: '#C4A265' }}>❀</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部渐变过渡 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #FBF8F3, transparent)' }}
      />
    </section>
  );
}
