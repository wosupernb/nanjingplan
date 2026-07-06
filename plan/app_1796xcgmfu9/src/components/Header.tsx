import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
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
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-8'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-3 shrink-0"
          onClick={closeMobile}
        >
          <span className="font-serif text-2xl tracking-widest text-slate-900">
            南京四日游
          </span>
          <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            Travel Guide
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.anchor}
              href={item.anchor}
              className="px-4 py-2 text-sm uppercase tracking-widest font-medium transition-colors duration-300 text-slate-600 hover:text-slate-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 text-slate-900"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100">
          <div className="px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.anchor}
                href={item.anchor}
                onClick={closeMobile}
                className="block px-4 py-3 text-sm uppercase tracking-widest font-medium rounded-2xl transition-colors duration-300 text-slate-600 hover:text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
