import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, Map, CalendarDays, Train, Bell, Lightbulb, Calendar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  anchor: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: '行程总览', anchor: '#overview', icon: Map },
  { label: '逐日详情', anchor: '#day-section', icon: CalendarDays },
  { label: '交通票务', anchor: '#transport', icon: Train },
  { label: '预约提醒', anchor: '#booking', icon: Bell },
  { label: '避坑指南', anchor: '#tips', icon: Lightbulb },
];

const TRIP_INFO = {
  date: '7月14-17日',
  people: '3人同行',
};

const cinnabarRed = '#B84233';
const goldColor = '#C4A265';

interface HeaderProps {
  onStateChange?: (state: { scrolled: boolean; expanded: boolean }) => void;
}

export default function Header({ onStateChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 滚动监听：超过 Hero 区阈值时切换为 Sidebar 态
  const handleScroll = useCallback(() => {
    const threshold = window.innerHeight * 0.8;
    setScrolled(window.scrollY > threshold);
  }, []);

  // 状态变化时通知父组件（用于内容区 margin 同步）
  useEffect(() => {
    onStateChange?.({ scrolled, expanded });
  }, [scrolled, expanded, onStateChange]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 滚动同步高亮：IntersectionObserver 监听各章节
  useEffect(() => {
    const sections = NAV_ITEMS
      .map((item) => document.querySelector(item.anchor))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // 找到当前最靠近视口顶部的可见章节
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleItemClick = useCallback(
    (e: React.MouseEvent, anchor: string) => {
      // 移动端菜单点击后关闭
      closeMobile();
      // 让默认锚点跳转生效（smooth scroll 由 CSS html scroll-behavior 处理）
    },
    [closeMobile]
  );

  const navClass = [
    'sidebar-nav',
    scrolled ? 'is-sidebar' : '',
    expanded ? 'is-expanded' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header
      className={navClass}
      onMouseEnter={() => scrolled && setExpanded(true)}
      onMouseLeave={() => scrolled && setExpanded(false)}
    >
      <div className="sidebar-inner">
        {/* Logo 区 */}
        <a
          href="#hero"
          className="sidebar-logo"
          onClick={closeMobile}
          style={{
            textDecoration: 'none',
          }}
        >
          <div className="sidebar-logo-mark">宁</div>
          <span
            className="sidebar-logo-text"
            style={{
              color: scrolled ? cinnabarRed : 'rgba(255,255,255,0.95)',
            }}
          >
            南京四日游
          </span>
          {!scrolled && (
            <span
              className="sidebar-logo-sub"
              style={{ color: goldColor }}
            >
              Travel Guide
            </span>
          )}
        </a>

        {/* 导航项列表 */}
        <nav className="sidebar-items">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.anchor;
            return (
              <a
                key={item.anchor}
                href={item.anchor}
                onClick={(e) => handleItemClick(e, item.anchor)}
                className={`sidebar-item ${isActive ? 'is-active' : ''}`}
                style={{
                  color: scrolled
                    ? isActive
                      ? cinnabarRed
                      : '#4A4A4A'
                    : isActive
                      ? cinnabarRed
                      : 'rgba(255,255,255,0.85)',
                }}
              >
                <span className="sidebar-item-icon">
                  <Icon className="size-4" />
                </span>
                <span className="sidebar-item-label">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* 底部行程信息卡（仅 Sidebar 态显示） */}
        {scrolled && (
          <div className="sidebar-info-card">
            <div className="sidebar-info-icon">
              <Calendar className="size-4" />
            </div>
            <div className="sidebar-info-text">
              <span className="sidebar-info-date">{TRIP_INFO.date}</span>
              <span className="sidebar-info-people">{TRIP_INFO.people}</span>
            </div>
          </div>
        )}

        {/* 移动端汉堡按钮 */}
        <button
          className="sidebar-mobile-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: cinnabarRed,
          }}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* 移动端下拉菜单 */}
      {mobileOpen && (
        <nav className="sidebar-mobile-menu">
          <div className="sidebar-mobile-menu-inner">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.anchor}
                  href={item.anchor}
                  onClick={closeMobile}
                  className="sidebar-item"
                  style={{ color: '#4A4A4A' }}
                >
                  <span className="sidebar-item-icon">
                    <Icon className="size-4" />
                  </span>
                  <span className="sidebar-item-label">{item.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
