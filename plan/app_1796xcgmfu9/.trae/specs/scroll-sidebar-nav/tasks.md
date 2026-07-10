# Tasks

- [x] Task 1: 抽取导航项与行程信息数据源
  - [x] SubTask 1.1: 将 Header.tsx 中的 `NAV_ITEMS` 抽取为可复用常量（含 icon 字段）
  - [x] SubTask 1.2: 定义 TRIP_INFO 常量（7月14-17日 + 3人同行）供底部信息卡使用

- [x] Task 2: 设计 Sidebar 双态布局与样式
  - [x] SubTask 2.1: 在 `src/css/effects.css` 新增 Sidebar 相关样式类（`.sidebar-nav`、`.is-sidebar`、`.is-expanded`、`.sidebar-item`、`.sidebar-info-card` 等）
  - [x] SubTask 2.2: 定义顶部 Header 态 → Sidebar 态的过渡 CSS（width/height/background 的 500ms cubic-bezier 过渡）
  - [x] SubTask 2.3: 定义收起态（64px）↔ 展开态（240px）的过渡与文字 opacity 淡入淡出

- [x] Task 3: 重构 Header.tsx 为双态组件
  - [x] SubTask 3.1: 引入双状态：`scrolled`（顶部↔侧边）+ `expanded`（收起↔展开），`expanded` 由 hover 驱动
  - [x] SubTask 3.2: 实现顶部 Header 布局分支（保持 Hero 透明态，横向排列）
  - [x] SubTask 3.3: 实现 Sidebar 布局分支（Logo 顶 / 导航中 / 信息卡底，垂直排列）
  - [x] SubTask 3.4: 为每个 NAV_ITEM 匹配 lucide 图标（行程总览=Map/逐日详情=CalendarDays/交通票务=Train/预约提醒=Bell/避坑指南=Lightbulb）
  - [x] SubTask 3.5: 实现滚动监听阈值（window.innerHeight * 0.8）切换 `scrolled`

- [x] Task 4: 内容区响应 Sidebar 状态
  - [x] SubTask 4.1: HomePage 通过 onStateChange 回调接收 Header 状态，动态设置 `marginLeft`（0 / 64px / 240px）
  - [x] SubTask 4.2: `.sidebar-content` 类提供 500ms cubic-bezier margin 过渡

- [x] Task 5: 滚动同步高亮当前章节
  - [x] SubTask 5.1: IntersectionObserver 监听各锚点章节（rootMargin: -20% 0px -60% 0px）
  - [x] SubTask 5.2: 高亮 Sidebar 中对应的导航项（`.is-active` 朱砂红文字 + 背景 + 左侧 3px 边界）

- [x] Task 6: 移动端兼容与降级
  - [x] SubTask 6.1: CSS @media (max-width: 768px) 隐藏桌面导航项，保留汉堡按钮
  - [x] SubTask 6.2: HomePage handleSidebarStateChange 检查 window.innerWidth >= 769，移动端强制 margin=0

- [x] Task 7: 验证与联调
  - [x] SubTask 7.1: TypeScript 编译通过（npx tsc --noEmit 无错误）
  - [x] SubTask 7.2: 开发服务器 http://localhost:8001/ 运行正常，HMR 生效，浏览器无报错

# Task Dependencies
- Task 2 依赖 Task 1（需要数据源）
- Task 3 依赖 Task 1 与 Task 2（需要数据与样式）
- Task 4 依赖 Task 3（需要 Sidebar 状态对外暴露）
- Task 5 依赖 Task 3
- Task 6 依赖 Task 3、Task 4
- Task 7 依赖 Task 1-6 全部完成
