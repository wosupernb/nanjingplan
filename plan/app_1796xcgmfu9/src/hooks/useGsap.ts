import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  scale?: number;
}

/**
 * 滚动揭示动画 Hook（移动端优化版）
 * - 自动检测移动端并降低动画复杂度
 * - 尊重 prefers-reduced-motion 用户偏好
 * - 使用 force3D 强制 GPU 加速
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      opacity = 0,
      duration = 0.7,
      delay = 0,
      stagger = 0,
      start = 'top 85%',
      once = true,
      scale = 1,
    } = options;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 尊重用户减少动画偏好
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const targets = stagger > 0 ? el.children : el;
        gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
        return;
      });

      // 桌面端：完整动画
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const targets = stagger > 0 ? el.children : el;
        gsap.fromTo(
          targets,
          { y, opacity, scale },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration,
            delay,
            stagger,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start,
              once,
            },
          }
        );
      });

      // 移动端：简化动画（更短时长，更小位移）
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        const targets = stagger > 0 ? el.children : el;
        gsap.fromTo(
          targets,
          { y: Math.min(y, 24), opacity, scale: 1 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: Math.min(duration, 0.45),
            delay,
            stagger: stagger > 0 ? Math.min(stagger, 0.06) : 0,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once,
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * 列表错位动画 Hook
 * 用于在容器内的子元素上应用错位进入动画
 */
export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(
  selector: string,
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(selector);
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      });

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          items,
          { y: options.y ?? 30, opacity: options.opacity ?? 0 },
          {
            y: 0,
            opacity: 1,
            duration: options.duration ?? 0.6,
            stagger: options.stagger ?? 0.1,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: options.start ?? 'top 85%',
              once: options.once ?? true,
            },
          }
        );
      });

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          items,
          { y: Math.min(options.y ?? 30, 20), opacity: options.opacity ?? 0 },
          {
            y: 0,
            opacity: 1,
            duration: Math.min(options.duration ?? 0.6, 0.4),
            stagger: Math.min(options.stagger ?? 0.1, 0.05),
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: options.once ?? true,
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [selector]);

  return ref;
}

/**
 * Hero 区域专用入场动画 Hook
 * - 页面加载时立即播放（无 ScrollTrigger）
 * - 移动端简化以提升首屏性能
 */
export function useGsapHeroIntro<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el.children, { opacity: 1, y: 0 });
        return;
      });

      // 桌面端：完整入场动画
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(
          el.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            force3D: true,
          }
        );
      });

      // 移动端/平板：简化入场动画
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.1 });
        tl.fromTo(
          el.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
            force3D: true,
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
