// EXPORTS: IBookingReminder, MOCK_BOOKING_REMINDERS
export interface IBookingReminder {
  id: string
  /** 景点名称 */
  name: string
  /** 预约规则简述 */
  rule: string
  /** 预约截止时间描述 */
  deadline: string
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
    deadline: '7月10日 18:00',
    tag: '免费·需抢票',
    highlight: true,
  },
  {
    id: '2',
    name: '总统府',
    rule: '提前5天开放预约，暑期限8000人/天',
    deadline: '7月12日 10:00',
    tag: '学生¥20·需预约',
    highlight: false,
  },
  {
    id: '3',
    name: '明孝陵',
    rule: '提前5天预约，6:30前免费入场（原价¥70）',
    deadline: '7月12日 10:00',
    tag: '★6:30前免费',
    highlight: true,
  },
  {
    id: '4',
    name: '中山陵',
    rule: '提前3天预约，建议选8:30-10:30时段，迟到15分钟无法进入',
    deadline: '7月13日 10:00',
    tag: '免费·需预约',
    highlight: false,
  },
  {
    id: '5',
    name: '鸡鸣寺',
    rule: '提前3天预约',
    deadline: '7月13日 10:00',
    tag: '¥10·需预约',
    highlight: false,
  },
  {
    id: '6',
    name: '侵华日军南京大屠杀遇难同胞纪念馆',
    rule: '🎓 2026届高考生7.1-9.1凭身份证+准考证免预约！9号门登记入馆',
    deadline: '免预约',
    tag: '免费·高考生免预约',
    highlight: true,
  },
]
