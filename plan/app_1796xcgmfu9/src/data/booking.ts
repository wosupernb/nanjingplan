// EXPORTS: IBookingReminder, MOCK_BOOKING_REMINDERS
export interface IBookingReminder {
  id: string
  /** 景点名称 */
  name: string
  /** 预约规则简述 */
  rule: string
  /** 最早可预约时间 */
  earliestDate: string
  /** 游览日期 */
  visitDate: string
  /** 标签：免费/需预约/免预约等 */
  tag: string
  /** 是否高亮提醒 */
  highlight: boolean
}

export const MOCK_BOOKING_REMINDERS: IBookingReminder[] = [
  {
    id: '1',
    name: '南京博物院',
    rule: '提前7天开放预约，每日18:00放票，每天限18000人',
    earliestDate: '7月8日 18:00',
    visitDate: '7月15日',
    tag: '免费·需抢票',
    highlight: true,
  },
  {
    id: '2',
    name: '总统府',
    rule: '提前5天开放预约，暑期限8000人/天',
    earliestDate: '7月10日',
    visitDate: '7月15日',
    tag: '学生¥20·需预约',
    highlight: false,
  },
  {
    id: '3',
    name: '侵华日军南京大屠杀遇难同胞纪念馆',
    rule: '提前7天开放预约。🎓 2026届高考生7.1-9.1凭身份证+准考证免预约！9号门登记入馆',
    earliestDate: '7月10日',
    visitDate: '7月17日',
    tag: '免费·高考生免预约',
    highlight: true,
  },
  {
    id: '4',
    name: '明孝陵',
    rule: '提前5天预约，6:30前免费入场（原价¥70）',
    earliestDate: '7月11日',
    visitDate: '7月16日',
    tag: '★6:30前免费',
    highlight: true,
  },
  {
    id: '5',
    name: '鸡鸣寺',
    rule: '提前3天预约',
    earliestDate: '7月12日',
    visitDate: '7月15日',
    tag: '¥10·需预约',
    highlight: false,
  },
  {
    id: '6',
    name: '中山陵',
    rule: '提前3天预约，建议选8:30-10:30时段，迟到15分钟无法进入',
    earliestDate: '7月13日',
    visitDate: '7月16日',
    tag: '免费·需预约',
    highlight: false,
  },
]
