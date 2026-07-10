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
  rotationX?: number;
  rotationY?: number;
  z?: number;
}

/**
 * 滚动揭示动画 Hook（南京风3D版）
 * - 支持3D旋转入场
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
      rotationX = 0,
      rotationY = 0,
      z = 0,
    } = options;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const targets = stagger > 0 ? el.children : el;
        gsap.set(targets, { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, z: 0 });
        return;
      });

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const targets = stagger > 0 ? el.children : el;
        gsap.fromTo(
          targets,
          { y, opacity, scale, rotateX: rotationX, rotateY: rotationY, z },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            z: 0,
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

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        const targets = stagger > 0 ? el.children : el;
        gsap.fromTo(
          targets,
          { y: Math.min(y, 24), opacity, scale: 1, rotateX: 0, rotateY: 0 },
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
 * Hero 区域专用入场动画 Hook（3D增强版）
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

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(
          el.children,
          { opacity: 0, y: 50, rotateX: 8, z: -30 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            z: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            force3D: true,
          }
        );
      });

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

/**
 * 滚动视差 Hook - 元素随滚动产生位移，营造深度感
 * @param speed 视差速度，正值向下移动，负值向上移动。建议 0.1-0.5
 */
export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3,
  options: { start?: string; end?: string } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        return;
      });

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to(el, {
          yPercent: speed * 100,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top bottom',
            end: options.end ?? 'bottom top',
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [speed, options.start, options.end]);

  return ref;
}

/**
 * 滚动深度视差 Hook - 多层元素以不同速度移动，营造立体层次感
 * @param layers 每层配置 { selector, speed }
 */
export function useGsapDepthParallax<T extends HTMLElement = HTMLDivElement>(
  layers: { selector: string; speed: number }[]
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        return;
      });

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        layers.forEach(({ selector, speed }) => {
          const targets = el.querySelectorAll(selector);
          if (targets.length) {
            gsap.to(targets, {
              yPercent: speed * 100,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            });
          }
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [layers]);

  return ref;
}

/**
 * 3D卡片倾斜效果 Hook - 鼠标悬停时卡片产生3D倾斜
 */
export function useGsapTilt<T extends HTMLElement = HTMLDivElement>(
  options: { max?: number; perspective?: number; scale?: number } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const max = options.max ?? 8;
    const perspective = options.perspective ?? 1000;
    const scale = options.scale ?? 1.02;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        return;
      });

      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        el.style.perspective = `${perspective}px`;
        el.style.transformStyle = 'preserve-3d';

        const onMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          const rotateY = (x - 0.5) * max * 2;
          const rotateX = (0.5 - y) * max * 2;

          gsap.to(el, {
            rotateX,
            rotateY,
            scale,
            duration: 0.4,
            ease: 'power2.out',
            force3D: true,
            overwrite: 'auto',
          });
        };

        const onMouseLeave = () => {
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            force3D: true,
            overwrite: 'auto',
          });
        };

        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);

        return () => {
          el.removeEventListener('mousemove', onMouseMove);
          el.removeEventListener('mouseleave', onMouseLeave);
        };
      });
    }, ref);

    return () => ctx.revert();
  }, [options.max, options.perspective, options.scale]);

  return ref;
}

/**
 * 滚动进度指示器 Hook - 返回一个ref，元素宽度随页面滚动进度变化
 */
export function useGsapScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          force3D: true,
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * 文字飞入动画 Hook（Fly Text Effect · scrub 跟随滚动版）
 * - 将 .fly-text 内的文字按字符拆分，每个字符包裹在 <span class="fly-char"> 中
 * - 初始状态：opacity: 0, translateY(40px)
 * - 动画跟随滚动进度：滑一点，文字飞入一点
 *   - 每个字符延迟 30ms
 *   - 动画时长 600ms
 *   - 缓动函数：power2.out
 *   - 最终状态：opacity: 1, translateY(0)
 */
function splitTextToChars(el: HTMLElement): HTMLElement[] {
  const chars: HTMLElement[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  const textNodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node as Text);
    node = walker.nextNode();
  }

  textNodes.forEach((textNode) => {
    const text = textNode.textContent || '';
    const fragment = document.createDocumentFragment();
    for (const char of text) {
      if (char === ' ' || char === '\n' || char === '\t') {
        fragment.appendChild(document.createTextNode(char));
      } else {
        const span = document.createElement('span');
        span.className = 'fly-char';
        span.textContent = char;
        fragment.appendChild(span);
        chars.push(span);
      }
    }
    textNode.replaceWith(fragment);
  });

  return chars;
}

export function useGsapFlyText<T extends HTMLElement = HTMLDivElement>(
  options: { start?: string; end?: string } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const flyTexts = el.querySelectorAll('.fly-text');
      if (!flyTexts.length) return;

      flyTexts.forEach((flyText) => {
        const chars = splitTextToChars(flyText as HTMLElement);
        if (!chars.length) return;

        gsap.fromTo(
          chars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: flyText,
              start: options.start ?? 'top 85%',
              end: options.end ?? 'top 40%',
              scrub: true,
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [options.start, options.end]);

  return ref;
}
