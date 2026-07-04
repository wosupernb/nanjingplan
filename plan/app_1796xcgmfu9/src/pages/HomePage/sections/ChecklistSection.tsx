import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, CreditCard, Shirt, Smartphone, Droplets, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

// ──────────────────────────────────────
// 装备清单数据
// ──────────────────────────────────────

interface IChecklistItem {
  id: string;
  label: string;
}

interface IChecklistCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: IChecklistItem[];
}

const CHECKLIST_DATA: IChecklistCategory[] = [
  {
    id: 'documents',
    title: '证件类',
    icon: CreditCard,
    items: [
      { id: 'd1', label: '身份证' },
      { id: 'd2', label: '学生证（景点半价必备）' },
      { id: 'd3', label: '高考准考证（纪念馆免预约）' },
      { id: 'd4', label: '银行卡 / 少量现金' },
    ],
  },
  {
    id: 'clothing',
    title: '衣物类',
    icon: Shirt,
    items: [
      { id: 'c1', label: '速干 T 恤 × 3' },
      { id: 'c2', label: '薄外套（早晚温差）' },
      { id: 'c3', label: '舒适运动鞋（日行 2 万步）' },
      { id: 'c4', label: '遮阳帽 / 墨镜' },
      { id: 'c5', label: '一次性雨衣' },
    ],
  },
  {
    id: 'electronics',
    title: '电子设备',
    icon: Smartphone,
    items: [
      { id: 'e1', label: '手机 + 充电器' },
      { id: 'e2', label: '充电宝（2 万毫安）' },
      { id: 'e3', label: '耳机（火车 25h 必备）' },
      { id: 'e4', label: '自拍杆 / 三脚架' },
    ],
  },
  {
    id: 'daily',
    title: '日用类',
    icon: Droplets,
    items: [
      { id: 'u1', label: '防晒霜 SPF50+' },
      { id: 'u2', label: '驱蚊液（钟山景区必备）' },
      { id: 'u3', label: '湿巾 / 纸巾' },
      { id: 'u4', label: 'U 型枕（火车神器）' },
      { id: 'u5', label: '水杯（景区接水省钱）' },
    ],
  },
  {
    id: 'medicine',
    title: '药品类',
    icon: Pill,
    items: [
      { id: 'm1', label: '创可贴 / 碘伏棉签' },
      { id: 'm2', label: '藿香正气水（防中暑）' },
      { id: 'm3', label: '蒙脱石散（防腹泻）' },
      { id: 'm4', label: '布洛芬（止痛退烧）' },
    ],
  },
];

// ──────────────────────────────────────
// 组件
// ──────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function ChecklistSection() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCategory = (catId: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  const totalItems = CHECKLIST_DATA.reduce((sum, c) => sum + c.items.length, 0);
  const checkedCount = CHECKLIST_DATA.reduce(
    (sum, c) => sum + c.items.filter((i) => checked.has(i.id)).length,
    0,
  );

  return (
    <section className="w-full">
      {/* ── 标题行 ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-16"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-4">
          Packing List
        </p>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            出行装备清单
          </h2>
          <span className="shrink-0 px-5 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tabular-nums">
            {checkedCount}/{totalItems}
          </span>
        </div>
        {/* 进度条 */}
        <div className="mt-6 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-slate-900"
            initial={{ width: 0 }}
            whileInView={{ width: `${(checkedCount / totalItems) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          />
        </div>
      </motion.div>

      {/* ── 分类列表 ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {CHECKLIST_DATA.map((cat) => {
          const Icon = cat.icon;
          const isCollapsed = collapsed.has(cat.id);
          const catChecked = cat.items.filter((i) => checked.has(i.id)).length;

          return (
            <motion.div
              key={cat.id}
              variants={categoryVariants}
              className="rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* 分类标题栏 */}
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Icon className="size-5" />
                </div>
                <span className="flex-1 text-base font-bold text-slate-800">
                  {cat.title}
                </span>
                <span className="text-xs font-bold text-slate-400 tabular-nums mr-1">
                  {catChecked}/{cat.items.length}
                </span>
                <ChevronDown
                  className={cn(
                    'size-4 text-slate-400 transition-transform duration-300',
                    !isCollapsed && 'rotate-180',
                  )}
                />
              </button>

              {/* 子项列表 */}
              {!isCollapsed && (
                <ul className="border-t border-slate-50 divide-y divide-slate-50">
                  {cat.items.map((item) => {
                    const isChecked = checked.has(item.id);
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => toggleItem(item.id)}
                          className={cn(
                            'w-full flex items-center gap-4 px-6 py-4 text-left transition-all duration-200',
                            isChecked
                              ? 'bg-slate-50/60 text-slate-900'
                              : 'text-slate-500 hover:bg-slate-50/40 hover:text-slate-700',
                          )}
                        >
                          <span
                            className={cn(
                              'flex size-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200',
                              isChecked
                                ? 'border-slate-900 bg-slate-900 text-white'
                                : 'border-slate-200 bg-transparent',
                            )}
                          >
                            {isChecked && <Check className="size-3" />}
                          </span>
                          <span
                            className={cn(
                              'text-sm font-medium transition-all duration-200',
                              isChecked && 'line-through opacity-50',
                            )}
                          >
                            {item.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default memo(ChecklistSection);
