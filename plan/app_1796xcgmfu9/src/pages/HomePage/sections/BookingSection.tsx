import { motion } from 'framer-motion';
import { Calendar, Clock, Bell } from 'lucide-react';
import { MOCK_BOOKING_REMINDERS, type IBookingReminder } from '@/data/booking';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

function BookingCard({ reminder }: { reminder: IBookingReminder }) {
  return (
    <motion.div
      variants={itemVariant}
      className="group relative pl-12 pb-10 last:pb-0"
    >
      {/* 时间轴竖线 */}
      <div className="absolute left-[19px] top-0 h-full w-px bg-slate-200 group-last:hidden" />

      {/* 时间轴圆点 */}
      <div
        className={`absolute left-[11px] top-2 z-10 flex size-[17px] items-center justify-center rounded-full border-2 transition-all duration-300 ${
          reminder.highlight
            ? 'border-slate-300 bg-slate-50 group-hover:scale-125'
            : 'border-slate-200 bg-white'
        }`}
      >
        {reminder.highlight && <div className="size-[6px] rounded-full bg-slate-400" />}
      </div>

      {/* 内容卡片 */}
      <div
        className={`rounded-3xl border p-6 transition-all duration-300 group-hover:-translate-y-1 ${
          reminder.highlight
            ? 'border-slate-100 bg-slate-50/60 shadow-sm hover:shadow-xl'
            : 'border-slate-100 bg-white shadow-sm hover:shadow-lg'
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
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {reminder.highlight && <Bell className="size-3" />}
                {reminder.tag}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">{reminder.rule}</p>
          </div>

          {/* 右侧截止时间 */}
          <div className="flex shrink-0 items-center gap-2 self-start rounded-full bg-slate-50 px-4 py-2">
            <Clock className="size-4 text-slate-400" />
            <span className="text-sm font-bold tabular-nums text-slate-900">
              {reminder.deadline}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BookingSection() {
  return (
    <section className="w-full">
      {/* 区块标题 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-16 text-center"
      >
        <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
          Important Reminders
        </span>
        <h2 className="text-4xl font-light tracking-tight text-slate-900 md:text-5xl font-[family-name:var(--font-serif)]">
          景点预约提醒
        </h2>
        <p className="mt-4 text-lg font-light leading-relaxed text-slate-500">
          热门景点需提前预约，错过时间可能无法入园
        </p>
      </motion.div>

      {/* 时间轴列表 */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-2xl mx-auto"
      >
        {MOCK_BOOKING_REMINDERS.map((reminder) => (
          <BookingCard key={reminder.id} reminder={reminder} />
        ))}
      </motion.div>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 max-w-2xl mx-auto flex items-start gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Calendar className="size-5 text-slate-400" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-800">预约小贴士</p>
          <p className="text-sm leading-relaxed text-slate-500">
            建议使用微信小程序或各景点官方公众号进行预约，部分景点支持提前录入同行人信息，抢票更高效。
          </p>
        </div>
      </motion.div>
    </section>
  );
}
