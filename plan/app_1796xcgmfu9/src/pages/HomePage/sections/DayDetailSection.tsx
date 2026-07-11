import { useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, MapPin, Ticket, Bus, ChevronDown, Navigation, Train, Footprints } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useGsapReveal } from '@/hooks/useGsap';
import { Badge } from '@/components/ui/badge';
import { MOCK_ITINERARY, type IItineraryDay, type IItinerarySpot } from '@/data/itinerary';

const DAY_COLORS = [
  { main: '#B84233', light: 'rgba(184,66,51,0.1)', bgLight: 'rgba(184,66,51,0.05)', lineLight: 'rgba(184,66,51,0.2)' },
  { main: '#C4A265', light: 'rgba(196,162,101,0.1)', bgLight: 'rgba(196,162,101,0.05)', lineLight: 'rgba(196,162,101,0.2)' },
  { main: '#4A7C6F', light: 'rgba(74,124,111,0.1)', bgLight: 'rgba(74,124,111,0.05)', lineLight: 'rgba(74,124,111,0.2)' },
  { main: '#3D4F5F', light: 'rgba(61,79,95,0.1)', bgLight: 'rgba(61,79,95,0.05)', lineLight: 'rgba(61,79,95,0.2)' },
];

interface IRouteStep {
  label: string;
  duration: string;
  desc: string;
}

interface ISpotRoute {
  route: IRouteStep[];
  highlights: string[];
  photoSpots: string[];
  notes: string[];
  coordinates: { lng: number; lat: number };
  transit: { mode: string; time: string; cost: string; icon: typeof Train }[];
}

