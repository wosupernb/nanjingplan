import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { CallbackDataParams } from 'echarts/types/dist/shared';
import { MOCK_BUDGET } from '@/data/budget';
import { useGsapReveal } from '@/hooks/useGsap';

const NANJING_COLORS = {
  cinnabar: '#B84233',
  gold: '#C4A265',
  jade: '#4A7C6F',
  indigo: '#3D4F5F',
  wall: '#6B7B8C',
  cinnabarLight: '#FDF2E9',
  goldLight: '#FAF6ED',
};

const CHART_COLORS_NANJING = [
  NANJING_COLORS.cinnabar,
  NANJING_COLORS.gold,
  NANJING_COLORS.jade,
  NANJING_COLORS.indigo,
  NANJING_COLORS.wall,
];

const CATEGORY_ORDER = ['交通', '住宿', '门票', '餐饮', '其他'];

const CATEGORY_LABELS: Record<string, string> = {
  '交通': 'Transport',
  '住宿': 'Stay',
  '门票': 'Tickets',
  '餐饮': 'Dining',
  '其他': 'Others',
};

export default function BudgetSection() {
  const totalAmount = useMemo(() => MOCK_BUDGET.reduce((sum, item) => sum + item.amount, 0), []);

  const categoryTotals = useMemo(() => {
    const map: Record<string, number> = {};
    MOCK_BUDGET.forEach((item) => {
      map[item.category] = (map[item.category] || 0) + item.amount;
    });
    return map;
  }, []);

  const headerRef = useGsapReveal<HTMLDivElement>({
    y: 20,
    duration: 0.6,
    start: 'top 85%',
  });
  const summaryRef = useGsapReveal<HTMLDivElement>({
    y: 24,
    duration: 0.6,
    delay: 0.1,
    start: 'top 80%',
  });
  const chartRef = useGsapReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.12,
    delay: 0.15,
    start: 'top 80%',
  });

  const chartOption: EChartsOption = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: NANJING_COLORS.indigo,
      borderColor: NANJING_COLORS.wall,
      borderWidth: 1,
      textStyle: { color: '#F8FAFC', fontSize: 13 },
      formatter: (params: unknown) => {
        const list = Array.isArray(params) ? params as CallbackDataParams[] : [params as CallbackDataParams];
        return list.map((p, i) => {
          const cat = p.name || '';
          const val = p.value ?? 0;
          const color = CHART_COLORS_NANJING[i % CHART_COLORS_NANJING.length];
          return `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${color};margin-right:6px;"></span>${cat}：<strong>¥${val}</strong>`;
        }).join('<br/>');
      },
    },
    legend: { show: false },
    grid: { left: '3%', right: '4%', top: '8%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: CATEGORY_ORDER,
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisTick: { show: false },
      axisLabel: { color: '#64748B', fontSize: 13, fontWeight: 500 },
    },
    yAxis: {
      type: 'value',
      name: '¥',
      nameTextStyle: { color: '#94A3B8', fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
      axisLabel: { color: '#94A3B8', fontSize: 12 },
    },
    series: [{
      type: 'bar',
      barWidth: 56,
      emphasis: {
        itemStyle: { opacity: 0.85 },
      },
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
        color: (params: CallbackDataParams) => {
          const idx = params.dataIndex ?? 0;
          return CHART_COLORS_NANJING[idx % CHART_COLORS_NANJING.length];
        },
      },
      label: {
        show: true,
        position: 'top',
        fontSize: 13,
        fontWeight: 600,
        color: NANJING_COLORS.indigo,
        formatter: (params: CallbackDataParams) => `¥${params.value}`,
      },
      data: CATEGORY_ORDER.map((cat) => categoryTotals[cat] || 0),
    }],
  }), [categoryTotals]);

  return (
    <div className="container mx-auto px-6 md:px-12">
      <div
        ref={headerRef}
        className="mb-16 text-center will-change-transform"
      >
        <span style={{ color: NANJING_COLORS.cinnabar }} className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4">
          Budget Breakdown
        </span>
        <h2 style={{ color: NANJING_COLORS.indigo }} className="text-4xl md:text-5xl font-serif">
          预算总览
        </h2>
        <p className="mt-4 text-lg font-light leading-relaxed text-slate-500">
          人均约 ¥1,518 – ¥1,538，总控 ¥1,700
        </p>
      </div>

      <div ref={summaryRef} className="mb-16 will-change-transform">
        <div style={{ boxShadow: '0 4px 8px rgba(26,35,50,0.04), 0 8px 16px rgba(26,35,50,0.03)' }} className="bg-white rounded-[3rem] border border-slate-100 p-10 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Per Person
              </div>
              <div style={{ color: NANJING_COLORS.cinnabar }} className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight">
                ¥1,538
              </div>
              <div className="text-xs text-slate-400 mt-1">人均预算</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Cap
              </div>
              <div style={{ color: NANJING_COLORS.gold }} className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight">
                ¥1,700
              </div>
              <div className="text-xs text-slate-400 mt-1">总控上限</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Total
              </div>
              <div style={{ color: NANJING_COLORS.indigo }} className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight">
                ¥{totalAmount.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">预算合计</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Surplus
              </div>
              <div style={{ color: NANJING_COLORS.jade }} className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight">
                ¥{(1700 - totalAmount).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">结余</div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={chartRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 will-change-transform"
      >
        <div>
          <div style={{ boxShadow: '0 1px 2px rgba(26,35,50,0.04), 0 2px 4px rgba(26,35,50,0.03)' }} className="bg-white rounded-[3rem] border border-slate-100 p-8 transition-all duration-500 hover:shadow-[0_8px_16px_rgba(26,35,50,0.06),0_16px_32px_rgba(26,35,50,0.04),0_32px_64px_rgba(26,35,50,0.03)] hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-serif text-slate-800">费用类别分布</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Chart</span>
            </div>
            <ReactECharts option={chartOption} theme="ud" className="h-[340px]" />
          </div>
        </div>

        <div>
          <div style={{ boxShadow: '0 1px 2px rgba(26,35,50,0.04), 0 2px 4px rgba(26,35,50,0.03)' }} className="bg-white rounded-[3rem] border border-slate-100 p-8 transition-all duration-500 hover:shadow-[0_8px_16px_rgba(26,35,50,0.06),0_16px_32px_rgba(26,35,50,0.04),0_32px_64px_rgba(26,35,50,0.03)] hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-serif text-slate-800">费用明细</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Details</span>
            </div>
            <div className="space-y-3">
              {CATEGORY_ORDER.map((cat, catIdx) => {
                const items = MOCK_BUDGET.filter((i) => i.category === cat);
                if (items.length === 0) return null;
                const dotColor = CHART_COLORS_NANJING[catIdx % CHART_COLORS_NANJING.length];
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ backgroundColor: dotColor }} className="w-1.5 h-1.5 rounded-full" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {CATEGORY_LABELS[cat] || cat}
                      </span>
                      <span className="text-xs text-slate-400">{cat}</span>
                    </div>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        style={{ transition: 'background-color 0.2s ease' }}
                        className="flex items-center justify-between py-2.5 px-4 rounded-2xl hover:bg-[#FDF2E9]"
                      >
                        <div className="flex-1 min-w-0 mr-4">
                          <div className="text-sm font-medium text-slate-800 truncate">{item.item}</div>
                          <div className="text-xs text-slate-400 truncate">{item.detail}</div>
                        </div>
                        <div className="text-sm font-semibold tabular-nums text-slate-900 shrink-0">
                          ¥{item.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}

              <div className="pt-4 mt-4 border-t border-slate-100">
                <div style={{ backgroundColor: NANJING_COLORS.goldLight }} className="flex items-center justify-between py-3 px-4 rounded-2xl">
                  <span style={{ color: NANJING_COLORS.gold }} className="text-sm font-bold">合计</span>
                  <span style={{ color: NANJING_COLORS.gold }} className="text-xl font-bold tabular-nums">
                    ¥{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
