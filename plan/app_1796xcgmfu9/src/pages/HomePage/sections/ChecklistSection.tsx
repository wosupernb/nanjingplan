import { useState, memo } from 'react';
import { Check, ChevronDown, CreditCard, Shirt, Smartphone, Droplets, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGsapReveal } from '@/hooks/useGsap';

interface IChecklistItem {
  id: string;
  label: string;
}

interface IChecklistCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  items: IChecklistItem[];
}

const CATEGORY_COLORS: Record<string, { color: string; bgColor: string }> = {
  documents: { color: '#B84233', bgColor: 'rgba(184, 66, 51, 0.1)' },
  clothing: { color: '#C4A265', bgColor: 'rgba(196, 162, 101, 0.1)' },
  electronics: { color: '#6B7B8C', bgColor: 'rgba(107, 123, 140, 0.1)' },
  daily: { color: '#4A7C6F', bgColor: 'rgba(74, 124, 111, 0.1)' },
  medicine: { color: '#3D4F5F', bgColor: 'rgba(61, 79, 95, 0.1)' },
};

const CHECKLIST_DATA: IChecklistCategory[] = [
  {
    id: 'documents',
    title: '证件类',
    icon: CreditCard,
    color: CATEGORY_COLORS.documents.color,
    bgColor: CATEGORY_COLORS.documents.bgColor,
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
    color: CATEGORY_COLORS.clothing.color,
    bgColor: CATEGORY_COLORS.clothing.bgColor,
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
    color: CATEGORY_COLORS.electronics.color,
    bgColor: CATEGORY_COLORS.electronics.bgColor,
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
    color: CATEGORY_COLORS.daily.color,
    bgColor: CATEGORY_COLORS.daily.bgColor,
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
    color: CATEGORY_COLORS.medicine.color,
    bgColor: CATEGORY_COLORS.medicine.bgColor,
    items: [
      { id: 'm1', label: '创可贴 / 碘伏棉签' },
      { id: 'm2', label: '藿香正气水（防中暑）' },
      { id: 'm3', label: '蒙脱石散（防腹泻）' },
      { id: 'm4', label: '布洛芬（止痛退烧）' },
    ],
  },
];

function ChecklistSection() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const headerRef = useGsapReveal<HTMLDivElement>({
    y: 20,
    duration: 0.6,
    start: 'top 85%',
  });
  const gridRef = useGsapReveal<HTMLDivElement>({
    y: 24,
    duration: 0.5,
    stagger: 0.08,
    delay: 0.1,
    start: 'top 80%',
  });

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
  const progressPercent = (checkedCount / totalItems) * 100;

  return (
    <section className="w-full">
      <div ref={headerRef} className="mb-16 will-change-transform">
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#B84233' }}>
          Packing List
        </p>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            出行装备清单
          </h2>
          <span className="shrink-0 px-5 py-2 rounded-full text-sm font-bold tabular-nums" style={{ backgroundColor: 'rgba(74, 124, 111, 0.1)', color: '#4A7C6F' }}>
            {checkedCount}/{totalItems}
          </span>
        </div>
        <div className="mt-6 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out will-change-[width]"
            style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #B84233 0%, #C4A265 100%)' }}
          />
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 will-change-transform"
      >
        {CHECKLIST_DATA.map((cat) => {
          const Icon = cat.icon;
          const isCollapsed = collapsed.has(cat.id);
          const catChecked = cat.items.filter((i) => checked.has(i.id)).length;

          return (
            <div
              key={cat.id}
              className="card-3d rounded-3xl border border-slate-100 bg-white overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
              >
                <div 
                  className="flex size-11 items-center justify-center rounded-2xl shrink-0 transition-colors"
                  style={{ backgroundColor: cat.bgColor, color: cat.color }}
                >
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
                                ? 'text-white'
                                : 'border-slate-200 bg-transparent',
                            )}
                            style={isChecked ? { backgroundColor: '#B84233', borderColor: '#B84233' } : {}}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default memo(ChecklistSection);
