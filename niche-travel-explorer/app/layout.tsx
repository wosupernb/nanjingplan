import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '南京三日游 · 智能行程',
  description: '南京三日游智能行程规划，高德地图实时数据，景点内部路线详解',
  keywords: '南京,旅游,攻略,三日游,明孝陵,中山陵,夫子庙,鸡鸣寺',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {/* 底层对角渐变 - 白灰相间基础层 */}
        <div className="base-gradient" />
        {/* 上层动态光晕 - 白色与灰色交替漂浮 */}
        <div className="animated-bg" />
        {children}
      </body>
    </html>
  )
}
