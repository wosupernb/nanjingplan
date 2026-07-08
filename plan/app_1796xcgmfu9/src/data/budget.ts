// EXPORTS: IBudgetItem, MOCK_BUDGET
export interface IBudgetItem {
  id: string
  category: '交通' | '住宿' | '门票' | '餐饮' | '其他'
  item: string
  detail: string
  amount: number
}

export const MOCK_BUDGET: IBudgetItem[] = [
  { id: '1', category: '交通', item: '去程机票', detail: '南宁→南京 经济舱', amount: 720 },
  { id: '2', category: '交通', item: '返程火车', detail: 'K1557 南京→南宁 硬卧', amount: 353 },
  { id: '3', category: '交通', item: '市内交通', detail: '地铁+公交+轮渡（4天）', amount: 60 },
  { id: '4', category: '交通', item: '机场地铁', detail: '禄口机场→市区 S1→1号线', amount: 8 },
  { id: '5', category: '交通', item: '轮渡', detail: '中山码头→浦口码头 往返', amount: 4 },
  { id: '6', category: '住宿', item: '民宿3晚', detail: '中山南路369号 巨幕投影·三山街站', amount: 165 },
  { id: '7', category: '门票', item: '总统府', detail: '学生票', amount: 20 },
  { id: '8', category: '门票', item: '鸡鸣寺', detail: '门票（送三根香）', amount: 10 },
  { id: '9', category: '门票', item: '明孝陵', detail: '★6:30前免费入场（原价¥70）', amount: 0 },
  { id: '10', category: '门票', item: '音乐台', detail: '学生票', amount: 5 },
  { id: '11', category: '门票', item: '灵谷寺', detail: '学生票', amount: 18 },
  { id: '12', category: '餐饮', item: '4天餐饮', detail: '小吃+南京烤鸭+科巷美食', amount: 200 },
  { id: '13', category: '其他', item: '备用金', detail: '零食/水/应急', amount: 80 },
]
