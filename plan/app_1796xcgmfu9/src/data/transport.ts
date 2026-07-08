// EXPORTS: ITransport, MOCK_TRANSPORT
export interface ITransport {
  id: string
  type: 'flight' | 'train'
  code: string
  route: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  priceNote: string
  seatClass: string
  note: string
  imageUrl: string
}

export const MOCK_TRANSPORT: ITransport[] = [
  {
    id: '1',
    type: 'flight',
    code: '航班待定',
    route: '南宁 → 南京',
    departureTime: '中午',
    arrivalTime: '下午',
    duration: '约2.5h',
    price: 720,
    priceNote: '经济舱',
    seatClass: '经济舱',
    note: '去程航班，中午出发下午抵达禄口T2，地铁S1→1号线到三山街',
    imageUrl: ''
  },
  {
    id: '2',
    type: 'train',
    code: 'K1557',
    route: '南京 → 南宁',
    departureTime: '14:36',
    arrivalTime: '15:35 (+1天)',
    duration: '24h59m',
    price: 353,
    priceNote: '硬卧',
    seatClass: '硬卧',
    note: '返程火车，过路站！注意确认车次和站台，次日15:35抵达南宁',
    imageUrl: ''
  }
]