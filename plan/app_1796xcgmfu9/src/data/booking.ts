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
    rule: '提前7天开放预约，每天18:00放票',
    deadline: '7月7日 18:00',
    tag: '免费·需预约',
    highlight: true,
  },
  {
    id: '2',
    name: '总统府',
    rule: '提前5天开放预约',
    deadline: '7月9日',
    tag: '学生¥20·需预约',
    highlight: false,
  },
  {
    id: '3',
    name: '侵华日军南京大屠杀遇难同胞纪念馆',
    rule: '提前7天预约，高考生凭准考证免预约',
    deadline: '7月7日',
    tag: '免费·高考生免预约',
    highlight: true,
  },
]