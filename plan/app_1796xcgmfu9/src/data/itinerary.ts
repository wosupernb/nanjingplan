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
    title: '金陵文博线',
    subtitle: '博物馆与历史街区',
    date: '7月15日',
    spots: [
      {
        id: '1-1',
        name: '南京博物院',
        time: '08:30',
        duration: '2.5h',
        fee: 0,
        feeNote: '免费需预约',
        transport: '地铁2号线明故宫站',
        imageUrl: '/images/南京博物院_05.jpg',
        tip: '提前7天预约，9点开馆',
        coordinates: { lng: 118.8167, lat: 32.0417 },
        route: [
          { name: '历史馆', duration: '1h15min', note: '从一层序厅开始，按年代顺序游览江苏古代文明展，重点看新石器时代玉器、汉代青铜器' },
          { name: '特展馆', duration: '45min', note: '关注当期特展，镇馆之宝常在此轮展' },
          { name: '数字馆', duration: '5min', note: '快速穿行体验即可，非核心展区' },
          { name: '民国馆', duration: '25min', note: '复原民国南京街景，沉浸式体验，出口处有文创店' },
        ],
        highlights: [
          '竹林七贤与荣启期砖画（历史馆）',
          '大报恩寺琉璃塔拱门（历史馆）',
          '广陵王玺金印（历史馆）',
          '战国郢爰金币（历史馆）',
        ],
        photoSpots: [
          { name: '民国馆街景', tip: '复古街灯+老店铺招牌，适合人像' },
          { name: '历史馆盛唐建筑风格外立面', tip: '上午光线从东南方向照来，建筑立体感强' },
        ],
        warnings: [
          '必须提前7天预约，每日18:00放票，暑期1小时内抢光',
          '9:00开门，建议8:45到门口排队',
          '馆内禁止使用闪光灯',
        ],
      },
      {
        id: '1-2',
        name: '总统府',
        time: '11:30',
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
          '提前5天开放预约',
          '中轴线人流最大，建议先走中轴再逛东西花园',
          '出口在西北角，出去就是1912街区',
        ],
      },
      {
        id: '1-3',
        name: '鸡鸣寺',
        time: '14:00',
        duration: '1h',
        fee: 10,
        feeNote: '门票（送三根香）',
        transport: '地铁3号线鸡鸣寺站',
        imageUrl: '/images/鸡鸣寺.png',
        coordinates: { lng: 118.7917, lat: 32.0611 },
        route: [
          { name: '南门进入', duration: '-', note: '购票后从南门进入，门票10元送三根香' },
          { name: '天王殿', duration: '10min', note: '入寺第一殿，供奉弥勒佛与四大天王' },
          { name: '毗卢宝殿', duration: '10min', note: '大雄宝殿，寺内核心建筑' },
          { name: '药师佛塔', duration: '15min', note: '绕塔三圈祈福，塔高44米可登临远眺' },
          { name: '观音殿', duration: '10min', note: '位于寺院最高处' },
          { name: '北门出', duration: '-', note: '单行道！不可走回头路，北门出即达玄武湖解放门' },
        ],
        highlights: [
          '药师佛塔（绕塔三圈祈福）',
          '古寺+紫峰大厦古今同框（北门出口处）',
        ],
        photoSpots: [
          { name: '古寺+紫峰大厦同框', tip: '北门出口处回头拍，古寺黄墙与现代摩天楼形成对比' },
          { name: '药师佛塔', tip: '从塔下仰拍，利用香炉烟雾做前景' },
        ],
        warnings: [
          '南门进北门出，单行道不可走回头路',
          '门票10元送三根香，无需额外购买',
          '周末人挤到怀疑人生，周中早上8点前到才能享受清净',
        ],
      },
      {
        id: '1-4',
        name: '玄武湖',
        time: '15:00',
        duration: '1.5h',
        fee: 0,
        feeNote: '免费',
        transport: '从鸡鸣寺北门步行5分钟',
        imageUrl: '/images/玄武湖.png',
        coordinates: { lng: 118.7917, lat: 32.075 },
        route: [
          { name: '解放门进入', duration: '-', note: '鸡鸣寺北门出来即是解放门，直接入园' },
          { name: '环洲', duration: '40min', note: '沿湖西岸步道漫步，7月荷花盛开，湖面金光粼粼' },
          { name: '梁洲', duration: '30min', note: '湖心最大岛屿，有览胜楼可登高望远' },
          { name: '玄武门出', duration: '20min', note: '从玄武门出园，结束玄武湖行程' },
        ],
        highlights: [
          '夕阳湖面金光（环洲西岸）',
          '荷花池（7月盛开，环洲与梁洲之间）',
        ],
        photoSpots: [
          { name: '湖边步道逆光人像', tip: '下午4-5点逆光拍摄，湖面金光+人物剪影' },
          { name: '荷花池', tip: '用长焦压缩荷花与远处紫峰大厦' },
        ],
        warnings: [
          '免费开放，无需门票',
          '环湖一圈约10公里，按路线走1.5小时足够',
          '夏天注意防晒，湖边遮荫较少',
        ],
      },
      {
        id: '1-5',
        name: '老门东',
        time: '17:00',
        duration: '45min',
        fee: 0,
        feeNote: '免费街区',
        transport: '地铁3号线武定门站',
        imageUrl: '/images/老门东_05.jpg',
        coordinates: { lng: 118.7833, lat: 32.0167 },
        route: [
          { name: '牌坊入口', duration: '-', note: '从箍桶巷南端牌坊进入老门东街区' },
          { name: '三条营', duration: '20min', note: '主街两侧明清风格建筑，小吃摊和手工艺店铺林立' },
          { name: '先锋书店（老门东店）', duration: '10min', note: '古建筑改造的书店，雕花木窗+书架，文艺打卡点' },
          { name: '箍桶巷红灯笼长廊', duration: '15min', note: '街区北段，成排红灯笼悬挂于马头墙之间' },
        ],
        highlights: [
          '箍桶巷红灯笼长廊',
          '先锋书店古建筑内景',
          '马头墙+红灯笼组合',
        ],
        photoSpots: [
          { name: '红灯笼长廊仰拍', tip: '站在灯笼正下方仰拍，灯笼形成纵深引导线' },
          { name: '马头墙+红灯笼', tip: '从侧面拍马头墙轮廓+前景红灯笼' },
        ],
        warnings: [
          '夜晚灯笼比白天美，建议傍晚到达',
          '免费全天开放',
          '小吃比夫子庙便宜，可以在这里解决晚餐',
        ],
      },
      {
        id: '1-6',
        name: '夫子庙·秦淮河',
        time: '18:30',
        duration: '2h',
        fee: 0,
        feeNote: '街区免费',
        transport: '从老门东步行10分钟',
        imageUrl: '/images/夫子庙秦淮河_05.jpg',
        tip: '夜泊秦淮，灯光绝美',
        coordinates: { lng: 118.7833, lat: 32.0208 },
        route: [
          { name: '大成殿外', duration: '10min', note: '夫子庙核心建筑，在外面拍照即可，不必买票入内' },
          { name: '文德桥', duration: '20min', note: '秦淮河上最经典的拱桥，两岸灯笼亮起时最美' },
          { name: '桃叶渡', duration: '15min', note: '沿河向东步行，传说中王献之接送爱妾的渡口' },
          { name: '白鹭洲公园', duration: '30min', note: '秦淮河畔的免费公园，夜景灯光秀值得一看' },
          { name: '东牌楼巷/大石坝街', duration: '30min', note: '主街旁的小巷子，小吃价格比主街便宜一半' },
        ],
        highlights: [
          '文德桥秦淮河夜景',
          '桃叶渡古渡口',
          '白鹭洲公园灯光秀',
        ],
        photoSpots: [
          { name: '文德桥夜景', tip: '站在桥上拍两岸灯笼倒映水面，使用三脚架或手机夜景模式' },
          { name: '秦淮河岸边灯笼', tip: '沿河找灯笼密集处，用大光圈虚化背景灯光' },
        ],
        warnings: [
          '主街小吃贵且难吃，往小巷走（东牌楼巷/大石坝街）价格减半',
          '不必坐游船（票价80元），岸边散步拍照一样出片',
          '景区内特产价格虚高，别买真空盐水鸭',
        ],
      },
    ],
    dailyTotal: 30,
    dailyTotalNote: '门票合计',
  },
  {
    id: '2',
    day: 2,
    title: '钟山风景区深度游',
    subtitle: '梧桐树影与民国记忆',
    date: '7月16日',
    spots: [
      {
        id: '2-1',
        name: '明孝陵',
        time: '08:00',
        duration: '2h',
        fee: 35,
        feeNote: '学生票',
        transport: '地铁2号线苜蓿园站，步行至3号门',
        imageUrl: '/images/明孝陵_05.jpg',
        tip: '清晨人少，神道光影绝佳',
        coordinates: { lng: 118.8417, lat: 32.0583 },
        route: [
          { name: '3号门（梅花谷南门）进入', duration: '-', note: '离石象路最近的门，别走错到1号门' },
          { name: '石象路神道', duration: '40min', note: '明孝陵精华段，600米神道两侧排列6对石兽，清晨阳光穿过树冠洒在石象上，光影绝美' },
          { name: '翁仲路', duration: '15min', note: '神道后半段，两侧立文武官员石像' },
          { name: '文武方门', duration: '10min', note: '陵宫正门，进入核心陵区' },
          { name: '享殿', duration: '15min', note: '原祭祀大殿遗址，现存石柱础和台基' },
          { name: '方城明楼', duration: '20min', note: '登明楼俯瞰整个陵区全景，城墙砖石质感厚重' },
          { name: '宝顶', duration: '10min', note: '朱元璋与马皇后合葬墓冢，沿城墙绕行一周' },
        ],
        highlights: [
          '石象路神道晨光（6对石兽+梧桐树影）',
          '方城明楼俯瞰全景',
          '文武方门朱红大门',
        ],
        photoSpots: [
          { name: '晨光石象路', tip: '早晨8点前光线斜射，石象+树影+晨雾，画面层次丰富' },
          { name: '方城明楼俯瞰', tip: '登楼后向南拍神道延伸线，向北拍宝顶和远山' },
        ],
        warnings: [
          '6:30开门，从3号门（梅花谷南门）进最近',
          '6:30前入园免费，可省35元学生票',
          '石象路清晨人最少，9点后旅游团涌入',
        ],
      },
      {
        id: '2-2',
        name: '梧桐大道·陵园路',
        time: '10:30',
        duration: '1h',
        fee: 0,
        feeNote: '免费',
        transport: '从明孝陵步行至陵园路',
        imageUrl: '/images/梧桐大道.png',
        coordinates: { lng: 118.846, lat: 32.057 },
        route: [
          { name: '陵园路起点', duration: '-', note: '从明孝陵出口沿指示牌走向陵园路' },
          { name: '梧桐隧道中段', duration: '40min', note: '全长约3公里，两侧法国梧桐参天蔽日，形成天然绿色隧道，丁达尔光线从叶缝洒落' },
          { name: '路中间安全岛', duration: '20min', note: '找到路中间安全岛位置，仰拍树冠遮天效果' },
        ],
        highlights: [
          '法国梧桐绿色隧道（全长3公里）',
          '丁达尔光线（早晨9-10点最佳）',
        ],
        photoSpots: [
          { name: '安全岛仰拍树冠', tip: '站在路中间安全岛，仰拍两侧梧桐树冠在头顶交汇形成拱门' },
          { name: '丁达尔光', tip: '早晨9-10点阳光角度最佳，光线穿过树叶形成光束' },
        ],
        warnings: [
          '注意来往车辆，拍照时站在安全岛上',
          '早晨9-10点光线最好，正午光线太硬',
        ],
      },
      {
        id: '2-3',
        name: '中山陵',
        time: '11:00',
        duration: '2h',
        fee: 0,
        feeNote: '免费需预约',
        transport: '从陵园路步行15分钟',
        imageUrl: '/images/中山陵_02.jpg',
        coordinates: { lng: 118.85, lat: 32.0611 },
        route: [
          { name: '博爱坊', duration: '10min', note: '中山陵入口标志，孙中山手书"博爱"二字' },
          { name: '墓道', duration: '10min', note: '480米长的墓道，两侧雪松苍翠' },
          { name: '陵门', duration: '10min', note: '"天下为公"匾额，进入陵区正门' },
          { name: '碑亭', duration: '10min', note: '内立"中国国民党葬总理孙先生于此"巨碑' },
          { name: '392级台阶', duration: '30min', note: '从碑亭到祭堂共392级台阶，象征当时3.92亿同胞。中途有两个平台可休息' },
          { name: '祭堂', duration: '20min', note: '中山陵核心建筑，内有孙中山坐像，堂内保持肃静' },
        ],
        highlights: [
          '博爱坊',
          '392级台阶（仰拍/俯拍）',
          '祭堂外观（蓝色琉璃瓦屋顶）',
        ],
        photoSpots: [
          { name: '392级台阶仰拍', tip: '站在台阶底部仰拍，台阶形成向天空延伸的引导线' },
          { name: '392级台阶俯拍', tip: '登顶后回头俯拍，台阶+陵门+远山层层叠叠' },
          { name: '博爱坊', tip: '以博爱坊为前景，台阶和祭堂为背景' },
        ],
        warnings: [
          '免费但需预约，迟到15分钟无法进入',
          '392级台阶无遮荫，夏天注意防暑',
          '祭堂内禁止拍照',
        ],
      },
      {
        id: '2-4',
        name: '音乐台',
        time: '13:00',
        duration: '1h',
        fee: 5,
        feeNote: '学生票',
        transport: '从中山陵步行5分钟',
        imageUrl: '/images/音乐台.png',
        coordinates: { lng: 118.85, lat: 32.0639 },
        route: [
          { name: '入口', duration: '-', note: '中山陵东南侧，步行5分钟即到' },
          { name: '半圆形剧场', duration: '30min', note: '西洋古典风格露天剧场，弧形回音壁+扇形观众席' },
          { name: '鸽群互动', duration: '20min', note: '买鸽食（5元/包）喂鸽子，鸽群定时绕场飞行' },
        ],
        highlights: [
          '鸽群绕场飞行（约每30分钟一次）',
          '西洋古典弧形回音壁',
        ],
        photoSpots: [
          { name: '鸽子起飞瞬间仰拍', tip: '蹲下仰拍，鸽子+蓝天+弧形背景墙' },
          { name: '复古弧形背景墙', tip: '站在观众席中央拍全景，弧形墙面形成包围感' },
        ],
        warnings: [
          '鸽食5元/包，在入口处购买',
          '鸽群约每30分钟集体飞行一次，耐心等待',
        ],
      },
      {
        id: '2-5',
        name: '紫金山天文台',
        time: '14:30',
        duration: '2h',
        fee: 8,
        feeNote: '学生票',
        transport: '从音乐台步行上山40分钟（免费），或乘景区巴士',
        imageUrl: '/images/紫金山天文台_02.jpg',
        coordinates: { lng: 118.8458, lat: 32.075 },
        route: [
          { name: '步行上山', duration: '40min', note: '从音乐台沿山路步行上山，沿途绿树成荫，不推荐索道（贵且排队）' },
          { name: '天文历史陈列馆', duration: '30min', note: '展示中国古代天文仪器和近现代天文发展史' },
          { name: '浑仪+简仪', duration: '15min', note: '明代铸造的青铜天文观测仪器，中国古代天文学巅峰之作' },
          { name: '60cm反射望远镜', duration: '15min', note: '中国近代第一台大型天文望远镜' },
          { name: '观景平台', duration: '20min', note: '山顶俯瞰南京城全景，紫峰大厦、玄武湖、长江尽收眼底' },
        ],
        highlights: [
          '浑仪（明代青铜天文仪器）',
          '简仪（元代郭守敬设计）',
          '山顶俯瞰南京城全景',
        ],
        photoSpots: [
          { name: '观景平台全景', tip: '用全景模式拍南京城天际线，紫峰大厦居中' },
          { name: '浑仪+天空', tip: '低角度仰拍浑仪青铜构件+蓝天背景' },
        ],
        warnings: [
          '步行上山40分钟免费，不推荐索道（贵且排队久）',
          '山顶风大，带件薄外套',
          '16:30停止入园，注意时间',
        ],
      },
    ],
    dailyTotal: 48,
    dailyTotalNote: '门票合计',
  },
  {
    id: '3',
    day: 3,
    title: '铭记线+返程',
    subtitle: '历史记忆与烟火美食',
    date: '7月17日',
    spots: [
      {
        id: '3-1',
        name: '侵华日军南京大屠杀遇难同胞纪念馆',
        time: '08:30',
        duration: '2h',
        fee: 0,
        feeNote: '免费，高考生免预约',
        transport: '地铁2号线云锦路站',
        imageUrl: '/images/侵华日军南京大屠杀遇难同胞纪念馆_05.jpg',
        tip: '保持肃穆，禁止拍照区域请遵守',
        coordinates: { lng: 118.7333, lat: 32.0333 },
        route: [
          { name: '史料陈列厅', duration: '50min', note: '按时间线展示南京大屠杀史料，入口处领取免费讲解器' },
          { name: '万人坑遗址', duration: '20min', note: '原址保护的遇难者遗骸，保持肃穆，禁止拍照' },
          { name: '悼念广场', duration: '20min', note: '和平大钟+遇难者名单墙，可献花悼念' },
          { name: '和平广场', duration: '15min', note: '和平女神雕像，象征和平与希望' },
        ],
        highlights: [
          '史料陈列厅（完整历史叙事）',
          '万人坑遗址（原址保护）',
          '和平女神雕像',
        ],
        photoSpots: [
          { name: '和平广场', tip: '和平女神雕像+蓝天，仅此区域可拍照' },
          { name: '纪念馆外立面', tip: '灰色建筑外墙+水面倒影，肃穆庄重' },
        ],
        warnings: [
          '内景（史料厅、万人坑）禁止拍照',
          '保持肃穆，衣冠整洁，禁止穿拖鞋背心',
          '禁止携带打火机',
          '高考生7.1-9.1凭身份证+准考证免预约',
        ],
      },
      {
        id: '3-2',
        name: '科巷美食街',
        time: '11:00',
        duration: '1.5h',
        fee: 0,
        feeNote: '人均30元',
        transport: '地铁2号线大行宫站',
        imageUrl: '',
        tip: '许阿姨糕团、草鸡蛋糕必吃',
        coordinates: { lng: 118.796, lat: 32.042 },
        route: [
          { name: '科巷主街', duration: '30min', note: '从大行宫地铁站3号口出，沿科巷主街一路逛吃' },
          { name: '许阿姨糕团店', duration: '15min', note: '南京老字号糕团，推荐青团、马蹄糕、桂花糕' },
          { name: '草鸡蛋糕', duration: '10min', note: '现做现卖的鸡蛋糕，外酥里嫩，排队人多但值得等' },
          { name: '草桥锅贴', duration: '15min', note: '牛肉锅贴+牛肉馄饨是标配，皮薄馅大汁多' },
          { name: '周边小巷', duration: '20min', note: '科巷周边的小巷子里藏着更多本地人吃的老店' },
        ],
        highlights: [
          '许阿姨糕团（青团、马蹄糕）',
          '草鸡蛋糕（现做现卖）',
          '草桥锅贴（牛肉锅贴+馄饨）',
        ],
        photoSpots: [
          { name: '科巷街景', tip: '烟火气十足的街巷，拍小吃摊+排队人群' },
          { name: '美食特写', tip: '锅贴出锅瞬间、糕团切面特写' },
        ],
        warnings: [
          '本地人都去科巷吃，比夫子庙便宜一半',
          '许阿姨糕团下午可能售罄，上午去品种最全',
          '草桥锅贴排队约15-20分钟',
        ],
      },
      {
        id: '3-3',
        name: '南京站',
        time: '13:00',
        duration: '-',
        fee: 0,
        feeNote: '返程K1557 14:36发车',
        transport: '地铁1号线南京站',
        imageUrl: '',
        coordinates: { lng: 118.792, lat: 32.089 },
        route: [
          { name: '地铁抵达', duration: '-', note: '地铁1号线南京站下车，从南广场出站' },
          { name: '取票/进站', duration: '20min', note: '提前取好纸质票或刷身份证进站，K1557在二楼候车室' },
          { name: '候车', duration: '30min', note: '南京站南广场可远眺玄武湖，候车时最后看一眼南京' },
        ],
        highlights: [
          '南京站南广场玄武湖全景',
        ],
        photoSpots: [
          { name: '南广场玄武湖', tip: '候车厅玻璃幕墙外就是玄武湖，最后拍一张南京' },
        ],
        warnings: [
          'K1557 14:36发车，建议13:30前到达车站',
          '硬卧353元，约25小时车程，备好食物和水',
          '南京站（玄武湖边）≠ 南京南站（高铁站），别跑错',
        ],
      },
    ],
    dailyTotal: 0,
    dailyTotalNote: '门票合计',
  },
];
