'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { attractions, type Attraction, type RoutePoint } from '@/data/nanjing';

// ===== 天气组件 =====
function WeatherBar() {
  const [weather, setWeather] = useState<{
    city: string;
    forecasts: Array<{
      date: string;
      dayweather: string;
      nightweather: string;
      daytemp: string;
      nighttemp: string;
      daywind: string;
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/weather');
      const data = await res.json();
      if (data.forecasts) setWeather(data);
    } catch (e) {
      console.error('Weather fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWeather(); }, [fetchWeather]);

  const weatherIcon = (w: string) => {
    if (w.includes('雨')) return '🌧️';
    if (w.includes('雪')) return '❄️';
    if (w.includes('云') || w.includes('阴')) return '⛅';
    if (w.includes('晴')) return '☀️';
    return '🌤️';
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
        正在获取南京实时天气...
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">高德实时天气</span>
      {weather.forecasts.slice(0, 3).map((f, i) => (
        <button
          key={f.date}
          onClick={fetchWeather}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 hover:bg-white/80 transition-colors text-gray-800 text-xs cursor-pointer border border-white/60"
          title="点击刷新天气数据"
        >
          <span>{weatherIcon(f.dayweather)}</span>
          <span className="font-medium">{i === 0 ? '今天' : i === 1 ? '明天' : '后天'}</span>
          <span>{f.daytemp}°/{f.nighttemp}°</span>
          <span className="text-gray-500">{f.dayweather}</span>
        </button>
      ))}
    </div>
  );
}

// ===== 景点类型标签 =====
function SpotBadge({ spotType, timeSlot }: { spotType: string; timeSlot: string }) {
  const typeMap: Record<string, { label: string; color: string }> = {
    indoor: { label: '室内', color: 'bg-blue-500/20 text-blue-300 border-blue-400/30' },
    outdoor: { label: '室外', color: 'bg-green-500/20 text-green-300 border-green-400/30' },
    mixed: { label: '室内外', color: 'bg-purple-500/20 text-purple-300 border-purple-400/30' },
    food: { label: '🍜 餐饮', color: 'bg-orange-500/20 text-orange-300 border-orange-400/30' },
  };
  const slotMap: Record<string, { label: string; icon: string }> = {
    morning: { label: '白天', icon: '☀️' },
    afternoon: { label: '下午', icon: '🌤️' },
    evening: { label: '傍晚', icon: '🌅' },
    night: { label: '夜游', icon: '🌙' },
  };
  const t = typeMap[spotType] || typeMap.mixed;
  const s = slotMap[timeSlot] || slotMap.morning;
  return (
    <div className="flex gap-1.5">
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${t.color}`}>{t.label}</span>
      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/80 border border-white/20">
        {s.icon} {s.label}
      </span>
    </div>
  );
}

// ===== 交通路线组件 =====
function TransitInfo({ from, to }: { from: Attraction; to: Attraction }) {
  const transit = from.nextTransit;
  if (!transit) return null;
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-4 py-3 px-4 mx-auto max-w-md">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="flex flex-col items-center gap-1 text-white/70">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-[10px] font-medium bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
            {transit.method}
          </span>
          <span className="text-xs font-medium">{transit.detail}</span>
          <div className="flex gap-3 text-[10px] text-white/50">
            <span>⏱ {transit.duration}</span>
            <span>💰 {transit.cost}</span>
          </div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </motion.div>
  );
}

// ===== 景点内部路线详情 =====
function RouteDetail({ route }: { route: RoutePoint[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white/90 transition-colors"
      >
        <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {expanded ? '收起' : '展开'}游玩路线（{route.length}站）
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-0">
              {route.map((stop, i) => (
                <div key={i} className="flex gap-3">
                  {/* 时间线 */}
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-emerald-300 shadow-lg shadow-emerald-400/30 flex-shrink-0 mt-1" />
                    {i < route.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-emerald-400/50 to-emerald-400/10 min-h-[20px]" />}
                  </div>
                  {/* 内容 */}
                  <div className="pb-4 flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h5 className="text-sm font-semibold text-white">{stop.name}</h5>
                      <span className="text-[10px] text-white/40">{stop.duration}</span>
                    </div>
                    <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{stop.highlights}</p>
                    {stop.photoTip && (
                      <p className="text-[11px] text-amber-300/80 mt-1">📷 {stop.photoTip}</p>
                    )}
                    {stop.warning && (
                      <p className="text-[11px] text-red-400/80 mt-1">⚠️ {stop.warning}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== 景点卡片 =====
function AttractionCard({
  attraction,
  isActive,
  isCompleted,
  onComplete,
  isLast,
}: {
  attraction: Attraction;
  isActive: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isActive
          ? 'ring-2 ring-emerald-400/60 shadow-xl shadow-emerald-500/10'
          : isCompleted
          ? 'opacity-70'
          : 'opacity-50'
      }`}
    >
      {/* 模糊背景图层 - 25%模糊度 */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={attraction.coverImage}
          alt=""
          className={`w-full h-full object-cover ${isCompleted ? 'brightness-50 grayscale-[30%]' : ''}`}
          style={{ filter: 'blur(4px) brightness(0.8)', transform: 'scale(1.12)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/85" />
        <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
      </div>

      {/* 前景内容 */}
      <div className="relative z-10 p-5">
        {/* 头部信息行 */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {/* 顺序号 */}
            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
              {attraction.order}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">{attraction.name}</h3>
              <p className="text-sm text-white/70 mt-0.5">{attraction.tagline}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            {isCompleted && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold shadow-lg mb-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                已游览
              </div>
            )}
            <span className="text-xs text-white/60 block">{attraction.startTime} - {attraction.endTime}</span>
            <div className="text-xs text-emerald-300 font-medium mt-0.5">{attraction.duration}</div>
          </div>
        </div>

        {/* 景点类型标签 */}
        <div className="mt-4">
          <SpotBadge spotType={attraction.spotType} timeSlot={attraction.timeSlot} />
        </div>

        {/* 基本信息 */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-white/60">
          <span>🎫 {attraction.ticket}</span>
          <span>📍 {attraction.location}</span>
        </div>

        {/* 贴士 */}
        {attraction.tips.length > 0 && (
          <div className="mt-3 space-y-1">
            {attraction.tips.slice(0, 2).map((tip, i) => (
              <p key={i} className="text-[11px] text-amber-200/70 leading-relaxed">💡 {tip}</p>
            ))}
          </div>
        )}

        {/* 游玩路线 */}
        <RouteDetail route={attraction.route} />

        {/* 完成按钮 - iOS毛玻璃样式 */}
        {isActive && !isCompleted && (
          <motion.button
            initial={false}
            animate={{ opacity: 1 }}
            onClick={onComplete}
            className="mt-4 w-full py-3 rounded-2xl bg-white/30 backdrop-blur-xl text-white text-sm font-medium border border-white/40 shadow-lg active:scale-[0.97] transition-all duration-200 hover:bg-white/40"
          >
            {isLast ? '🎉 全部游览完成！' : '✓ 游览完成，前往下一站 →'}
          </motion.button>
        )}

        {isCompleted && !isLast && (
          <div className="mt-3 text-center text-xs text-white/40">
            已完成 · 下一站: {attraction.nextTransit?.to && attractions.find(a => a.id === attraction.nextTransit?.to)?.name}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ===== 主页面 =====
export default function Home() {
  const [currentDay, setCurrentDay] = useState<1 | 2 | 3>(1);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [currentAttractionId, setCurrentAttractionId] = useState<string | null>(null);

  const dayAttractions = attractions.filter(a => a.day === currentDay);
  const activeAttraction = dayAttractions.find(a => a.id === currentAttractionId) || dayAttractions[0];
  const allDayCompleted = dayAttractions.every(a => completedIds.has(a.id));

  // 切换天数时重置当前景点并滚动到顶部
  useEffect(() => {
    const firstIncomplete = dayAttractions.find(a => !completedIds.has(a.id));
    setCurrentAttractionId(firstIncomplete?.id || dayAttractions[0]?.id || null);
    
    // 滚动到行程内容顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentDay]); // eslint-disable-line react-hooks/exhaustive-deps

  // 滚动到指定景点
  const scrollToAttraction = useCallback((attractionId: string) => {
    setCurrentAttractionId(attractionId);
    setTimeout(() => {
      const element = document.getElementById(`attraction-${attractionId}`);
      if (element) {
        const headerOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 50);
  }, []);

  const handleComplete = useCallback(() => {
    if (!activeAttraction) return;
    setCompletedIds(prev => new Set([...prev, activeAttraction.id]));

    // 自动跳到下一个未完成的景点
    const nextAttraction = dayAttractions.find(
      a => a.order > activeAttraction.order && !completedIds.has(a.id)
    );
    if (nextAttraction) {
      setTimeout(() => {
        setCurrentAttractionId(nextAttraction.id);
        scrollToAttraction(nextAttraction.id);
      }, 400);
    }
  }, [activeAttraction, dayAttractions, completedIds, scrollToAttraction]);

  const handleDayChange = (day: 1 | 2 | 3) => {
    setCurrentDay(day);
  };

  return (
    <main className="min-h-screen text-gray-900 relative">
      {/* 顶部导航 - 透明背景 */}
      <header className="sticky top-0 z-50 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold font-display tracking-tight text-gray-800 drop-shadow-sm">南京三日游</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Day 切换 - 右上角往中间靠，透明背景，白色文字 */}
      <div className="fixed top-4 right-4 md:right-[8%] z-[60] flex items-center gap-1">
        {(['Day 1', 'Day 2', 'Day 3'] as const).map((title, index) => {
          const day = (index + 1) as 1 | 2 | 3;
          return (
            <button
              key={title}
              onClick={() => handleDayChange(day)}
              className={`px-3 py-1.5 text-sm font-bold transition-all duration-300 rounded-lg bg-transparent ${
                currentDay === day
                  ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                  : 'text-white/70 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]'
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>

      {/* 左侧景点导航条 + 主内容区 */}
      <div className="max-w-5xl mx-auto flex">
        {/* 左侧纵向景点导航 */}
        <aside className="sticky top-[72px] h-[calc(100vh-72px)] w-12 flex-shrink-0 flex flex-col items-center py-4 z-40 bg-transparent border-r border-white/20">
          {/* 纵向进度条 */}
          <div className="relative w-1.5 h-40 rounded-full bg-white/40 overflow-hidden mb-3">
            <motion.div
              className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-emerald-500 to-teal-500"
              initial={{ height: 0 }}
              animate={{
                height: `${dayAttractions.length > 0
                  ? (dayAttractions.filter(a => completedIds.has(a.id)).length / dayAttractions.length) * 100
                  : 0}%`
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* 纵向景点名称 */}
          <div className="flex-1 overflow-y-auto w-full px-1 space-y-2">
            {dayAttractions.map((a, index) => {
              const isDone = completedIds.has(a.id);
              const isCurrent = a.id === (currentAttractionId || dayAttractions[0]?.id);
              return (
                <button
                  key={a.id}
                  onClick={() => scrollToAttraction(a.id)}
                  className={`w-full group flex items-center justify-center py-2 text-[10px] transition-all duration-200 ${
                    isCurrent
                      ? 'text-emerald-600'
                      : isDone
                      ? 'text-gray-400'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={a.name}
                >
                  <span
                    className="block tracking-wider"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    {a.name.length > 6 ? a.name.slice(0, 6) : a.name}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* 主内容区 */}
        <div className="flex-1 px-4 py-6">
          {/* 全部完成提示 */}
          {allDayCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-emerald-300/40 text-center shadow-lg"
            >
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="text-lg font-bold text-emerald-700">Day {currentDay} 行程全部完成！</h3>
              <p className="text-sm text-gray-600 mt-1">
                {currentDay < 3 ? `切换到 Day ${currentDay + 1} 继续探索` : '南京之旅圆满结束！'}
              </p>
              {currentDay < 3 && (
                <button
                  onClick={() => handleDayChange((currentDay + 1) as 1 | 2 | 3)}
                  className="mt-3 px-6 py-2 rounded-full bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  进入 Day {currentDay + 1} →
                </button>
              )}
            </motion.div>
          )}

        {/* 景点列表 */}
        <div className="space-y-0">
            {dayAttractions.map((attraction) => (
              <div key={attraction.id} id={`attraction-${attraction.id}`}>
                <AttractionCard
                  attraction={attraction}
                  isActive={attraction.id === (currentAttractionId || dayAttractions[0]?.id)}
                  isCompleted={completedIds.has(attraction.id)}
                  onComplete={handleComplete}
                  isLast={attraction.order === dayAttractions.length}
                />
                {/* 交通连接 */}
                {attraction.order < dayAttractions.length && (
                  <TransitInfo
                    from={attraction}
                    to={dayAttractions[attraction.order]}
                  />
                )}
              </div>
            ))}
        </div>

        {/* 底部信息 */}
        <div className="mt-12 text-center text-xs text-gray-500 space-y-1">
          <p>数据来源: 高德地图 MCP API（实时交通导航）</p>
          <p>图片: Unsplash · 仅供学习交流使用</p>
        </div>
        </div>
      </div>
    </main>
  );
}
