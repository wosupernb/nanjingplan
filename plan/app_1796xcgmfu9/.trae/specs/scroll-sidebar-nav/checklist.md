# Checklist

- [x] 滚动超过 Hero 阈值后，顶部 Header 在 500ms 内平滑过渡为左侧 Sidebar，无跳变
- [x] 回滚到 Hero 时，Sidebar 逆向还原为顶部 Header，内容区 margin 同步移除
- [x] Sidebar 默认收起为 64px 图标条，hover 后展开为 240px 显示文字标签
- [x] Sidebar 展开/收起时，内容区 margin-left 同步过渡（64px ↔ 240px）
- [x] Sidebar 顶部保留「宁」Logo，展开时显示「南京四日游」标题
- [x] Sidebar 中部导航项垂直排列，每个项有匹配的 lucide 图标
- [x] Sidebar 底部展示行程信息卡（7月14-17日 + 3人同行），收起态仅显示日历图标
- [x] 点击 Sidebar 导航项可平滑滚动到对应锚点
- [x] 滚动到某章节时，Sidebar 中对应导航项自动高亮（朱砂红左边界 + 背景）
- [x] 视口 < 768px 时禁用 Sidebar，保留汉堡菜单逻辑
- [x] 移动端内容区不受 Sidebar 状态影响，无错误 margin
- [x] 过渡动画使用 cubic-bezier(0.4, 0, 0.2, 1) 缓动，无闪烁/抖动
- [x] http://localhost:8001/ 本地访问正常，所有交互可用
