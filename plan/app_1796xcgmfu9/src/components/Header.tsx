import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  anchor: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: '行程总览', anchor: '#overview' },
  { label: '逐日详情', anchor: '#day1' },
  { label: '交通票务', anchor: '#transport' },
  { label: '预约提醒', anchor: '#booking' },
  { label: '避坑指南', anchor: '#tips' },
];

const cinnabarRed = '#B84233';
const goldColor = '#C4A265';
const creamWhite = '#FBF8F3';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        scrolled
          ? 'backdrop-blur-md py-4'
          : 'bg-transparent py-8'
      )}
      style={{
        backgroundColor: scrolled ? creamWhite : 'transparent',
        boxShadow: scrolled
          ? `0 4px 20px rgba(184, 66, 51, 0.08), 0 10px 40px rgba(196, 162, 101, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)`
          : 'none',
      }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-3 shrink-0"
          onClick={closeMobile}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-sm font-bold text-white text-base shadow-sm"
              style={{
                backgroundColor: cinnabarRed,
                fontFamily: 'serif',
              }}
            >
              宁
            </div>
            <span
              className="font-serif text-2xl tracking-widest transition-colors duration-500"
              style={{
                color: scrolled ? cinnabarRed : 'rgba(255,255,255,0.95)',
              }}
            >
              南京四日游
            </span>
          </div>
          <span
            className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500"
            style={{
              color: scrolled ? goldColor : 'rgba(255,255,255,0.7)',
            }}
          >
            Travel Guide
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.anchor}
              href={item.anchor}
              className="relative px-4 py-2 text-sm tracking-widest font-medium transition-colors duration-300 group"
              style={{
                color: scrolled ? '#4A4A4A' : 'rgba(255,255,255,0.85)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = cinnabarRed;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = scrolled ? '#4A4A4A' : 'rgba(255,255,255,0.85)';
              }}
            >
              {item.label}
              <span
                className="absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 -translate-x-1/2 group-hover:w-3/4"
                style={{ backgroundColor: cinnabarRed }}
              />
            </a>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 transition-colors duration-500"
          style={{
            color: scrolled ? cinnabarRed : 'rgba(255,255,255,0.95)',
          }}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="md:hidden backdrop-blur-xl border-t"
            style={{
              backgroundColor: `${creamWhite}F5`,
              borderColor: `${goldColor}30`,
              transformOrigin: 'top center',
            }}
            initial={{ opacity: 0, scaleY: 0.85, scaleX: 0.95, y: -8 }}
            animate={{ opacity: 1, scaleY: 1, scaleX: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.85, scaleX: 0.95, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.anchor}
                  href={item.anchor}
                  onClick={closeMobile}
                  className="relative block px-4 py-3 text-sm tracking-widest font-medium rounded-2xl transition-all duration-300 group overflow-hidden"
                  style={{ color: '#4A4A4A' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = cinnabarRed;
                    e.currentTarget.style.backgroundColor = `${cinnabarRed}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#4A4A4A';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.label}
                  <span
                    className="absolute bottom-1 left-4 w-0 h-0.5 transition-all duration-300 group-hover:w-8"
                    style={{ backgroundColor: cinnabarRed }}
                  />
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
