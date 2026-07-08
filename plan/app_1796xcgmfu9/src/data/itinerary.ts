// EXPORTS: IItineraryDay, IItinerarySpot, MOCK_ITINERARY

/** 景点内部路线步骤 */
export interface IRouteStep {
  /** 步骤名称（如"历史馆""石象路神道""392级台阶"） */
  name: string
  /** 预计耗时 */
  duration: string
  /** 补充说明 */
  note?: string
}

/** 拍照点 */
export interface IPhotoSpot {
  /** 机位描述 */
  name: string
  /** 拍摄建议 */
  tip?: string
}

/** 导航坐标 */
export interface ICoordinates {
  lng: number
  lat: number
}

export interface IItinerarySpot {
  id: string
  name: string
  time: string
  duration: string
  fee: number
  feeNote: string
  transport: string
  imageUrl: string
  tip?: string
  /** 景点内部详细游览路线 */
  route?: IRouteStep[]
  /** 必看/必拍点 */
  highlights?: string[]
  /** 拍照机位 */
  photoSpots?: IPhotoSpot[]
  /** 注意事项 */
  warnings?: string[]
  /** 导航坐标（高德地图） */
  coordinates?: ICoordinates
}

export interface IItineraryDay {
  id: string
  day: number
  title: string
  subtitle: string
  date: string
  spots: IItinerarySpot[]
  dailyTotal: number
  dailyTotalNote: string
}

