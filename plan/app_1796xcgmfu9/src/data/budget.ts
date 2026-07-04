// EXPORTS: IBudgetItem, MOCK_BUDGET
export interface IBudgetItem {
  id: string
  category: '交通' | '住宿' | '门票' | '餐饮' | '其他'
  item: string
  detail: string
  amount: number
}

export const MOCK_BUDGET: IBudgetItem[] = [
  { id: '1', category: '交通', item: '去程机票', detail: 'MU2966 南宁→南京', amount: 600 },
  { id: '2', category: '交通', item: '返程火车', detail: 'K1557 南京→南宁 硬卧', amount: 353 },
  { id: '3', category: '交通', item: '市内交通', detail: '地铁+公交+共享单车', amount: 50 },
  { id: '4', category: '住宿', item: '民宿连住', detail: '夫子庙/三山街 2晚', amount: 200 },
  { id: '5', category: '门票', item: '总统府', detail: '学生票', amount: 20 },
  { id: '6', category: '门票', item: '鸡鸣寺', detail: '门票', amount: 10 },
  { id: '7', category: '门票', item: '明孝陵', detail: '学生票', amount: 35 },
  { id: '8', category: '门票', item: '音乐台', detail: '学生票', amount: 5 },
  { id: '9', category: '门票', item: '紫金山天文台', detail: '学生票', amount: 15 },
  { id: '10', category: '餐饮', item: '每日餐饮', detail: '3天早中晚餐+小吃', amount: 200 },
  { id: '11', category: '其他', item: '旅行保险', detail: '3天短期险', amount: 30 },
  { id: '12', category: '其他', item: '备用金', detail: '应急/纪念品', amount: 50 },
]