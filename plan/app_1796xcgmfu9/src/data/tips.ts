// EXPORTS: ITip, MOCK_TIPS
export interface ITip {
  id: string
  title: string
  description: string
  category: '美食购物' | '交通出行' | '景点游玩' | '住宿' | '其他'
  icon: string
}

export const MOCK_TIPS: ITip[] = [
  // ========== 美食购物 ==========
  {
    id: '1',
    title: '夫子庙真空盐水鸭别买',
    description: '景区卖的精装盐水鸭五六十一只，全是冻货，柴得像嚼木头。去居民区卤菜店买现切的，二十多块钱半只',
    category: '美食购物',
    icon: '🦆',
  },
  {
    id: '2',
    title: '夫子庙美食街全是游客陷阱',
    description: '主街小吃又贵又难吃，往小巷走（东牌楼巷/大石坝街）价格减半，味道更正宗',
    category: '美食购物',
    icon: '🛍️',
  },
  {
    id: '3',
    title: '科巷才是美食天堂',
    description: '本地人都去科巷吃，许阿姨糕团、草桥锅贴、草鸡蛋糕，人均30吃到撑',
    category: '美食购物',
    icon: '🍜',
  },
  {
    id: '4',
    title: '景区"免费试吃"桂花糕别买',
    description: '试吃一小块就缠着你买一整盒，去三七八巷或侯家桥菜场买更正宗便宜',
    category: '美食购物',
    icon: '🍰',
  },
  {
    id: '5',
    title: '路边扁担挑的"乌梅"是打蜡葡萄',
    description: '小贩挑着扁担卖的乌黑发亮"乌梅"，实际是打蜡葡萄，别买别吃',
    category: '美食购物',
    icon: '🍇',
  },
  {
    id: '6',
    title: '夫子庙雨花石别在景区买',
    description: '景区雨花石十有八九是染色玻璃，去清凉山公园旁边奇石市场淘真货',
    category: '美食购物',
    icon: '💎',
  },
  {
    id: '7',
    title: '网红店90%是营销出来的',
    description: '带"网红"称号的店大多靠营销，不如找本地人吃了十几年的老店',
    category: '美食购物',
    icon: '📱',
  },
  {
    id: '8',
    title: '景区特产店贵，去正规超市',
    description: '买特产去正规超市或老字号（韩复兴盐水鸭、桂花鸭），品质有保障价格透明',
    category: '美食购物',
    icon: '🏪',
  },

  // ========== 交通出行 ==========
  {
    id: '9',
    title: '地铁最划算',
    description: '南京地铁覆盖主要景点，办一张金陵通或直接用支付宝乘车码，比打车省一半以上',
    category: '交通出行',
    icon: '🚇',
  },
  {
    id: '10',
    title: '新街口地铁站超级大，容易迷路',
    description: '换乘站有24个出口，预留充足换乘时间，出站前看清出口编号',
    category: '交通出行',
    icon: '🗺️',
  },
  {
    id: '11',
    title: '早晚高峰公交堵到怀疑人生',
    description: '7:30-9:00和17:30-19:00路面拥堵严重，优先选地铁，公交只适合非高峰',
    category: '交通出行',
    icon: '🚌',
  },
  {
    id: '12',
    title: '出租车司机推荐"便宜一日游"别信',
    description: '司机推荐的旅行团有回扣，价格虚高行程缩水，自己坐地铁去景点更划算',
    category: '交通出行',
    icon: '🚕',
  },
  {
    id: '13',
    title: '中山陵停车场"免排队"的人别理',
    description: '有人拦车说带你走免排队通道，直接走官方栈道上去，根本不要钱',
    category: '交通出行',
    icon: '🅿️',
  },
  {
    id: '14',
    title: '凌晨机场只坐正规车',
    description: '深夜抵达禄口机场，只坐正规出租车或网约车平台叫车，别坐黑车',
    category: '交通出行',
    icon: '✈️',
  },
  {
    id: '15',
    title: '共享单车慎用',
    description: '钟山风景区坡多路陡，骑车累且停车点少，景区观光车更省力',
    category: '交通出行',
    icon: '🚲',
  },

  // ========== 景点游玩 ==========
  {
    id: '16',
    title: '博物院预约要趁早',
    description: '南京博物院免费但需提前7天预约，每天18:00放票，暑期1小时内抢光，建议设闹钟',
    category: '景点游玩',
    icon: '🏛️',
  },
  {
    id: '17',
    title: '钟山景区早出发',
    description: '明孝陵6:30前入园免费，省35元学生票，还能避开人流高峰',
    category: '景点游玩',
    icon: '⏰',
  },
  {
    id: '18',
    title: '周末鸡鸣寺人挤到怀疑人生',
    description: '周中早上8点前到才能享受清净，周末排队半小时起步',
    category: '景点游玩',
    icon: '🏯',
  },
  {
    id: '19',
    title: '中山陵迟到15分钟无法进入',
    description: '预约时间段迟到超过15分钟系统自动作废，务必准时到达',
    category: '景点游玩',
    icon: '⚠️',
  },
  {
    id: '20',
    title: '景区门口拍照收费的别理',
    description: '有些景点门口有人拉你拍照然后收费，直接走开不理',
    category: '景点游玩',
    icon: '📸',
  },
  {
    id: '21',
    title: '明孝陵3号门最近',
    description: '3号门（梅花谷南门）进明孝陵最近，别走错门多绕半小时',
    category: '景点游玩',
    icon: '🚪',
  },
  {
    id: '22',
    title: '鸡鸣寺是单行道',
    description: '南门进北门出，不可走回头路，门票10元送三根香',
    category: '景点游玩',
    icon: '↗️',
  },
  {
    id: '23',
    title: '纪念馆保持肃穆',
    description: '遇难同胞纪念馆内景禁止拍照，保持安静，衣冠整洁，禁止携带打火机',
    category: '景点游玩',
    icon: '🕊️',
  },
  {
    id: '24',
    title: '秦淮河夜游免费',
    description: '沿河散步不花钱，不必坐游船（票价80），岸边拍照一样出片',
    category: '景点游玩',
    icon: '🌃',
  },

  // ========== 住宿 ==========
  {
    id: '25',
    title: '住宿选三山街',
    description: '夫子庙/三山街区域民宿性价比高，离地铁近，连住两晚人均200',
    category: '住宿',
    icon: '🏠',
  },

  // ========== 其他 ==========
  {
    id: '26',
    title: '6-7月天气说变就变',
    description: '防晒霜、遮阳伞、薄雨衣是标配，南京夏天雷阵雨说来就来',
    category: '其他',
    icon: '🌦️',
  },
  {
    id: '27',
    title: '梅雨季注意防潮',
    description: '6-7月南京梅雨季非常潮湿，衣物多备一套，鞋子选防水的',
    category: '其他',
    icon: '💧',
  },
  {
    id: '28',
    title: '自带水杯更省钱',
    description: '景区内饮水点充足，自带水杯随时接水，不用买景区高价矿泉水',
    category: '其他',
    icon: '🥤',
  },
  {
    id: '29',
    title: '甄别旅行社低价团',
    description: '低价团往往有隐形消费和强制购物，选正规旅行社或自由行更靠谱',
    category: '其他',
    icon: '🎫',
  },
  {
    id: '30',
    title: '高考生纪念馆免预约',
    description: '7月1日至9月1日，高考生凭身份证+准考证免预约进入遇难同胞纪念馆',
    category: '其他',
    icon: '🎓',
  },
];