export const MOCK_ITINERARY: IItineraryDay[] = [
  {
    id: '1',
    day: 1,
    title: '出发+浦口半日游',
    subtitle: '轮渡·民国风情·长江日落',
    date: '7月14日',
    spots: [
      {
        id: '1-1',
        name: '入住民宿',
        time: '下午',
        duration: '30min',
        fee: 0,
        feeNote: '已预订',
        transport: '地铁S1→1号线 禄口机场→三山街',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E6%B8%A9%E9%A6%A8%E6%B0%91%E5%AE%BF%E5%AE%A4%E5%86%85%E6%8A%95%E5%BD%B1%E4%BB%AA%E8%88%92%E9%80%82%E5%8D%A7%E5%AE%A4%E6%9A%96%E8%89%B2%E8%B0%83%E7%81%AF%E5%85%89%E5%B7%A5%E4%B8%9A%E9%A3%8E%E6%A0%BC%E8%A3%85%E9%A5%B0&image_size=landscape_4_3',
        tip: '中山南路369号「巨幕MaX投影No.8赋闲洛畔」⭐4.9',
        coordinates: { lng: 118.782038, lat: 32.022953 },
        warnings: [
          '提前联系房东确认入住时间、门禁密码',
          '放下行李轻装出发，傍晚浦口半日游',
        ],
      },
      {
        id: '1-2',
        name: '中山码头',
        time: '16:05',
        duration: '10min',
        fee: 0,
        feeNote: '免费参观',
        transport: '地铁5号线 三山街→下关站',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E4%B8%AD%E5%B1%B1%E7%A0%81%E5%A4%B4%E6%B0%91%E5%9B%BD%E5%BB%BA%E7%AD%91%E9%95%BF%E6%B1%9F%E6%99%AF%E6%99%A8%E5%85%89%E6%B1%9F%E8%BE%B9%E7%A0%81%E5%A4%B4%E5%AE%9E%E6%99%8B%E4%BB%A3%E9%A3%8E%E6%A0%BC%E5%BB%BA%E7%AD%91%E9%97%A8%E5%A4%B4%E9%95%BF%E6%B1%9F%E8%83%8C%E6%99%AF&image_size=landscape_4_3',
        tip: '高德评分4.8，营业时间06:00-19:00',
        coordinates: { lng: 118.733456, lat: 32.087671 },
        highlights: [
          '★民国风格建筑门头（中山北路643号）',
          '长江江景，远眺南京长江大桥',
          '侵华日军南京大屠杀死难同胞丛葬地纪念碑',
        ],
        photoSpots: [
          { name: '中山码头门头', tip: '民国建筑+江景背景，正面仰拍' },
          { name: '江边落日', tip: '傍晚向西拍长江落日方向' },
        ],
        route: [
          { name: '下关站3号口出', duration: '10min', note: '地铁5号线三山街→下关站，3号口出，沿中山北路向北步行约10分钟' },
          { name: '码头门头打卡', duration: '5min', note: '★民国风格建筑门头，"中山码头"牌匾，正面仰拍留念' },
          { name: '江边观景平台', duration: '5min', note: '码头东侧江边平台，远眺南京长江大桥，长江江景' },
          { name: '丛葬地纪念碑', duration: '5min', note: '码头旁的侵华日军南京大屠杀死难同胞中山码头丛葬地纪念碑，历史铭记' },
          { name: '购票候船', duration: '5min', note: '进入码头售票处，¥2/人，刷支付宝或公交卡，等待轮渡' },
        ],
        warnings: [
          '高德数据：营业时间06:00-19:00，评分4.8',
          '下关站3号口出，步行约10分钟到中山码头',
          '地铁5号线直达，纯地铁duration≈20min',
          '轮渡末班约19:00，注意时间',
        ],
      },
      {
        id: '1-3',
        name: '宁浦线轮渡',
        time: '16:15',
        duration: '10min',
        fee: 2,
        feeNote: '刷公交卡/支付宝',
        transport: '中山码头→浦口码头',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E5%AE%81%E6%B5%A6%E7%BA%BF%E8%BD%AE%E6%B8%A1%E9%95%BF%E6%B1%9F%E7%94%B2%E6%9D%BF%E6%B1%9F%E6%99%AF%E8%90%BD%E6%97%A5%E9%BB%84%E6%98%8F%E8%BD%AE%E6%B8%A1%E8%88%B9%E5%8F%AA%E5%BC%80%E9%95%BF%E6%B1%9F%E9%9D%A2%E6%B3%A2%E5%85%89%E7%B2%BC%E7%B2%BC&image_size=landscape_4_3',
        tip: '★甲板拍长江日落！7月日落约19:00',
        coordinates: { lng: 118.722443, lat: 32.095517 },
        highlights: [
          '★长江江景！远眺南京长江大桥',
          '甲板拍长江日落方向（向西）',
          '两岸城市天际线对比',
        ],
        photoSpots: [
          { name: '甲板长江日落', tip: '★向西拍日落方向，7月日落约19:00，甲板无遮挡' },
          { name: '船尾白浪', tip: '船尾拍浪花+两岸后退的江景' },
          { name: '南京长江大桥远景', tip: '用长焦压缩大桥与轮渡' },
        ],
        route: [
          { name: '登船', duration: '2min', note: '中山码头检票上船，¥2/人，刷支付宝或公交卡' },
          { name: '甲板拍摄', duration: '5min', note: '★上船后直奔甲板！向西拍长江日落方向，两侧城市天际线' },
          { name: '江中航行', duration: '8min', note: '★航程约10分钟，远眺南京长江大桥，甲板风大注意安全' },
          { name: '靠岸浦口码头', duration: '2min', note: '下船后即达浦口火车站片区' },
        ],
        warnings: [
          '轮渡约20-30分钟一班，不用赶',
          '¥2/人，可刷支付宝或公交卡',
          '甲板风大，注意手机/相机防掉落',
          '营业时间06:00-19:00，注意末班时间',
        ],
      },
      {
        id: '1-4',
        name: '浦口火车站旧址',
        time: '16:30',
        duration: '45min',
        fee: 0,
        feeNote: '免费参观',
        transport: '浦口码头出站步行5分钟',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E6%B5%A6%E5%8F%A3%E7%81%AB%E8%BD%A6%E7%AB%99%E7%99%BE%E5%B9%B4%E8%80%81%E7%AB%99%E6%B0%91%E5%9B%BD%E5%BB%BA%E7%AD%91%E6%9C%88%E5%8F%B0%E9%93%81%E8%BD%A8%E6%A2%A7%E6%A1%90%E6%A0%91%E5%BD%B1%E5%AD%90%E5%A4%8D%E5%8F%A4%E6%96%87%E8%89%BA&image_size=landscape_4_3',
        tip: '★朱自清《背影》场景！高德评分4.6',
        coordinates: { lng: 118.720209, lat: 32.097647 },
        highlights: [
          '★朱自清《背影》场景！百年老站（1914年建成）',
          '月台+铁轨（《背影》同款）',
          '老站房+梧桐，津浦铁路终点站',
        ],
        photoSpots: [
          { name: '《背影》同款月台铁轨', tip: '月台+铁轨纵深感构图' },
          { name: '老站房+梧桐', tip: '1914年建成，津浦铁路终点站' },
        ],
        route: [
          { name: '站前广场', duration: '5min', note: '出浦口码头步行5分钟到达，广场开阔，可拍站房全景' },
          { name: '候车大厅', duration: '10min', note: '百年老站建筑，民国风情，木质梁柱+老式吊灯' },
          { name: '月台', duration: '15min', note: '★朱自清《背影》同款月台+铁轨，纵深构图，复古文艺风' },
          { name: '雨廊', duration: '5min', note: '连接各建筑的民国雨廊，红砖柱+木质结构' },
          { name: '《背影》雕塑', duration: '10min', note: '打卡留念，父与子主题雕塑' },
        ],
        warnings: [
          '高德数据：营业时间07:00-24:00，评分4.6',
          '免费参观，无需预约',
          '动线：站前广场→候车大厅→月台→雨廊→《背影》雕塑',
          '现为文化旅游区，部分区域可能围护施工',
        ],
      },
      {
        id: '1-5',
        name: '下关西火车主题园',
        time: '17:30',
        duration: '1h',
        fee: 0,
        feeNote: '免费开放',
        transport: '浦口码头→轮渡回中山码头→沿江边路南行步行15分钟',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E4%B8%8B%E5%85%B3%E7%81%AB%E8%BD%A6%E4%B8%BB%E9%A2%98%E5%9B%AD%E7%BB%BF%E7%9A%AE%E7%81%AB%E8%BD%A6%E9%93%81%E8%BD%A8%E6%97%A5%E8%90%BD%E9%95%BF%E6%B1%9F%E6%99%AF%E5%A4%8D%E5%8F%A4%E6%96%87%E8%89%BA&image_size=landscape_4_3',
        tip: '★绿皮火车+长江日落！高德评分4.6',
        coordinates: { lng: 118.743868, lat: 32.10391 },
        highlights: [
          '★绿皮火车+长江日落！小众文艺打卡地',
          '铁轨+站台+江边步道',
          '下关西火车主题街区（江边路47号）',
        ],
        photoSpots: [
          { name: '绿皮火车+长江日落', tip: '★傍晚7月日落约19:00，向西拍，火车+日落同框' },
          { name: '铁轨纵深', tip: '绿皮车厢+铁轨，文艺复古风' },
          { name: '江边步道', tip: '沿长江步道拍日落剪影' },
        ],
        route: [
          { name: '方家营地铁站3号口', duration: '5min', note: '可选：地铁5号线下关站→方家营站3号口出，步行360米即到' },
          { name: '绿皮火车车厢', duration: '20min', note: '★可进入车厢内部拍照，复古座椅+老式行李架' },
          { name: '铁轨+站台', duration: '15min', note: '废旧铁轨+老站台，复古风，纵深构图' },
          { name: '江边步道看日落', duration: '25min', note: '★沿长江步道看日落，7月日落约19:00，向西拍剪影' },
        ],
        warnings: [
          '高德数据：营业时间10:00-20:00，评分4.6',
          '江边风大，傍晚蚊子多，提前喷驱蚊液',
          '免费开放，无门票',
          '地址：江边路47号（方家营地铁站3号口步行360米）',
        ],
      },
    ],
    dailyTotal: 4,
    dailyTotalNote: '轮渡往返¥4',
  },
  {
    id: '2',
    day: 2,
    title: '金陵文博线',
    subtitle: '博物馆与历史街区',
    date: '7月15日',
    spots: [
      {
        id: '2-1',
        name: '南京博物院',
        time: '09:00',
        duration: '2.5h',
        fee: 0,
        feeNote: '免费需预约',
        transport: '地铁1→2号线 三山街→明故宫',
        imageUrl: '/images/南京博物院_05.jpg',
        tip: '⚠️9:00开门（不是8:30！），提前7天预约',
        coordinates: { lng: 118.8167, lat: 32.0417 },
        route: [
          { name: '历史馆', duration: '1h15min', note: '从一层序厅开始，按年代顺序游览江苏古代文明展，重点看竹林七贤砖画、琉璃塔拱门、广陵王玺金印、战国郢爰金币' },
          { name: '特展馆', duration: '45min', note: '镇馆之宝集中展出，关注国宝展、盛世华彩、陈设清宫' },
          { name: '数字馆', duration: '5min', note: '快速穿行体验即可，非核心展区' },
          { name: '民国馆', duration: '25min', note: '★复原民国南京街景，沉浸式体验，出片率极高！火车站、老邮局、老银行、咖啡馆' },
        ],
        highlights: [
          '★竹林七贤与荣启期砖画（禁止出国文物）',
          '★大报恩寺琉璃塔拱门',
          '广陵王玺金印',
          '战国郢爰金币',
        ],
        photoSpots: [
          { name: '民国馆街景', tip: '复古街灯+老店铺招牌，适合人像' },
          { name: '历史馆盛唐建筑风格外立面', tip: '上午光线从东南方向照来，建筑立体感强' },
        ],
        warnings: [
          '必须提前7天预约，每日18:00放票，暑期1小时内抢光',
          '⚠️9:00开门，不是8:30！8:55到门口排队即可',
          '馆内禁止使用闪光灯',
          '民国馆人多人杂，注意保管财物',
        ],
      },
      {
        id: '2-2',
        name: '科巷美食街（午餐）',
        time: '11:45',
        duration: '45min',
        fee: 0,
        feeNote: '人均30元',
        transport: '地铁2号线 明故宫→大行宫',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E5%8D%97%E4%BA%AC%E7%A7%91%E5%B7%B7%E7%BE%8E%E9%A3%9F%E8%A1%97%E7%83%AD%E9%97%B9%E5%B0%8F%E5%90%83%E6%91%8A%E4%BD%8D%E7%83%9F%E7%81%AB%E6%B0%94%E8%A1%97%E5%B8%82%E7%94%9F%E6%B4%BB&image_size=landscape_4_3',
        tip: '鸭血粉丝汤+鸡鸣汤包+藕饼',
        coordinates: { lng: 118.796, lat: 32.042 },
        highlights: [
          '鸭血粉丝汤（12元）',
          '鸡鸣汤包（15元）',
          '藕饼（5元）',
        ],
        warnings: [
          '科巷在大行宫旁，去总统府顺路',
          '推荐鸿福面馆、鸡鸣汤包大行宫科巷店',
        ],
      },
      {
        id: '2-3',
        name: '总统府',
        time: '12:30',
        duration: '2.5h',
        fee: 20,
        feeNote: '学生票半价',
        transport: '地铁2号线大行宫站，步行5分钟',
        imageUrl: '/images/总统府_05.jpg',
        tip: '提前5天预约',
        coordinates: { lng: 118.7967, lat: 32.0458 },
        route: [
          { name: '中轴线', duration: '1h', note: '大堂（"天下为公"匾额）→ 二堂 → 礼堂（彩色玻璃窗）→ 麒麟门 → 子超楼（蒋介石办公室，二楼）' },
          { name: '东花园', duration: '30min', note: '防空洞 → 行政院 → 复园 → 两江总督馆' },
          { name: '西花园（煦园）', duration: '30min', note: '石舫（不系舟）→ 桐音馆 → 夕佳楼 → 孙中山临时大总统办公室' },
        ],
        highlights: [
          '"天下为公"匾额（大堂）',
          '礼堂彩色玻璃窗',
          '石舫"不系舟"（西花园）',
          '子超楼蒋介石办公室',
        ],
        photoSpots: [
          { name: '天下为公匾额', tip: '正面仰拍，匾额居中构图' },
          { name: '礼堂彩色玻璃窗', tip: '逆光拍摄玻璃透光效果' },
          { name: '石舫倒影', tip: '站在对岸拍石舫+水面倒影' },
          { name: '子超楼外立面', tip: '从楼下仰拍整栋建筑' },
        ],
        warnings: [
          '提前5天开放预约，暑期限8000人/天',
          '中轴线人流最大，建议先走中轴再逛东西花园',
          '出口在西北角，出去就是1912街区',
        ],
      },
      {
        id: '2-4',
        name: '鸡鸣寺',
        time: '15:30',
        duration: '1h',
        fee: 10,
        feeNote: '门票（送三根香）',
        transport: '地铁3号线 大行宫→鸡鸣寺',
        imageUrl: '/images/鸡鸣寺.jpg',
        coordinates: { lng: 118.7917, lat: 32.0611 },
        route: [
          { name: '南门进入', duration: '-', note: '购票后从南门进入，门票10元送三根香' },
          { name: '天王殿', duration: '5min', note: '第一炷香，供奉弥勒佛与四大天王' },
          { name: '毗卢宝殿', duration: '10min', note: '★主殿，求学祈福灵验地' },
          { name: '药师佛塔', duration: '15min', note: '★七层八面标志性建筑，顺时针绕塔三圈寓意消灾延寿，可登塔俯瞰玄武湖' },
          { name: '观音殿', duration: '10min', note: '★古寺屋檐+紫峰大厦古今同框经典机位' },
          { name: '北门出', duration: '-', note: '单行道！不可走回头路，北门出即达玄武湖解放门' },
        ],
        highlights: [
          '★药师佛塔（绕塔三圈祈福）',
          '★古寺+紫峰大厦古今同框（北门出口处）',
        ],
        photoSpots: [
          { name: '古寺+紫峰大厦同框', tip: '北门出口处回头拍，古寺黄墙与现代摩天楼形成对比' },
          { name: '药师佛塔', tip: '从塔下仰拍，利用香炉烟雾做前景' },
        ],
        warnings: [
          '⚠️南门进北门出，单行道不可走回头路！',
          '门票10元送三根香，无需额外购买',
          '17:15停止入场',
        ],
      },
      {
        id: '2-5',
        name: '玄武湖',
        time: '16:30',
        duration: '1.5h',
        fee: 0,
        feeNote: '免费',
        transport: '从鸡鸣寺北门步行5分钟',
        imageUrl: '/images/玄武湖.jpg',
        coordinates: { lng: 118.7917, lat: 32.075 },
        route: [
          { name: '解放门进入', duration: '-', note: '鸡鸣寺北门出来即是解放门，直接入园' },
          { name: '环洲', duration: '40min', note: '沿湖西岸步道漫步，7月荷花盛开，湖面金光粼粼，夕阳最佳' },
          { name: '梁洲', duration: '30min', note: '湖心最大岛屿，视野最开阔，常有花展' },
          { name: '玄武门出', duration: '20min', note: '从玄武门出园，结束玄武湖行程' },
        ],
        highlights: [
          '★夕阳湖面金光（环洲西岸）',
          '荷花池（7月盛开，环洲与梁洲之间）',
        ],
        photoSpots: [
          { name: '湖边步道逆光人像', tip: '下午4-5点逆光拍摄，湖面金光+人物剪影' },
          { name: '荷花池', tip: '用长焦压缩荷花与远处紫峰大厦' },
        ],
        warnings: [
          '免费开放，无需门票',
          '游船贵（140-160元/船/小时），不划算',
          '夏天注意防晒，湖边遮荫较少',
        ],
      },
      {
        id: '2-6',
        name: '老门东',
        time: '18:30',
        duration: '45min',
        fee: 0,
        feeNote: '免费街区',
        transport: '地铁1号线 玄武门→三山街，步行10分钟',
        imageUrl: '/images/老门东_05.jpg',
        tip: '★灯笼夜景！比白天更美',
        coordinates: { lng: 118.7833, lat: 32.0167 },
        route: [
          { name: '牌坊入口', duration: '-', note: '17米高石雕牌坊，楹联"市井里巷尽染六朝烟水气"' },
          { name: '三条营古街', duration: '15min', note: '青石板路+明清马头墙+灯笼映照' },
          { name: '先锋书店·骏惠书屋', duration: '5min', note: '600年徽派古宅改造，"南京第一木雕楼"' },
          { name: '箍桶巷红灯笼长廊', duration: '15min', note: '★老门东最佳机位！全景仰拍红灯笼长廊' },
        ],
        highlights: [
          '★箍桶巷红灯笼长廊（如《千与千寻》）',
          '先锋书店古建筑内景',
          '马头墙+红灯笼组合',
        ],
        photoSpots: [
          { name: '红灯笼长廊仰拍', tip: '★傍晚灯笼亮起后仰拍，夜景比白天更美！' },
          { name: '马头墙+红灯笼', tip: '从侧面拍马头墙轮廓+前景红灯笼' },
        ],
        warnings: [
          '★夜晚灯笼比白天美，建议傍晚到达',
          '免费全天开放',
          '时间紧，舍弃芥子园（省15元门票）',
        ],
      },
      {
        id: '2-7',
        name: '夫子庙·秦淮河',
        time: '19:30',
        duration: '2h',
        fee: 0,
        feeNote: '街区免费',
        transport: '从老门东步行10分钟',
        imageUrl: '/images/夫子庙秦淮河_05.jpg',
        tip: '夜泊秦淮，灯光绝美',
        coordinates: { lng: 118.7833, lat: 32.0208 },
        route: [
          { name: '大成殿外', duration: '10min', note: '夫子庙核心建筑，在外面拍照即可，不必买票入内（省35元）' },
          { name: '文德桥', duration: '20min', note: '★秦淮河上最经典的拱桥，两岸灯笼亮起时最美' },
          { name: '晚餐', duration: '20min', note: '往小巷走（东牌楼巷/大石坝街），南京烤鸭+鸭血粉丝汤，人均35元' },
          { name: '桃叶渡', duration: '15min', note: '沿秦淮河北岸东行，王献之"桃叶复桃叶"典故' },
          { name: '白鹭洲公园', duration: '30min', note: '免费公园，夜景灯饰，安静人少，湖面倒影+灯光氛围感极佳' },
        ],
        highlights: [
          '★文德桥秦淮河夜景',
          '桃叶渡古渡口',
          '白鹭洲公园灯光秀',
        ],
        photoSpots: [
          { name: '文德桥夜景', tip: '★站在桥上拍两岸灯笼倒映水面，最经典机位' },
          { name: '秦淮河岸边灯笼', tip: '沿河找灯笼密集处，用大光圈虚化背景灯光' },
        ],
        warnings: [
          '★主街小吃贵且难吃，往小巷走（东牌楼巷/大石坝街）价格减半',
          '不必坐游船（票价80元），岸边散步拍照一样出片',
          '景区内特产价格虚高，别买真空盐水鸭',
        ],
      },
    ],
    dailyTotal: 30,
    dailyTotalNote: '门票合计（总统府20+鸡鸣寺10）',
  },
  {
    id: '3',
    day: 3,
    title: '钟山全天深度游',
    subtitle: '明孝陵免费+紫金山登山+灵谷寺',
    date: '7月16日',
    spots: [
      {
        id: '3-1',
        name: '明孝陵',
        time: '06:20',
        duration: '2h',
        fee: 0,
        feeNote: '★6:30前免费入场！',
        transport: '地铁1→2号线 三山街→苜蓿园，步行至3号门',
        imageUrl: '/images/明孝陵_05.jpg',
        tip: '★6:30前到3号门，免费入场省¥70！',
        coordinates: { lng: 118.8417, lat: 32.0583 },
        route: [
          { name: '3号门（梅花谷南门）进入', duration: '-', note: '离石象路最近的门，6:30前进入免费！' },
          { name: '石象路神道', duration: '20min', note: '★"南京最美神道"全长600米，24尊石兽。★晨光斜照石兽+古树，光线最佳（6:30-7:30）' },
          { name: '翁仲路', duration: '15min', note: '文臣武将石像各2对，通往陵宫主体' },
          { name: '文武方门', duration: '5min', note: '明孝陵正门，红墙黄瓦，明清皇家气派' },
          { name: '享殿', duration: '10min', note: '3层须弥座台基，现为史料陈列室' },
          { name: '方城明楼', duration: '20min', note: '★明孝陵最高建筑，登顶俯瞰陵区全景+紫金山' },
          { name: '宝顶', duration: '10min', note: '朱元璋与马皇后寝宫，南墙有"此山明太祖之墓"石刻，地宫未发掘' },
        ],
        highlights: [
          '★晨光石象路（6:30-7:30光线最佳）',
          '★方城明楼俯瞰全景',
          '文武方门朱红大门',
        ],
        photoSpots: [
          { name: '晨光石象路', tip: '★6:30-7:30光线斜射，石象+树影+晨雾，画面层次丰富' },
          { name: '方城明楼俯瞰', tip: '登楼后向南拍神道延伸线，向北拍宝顶和远山' },
        ],
        warnings: [
          '★6:30前从3号门进，晚了就收费了！省¥70！',
          '3号门最近，不要从其他门进',
          '提前5天公众号预约',
        ],
      },
      {
        id: '3-2',
        name: '梧桐大道·陵园路',
        time: '08:20',
        duration: '55min',
        fee: 0,
        feeNote: '免费',
        transport: '从明孝陵步行15分钟',
        imageUrl: '/images/梧桐大道.jpg',
        coordinates: { lng: 118.846, lat: 32.057 },
        route: [
          { name: '陵园路起点', duration: '-', note: '从明孝陵出口沿指示牌走向陵园路' },
          { name: '梧桐隧道中段', duration: '40min', note: '★全长3公里，两侧法国梧桐参天蔽日，形成天然绿色隧道，丁达尔光线从叶缝洒落' },
          { name: '路中间安全岛', duration: '15min', note: '★找到路中间安全岛位置，仰拍树冠遮天效果' },
        ],
        highlights: [
          '★法国梧桐绿色隧道（全长3公里）',
          '★丁达尔光线（早晨8-10点最佳）',
        ],
        photoSpots: [
          { name: '安全岛仰拍树冠', tip: '★站在路中间安全岛，仰拍两侧梧桐树冠在头顶交汇形成拱门' },
          { name: '丁达尔光', tip: '早晨8-10点阳光角度最佳，光线穿过树叶形成光束' },
        ],
        warnings: [
          '注意来往车辆，拍照时站在安全岛上',
          '从明孝陵方向往中山陵方向走，顺路',
        ],
      },
      {
        id: '3-3',
        name: '中山陵',
        time: '09:15',
        duration: '2h',
        fee: 0,
        feeNote: '免费需预约',
        transport: '沿梧桐大道步行至中山陵',
        imageUrl: '/images/中山陵_02.jpg',
        tip: '⚠️预约8:30-10:30时段，迟到15分钟无法进入！',
        coordinates: { lng: 118.85, lat: 32.0611 },
        route: [
          { name: '博爱坊', duration: '5min', note: '★中山陵入口标志，孙中山手书"博爱"二字' },
          { name: '墓道', duration: '5min', note: '480米长的墓道，两侧雪松苍翠' },
          { name: '陵门', duration: '5min', note: '"天下为公"匾额，进入陵区正门' },
          { name: '碑亭', duration: '5min', note: '内立"中国国民党葬总理孙先生于此"巨碑' },
          { name: '392级台阶', duration: '30min', note: '★从碑亭到祭堂共392级台阶，象征3.92亿同胞。中途有平台可休息' },
          { name: '祭堂', duration: '15min', note: '★中山陵核心建筑，内有孙中山坐像，堂内保持肃静，禁止拍照' },
        ],
        highlights: [
          '博爱坊',
          '★392级台阶（仰拍/俯拍）',
          '祭堂外观（蓝色琉璃瓦屋顶）',
        ],
        photoSpots: [
          { name: '392级台阶仰拍', tip: '站在台阶底部仰拍，台阶形成向天空延伸的引导线' },
          { name: '392级台阶俯拍', tip: '★登顶后回头俯拍，台阶+陵门+远山层层叠叠' },
          { name: '博爱坊', tip: '以博爱坊为前景，台阶和祭堂为背景' },
        ],
        warnings: [
          '免费但需预约，选8:30-10:30时段',
          '⚠️迟到15分钟无法进入！',
          '392级台阶无遮荫，夏天注意防暑',
          '祭堂内禁止拍照',
        ],
      },
      {
        id: '3-4',
        name: '音乐台',
        time: '11:15',
        duration: '1h',
        fee: 5,
        feeNote: '学生票',
        transport: '从中山陵步行5分钟',
        imageUrl: '/images/音乐台.jpg',
        coordinates: { lng: 118.85, lat: 32.0639 },
        route: [
          { name: '入口', duration: '-', note: '中山陵东南侧，步行5分钟即到' },
          { name: '半圆形剧场', duration: '30min', note: '★1932年建，西洋古典风格露天剧场，弧形回音壁+扇形观众席' },
          { name: '鸽群互动', duration: '30min', note: '★喂鸽子！鸽食5元/包，可自带小面包。鸽群起飞瞬间仰拍超好看' },
        ],
        highlights: [
          '★鸽群绕场飞行',
          '西洋古典弧形回音壁',
        ],
        photoSpots: [
          { name: '鸽子起飞瞬间仰拍', tip: '★蹲下仰拍，鸽子+蓝天+弧形背景墙' },
          { name: '复古弧形背景墙', tip: '站在观众席中央拍全景，弧形墙面形成包围感' },
        ],
        warnings: [
          '鸽食5元/包，在入口处购买，可自带小面包省钱',
          '中午鸽子较活跃，喂食时注意别被啄',
        ],
      },
      {
        id: '3-5',
        name: '★紫金山登山·头陀岭',
        time: '12:30',
        duration: '2h',
        fee: 0,
        feeNote: '★免费！登山道免费',
        transport: '音乐台→藏经楼西路→登山道→头陀岭',
        imageUrl: '/images/紫金山天文台_02.jpg',
        tip: '★南京最高峰448.9m，360°俯瞰南京城！',
        coordinates: { lng: 118.8458, lat: 32.075 },
        route: [
          { name: '登山道起点', duration: '5min', note: '音乐台→藏经楼西路，有登山指示牌，沿藏经楼西路往北' },
          { name: '登山道', duration: '60min', note: '★平路2.7km+爬升350m，台阶+土路混合，坡度中等。每15分钟休息2分钟，别逞强！' },
          { name: '紫金山天文台（路过）', duration: '5min', note: '外观拍照，不进去（省15元门票），门口可远眺南京城' },
          { name: '★头陀岭山顶', duration: '30min', note: '★海拔448.9m，南京最高点！360°观景平台，俯瞰玄武湖+紫峰大厦+长江+南京城天际线。山顶有肯德基！买饮料歇脚' },
        ],
        highlights: [
          '★紫金山登顶！南京最高点448.9m',
          '★360°观景平台俯瞰南京全城',
          '玄武湖+紫峰大厦+长江+南京城天际线',
        ],
        photoSpots: [
          { name: '山顶全景', tip: '★用全景模式拍南京城天际线，紫峰大厦居中' },
          { name: '第一峰石碑', tip: '打卡留念' },
        ],
        warnings: [
          '★登山免费！带足水（至少2瓶/人）',
          '7月天热，树荫下休息，多喝水！防中暑！',
          '每15分钟休息一次，别逞强',
          '下山注意膝盖，侧身走，用登山杖或树枝支撑',
        ],
      },
      {
        id: '3-6',
        name: '灵谷寺',
        time: '15:30',
        duration: '1h15min',
        fee: 18,
        feeNote: '学生票',
        transport: '头陀岭→水榭路→环紫金山绿道→灵谷寺',
        imageUrl: '/images/中山陵_02.jpg',
        tip: '★灵谷塔必登！9层俯瞰钟山梧桐海',
        coordinates: { lng: 118.8667, lat: 32.0667 },
        route: [
          { name: '红山门（南门）', duration: '-', note: '购票进入，学生票18元（原价35元），带学生证！' },
          { name: '★无梁殿', duration: '15min', note: '★明代砖石建筑，不用一根梁柱！中国现存最古。殿内刻国民革命军阵亡将士名录' },
          { name: '★灵谷塔', duration: '25min', note: '★九层八面塔，高60米，1933年建。252级台阶，必登！9层俯瞰钟山全景+梧桐海' },
          { name: '灵谷寺', duration: '15min', note: '明代古寺，灵谷深松，玄奘顶骨舍利供奉于此' },
          { name: '松风阁', duration: '10min', note: '民国建筑，松林环绕，树荫下休息' },
        ],
        highlights: [
          '★无梁殿（明代砖石建筑，无一根梁柱）',
          '★灵谷塔登顶俯瞰钟山梧桐海',
          '玄奘顶骨舍利',
        ],
        photoSpots: [
          { name: '无梁殿内部拱顶', tip: '★光影绝佳，砖石拱顶形成纵深引导线' },
          { name: '灵谷塔顶俯瞰', tip: '★9层俯瞰，梧桐树冠如绿色海洋' },
        ],
        warnings: [
          '⚠️灵谷寺蚊子特别多！提前喷驱蚊液！',
          '06:30-18:30开放',
          '灵谷塔免费必登！252级台阶，每层可休息',
          '下山约1小时（4.1km），注意膝盖',
        ],
      },
    ],
    dailyTotal: 23,
    dailyTotalNote: '门票合计（音乐台5+灵谷寺18，明孝陵免费！）',
  },
  {
    id: '4',
    day: 4,
    title: '铭记线+返程',
    subtitle: '历史记忆与返程',
    date: '7月17日',
    spots: [
      {
        id: '4-1',
        name: '侵华日军南京大屠杀遇难同胞纪念馆',
        time: '08:30',
        duration: '2h',
        fee: 0,
        feeNote: '免费，高考生免预约',
        transport: '地铁1→2号线 三山街→云锦路',
        imageUrl: '/images/侵华日军南京大屠杀遇难同胞纪念馆_05.jpg',
        tip: '🎓2026届高考生凭身份证+准考证免预约！',
        coordinates: { lng: 118.7333, lat: 32.0333 },
        route: [
          { name: '9号门登记入馆', duration: '5min', note: '🎓高考生到9号门咨询窗口，出示身份证+准考证，登记免预约入馆' },
          { name: '史料陈列厅', duration: '50min', note: '★南京大屠杀史实展，3000余件文物，幸存者证言影像、国际安全区史料。⚠️内景禁止拍照！' },
          { name: '万人坑遗址', duration: '15min', note: '★遇难者遗骨遗址，历史铁证。⚠️庄严肃穆，禁止拍照！' },
          { name: '悼念广场', duration: '15min', note: '和平大钟+遇难者名单墙，可献花悼念' },
          { name: '和平广场', duration: '15min', note: '★和平女神雕像，寓意"和平"，外景可拍照' },
        ],
        highlights: [
          '史料陈列厅（完整历史叙事）',
          '万人坑遗址（原址保护）',
          '★和平女神雕像（外景可拍照）',
        ],
        photoSpots: [
          { name: '和平广场', tip: '★和平女神雕像+蓝天，庄严而充满希望（仅此区域可拍照）' },
          { name: '纪念馆外立面', tip: '灰色建筑外墙+水面倒影，肃穆庄重' },
        ],
        warnings: [
          '⚠️内景（史料厅、万人坑）禁止摄影摄像！',
          '保持肃穆，禁止嬉闹喧哗',
          '衣冠整洁，禁止穿拖鞋背心',
          '禁止携带打火机、刀具',
          '🎓高考生7.1-9.1凭身份证+准考证免预约',
          '暑假8:30-18:00（17:00停止入场），周一闭馆',
        ],
      },
      {
        id: '4-2',
        name: '科巷美食街（午餐）',
        time: '10:50',
        duration: '30min',
        fee: 0,
        feeNote: '人均25元',
        transport: '地铁2号线 云锦路→大行宫',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E5%8D%97%E4%BA%AC%E7%A7%91%E5%B7%B7%E7%BE%8E%E9%A3%9F%E8%A1%97%E7%83%AD%E9%97%B9%E5%B0%8F%E5%90%83%E6%91%8A%E4%BD%8D%E7%83%9F%E7%81%AB%E6%B0%94%E8%A1%97%E5%B8%82%E7%94%9F%E6%B4%BB&image_size=landscape_4_3',
        tip: '快速吃，吃完就走！',
        coordinates: { lng: 118.796, lat: 32.042 },
        highlights: [
          '科巷鸭血粉丝汤（12元）',
          '陶记藕饼（10元）',
          '小郑酥烧饼（3元）',
        ],
        warnings: [
          '★不要逗留，吃完就走！',
          '科巷是南京最火的美食街，便宜正宗',
        ],
      },
      {
        id: '4-3',
        name: '南京站',
        time: '12:10',
        duration: '2h',
        fee: 0,
        feeNote: 'K1557 14:36发车',
        transport: '地铁1号线 三山街→南京站',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E5%8D%97%E4%BA%AC%E7%81%AB%E8%BD%A6%E7%AB%99%E5%BB%BA%E7%AD%91%E5%A4%96%E8%A7%82%E7%8E%84%E6%AD%A6%E6%B9%96%E8%BE%B9%E7%8E%B0%E4%BB%A3%E5%BB%BA%E7%AD%91%E5%80%99%E8%BD%A6%E5%A4%A7%E5%8E%85&image_size=landscape_4_3',
        tip: '⚠️K1557是过路站！确认车次和站台！',
        coordinates: { lng: 118.792, lat: 32.089 },
        route: [
          { name: '11:40 取行李', duration: '10min', note: '回民宿（三山街站3号口出步行3分钟）取寄存行李' },
          { name: '11:50 出发', duration: '-', note: '⚠️最晚11:50必须出发！地铁1号线直达6站' },
          { name: '12:10 抵达南京站', duration: '20min', note: '地铁1号线17min+步行2min' },
          { name: '候车', duration: '2h', note: '便利店买泡面+零食+水（火车上吃），确认车次K1557、站台信息。硬卧24h59m，把零食、充电宝、颈枕拿在手上' },
        ],
        highlights: [
          '南京站南广场玄武湖全景（候车时最后看一眼南京）',
        ],
        photoSpots: [
          { name: '南广场玄武湖', tip: '候车厅玻璃幕墙外就是玄武湖，最后拍一张南京' },
        ],
        warnings: [
          '⚠️K1557是过路站！注意大屏显示的车次和站台！',
          '⚠️11:50前必须出发！不能拖延！',
          '硬卧353元，24小时59分，备好食物和水',
          '南京站（玄武湖边）≠ 南京南站（高铁站），别跑错',
          '充电宝充足电（火车上充电口有限）',
        ],
      },
    ],
    dailyTotal: 0,
    dailyTotalNote: '门票免费（纪念馆免预约）',
  },
];
