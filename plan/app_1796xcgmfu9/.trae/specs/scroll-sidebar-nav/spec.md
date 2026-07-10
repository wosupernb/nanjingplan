# 滚动渐变侧边栏导航 Spec

## Why
当前顶部横向 Header 在长滚动攻略页中导航锚点不够常驻可用，且与截图所示的「左侧垂直 Sidebar」目标视觉风格不一致。需要将导航从顶部横向布局过渡为左侧垂直 Sidebar，同时保证 Hero 首屏构图不被破坏。

## What Changes
- 新增滚动监听阈值（约 Hero 区高度），超过阈值后顶部 Header 渐变为左侧 Sidebar
- Header 组件重构为「Header/Sidebar 双态」组件，通过 `scrolled` 状态切换布局
- Sidebar 默认收起为图标条（约 64px），hover 或点击展开为完整宽度（约 240px）
- Sidebar 顶部保留 Logo（「宁」+ 标题），中部垂直排列导航锚点，底部放置行程信息卡（日期 + 人数）
- 内容区在 Sidebar 模式下动态让出 `margin-left`（收起态 64px / 展开态 240px）
- 移动端保持现有汉堡菜单逻辑，不参与此次过渡变换
- **BREAKING**：Header 组件对外接口不变，但内部 DOM 结构与样式系统重构，原有 `scrolled` 毛玻璃效果替换为 Sidebar 过渡动画

## Impact
- Affected specs: 无（首次新增）
- Affected code:
  - `src/components/Header.tsx`（核心重构）
  - `src/components/Layout.tsx`（可能需要包裹内容区并提供 margin 上下文）
  - `src/index.css` 或 `src/css/effects.css`（新增 Sidebar 过渡样式）
  - `src/pages/HomePage/HomePage.tsx`（内容区可能需要响应 Sidebar 状态）
  - `src/data/itinerary.ts`（读取行程日期/人数用于底部信息卡）

## ADDED Requirements

### Requirement: 滚动渐变导航
系统 SHALL 在页面滚动超过 Hero 区阈值（约 window.innerHeight * 0.8）时，将顶部固定 Header 平滑过渡为左侧固定 Sidebar。

#### Scenario: 首屏状态
- **WHEN** 用户位于页面顶部（scrollY < 阈值）
- **THEN** 导航以顶部横向 Header 形式呈现，Logo 在左、锚点在右，背景透明
- **AND** 内容区无左侧 margin

#### Scenario: 向下滚动触发过渡
- **WHEN** 用户向下滚动使 scrollY 超过阈值
- **THEN** Header 在 500ms 内过渡为左侧 Sidebar：宽度变为 64px（收起态），高度铺满视口，背景变为奶油白
- **AND** 内容区左侧出现 64px 的 margin
- **AND** 过渡过程使用 cubic-bezier 缓动，无跳变

#### Scenario: 向上滚动回 Hero
- **WHEN** 用户向上滚动使 scrollY 回到阈值以下
- **THEN** Sidebar 逆向还原为顶部 Header，内容区 margin-left 移除

### Requirement: 图标收起交互
Sidebar SHALL 默认以图标条形式（约 64px 宽）展示，仅显示导航项的图标，hover 或点击时展开为完整宽度（约 240px）显示图标 + 文字标签。

#### Scenario: 收起态默认展示
- **WHEN** Sidebar 处于激活状态且用户未交互
- **THEN** Sidebar 宽度为 64px，每个导航项仅显示图标，文字标签隐藏
- **AND** Logo 区仅显示「宁」字方块，标题隐藏

#### Scenario: hover 展开
- **WHEN** 鼠标移入 Sidebar
- **THEN** Sidebar 在 300ms 内宽度过渡为 240px，文字标签淡入显示
- **AND** 内容区 margin-left 同步过渡为 240px

#### Scenario: 移出收起
- **WHEN** 鼠标移出 Sidebar
- **THEN** Sidebar 回到 64px 收起态，文字标签淡出
- **AND** 内容区 margin-left 同步回到 64px

#### Scenario: 移动端不参与
- **WHEN** 视口宽度 < 768px
- **THEN** Sidebar 不激活，保持现有汉堡菜单逻辑
- **AND** 内容区无左侧 margin

### Requirement: 行程信息底部卡
Sidebar 底部 SHALL 展示当前行程的核心信息卡（日期范围 + 同行人数），替代典型的用户账户区。

#### Scenario: 行程信息展示
- **WHEN** Sidebar 处于展开态
- **THEN** 底部显示「7月14-17日」日期文字 + 「3人同行」人数标签
- **AND** 信息卡使用秦淮金描边或暖灰背景，与 Sidebar 整体视觉协调

#### Scenario: 收起态信息卡
- **WHEN** Sidebar 处于收起态
- **THEN** 底部仅显示日历图标，文字隐藏

### Requirement: 导航锚点适配
Sidebar 中的导航项 SHALL 保留与现有 `NAV_ITEMS` 相同的锚点目标，点击行为一致。

#### Scenario: 点击锚点跳转
- **WHEN** 用户点击 Sidebar 中任一导航项
- **THEN** 页面平滑滚动到对应锚点
- **AND** 当前可见章节对应的导航项高亮（梧桐绿左边界或背景）

#### Scenario: 滚动同步高亮
- **WHEN** 用户滚动页面使某章节进入视口
- **THEN** Sidebar 中对应的导航项自动高亮
