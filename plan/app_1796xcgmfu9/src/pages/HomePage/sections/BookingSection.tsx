import { Calendar, Bell, AlarmClock } from 'lucide-react';
import { MOCK_BOOKING_REMINDERS, type IBookingReminder } from '@/data/booking';
import { useGsapReveal } from '@/hooks/useGsap';

function BookingCard({ reminder }: { reminder: IBookingReminder }) {
  return (
    <div className="group relative pl-12 pb-10 last:pb-0 will-change-transform">
      {/* 时间轴竖线 */}
      <div className="absolute left-[19px] top-0 h-full w-px bg-[#C4A265]/20 group-last:hidden" />

      {/* 时间轴圆点 */}
      <div
        className={`absolute left-[11px] top-2 z-10 flex size-[17px] items-center justify-center rounded-full border-2 transition-all duration-300 ${
          reminder.highlight
            ? 'border-[#B84233]/30 bg-white group-hover:scale-125'
            : 'border-slate-200 bg-white'
        }`}
      >
        {reminder.highlight && <div className="size-[6px] rounded-full bg-[#B84233]" />}
      </div>

      {/* 内容卡片 */}
      <div
        className={`card-3d rounded-3xl border p-6 transition-all duration-300 ${
          reminder.highlight
            ? 'border-[#B84233]/10 bg-[#B84233]/5'
            : 'border-slate-100 bg-white'
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* 左侧信息 */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-800">{reminder.name}</h3>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                  reminder.highlight
                    ? 'bg-[#B84233] text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {reminder.highlight && <Bell className="size-3" />}
                {reminder.tag}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">{reminder.rule}</p>
          </div>

          {/* 右侧最早预约时间 */}
          <div className="flex shrink-0 flex-col items-end gap-1 self-start">
            <div className="flex items-center gap-2 rounded-full bg-[#B84233]/10 px-4 py-2">
              <AlarmClock className="size-4 text-[#B84233]" />
              <span className="text-sm font-bold tabular-nums text-[#B84233]">
                {reminder.earliestDate}
              </span>
            </div>
            <div className="flex items-center gap-1.5 pr-1">
              <Calendar className="size-3 text-slate-400" />
              <span className="text-xs text-slate-400">游览日 {reminder.visitDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSection() {
  // 区块标题滚动揭示动画（GSAP）
  const headerRef = useGsapReveal<HTMLDivElement>({
    y: 24,
    duration: 0.6,
    start: 'top 85%',
  });
  // 时间轴卡片错位动画
  const timelineRef = useGsapReveal<HTMLDivElement>({
    y: 20,
    duration: 0.5,
    stagger: 0.12,
    start: 'top 80%',
  });
  // 底部提示动画
  const tipRef = useGsapReveal<HTMLDivElement>({
    y: 16,
    duration: 0.5,
    delay: 0.3,
    start: 'top 90%',
  });

  return (
    <section className="w-full">
      {/* 区块标题 */}
      <div ref={headerRef} className="mb-16 text-center will-change-transform">
        <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
          Important Reminders
        </span>
        <h2 className="text-4xl font-light tracking-tight text-slate-900 md:text-5xl font-[family-name:var(--font-serif)]">
          景点预约提醒
        </h2>
        <p className="mt-4 text-lg font-light leading-relaxed text-slate-500">
          各景点最早可预约时间一览，设好闹钟按时抢票
        </p>
      </div>

      {/* 时间轴列表 */}
      <div ref={timelineRef} className="max-w-2xl mx-auto will-change-transform">
        {MOCK_BOOKING_REMINDERS.map((reminder) => (
          <BookingCard key={reminder.id} reminder={reminder} />
        ))}
      </div>

      {/* 底部提示 */}
      <div
        ref={tipRef}
        className="card-3d mt-12 max-w-2xl mx-auto flex items-start gap-4 rounded-3xl border border-[#4A7C6F]/10 bg-[#4A7C6F]/5 p-6 will-change-transform"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Calendar className="size-5 text-[#4A7C6F]" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-800">预约小贴士</p>
          <p className="text-sm leading-relaxed text-slate-500">
            以上为各景点最早可预约日期，建议提前设好闹钟，在放票第一时间抢票。使用微信小程序或各景点官方公众号预约，部分景点支持提前录入同行人信息，抢票更高效。
          </p>
        </div>
      </div>
    </section>
  );
}
