import { Plane, Train, Clock, MapPin, ArrowRight, Ticket } from 'lucide-react';
import { MOCK_TRANSPORT, type ITransport } from '@/data/transport';
import { useGsapReveal } from '@/hooks/useGsap';

const TRANSPORT_ICON: Record<ITransport['type'], typeof Plane> = {
  flight: Plane,
  train: Train,
};

const TYPE_LABEL: Record<ITransport['type'], string> = {
  flight: '去程 · 航班',
  train: '返程 · 火车',
};

export default function TransportSection() {
  // 区块标题滚动揭示动画（GSAP）
  const headerRef = useGsapReveal<HTMLDivElement>({
    y: 20,
    duration: 0.6,
    start: 'top 85%',
  });
  // 交通卡片错位动画
  const cardsRef = useGsapReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.15,
    delay: 0.1,
    start: 'top 80%',
  });

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Section Header */}
      <div ref={headerRef} className="mb-12 md:mb-16 will-change-transform">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B84233] mb-4">
          Transport
        </p>
        <h2 className="text-4xl md:text-5xl font-light text-slate-900 serif-font tracking-tight">
          往返交通
        </h2>
        <p className="mt-4 text-lg font-light leading-relaxed text-slate-500 max-w-lg">
          去程深夜航班节省白天时间，返程硬卧夕发朝至，最大化游玩效率
        </p>
      </div>

      {/* Transport Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 will-change-transform"
      >
        {MOCK_TRANSPORT.map((t) => {
          const Icon = TRANSPORT_ICON[t.type];
          const isFlight = t.type === 'flight';
          return (
            <div
              key={t.id}
              className="card-3d group relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 will-change-transform"
            >
              {/* Top decorative stripe */}
              <div
                className={`h-1.5 w-full ${
                  isFlight
                    ? 'bg-gradient-to-r from-[#3D4F5F] via-[#B84233] to-[#3D4F5F]/30'
                    : 'bg-gradient-to-r from-[#4A7C6F] via-[#C4A265] to-[#4A7C6F]/30'
                }`}
              />

              <div className="p-8 md:p-10">
                {/* Header row */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-11 rounded-2xl flex items-center justify-center ${
                        isFlight
                          ? 'bg-[#B84233]/10 text-[#B84233]'
                          : 'bg-[#C4A265]/10 text-[#C4A265]'
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        {TYPE_LABEL[t.type]}
                      </p>
                      <p className="text-lg font-bold text-slate-800 serif-font">{t.code}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                      isFlight
                        ? 'bg-[#B84233]/10 text-[#B84233]'
                        : 'bg-[#C4A265]/10 text-[#C4A265]'
                    }`}
                  >
                    {t.seatClass}
                  </span>
                </div>

                {/* Route display — ticket-style */}
                <div className="relative flex items-center mb-8 px-1">
                  {/* Departure */}
                  <div className="shrink-0 text-center">
                    <p className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 tabular-nums serif-font">
                      {t.departureTime}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-wider">
                      {t.route.split(' → ')[0]}
                    </p>
                  </div>

                  {/* Arrow + duration */}
                  <div className="flex-1 flex flex-col items-center gap-2 px-2 min-w-0">
                    <div className="flex items-center gap-1 w-full justify-center">
                      <span className="block flex-1 h-px bg-slate-200" />
                      <ArrowRight className="size-3 text-slate-300 shrink-0" />
                      <span className="block flex-1 h-px bg-slate-200" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap">
                      {t.duration}
                    </span>
                  </div>

                  {/* Arrival */}
                  <div className="shrink-0 text-center">
                    <p className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 tabular-nums serif-font">
                      {t.arrivalTime.replace(' (+1天)', '')}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-wider whitespace-nowrap">
                      {t.route.split(' → ')[1]}
                    </p>
                  </div>
                </div>

                {/* Divider — ticket perforation style */}
                <div className="relative mb-6">
                  <div className="border-t border-dashed border-slate-200" />
                  <div className="absolute -top-2.5 left-0 size-5 rounded-full bg-slate-50 border border-slate-200" />
                  <div className="absolute -top-2.5 right-0 size-5 rounded-full bg-slate-50 border border-slate-200" />
                </div>

                {/* Details row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3" />
                      {t.arrivalTime.includes('+1天') ? '次日抵达' : '当日抵达'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3" />
                      {t.route}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-light text-[#B84233] tabular-nums serif-font">
                      ¥{t.price}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      {t.priceNote}
                    </p>
                  </div>
                </div>

                {/* Note */}
                <p className="mt-5 text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-4">
                  <Ticket className="size-3 inline mr-1.5 -mt-px" />
                  {t.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
