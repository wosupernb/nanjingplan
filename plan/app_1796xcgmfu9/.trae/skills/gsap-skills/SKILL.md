---
name: "gsap-skills"
description: "GSAP animation optimization skill for React/Vite projects. Invoke when optimizing UI animations for mobile performance, fixing image display issues, or replacing framer-motion with GSAP for smoother animations on mobile devices."
---

# GSAP Skills - 动画优化与移动端性能

本技能用于在 React + Vite 项目中使用 GSAP (GreenSock Animation Platform) 优化动画效果，特别针对移动端性能优化。

## 何时使用

- 用户要求优化 UI 动画效果
- 移动端动画卡顿需要优化
- 需要将 framer-motion 替换为 GSAP 以获得更好性能
- 图片显示缓慢或加载失败需要优化
- 需要实现滚动触发动画 (ScrollTrigger)
- 需要在低端移动设备上实现流畅动画

## 核心原则

### 1. 移动端性能优先
- 使用 `transform` 和 `opacity` 属性动画（GPU 加速）
- 避免动画 `box-shadow`、`border-radius`、`width`、`height` 等触发重排的属性
- 使用 `will-change` 提示浏览器优化
- 限制同时运行的动画数量（移动端最多 3-5 个）
- 使用 `force3D: true` 强制 GPU 加速

### 2. GSAP 优于 framer-motion 的场景
- 滚动触发动画 (ScrollTrigger)
- 时间轴动画 (Timeline)
- 大量元素同时动画
- 需要精确控制动画时序
- 移动端性能敏感场景

### 3. 图片优化策略
- 优先使用本地图片，避免依赖外部 CDN
- 使用 `loading="lazy"` 懒加载
- 使用 `decoding="async"` 异步解码
- 添加图片加载占位符和错误处理
- 使用 `srcSet` 和 `sizes` 响应式图片
- 对图片进行 WebP 格式转换

## 必备依赖

```json
{
  "dependencies": {
    "gsap": "^3.15.0",
    "@gsap/react": "^2.1.2"
  }
}
```

## 推荐的 GSAP Hooks 模式

### useGsapReveal - 滚动揭示动画

```typescript
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
}

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
    } = options;

    const ctx = gsap.context(() => {
      const targets = stagger > 0 ? el.children : el;
      gsap.fromTo(
        targets,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
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
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
```

### useGsapStagger - 列表错位动画

```typescript
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
    }, ref);

    return () => ctx.revert();
  }, [selector]);

  return ref;
}
```

## 移动端适配策略

### 使用 matchMedia 进行响应式动画

```typescript
const ctx = gsap.context(() => {
  const mm = gsap.matchMedia();

  // 桌面端：复杂动画
  mm.add('(min-width: 768px)', () => {
    gsap.to('.desktop-only', { /* ... */ });
  });

  // 移动端：简化动画
  mm.add('(max-width: 767px)', () => {
    gsap.to('.mobile-optimized', {
      duration: 0.4, // 更短的持续时间
      ease: 'power2.out',
    });
  });

  // 尊重用户的减少动画偏好
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.animated', { opacity: 1, y: 0 });
  });
}, ref);
```

### 移动端性能优化清单

1. **减少动画元素数量**：移动端只动画首屏可见元素
2. **缩短动画时长**：移动端 0.4s，桌面端 0.7s
3. **禁用复杂动画**：如多个无限循环动画
4. **使用 `force3D: true`**：强制 GPU 加速
5. **避免 `box-shadow` 动画**：使用 `filter: drop-shadow` 替代
6. **使用 `will-change`**：提前告知浏览器哪些属性会变化
7. **延迟非关键动画**：使用 `setTimeout` 延迟次要动画
8. **使用 `requestAnimationFrame`**：确保动画在浏览器绘制周期内

## 图片优化方案

### 1. 使用本地图片替换外部 CDN

```typescript
// 替换前 (不可靠)
const IMG = 'https://aka.doubaocdn.com/s/xxx';

// 替换后 (本地图片，放入 public 文件夹)
const IMG = '/images/景点名.jpg';
```

### 2. 带错误处理和加载状态的图片组件

```tsx
function OptimizedImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-slate-100', className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 to-slate-200" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <span className="text-4xl font-light text-slate-300 font-serif">{alt.charAt(0)}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn('w-full h-full object-cover transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0')}
        />
      )}
    </div>
  );
}
```

## 实施步骤模板

当需要优化一个项目的动画和图片显示时：

1. **检查现有依赖**：确认 `gsap` 和 `@gsap/react` 已安装
2. **创建 GSAP Hooks 文件**：在 `src/hooks/` 下创建 `useGsap.ts`
3. **创建优化图片组件**：在 `src/components/` 下创建 `OptimizedImage.tsx`
4. **迁移本地图片**：将本地图片复制到 `public/images/` 目录
5. **更新图片路径**：将外部 CDN URL 替换为本地路径
6. **替换动画实现**：将 framer-motion 动画替换为 GSAP
7. **添加移动端适配**：使用 matchMedia 优化移动端
8. **测试验证**：在桌面端和移动端测试动画流畅度

## 反模式警告

### 不要做
- ❌ 在移动端使用 `whileHover` 等鼠标交互（触摸设备无意义）
- ❌ 动画 `box-shadow`（触发重绘，性能差）
- ❌ 同时动画 10+ 个元素（移动端会卡顿）
- ❌ 使用 `position: absolute` + `top/left` 动画（使用 `transform` 替代）
- ❌ 忽略 `prefers-reduced-motion` 用户偏好

### 应该做
- ✅ 使用 `transform: translate3d()` 强制 GPU 加速
- ✅ 使用 `ScrollTrigger` 替代 `whileInView`
- ✅ 移动端减少动画时长和复杂度
- ✅ 图片使用 `loading="lazy"` 和 `decoding="async"`
- ✅ 为图片添加加载占位符和错误处理
