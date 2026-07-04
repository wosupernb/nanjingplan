import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Search, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';

const NANBO_IMG = 'https://aka.doubaocdn.com/s/f7Vz1whQ2l';
const ZONGTONGFU_IMG = 'https://aka.doubaocdn.com/s/pUUP1whQ2l';
const JIMINGSI_IMG = 'https://aka.doubaocdn.com/s/vujS1whQ2l';
const XUANWUHU_IMG = 'https://aka.doubaocdn.com/s/8CAT1wh7fx';
const LAOMENDONG_IMG = 'https://aka.doubaocdn.com/s/0gJP1whQ2l';
const FUZIMIAO_IMG = 'https://aka.doubaocdn.com/s/Padx1whQ2l';
const MINGXIAOLING_IMG = 'https://aka.doubaocdn.com/s/5xFr1whQ2l';
const WUTONG_IMG = 'https://aka.doubaocdn.com/s/61JR1wh7fx';
const ZHONGSHANLING_IMG = 'https://aka.doubaocdn.com/s/L6iB1whQ2l';
const YINYUETAI_IMG = 'https://aka.doubaocdn.com/s/bvjU1whQ2l';
const TIANWENTAI_IMG = 'https://aka.doubaocdn.com/s/lIeQ1wh7fx';
const JINIANGUAN_IMG = 'https://aka.doubaocdn.com/s/TvkK1whQ2l';

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  const [searchText, setSearchText] = useState('');

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
          {/* ===== 左栏：文字内容 ===== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center pt-20 lg:pt-0"
          >
            {/* Pill 标签组 */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <span className="px-5 py-2 rounded-full border border-white/40 text-white text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm font-medium">
                南京 · 旅行攻略
              </span>
              <span className="px-5 py-2 rounded-full border border-white/30 text-white/80 text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm font-medium">
                学生党省钱版
              </span>
            </motion.div>

            {/* 超大衬线标题 */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-light font-serif leading-[1.05] text-white mb-6"
            >
              南京
              <br />
              三日游
            </motion.h1>

            {/* 副标题 */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/75 font-light tracking-wide mb-4 max-w-md"
            >
              学生党极致省钱版
            </motion.p>

            {/* 装饰横线 */}
            <motion.div
              variants={itemVariants}
              className="w-10 h-0.5 bg-white/60 mb-10"
            />

            {/* 核心信息概览 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 mb-12"
            >
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
            </motion.div>

            {/* 行程节点 pill 标签 */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-10">
              {DAY_LABELS.map((label, i) => (
                <span
                  key={label}
                  className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/70 text-xs font-medium"
                >
                  Day {i} · {label}
                </span>
              ))}
            </motion.div>

            {/* 玻璃拟态搜索框 */}
            <motion.div variants={itemVariants} className="max-w-sm">
              <div className="bg-white/15 backdrop-blur-xl rounded-full p-2 pl-6 border border-white/20 focus-within:bg-white/25 shadow-2xl transition-all duration-300 flex items-center gap-2">
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
            </motion.div>

            {/* 向下滚动提示 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex items-center gap-3 mt-16"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-medium">
                向下探索
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="w-4 h-4 text-white/40" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ===== 右栏：四张景点图片错位叠放 ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex items-center justify-center relative h-[750px]"
          >
            {STACK_CARDS.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, rotate: 0, y: 60, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  rotate: parseFloat(card.rotate),
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.6 + i * 0.18,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                whileHover={{
                  rotate: 0,
                  scale: 1.04,
                  zIndex: 50,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
                }}
                className={`absolute ${card.z} ${card.width}`}
                style={{
                  top: card.top,
                  left: card.left,
                }}
              >
                <div className="bg-white p-4 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0_0_0_0.08)]">
                  <div className="rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-200 relative">
                    <Image
                      src={card.imageUrl}
                      alt={card.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              </motion.div>
            ))}

            {/* 浮动装饰元素 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[-15px] right-[20px] z-50"
            >
              <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-[30px] left-[-10px] z-50"
            >
              <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
