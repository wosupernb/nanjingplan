import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { CallbackDataParams } from 'echarts/types/dist/shared';
import { MOCK_BUDGET } from '@/data/budget';
import { CHART_COLORS } from '@/lib/chart-colors';

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

  const chartOption: EChartsOption = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#0F172A',
      borderColor: '#1E293B',
      borderWidth: 1,
      textStyle: { color: '#F8FAFC', fontSize: 13 },
      formatter: (params: unknown) => {
        const list = Array.isArray(params) ? params as CallbackDataParams[] : [params as CallbackDataParams];
        return list.map((p) => {
          const cat = p.name || '';
          const val = p.value ?? 0;
          return `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#2563EB;margin-right:6px;"></span>${cat}：<strong>¥${val}</strong>`;
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
          return CHART_COLORS[idx % CHART_COLORS.length];
        },
      },
      label: {
        show: true,
        position: 'top',
        fontSize: 13,
        fontWeight: 600,
        color: '#0F172A',
        formatter: (params: CallbackDataParams) => `¥${params.value}`,
      },
      data: CATEGORY_ORDER.map((cat) => categoryTotals[cat] || 0),
    }],
  }), [categoryTotals]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <div className="container mx-auto px-6 md:px-12">
      {/* 区块标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-16 text-center"
      >
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">
          Budget Breakdown
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
          预算总览
        </h2>
        <p className="mt-4 text-lg font-light leading-relaxed text-slate-500">
          人均约 ¥1,518 – ¥1,538，总控 ¥1,700
        </p>
      </motion.div>

      {/* 总预算汇总卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-16"
      >
        <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0_0_0_0.06)] border border-slate-100 p-10 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Per Person
              </div>
              <div className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight text-slate-900">
                ¥1,538
              </div>
              <div className="text-xs text-slate-400 mt-1">人均预算</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Cap
              </div>
              <div className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight text-slate-900">
                ¥1,700
              </div>
              <div className="text-xs text-slate-400 mt-1">总控上限</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Total
              </div>
              <div className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight text-slate-900">
                ¥{totalAmount.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">预算合计</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Surplus
              </div>
              <div className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight text-lime-500">
                ¥{(1700 - totalAmount).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">结余</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 柱状图 + 明细表格 双栏 */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* 柱状图 */}
        <motion.div variants={itemVariant}>
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8 hover:shadow-xl transition-shadow duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-serif text-slate-800">费用类别分布</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Chart</span>
            </div>
            <ReactECharts option={chartOption} theme="ud" className="h-[340px]" />
          </div>
        </motion.div>

        {/* 明细表格 */}
        <motion.div variants={itemVariant}>
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8 hover:shadow-xl transition-shadow duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-serif text-slate-800">费用明细</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Details</span>
            </div>
            <div className="space-y-3">
              {CATEGORY_ORDER.map((cat) => {
                const items = MOCK_BUDGET.filter((i) => i.category === cat);
                if (items.length === 0) return null;
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {CATEGORY_LABELS[cat] || cat}
                      </span>
                      <span className="text-xs text-slate-400">{cat}</span>
                    </div>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-2.5 px-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200"
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

              {/* 合计行 */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <div className="flex items-center justify-between py-3 px-4 rounded-2xl bg-slate-50">
                  <span className="text-sm font-bold text-slate-800">合计</span>
                  <span className="text-xl font-bold tabular-nums text-slate-900">
                    ¥{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
