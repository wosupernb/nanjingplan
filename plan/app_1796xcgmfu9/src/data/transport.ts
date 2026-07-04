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
    code: 'MU2966',
    route: '南宁 → 南京',
    departureTime: '23:25',
    arrivalTime: '01:50 (+1天)',
    duration: '2h25m',
    price: 600,
    priceNote: '起',
    seatClass: '经济舱',
    note: '去程航班，深夜出发次日凌晨抵达',
    imageUrl: ''
  },
  {
    id: '2',
    type: 'train',
    code: 'K1557',
    route: '南京 → 南宁',
    departureTime: '14:36',
    arrivalTime: '15:35 (+1天)',
    duration: '25h',
    price: 353,
    priceNote: '硬卧',
    seatClass: '硬卧',
    note: '返程火车，次日抵达南宁',
    imageUrl: ''
  }
]