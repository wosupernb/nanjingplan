export type SpotType = 'indoor' | 'outdoor' | 'mixed' | 'food';
export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export interface RoutePoint {
  name: string;
  duration: string;
  highlights: string;
  photoTip?: string;
  warning?: string;
}

export interface TransitInfo {
  to: string;
  method: string;
  duration: string;
  cost: string;
  detail: string;
}

export interface Attraction {
  id: string;
  name: string;
  tagline: string;
  coverImage: string;
  day: 1 | 2 | 3;
  order: number;
  startTime: string;
  endTime: string;
  duration: string;
  spotType: SpotType;
  timeSlot: TimeSlot;
  ticket: string;
  location: string;
  coords?: string;
  district?: string;
  route: RoutePoint[];
  tips: string[];
  nextTransit?: TransitInfo;
}

export const attractions: Attraction[] = [
  // ===== Day 1: 金陵文博线 V3.4 =====
  {
    id: 'museum',
    name: '南京博物院',
    tagline: '一院六馆 · 国宝云集',
    coverImage: '/attractions/museum.jpg',
    day: 1, order: 1,
    startTime: '09:00', endTime: '11:30', duration: '2.5小时',
    spotType: 'indoor', timeSlot: 'morning',
    ticket: '免费（需提前7天预约）',
    location: '玄武区中山东路321号',
    coords: '118.846,32.043',
    district: '玄武区',
    route: [
      { name: '历史馆', duration: '1小时15分', highlights: '★江苏古代文明精华，竹林七贤砖画、琉璃塔拱门、广陵王玺金印', photoTip: '仿奉国寺大雄宝殿建筑，盛唐气象' },
      { name: '特展馆', duration: '45分钟', highlights: '镇馆之宝集中展出，国宝展、盛世华彩、陈设清宫' },
      { name: '数字馆', duration: '5分钟', highlights: '互动体验古代文明，快速通过' },
      { name: '民国馆', duration: '25分钟', highlights: '★实物+场景还原民国首都，老南京缩影，出片率极高', photoTip: '民国火车站、老邮局、咖啡馆拍照绝佳' },
    ],
    tips: ['⚠️9:00开门，不是8:30！提前5分钟到排队', '提前7天小程序预约，18:00放票，手慢无！', '按历史馆→特展馆→数字馆→民国馆顺序走，不走回头路', '艺术馆和非遗馆来不及看，舍弃'],
    nextTransit: { to: 'kexiang1', method: '地铁', duration: '15分钟', cost: '2元', detail: '明故宫站→大行宫站，2号线2站' },
  },
  {
    id: 'kexiang1',
    name: '科巷美食街·午餐',
    tagline: '鸭血粉丝汤 · 鸡鸣汤包',
    coverImage: '/attractions/laomendong.jpg',
    day: 1, order: 2,
    startTime: '11:45', endTime: '12:30', duration: '45分钟',
    spotType: 'food', timeSlot: 'afternoon',
    ticket: '人均30元',
    location: '秦淮区科巷',
    coords: '118.797,32.041',
    district: '秦淮区',
    route: [
      { name: '鸿福面馆', duration: '15分钟', highlights: '南京老牌面馆，皮肚面地道' },
      { name: '鸡鸣汤包（科巷店）', duration: '15分钟', highlights: '鸡鸣汤包15元/笼，皮薄汁多' },
      { name: '陶记正宗德州扒鸡藕饼', duration: '15分钟', highlights: '藕饼5元/份，科巷网红小吃' },
    ],
    tips: ['推荐鸭血粉丝汤12元+鸡鸣汤包15元+藕饼5元', '科巷在大行宫旁，去总统府顺路', '避开主街，小巷里更便宜正宗'],
    nextTransit: { to: 'president', method: '步行', duration: '5分钟', cost: '免费', detail: '步行5分钟到总统府' },
  },
  {
    id: 'president',
    name: '总统府',
    tagline: '民国中枢 · 天下为公',
    coverImage: '/attractions/president.jpg',
    day: 1, order: 3,
    startTime: '12:30', endTime: '15:00', duration: '2.5小时',
    spotType: 'mixed', timeSlot: 'afternoon',
    ticket: '学生票20元（提前5天预约）',
    location: '玄武区长江路292号',
    coords: '118.793,32.043',
    district: '玄武区',
    route: [
      { name: '正门→大堂', duration: '10分钟', highlights: '★"天下为公"匾额，六幅历史油画', photoTip: '广角仰拍匾额+油画' },
      { name: '中轴线（大堂→子超楼）', duration: '50分钟', highlights: '二堂、礼堂欧式彩色玻璃窗、麒麟门、子超楼蒋介石办公室' },
      { name: '东花园/行政院', duration: '30分钟', highlights: '防空洞、行政院旧址、复园清代园林' },
      { name: '西花园/煦园', duration: '30分钟', highlights: '★石舫（不系舟）、孙中山临时大总统办公室', photoTip: '石舫+太平湖倒影，复古黄楼必拍' },
      { name: '1912街区出口', duration: '10分钟', highlights: '网红打卡墙，文艺街区拍照' },
    ],
    tips: ['学生票20元，带好学生证！提前5天预约', '按"中轴线→东区→西区"顺序，不走回头路', '入门左转可免费寄存行李', '下午人比上午少，但室内为主，注意补水'],
    nextTransit: { to: 'jimingsi', method: '地铁', duration: '10分钟', cost: '2元', detail: '大行宫→鸡鸣寺，3号线2站' },
  },
  {
    id: 'jimingsi',
    name: '鸡鸣寺',
    tagline: '南朝首刹 · 樱花古寺',
    coverImage: '/attractions/jiming.png',
    day: 1, order: 4,
    startTime: '15:30', endTime: '16:30', duration: '1小时',
    spotType: 'indoor', timeSlot: 'afternoon',
    ticket: '10元（送三根香）',
    location: '玄武区鸡鸣寺路1号',
    coords: '118.792,32.059',
    district: '玄武区',
    route: [
      { name: '南门入口→天王殿', duration: '10分钟', highlights: '门口领三根清香，第一炷香祈福' },
      { name: '毗卢宝殿', duration: '10分钟', highlights: '主殿供奉毗卢遮那佛，★求学祈福灵验地' },
      { name: '药师佛塔', duration: '20分钟', highlights: '★七层八面标志性建筑，顺时针绕塔三圈消灾延寿', photoTip: '登塔可俯瞰玄武湖全景' },
      { name: '观音殿→般若堂', duration: '15分钟', highlights: '姻缘祈福地，寺猫"善喜""善源"出没', photoTip: '★古寺屋檐+紫峰大厦古今同框经典机位！' },
      { name: '北门出', duration: '5分钟', highlights: '步行5分钟直达玄武湖解放门' },
    ],
    tips: ['⚠️南门进北门出！单行道，不可走回头路', '门票10元送三根香，登塔免费', '17:15停止入场，注意时间', '寺内猫咪常驻，可偶遇'],
    nextTransit: { to: 'xuanwuhu', method: '步行', duration: '5分钟', cost: '免费', detail: '鸡鸣寺北门步行5分钟到玄武湖解放门' },
  },
  {
    id: 'xuanwuhu',
    name: '玄武湖',
    tagline: '金陵明珠 · 夕阳余晖',
    coverImage: '/attractions/xuanwu.png',
    day: 1, order: 5,
    startTime: '16:30', endTime: '18:00', duration: '1.5小时',
    spotType: 'outdoor', timeSlot: 'evening',
    ticket: '免费',
    location: '玄武区玄武巷1号',
    coords: '118.788,32.074',
    district: '玄武区',
    route: [
      { name: '解放门入口→环洲', duration: '30分钟', highlights: '★夕阳湖面金光粼粼，7月荷花盛开', photoTip: '湖边步道逆光人像，荷花池特写' },
      { name: '环洲→梁洲', duration: '30分钟', highlights: '视野最开阔，湖边长椅休息看夕阳', photoTip: '湖面落日倒影' },
      { name: '梁洲→玄武门出口', duration: '30分钟', highlights: '沿湖返回玄武门，准备去晚餐' },
    ],
    tips: ['最佳入口：解放门（鸡鸣寺直达）', '免费！游船140-160元/船不划算，散步拍照足够', '7月日落约19:00，17:00-18:00光线最美'],
    nextTransit: { to: 'laomendong', method: '地铁', duration: '20分钟', cost: '3元', detail: '玄武门→三山街，1号线4站直达' },
  },
  {
    id: 'laomendong',
    name: '老门东·南京烤鸭晚餐',
    tagline: '灯笼夜景 · 千与千寻 · 金陵烤鸭',
    coverImage: '/attractions/laomendong.jpg',
    day: 1, order: 6,
    startTime: '18:30', endTime: '19:15', duration: '45分钟',
    spotType: 'mixed', timeSlot: 'night',
    ticket: '免费（晚餐人均35元）',
    location: '秦淮区箍桶巷',
    coords: '118.787645,32.011604',
    district: '秦淮区',
    route: [
      { name: '老门东牌坊', duration: '5分钟', highlights: '★灯笼亮起！17米高石雕牌坊', photoTip: '楹联"市井里巷尽染六朝烟水气"' },
      { name: '三条营古街', duration: '10分钟', highlights: '青石板路+明清马头墙+灯笼映照', photoTip: '★窄巷仰拍红灯笼+马头墙，如《千与千寻》！' },
      { name: '先锋书店·骏惠书屋', duration: '5分钟', highlights: '600年徽派古宅改造，"南京第一木雕楼"' },
      { name: '箍桶巷红灯笼长廊', duration: '10分钟', highlights: '老门东最佳机位！', photoTip: '★全景仰拍红灯笼长廊' },
      { name: '🍜 南京烤鸭晚餐', duration: '15分钟', highlights: '步行去夫子庙路上吃，推荐韩复兴、桂花鸭等老字号，人均35元' },
    ],
    tips: ['免费全天开放，夜晚灯笼比白天更美！', '舍弃芥子园（节省15元+时间）', '🍜 推荐韩复兴、桂花鸭，南京烤鸭+鸭血粉丝汤人均35元', '主街小吃贵，小巷便宜一半'],
    nextTransit: { to: 'confucius', method: '步行', duration: '10分钟', cost: '免费', detail: '老门东→夫子庙，边走边吃' },
  },
  {
    id: 'confucius',
    name: '夫子庙·秦淮河夜游',
    tagline: '桨声灯影 · 十里秦淮',
    coverImage: '/attractions/confucius.jpg',
    day: 1, order: 7,
    startTime: '19:30', endTime: '21:30', duration: '2小时',
    spotType: 'outdoor', timeSlot: 'night',
    ticket: '免费（游船80元不建议）',
    location: '秦淮区贡院街152号',
    coords: '118.789,32.021',
    district: '秦淮区',
    route: [
      { name: '大成殿外广场', duration: '15分钟', highlights: '棂星门+大成殿外观拍照，不进殿省35元' },
      { name: '文德桥', duration: '15分钟', highlights: '★秦淮河两岸夜景最经典机位！', photoTip: '桥上拍画舫穿过秦淮河，人多注意财物' },
      { name: '江南贡院外观', duration: '10分钟', highlights: '科举博物馆外观拍照，不进馆省50元' },
      { name: '文德桥→桃叶渡', duration: '20分钟', highlights: '沿秦淮河北岸东行，王献之"桃叶复桃叶"典故' },
      { name: '白鹭洲公园', duration: '30分钟', highlights: '免费公园，夜景灯饰，安静人少', photoTip: '湖面倒影+灯光，氛围感极佳' },
      { name: '返回民宿', duration: '10分钟', highlights: '步行10分钟回三山街民宿休息' },
    ],
    tips: ['免费！游船80元/人不建议，岸边走走拍照足够', '主街小吃溢价严重，进东牌楼巷/大石坝街便宜一半', '文德桥拍夜景最佳，20:00-21:00灯光最美'],
  },

  // ===== Day 2: 钟山风景区深度游 =====
  {
    id: 'mingxiaoling',
    name: '明孝陵',
    tagline: '明清皇家第一陵 · 石象路晨光',
    coverImage: '/attractions/xiaoling.jpg',
    day: 2, order: 1,
    startTime: '07:30', endTime: '09:30', duration: '2小时',
    spotType: 'outdoor', timeSlot: 'morning',
    ticket: '学生票35元（提前5天预约）',
    location: '玄武区紫金山南麓',
    coords: '118.833,32.060',
    district: '玄武区',
    route: [
      { name: '3号门入口→石象路神道', duration: '25分钟', highlights: '★"南京最美神道"，24尊石兽（狮子、獬豸、骆驼、大象、麒麟、马）', photoTip: '★晨光斜照石兽+古树，光线最佳！' },
      { name: '石象路→翁仲路', duration: '20分钟', highlights: '文臣武将石像各2对，通往陵宫主体', photoTip: '石像与梧桐树影交织' },
      { name: '文武方门→享殿', duration: '20分钟', highlights: '明孝陵正门，红墙黄瓦，明清皇家气派', photoTip: '3层须弥座台基+浮雕云龙大陛石' },
      { name: '方城明楼', duration: '25分钟', highlights: '★明孝陵最高建筑，可登顶', photoTip: '★俯瞰陵区全景+紫金山经典机位' },
      { name: '宝顶→离开', duration: '30分钟', highlights: '朱元璋与马皇后寝宫，"此山明太祖之墓"石刻' },
    ],
    tips: ['⚠️从3号门（梅花谷南门）进最近！不要走其他门', '学生票35元，提前5天公众号预约，6:30开门', '早起避开人流和高温！穿运动鞋，今天步行3万步+', '石象路7:30-8:30晨光最美，不要错过'],
    nextTransit: { to: 'wutong', method: '步行', duration: '15分钟', cost: '免费', detail: '明孝陵→梧桐大道陵园路，步行15分钟' },
  },
  {
    id: 'wutong',
    name: '梧桐大道·陵园路',
    tagline: '美龄宫项链 · 丁达尔光线',
    coverImage: '/attractions/wutong.png',
    day: 2, order: 2,
    startTime: '09:30', endTime: '10:30', duration: '1小时',
    spotType: 'outdoor', timeSlot: 'morning',
    ticket: '免费',
    location: '玄武区陵园路',
    coords: '118.839,32.055',
    district: '玄武区',
    route: [
      { name: '陵园路（梧桐大道）全程', duration: '1小时', highlights: '★全长3公里法国梧桐参天，树冠遮天蔽日', photoTip: '★晨间9-10点光线穿过树叶缝隙丁达尔效应，绝美！' },
    ],
    tips: ['★最佳机位：路中间安全岛（注意来往车辆）', '从明孝陵往中山陵方向走，顺路', '7月早晨9-10点光线最好，中午过曝', '边走边拍约1小时到中山陵'],
    nextTransit: { to: 'zhongshanling', method: '步行', duration: '0分钟', cost: '免费', detail: '沿梧桐大道步行即达中山陵' },
  },
  {
    id: 'zhongshanling',
    name: '中山陵',
    tagline: '三民主义 · 392级台阶',
    coverImage: '/attractions/sun.jpg',
    day: 2, order: 3,
    startTime: '10:30', endTime: '12:30', duration: '2小时',
    spotType: 'outdoor', timeSlot: 'morning',
    ticket: '免费（需提前3天预约8:30-10:30时段）',
    location: '玄武区紫金山南麓',
    coords: '118.852,32.062',
    district: '玄武区',
    route: [
      { name: '博爱坊', duration: '10分钟', highlights: '★中山陵入口牌坊，孙中山手书"博爱"', photoTip: '正面全景照，392级台阶第一视角' },
      { name: '墓道→陵门→碑亭', duration: '20分钟', highlights: '陵门"天下为公"匾额，巨碑"中国国民党葬总理孙先生于此"', photoTip: '陵门+蓝天白云气势恢宏' },
      { name: '392级台阶', duration: '30分钟', highlights: '★从博爱坊至祭堂共392级，象征3.92亿同胞', photoTip: '从下往上拍仰望感，从上往下拍俯瞰南京城' },
      { name: '祭堂', duration: '20分钟', highlights: '★孙中山坐像，可入内瞻仰，内部禁止拍照保持肃静' },
      { name: '陵门以上自由参观→下山', duration: '40分钟', highlights: '俯瞰钟山全景，拍照留念，步行去音乐台' },
    ],
    tips: ['⚠️迟到15分钟无法进入！预约8:30-10:30时段', '⚠️周一闭馆（7月16日周四正常开放）', '带身份证！392级台阶分段休息，爬前喝足水', '7月中午热，尽量12:30前到音乐台休息'],
    nextTransit: { to: 'yinyuetai', method: '步行', duration: '5分钟', cost: '免费', detail: '中山陵旁步行5分钟到音乐台' },
  },
  {
    id: 'yinyuetai',
    name: '音乐台·自带干粮午餐',
    tagline: '白鸽群飞 · 复古弧形剧场',
    coverImage: '/attractions/yinyue.png',
    day: 2, order: 4,
    startTime: '12:30', endTime: '13:30', duration: '1小时',
    spotType: 'outdoor', timeSlot: 'afternoon',
    ticket: '学生票5元（现场购票）',
    location: '玄武区中山陵广场东南',
    coords: '118.850,32.060',
    district: '玄武区',
    route: [
      { name: '音乐台喂鸽子', duration: '40分钟', highlights: '★半圆形露天剧场，白鸽群飞拍照超好看', photoTip: '★鸽子起飞瞬间仰拍，复古弧形背景墙' },
      { name: '🍞 自带干粮午餐', duration: '20分钟', highlights: '坐台阶上吃面包+火腿肠+水，人均15元' },
    ],
    tips: ['学生票5元，带学生证现场购票', '★喂鸽子！鸽子食5元/包，可自带小面包/玉米粒省钱', '中午鸽子较活跃，喂食注意别被啄', '景区餐饮贵，自带干粮最省钱'],
    nextTransit: { to: 'observatory', method: '步行', duration: '20分钟', cost: '免费', detail: '音乐台→紫金山索道口，步行20分钟' },
  },
  {
    id: 'observatory',
    name: '紫金山天文台',
    tagline: '天文古仪 · 俯瞰金陵',
    coverImage: '/attractions/tiantai.jpg',
    day: 2, order: 5,
    startTime: '14:00', endTime: '16:00', duration: '2小时（含上下山）',
    spotType: 'mixed', timeSlot: 'afternoon',
    ticket: '学生票15元（现场购票）',
    location: '玄武区紫金山第三峰',
    coords: '118.829,32.065',
    district: '玄武区',
    route: [
      { name: '步行上山', duration: '40分钟', highlights: '沿登山步道上行，石阶路有树荫，注意防滑' },
      { name: '天文历史陈列馆', duration: '15分钟', highlights: '中国古代天文仪器：浑仪、简仪、圭表，张衡地动仪复制品' },
      { name: '天文望远镜', duration: '10分钟', highlights: '60cm反射望远镜（中国第一台大型望远镜）' },
      { name: '观景平台', duration: '15分钟', highlights: '★俯瞰南京城全景，视野极佳！', photoTip: '★南京城天际线，远眺长江' },
      { name: '步行下山→苜蓿园地铁', duration: '40分钟', highlights: '原路下山，步行至苜蓿园地铁站' },
    ],
    tips: ['学生票15元带学生证', '索道不遮风不遮阳60元，步行上山免费（推荐）', '穿运动鞋，石阶路注意防滑', '16:00开始下山，17:00到地铁回民宿休息'],
  },

  // ===== Day 3: 半日铭记线 + 返程 V3.4 =====
  {
    id: 'memorial',
    name: '侵华日军南京大屠杀遇难同胞纪念馆',
    tagline: '铭记历史 · 珍爱和平',
    coverImage: '/attractions/memorial.jpg',
    day: 3, order: 1,
    startTime: '08:30', endTime: '10:30', duration: '2小时',
    spotType: 'indoor', timeSlot: 'morning',
    ticket: '免费（高考生7.1-9.1凭准考证免预约！）',
    location: '建邺区水西门大街418号',
    coords: '118.739,32.034',
    district: '建邺区',
    route: [
      { name: '预检口→一号门', duration: '15分钟', highlights: '🎓高考生到9号门咨询窗口，身份证+准考证登记免预约', photoTip: '保持肃穆，衣冠整洁' },
      { name: '史料陈列厅', duration: '60分钟', highlights: '★南京大屠杀史实展，3000余件文物，幸存者证言影像', photoTip: '⚠️内景禁止摄影摄像！保持安静' },
      { name: '万人坑遗址', duration: '15分钟', highlights: '★遇难者遗骨遗址，历史铁证', photoTip: '⚠️庄严肃穆，禁止拍照！' },
      { name: '悼念广场', duration: '15分钟', highlights: '和平大钟、国家公祭鼎、遇难者名单墙', photoTip: '外景可拍照，和平雕塑' },
      { name: '和平广场→离开', duration: '15分钟', highlights: '和平女神像，寓意"和平"', photoTip: '★和平雕塑+蓝天白云，庄严而充满希望' },
    ],
    tips: ['🎓重大利好！2026届高考生7.1-9.1凭身份证+准考证免预约！9号门登记', '⚠️内景禁止拍照！禁止喧哗！衣冠整洁！', '禁止携带打火机、刀具', '暑假8:30-18:00（17:00停止入场），周一闭馆（7月17日周五正常开放）'],
    nextTransit: { to: 'kexiang3', method: '地铁', duration: '20分钟', cost: '2元', detail: '云锦路→大行宫，2号线4站直达' },
  },
  {
    id: 'kexiang3',
    name: '科巷美食街·返程午餐',
    tagline: '快速用餐 · 鸭血粉丝汤',
    coverImage: '/attractions/laomendong.jpg',
    day: 3, order: 2,
    startTime: '10:50', endTime: '11:20', duration: '30分钟',
    spotType: 'food', timeSlot: 'morning',
    ticket: '人均25元',
    location: '秦淮区科巷',
    coords: '118.797,32.041',
    district: '秦淮区',
    route: [
      { name: '科巷鸭血粉丝汤', duration: '15分钟', highlights: '鸭血粉丝汤12元，地道南京味' },
      { name: '陶记藕饼+小郑酥烧饼', duration: '15分钟', highlights: '藕饼10元+酥烧饼3元，快速吃完就走' },
    ],
    tips: ['⚠️时间紧张！快速吃不要逗留！', '推荐鸭血粉丝汤+藕饼+烧饼，人均25元', '吃完马上出发去取行李赶火车'],
    nextTransit: { to: 'train', method: '地铁', duration: '30分钟', cost: '5元', detail: '大行宫→三山街取行李→南京站' },
  },
  {
    id: 'train',
    name: '南京站·返程',
    tagline: 'K1557 南京→南宁',
    coverImage: '/attractions/laomendong.jpg',
    day: 3, order: 3,
    startTime: '11:50', endTime: '14:36', duration: '候车+返程',
    spotType: 'indoor', timeSlot: 'afternoon',
    ticket: '硬卧353元',
    location: '玄武区南京站',
    coords: '118.799,32.090',
    district: '玄武区',
    route: [
      { name: '回民宿取行李', duration: '10分钟', highlights: '三山街站出步行5分钟到民宿，快速取行李', photoTip: '⚠️不要磨蹭！不要遗漏物品！' },
      { name: '地铁→南京站', duration: '20分钟', highlights: '三山街→南京站，1号线6站直达' },
      { name: '候车', duration: '2小时', highlights: '12:10到达南京站，候车2小时26分非常充裕', photoTip: '确认车次K1557、站台信息，提前上厕所' },
      { name: '🚂 K1557发车', duration: '24小时59分', highlights: '14:36发车，7月18日15:35到达南宁', photoTip: '硬卧24小时59分，充电宝、颈枕、零食拿在手上' },
    ],
    tips: ['⚠️最晚11:50必须出发！不能拖延！', 'K1557是过路站！注意大屏显示的车次和站台！不要上错车！', '提前确认车厢号和铺位，下铺最舒服', '充电宝充足电（火车充电口有限），带好零食和水'],
  },
];

export const dayNames: Record<number, string> = {
  1: 'Day 1 · 金陵文博线',
  2: 'Day 2 · 钟山深度游',
  3: 'Day 3 · 铭记返程',
};

export const dayDescriptions: Record<number, string> = {
  1: '南京博物院→科巷午餐→总统府→鸡鸣寺→玄武湖→老门东→夫子庙秦淮河',
  2: '明孝陵→梧桐大道→中山陵→音乐台→紫金山天文台',
  3: '纪念馆→科巷午餐→南京站返程（V3.4调整：高考生免预约纪念馆！）',
};