const SPOT_ROUTES: Record<string, ISpotRoute> = {
  '南京博物院': {
    route: [
      { label: '历史馆', duration: '1h15min', desc: '常设展览，从远古到明清，竹林七贤砖画、广陵王玺金印在此' },
      { label: '特展馆', duration: '45min', desc: '大报恩寺琉璃塔拱门、战国郢爰金币等镇馆之宝' },
      { label: '数字馆', duration: '5min', desc: '互动体验区，快速浏览即可' },
      { label: '民国馆', duration: '25min', desc: '复原民国街景，拍照圣地，仿佛穿越回老南京' },
    ],
    highlights: ['竹林七贤与荣启期砖画', '大报恩寺琉璃塔拱门', '广陵王玺金印', '战国郢爰金币'],
    photoSpots: ['民国馆街景（复古氛围）', '历史馆盛唐建筑风格外立面'],
    notes: ['9:00 开门，提前7天预约', '每日18:00放票，暑期1小时内抢光', '周一闭馆'],
    coordinates: { lng: 118.8167, lat: 32.0417 },
    transit: [
      { mode: '地铁', time: '约25分钟', cost: '¥3', icon: Train },
      { mode: '公交', time: '约40分钟', cost: '¥2', icon: Bus },
      { mode: '步行', time: '—', cost: '—', icon: Footprints },
    ],
  },
  '总统府': {
    route: [
      { label: '中轴线', duration: '45min', desc: '★精华路线：大堂"天下为公"匾额→二堂→礼堂（彩色玻璃窗）→麒麟门→子超楼（蒋介石办公室）' },
      { label: '东花园', duration: '20min', desc: '防空洞→行政院，快速浏览' },
      { label: '西花园', duration: '25min', desc: '★石舫（不系舟）→桐音馆→孙中山临时大总统办公室' },
    ],
    highlights: ['天下为公匾额', '礼堂彩色玻璃窗', '石舫倒影', '子超楼蒋介石办公室'],
    photoSpots: ['天下为公匾额正下方仰拍', '礼堂彩色玻璃窗逆光', '石舫（不系舟）水面倒影'],
    notes: ['提前5天预约', '★1.5h精华游，只走中轴+西花园石舫', '中轴线人最多，建议早到先走'],
    coordinates: { lng: 118.7967, lat: 32.0458 },
    transit: [
      { mode: '地铁', time: '约20分钟', cost: '¥3', icon: Train },
      { mode: '公交', time: '约35分钟', cost: '¥2', icon: Bus },
      { mode: '步行', time: '约15分钟', cost: '免费', icon: Footprints },
    ],
  },
  '鸡鸣寺': {
    route: [
      { label: '南门进', duration: '—', desc: '购票入园，门票¥10送三根香' },
      { label: '天王殿', duration: '10min', desc: '入寺第一殿，弥勒佛与四大天王' },
      { label: '毗卢宝殿', duration: '15min', desc: '大雄宝殿，供奉毗卢遮那佛' },
      { label: '药师佛塔', duration: '15min', desc: '绕塔三圈祈福，古寺与紫峰大厦古今同框最佳机位' },
      { label: '观音殿', duration: '10min', desc: '千手观音像，香火旺盛' },
      { label: '北门出', duration: '—', desc: '单行道！不可走回头路，出门即玄武湖解放门' },
    ],
    highlights: ['药师佛塔绕塔三圈', '古寺+紫峰大厦古今同框', '千手观音像'],
    photoSpots: ['药师佛塔前仰拍（古今同框）', '北门出口俯瞰玄武湖'],
    notes: ['南门进北门出，单行道不可回头', '周末人挤人，周中早上8点前到', '门票¥10送三根香'],
    coordinates: { lng: 118.7917, lat: 32.0611 },
    transit: [
      { mode: '地铁', time: '约15分钟', cost: '¥2', icon: Train },
      { mode: '公交', time: '约25分钟', cost: '¥2', icon: Bus },
      { mode: '步行', time: '约20分钟', cost: '免费', icon: Footprints },
    ],
  },
  '玄武湖': {
    route: [
      { label: '解放门', duration: '—', desc: '从鸡鸣寺北门出来即是，无缝衔接' },
      { label: '环洲', duration: '30min', desc: '沿湖步道漫步，7月荷花盛开，湖面金光' },
      { label: '梁洲', duration: '30min', desc: '湖心最大岛屿，金陵盆景园、览胜楼' },
      { label: '玄武门', duration: '30min', desc: '明代城门遗址，拍照留念后出园' },
    ],
    highlights: ['夕阳湖面金光', '荷花池（7月盛开）', '玄武门城楼'],
    photoSpots: ['湖边步道逆光人像', '荷花池特写', '玄武门全景'],
    notes: ['免费开放', '环湖一圈约5公里，量力而行'],
    coordinates: { lng: 118.7917, lat: 32.075 },
    transit: [
      { mode: '地铁', time: '约10分钟', cost: '¥2', icon: Train },
      { mode: '步行', time: '5分钟', cost: '免费', icon: Footprints },
    ],
  },
  '老门东': {
    route: [
      { label: '牌坊', duration: '5min', desc: '老门东主入口，标志性石牌坊' },
      { label: '三条营', duration: '15min', desc: '主街巷，青砖黛瓦马头墙，小吃聚集' },
      { label: '先锋书店', duration: '15min', desc: '古建筑里的最美书店，文青必打卡' },
      { label: '箍桶巷', duration: '10min', desc: '红灯笼长廊，夜晚最美' },
    ],
    highlights: ['先锋书店（古建版）', '箍桶巷红灯笼长廊', '马头墙+红灯笼'],
    photoSpots: ['箍桶巷红灯笼长廊仰拍', '马头墙+红灯笼组合'],
    notes: ['夜晚灯笼比白天美', '免费全天开放', '小吃比夫子庙便宜'],
    coordinates: { lng: 118.7833, lat: 32.0167 },
    transit: [
      { mode: '地铁', time: '约20分钟', cost: '¥3', icon: Train },
      { mode: '公交', time: '约30分钟', cost: '¥2', icon: Bus },
    ],
  },
  '夫子庙·秦淮河': {
    route: [
      { label: '大成殿外', duration: '15min', desc: '夫子庙标志建筑，门口拍照即可，不必买票进' },
      { label: '文德桥', duration: '20min', desc: '秦淮河夜景最佳观赏点，画舫穿梭，灯光璀璨' },
      { label: '桃叶渡', duration: '20min', desc: '沿河步道漫步，人少景美' },
      { label: '白鹭洲公园', duration: '30min', desc: '免费公园，园林夜景别有洞天' },
    ],
    highlights: ['文德桥秦淮河夜景', '桃叶渡沿河步道', '白鹭洲公园园林夜景'],
    photoSpots: ['文德桥上秦淮河夜景（必拍）', '桃叶渡灯笼倒影'],
    notes: ['主街小吃贵，进小巷便宜', '不必坐游船（¥80），岸边拍照一样美', '东牌楼巷/大石坝街价格减半'],
    coordinates: { lng: 118.7833, lat: 32.0208 },
    transit: [
      { mode: '地铁', time: '约15分钟', cost: '¥2', icon: Train },
      { mode: '步行', time: '10分钟', cost: '免费', icon: Footprints },
    ],
  },
  '明孝陵': {
    route: [
      { label: '3号门进', duration: '—', desc: '梅花谷南门，离石象路最近' },
      { label: '石象路神道', duration: '40min', desc: '600米神道，12对石兽，晨光穿过梧桐洒在石象上——绝美' },
      { label: '翁仲路', duration: '15min', desc: '文臣武将石像，通往陵宫' },
      { label: '文武方门', duration: '10min', desc: '陵宫正门，红墙黄瓦' },
      { label: '享殿', duration: '15min', desc: '祭祀大殿遗址，气势恢宏' },
      { label: '方城明楼', duration: '20min', desc: '登楼俯瞰整个陵区全景' },
      { label: '宝顶', duration: '20min', desc: '朱元璋与马皇后合葬地，松柏环绕' },
    ],
    highlights: ['石象路晨光', '方城明楼俯瞰全景', '文武方门红墙'],
    photoSpots: ['晨光石象路（光影绝佳）', '方城明楼俯瞰全景', '红墙黄瓦人像'],
    notes: ['6:30开门，从3号门进最近', '清晨人少，神道光影绝佳', '学生票¥35'],
    coordinates: { lng: 118.8417, lat: 32.0583 },
    transit: [
      { mode: '地铁', time: '约30分钟', cost: '¥3', icon: Train },
      { mode: '公交', time: '约45分钟', cost: '¥2', icon: Bus },
    ],
  },
  '梧桐大道·陵园路': {
    route: [
      { label: '明孝陵出口', duration: '—', desc: '从明孝陵出口沿指示牌走向陵园路' },
      { label: '陵园路（梧桐大道）', duration: '40min', desc: '★全长3公里，两侧法国梧桐参天，树冠遮天蔽日。从明孝陵方向往中山陵方向走，顺路！' },
      { label: '路中间安全岛', duration: '15min', desc: '★最佳机位：路中间安全岛（注意来往车辆）。仰拍树冠遮天、低角度人像前景虚化' },
      { label: '到达中山陵入口', duration: '5min', desc: '走完陵园路即到中山陵入口' },
    ],
    highlights: ['★法国梧桐绿色隧道（全长3公里）', '★丁达尔光线（早晨9-10点最佳）', '树冠遮天隧道感'],
    photoSpots: ['★安全岛仰拍树冠遮天', '★晨光斜射丁达尔效果（光线穿过树叶缝隙）', '低角度人像前景虚化'],
    notes: ['★7月早晨9-10点光线最好，中午过曝', '注意来往车辆，拍照时站在安全岛上', '从明孝陵方向往中山陵方向走，顺路', '边走边拍约1小时走完'],
    coordinates: { lng: 118.846, lat: 32.057 },
    transit: [
      { mode: '步行', time: '从明孝陵步行即到', cost: '免费', icon: Footprints },
    ],
  },
  '中山陵': {
    route: [
      { label: '博爱坊', duration: '5min', desc: '陵园入口，孙中山手书"博爱"二字' },
      { label: '墓道', duration: '10min', desc: '440米墓道，两侧雪松苍翠' },
      { label: '陵门', duration: '5min', desc: '"天下为公"四个大字' },
      { label: '碑亭', duration: '5min', desc: '高大石碑，国民党党徽' },
      { label: '392级台阶', duration: '30min', desc: '从下仰望不见平台，从上俯视不见台阶——建筑奇迹' },
      { label: '祭堂', duration: '15min', desc: '孙中山坐像，穹顶马赛克，庄严肃穆' },
    ],
    highlights: ['392级台阶建筑奇迹', '博爱坊', '祭堂孙中山坐像'],
    photoSpots: ['392级台阶仰拍/俯拍', '博爱坊正面', '祭堂外观（内部禁拍）'],
    notes: ['免费需预约', '迟到15分钟无法进入', '祭堂内部禁止拍照'],
    coordinates: { lng: 118.85, lat: 32.0611 },
    transit: [
      { mode: '步行', time: '从梧桐大道步行15分钟', cost: '免费', icon: Footprints },
    ],
  },
  '音乐台': {
    route: [
      { label: '弧形回廊', duration: '15min', desc: '半圆形露天剧场，西洋古典风格，弧形背景墙超上镜' },
      { label: '鸽群互动', duration: '15min', desc: '买鸽食（¥5/包），鸽子落在手上肩上，抓拍起飞瞬间' },
    ],
    highlights: ['鸽子起飞瞬间', '复古弧形背景墙', '西洋古典建筑风格'],
    photoSpots: ['鸽子起飞瞬间仰拍', '复古弧形背景墙人像'],
    notes: ['鸽食¥5/包', '小心鸽子抢食'],
    coordinates: { lng: 118.85, lat: 32.0639 },
    transit: [
      { mode: '步行', time: '从中山陵步行5分钟', cost: '免费', icon: Footprints },
    ],
  },
  '★紫金山登山·头陀岭': {
    route: [
      { label: '音乐台出发', duration: '—', desc: '带足水（至少2瓶/人），喷驱蚊液。路线：音乐台→藏经楼西路→登山道' },
      { label: '登山道起点', duration: '5min', desc: '有登山指示牌，沿藏经楼西路往北。台阶+土路混合，坡度中等' },
      { label: '登山道', duration: '35min', desc: '★平路2.7km+爬升350m，每15分钟休息2分钟，别逞强！后半段坡度更陡' },
      { label: '紫金山天文台（路过）', duration: '5min', desc: '外观拍照不进去（省15元门票），门口可远眺南京城' },
      { label: '★头陀岭山顶', duration: '30min', desc: '★海拔448.9m，南京最高点！360°观景平台，俯瞰玄武湖+紫峰大厦+长江+南京城天际线。山顶有肯德基！买饮料歇脚' },
      { label: '下山→灵谷寺', duration: '55min', desc: '头陀岭→水榭路→环紫金山绿道→灵谷寺，平路4.1km，注意膝盖' },
    ],
    highlights: ['★紫金山登顶！南京最高点448.9m', '★360°观景平台俯瞰南京全城', '玄武湖+紫峰大厦+长江+南京城天际线'],
    photoSpots: ['★山顶全景（用全景模式拍南京城天际线，紫峰大厦居中）', '第一峰石碑打卡留念'],
    notes: ['★登山免费！带足水（至少2瓶/人）', '7月天热注意防暑！树荫下休息，多喝水', '每15分钟休息一次，别逞强', '下山注意膝盖，侧身走，用登山杖或树枝支撑', '高德数据：音乐台→头陀岭平路2.7km，纯步行36min（不含爬升）'],
    coordinates: { lng: 118.8458, lat: 32.075 },
    transit: [
      { mode: '步行登山', time: '约90min（含爬升）', cost: '免费', icon: Footprints },
    ],
  },
  '灵谷寺': {
    route: [
      { label: '南门/红山门', duration: '—', desc: '购票进入，学生票18元（原价35元），带学生证！06:30-18:30开放' },
      { label: '★无梁殿', duration: '15min', desc: '★明代砖石建筑，不用一根梁柱！中国现存最古。殿内刻国民革命军阵亡将士名录' },
      { label: '★灵谷塔', duration: '25min', desc: '★九层八面塔，高60米，1933年建。252级台阶必登！9层俯瞰钟山全景+梧桐海' },
      { label: '灵谷寺', duration: '15min', desc: '明代古寺，灵谷深松，玄奘顶骨舍利供奉于此' },
      { label: '松风阁', duration: '10min', desc: '民国建筑，松林环绕，树荫下休息' },
      { label: '离开→公交站', duration: '10min', desc: '步行至灵谷寺公园公交站，202路→孝陵卫站→地铁2号线' },
    ],
    highlights: ['★无梁殿（明代砖石建筑，无一根梁柱）', '★灵谷塔登顶俯瞰钟山梧桐海', '玄奘顶骨舍利'],
    photoSpots: ['★无梁殿内部拱顶（光影绝佳，砖石拱顶形成纵深引导线）', '★灵谷塔顶俯瞰（梧桐树冠如绿色海洋）'],
    notes: ['⚠️灵谷寺蚊子特别多！提前喷驱蚊液！', '灵谷塔免费必登！252级台阶，每层可休息', '06:30-18:30开放', '下山约1小时（4.1km），注意膝盖', '公交202路→孝陵卫站→地铁2号线→新街口→1号线→三山街'],
    coordinates: { lng: 118.8667, lat: 32.0667 },
    transit: [
      { mode: '步行', time: '从头陀岭下山约55min', cost: '免费', icon: Footprints },
      { mode: '公交+地铁', time: '约50min', cost: '¥5', icon: Bus },
    ],
  },
  '侵华日军南京大屠杀遇难同胞纪念馆': {
    route: [
      { label: '云锦路站2号口', duration: '—', desc: '出站步行2分钟到预检口' },
      { label: '预检口→一号门', duration: '5min', desc: '🎓高考生到9号门咨询窗口，出示身份证+准考证，登记免预约入馆。安检禁止携带打火机、刀具' },
      { label: '史料陈列厅（主展区）', duration: '50min', desc: '★南京大屠杀史实展，3000余件文物，幸存者证言影像、国际安全区史料。⚠️内景禁止摄影摄像！' },
      { label: '万人坑遗址', duration: '15min', desc: '★遇难者遗骨遗址，历史铁证。⚠️庄严肃穆，禁止拍照！' },
      { label: '悼念广场', duration: '15min', desc: '和平大钟、国家公祭鼎、遇难者名单墙，可献花悼念' },
      { label: '和平广场', duration: '15min', desc: '★和平女神雕像，寓意"和平"。外景可拍照：和平雕塑+蓝天白云，庄严而充满希望' },
    ],
    highlights: ['史料陈列厅（3000余件文物）', '万人坑遗址（原址保护）', '★和平女神雕像（外景可拍照）'],
    photoSpots: ['★和平广场和平女神雕像+蓝天（仅此处可拍）', '纪念馆外立面灰色建筑+水面倒影'],
    notes: ['⚠️内景（史料厅、万人坑）禁止摄影摄像！外景可拍照', '保持肃穆，禁止嬉闹喧哗', '衣冠整洁，禁止穿拖鞋背心', '禁止携带打火机、刀具、易燃易爆物品', '🎓高考生7.1-9.1凭身份证+准考证免预约，9号门登记入馆', '暑假8:30-18:00（17:00停止入场），周一闭馆', '"三个必胜"展区相邻，来不及看下次再来'],
    coordinates: { lng: 118.7333, lat: 32.0333 },
    transit: [
      { mode: '地铁', time: '约20分钟', cost: '¥3', icon: Train },
      { mode: '公交', time: '约35分钟', cost: '¥2', icon: Bus },
    ],
  },
  '科巷美食街': {
    route: [
      { label: '许阿姨糕团店', duration: '20min', desc: '青团、马蹄糕、桂花糕，排队也要吃' },
      { label: '草桥锅贴', duration: '15min', desc: '牛肉锅贴外酥里嫩，汁水丰富' },
      { label: '草鸡蛋糕', duration: '10min', desc: '现烤蛋糕，松软香甜' },
      { label: '自由探索', duration: '45min', desc: '鸭血粉丝汤、小笼包、糖芋苗……人均30吃到撑' },
    ],
    highlights: ['许阿姨青团', '草桥牛肉锅贴', '鸭血粉丝汤'],
    photoSpots: ['科巷街景烟火气', '美食特写'],
    notes: ['人均¥30吃到撑', '本地人认证的美食天堂'],
    coordinates: { lng: 118.7917, lat: 32.0389 },
    transit: [
      { mode: '地铁', time: '约15分钟', cost: '¥2', icon: Train },
      { mode: '公交', time: '约25分钟', cost: '¥2', icon: Bus },
    ],
  },
  '南京站': {
    route: [
      { label: '候车大厅', duration: '—', desc: '提前30分钟到站，K1557 南京→南宁 14:36发车' },
    ],
    highlights: [],
    photoSpots: [],
    notes: ['提前30分钟到站', 'K1557硬卧¥353', '次日15:35抵达南宁'],
    coordinates: { lng: 118.7967, lat: 32.0889 },
    transit: [
      { mode: '地铁', time: '约20分钟', cost: '¥3', icon: Train },
    ],
  },
};

