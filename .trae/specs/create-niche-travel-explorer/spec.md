# 小众旅游目的地探索网站前端原型

## Why
用户需要一个现代化的旅游网站原型，用于探索和规划小众旅游目的地。该网站需要具备沉浸式视觉体验、直观的目的地展示和便捷的行程规划功能。

## What Changes
- 创建基于 Next.js App Router 的项目结构
- 实现毛玻璃效果（Glassmorphism）的现代化UI设计
- 添加微交互（卡片悬停上浮等动画效果）
- 使用Mock数据模拟小众景点信息
- 实现响应式布局（移动端适配）
- 添加行程规划拖拽功能

## Impact
- 新建完整前端项目
- 需要配置 Next.js、TypeScript、TailwindCSS
- 创建多个 React 组件
- 使用静态数据文件

## ADDED Requirements
### Requirement: 首页 Hero Section
系统 SHALL 提供全屏沉浸式背景展示，包含：
- 高质量背景图片/视频轮播
- 搜索框（"探索你的下一站"）
- 毛玻璃效果的搜索容器

### Requirement: 目的地卡片组件
系统 SHALL 展示目的地卡片，包含：
- 高清封面图片
- 地点名称
- 一句话标签
- 难度星级显示
- 悬停上浮微交互效果
- 响应式网格/瀑布流布局

### Requirement: 行程规划器
系统 SHALL 提侧行程规划功能：
- 可拖拽的景点卡片
- "我的行程单"侧边栏/弹窗
- 自动计算预估天数
- 行程项目管理（添加/删除）

### Requirement: 响应式设计
系统 SHALL 完美适配移动端：
- 桌面端：网格/瀑布流布局
- 移动端：单列滑动卡片
- 触摸友好的交互

## MODIFIED Requirements
### Requirement: 技术栈配置
- 框架：Next.js App Router
- 语言：TypeScript
- 样式：TailwindCSS
- 数据：Mock JSON数据

## REMOVED Requirements
无