function getAmapNavUrl(name: string, lng: number, lat: number): string {
  return `https://uri.amap.com/marker?position=${lng},${lat}&name=${encodeURIComponent(name)}&callnative=1`;
}

/**
 * 移动端导航点击处理：先尝试唤起高德地图App，失败则回退到网页版
 * - 移动端：用 amapuri:// scheme 唤起App，2秒后未成功则跳转网页版
 * - PC端：默认行为，直接打开网页版
 */
function handleNavClick(e: MouseEvent, name: string, lng: number, lat: number) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (!isMobile) return;

  e.preventDefault();
  const poiname = encodeURIComponent(name);
  const scheme = `amapuri://navi?sourceApplication=nanjingplan&lat=${lat}&lon=${lng}&dev=0&style=2&poiname=${poiname}`;
  const webFallback = `https://uri.amap.com/navi?sourceApplication=nanjingplan&lat=${lat}&lon=${lng}&dev=0&style=2&poiname=${poiname}&callnative=1`;

  let appLaunched = false;
  const onVisChange = () => {
    if (document.hidden) appLaunched = true;
  };
  document.addEventListener('visibilitychange', onVisChange);

  // 尝试唤起App
  window.location.href = scheme;

  // 2秒后检查是否成功唤起，未成功则回退到网页版
  setTimeout(() => {
    document.removeEventListener('visibilitychange', onVisChange);
    if (!appLaunched) {
      window.location.href = webFallback;
    }
  }, 2000);
}

function RoutePanel({ spot }: { spot: IItinerarySpot }) {
  const [open, setOpen] = useState(false);
  const routeData = SPOT_ROUTES[spot.name];
  if (!routeData) return null;

  const navUrl = getAmapNavUrl(spot.name, routeData.coordinates.lng, routeData.coordinates.lat);

  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      <button
        onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
      >
        <span className="flex items-center gap-2">
          <MapPin className="size-3.5" />
          详细路线 & 导航
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-4">
              {routeData.route.length > 0 && routeData.route[0].label !== '候车大厅' && (
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">内部动线</p>
                  <div className="space-y-0">
                    {routeData.route.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 py-2.5">
                        <div className="relative flex flex-col items-center shrink-0 pt-0.5">
                          <div className="size-2 rounded-full bg-slate-500 ring-2 ring-slate-50" />
                          {i < routeData.route.length - 1 && <div className="w-px flex-1 bg-slate-100 mt-0.5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-800">{step.label}</span>
                            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">{step.duration}</span>
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {routeData.highlights.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">必看亮点</p>
                  <div className="flex flex-wrap gap-1.5">
                    {routeData.highlights.map((h, i) => (
                      <span key={i} className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700 border border-amber-100">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {routeData.photoSpots.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">最佳拍照点</p>
                  <div className="flex flex-wrap gap-1.5">
                    {routeData.photoSpots.map((p, i) => (
                      <span key={i} className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-medium text-purple-700 border border-purple-100">
                        📷 {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {routeData.notes.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">注意事项</p>
                  <div className="space-y-1">
                    {routeData.notes.map((n, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="mt-0.5 shrink-0 text-slate-400">•</span>
                        <span>{n}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {routeData.transit.length > 0 && (
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">交通方式</p>
                    <span className="text-[9px] text-slate-400">数据来源：高德地图</span>
                  </div>
                  <div className="space-y-2">
                    {routeData.transit.map((t, i) => {
                      const TIcon = t.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 border border-slate-100">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                            <TIcon className="size-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-slate-800">{t.mode}</span>
                            <span className="ml-2 text-xs text-slate-500">{t.time}</span>
                          </div>
                          <span className="text-xs font-medium text-slate-500">{t.cost}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <a href={navUrl} target="_blank" rel="noreferrer" className="cssbuttons-io-button" onClick={(e) => handleNavClick(e, spot.name, routeData.coordinates.lng, routeData.coordinates.lat)}
              >
                导航
                <div className="icon">
                  <Navigation />
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SpotCard({ spot, index, dayColor }: { spot: IItinerarySpot; index: number; dayColor: typeof DAY_COLORS[0] }) {
  const routeData = SPOT_ROUTES[spot.name];
  const cardRef = useGsapReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    delay: Math.min(index * 0.08, 0.4),
    start: 'top 90%',
  });

  return (
    <div
      ref={cardRef}
      className="group relative pl-12 pb-10 last:pb-0 will-change-transform"
    >
      <div className="absolute left-0 top-0 flex flex-col items-center h-full">
        <div className="w-3 h-3 rounded-full ring-4 z-10 shrink-0 mt-1.5" style={{ backgroundColor: dayColor.main, boxShadow: `0 0 0 4px ${dayColor.bgLight}` }} />
        <div className="w-px flex-1 mt-1" style={{ backgroundColor: dayColor.lineLight }} />
      </div>

      <div className="glass-card card-3d rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {spot.imageUrl ? (
            <div className="md:w-52 lg:w-60 shrink-0 overflow-hidden">
              <OptimizedImage
                src={spot.imageUrl}
                alt={spot.name}
                wrapperClassName="w-full h-44 md:h-full"
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="glass-placeholder md:w-52 lg:w-60 shrink-0 h-44 md:h-auto flex items-center justify-center">
              <span className="text-5xl font-light font-serif" style={{ color: 'rgba(184, 66, 51, 0.35)' }}>{spot.name.charAt(0)}</span>
            </div>
          )}

          <div className="glass-card-content flex-1 p-5 md:p-6 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="min-w-0">
                <h4 className="text-lg font-bold text-slate-800 truncate">{spot.name}</h4>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3" />
                    {spot.time} · {spot.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bus className="size-3" />
                    {spot.transport}
                  </span>
                  {routeData && (
                    <a href={getAmapNavUrl(spot.name, routeData.coordinates.lng, routeData.coordinates.lat)} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:bg-slate-200" onClick={(e) => handleNavClick(e, spot.name, routeData.coordinates.lng, routeData.coordinates.lat)}
                    >
                      <Navigation className="size-3" />
                      导航
                    </a>
                  )}
                </div>
              </div>
              <div className="shrink-0 text-right">
                {spot.fee === 0 ? (
                  <Badge variant="secondary" className="text-xs font-medium rounded-full px-3 py-1">免费</Badge>
                ) : (
                  <span className="text-xl font-bold tabular-nums text-slate-900">
                    ¥{spot.fee}
                    <span className="text-xs font-normal text-slate-500 ml-0.5">{spot.feeNote}</span>
                  </span>
                )}
              </div>
            </div>

            {spot.tip && (
              <div className="flex items-start gap-2 text-xs bg-slate-50 text-slate-600 rounded-xl px-4 py-2.5 mb-0">
                <span className="shrink-0 mt-0.5">💡</span>
                <span className="leading-relaxed">{spot.tip}</span>
              </div>
            )}

            <RoutePanel spot={spot} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DayPanel({ day, index }: { day: IItineraryDay; index: number }) {
  const dayColor = DAY_COLORS[index] || DAY_COLORS[0];
  const headerRef = useGsapReveal<HTMLDivElement>({
    y: 48,
    duration: 0.7,
    start: 'top 85%',
  });
  const totalRef = useGsapReveal<HTMLDivElement>({
    y: 12,
    duration: 0.4,
    delay: 0.2,
    start: 'top 95%',
  });

  return (
    <section
      id={`day${day.day}`}
      className="w-full py-20 md:py-28"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div ref={headerRef} className="relative mb-10 md:mb-14 will-change-transform">
          <span className="absolute -top-12 -left-4 md:-top-16 md:-left-8 text-[8rem] md:text-[10rem] font-bold font-serif leading-none select-none pointer-events-none" style={{ color: dayColor.light }}>
            0{day.day}
          </span>
          <div className="relative z-10 flex items-center gap-4 pt-8">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl text-white text-sm font-bold shadow-lg" style={{ backgroundColor: dayColor.main }}>
              D{day.day}
            </span>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif tracking-tight">
                {day.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {day.subtitle} · {day.date}
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          {day.spots.map((spot, i) => (
            <SpotCard key={spot.id} spot={spot} index={i} dayColor={dayColor} />
          ))}
        </div>

        <div
          ref={totalRef}
          className="mt-10 ml-12 flex items-center justify-between p-5 rounded-2xl border will-change-transform"
          style={{ backgroundColor: dayColor.bgLight, borderColor: dayColor.lineLight }}
        >
          <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <Ticket className="size-4" />
            当日{day.dailyTotalNote}
          </span>
          <span className="text-2xl font-bold tabular-nums" style={{ color: dayColor.main }}>
            ¥{day.dailyTotal}
          </span>
        </div>
      </div>
    </section>
  );
}

export default function DayDetailSection() {
  const sectionHeaderRef = useGsapReveal<HTMLDivElement>({
    y: 24,
    duration: 0.5,
    start: 'top 85%',
  });

  return (
    <>
      <div className="w-full pt-24 pb-6">
        <div ref={sectionHeaderRef} className="container mx-auto px-6 md:px-12 max-w-5xl text-center will-change-transform">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Daily Itinerary
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 font-serif tracking-tight">
            逐日详情
          </h2>
          <p className="mt-4 text-lg font-light text-slate-500 max-w-xl mx-auto leading-relaxed">
            每一天都是精心编排的旅程，跟随时间线，不错过任何精彩
          </p>
        </div>
      </div>

      {MOCK_ITINERARY.map((day, i) => (
        <DayPanel key={day.id} day={day} index={i} />
      ))}
    </>
  );
}
