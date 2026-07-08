import { useState, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  loading?: 'lazy' | 'eager';
  /** 首屏关键图片设为 high，浏览器优先加载 */
  fetchPriority?: 'high' | 'low' | 'auto';
  /** 是否显示骨架屏占位符 */
  showSkeleton?: boolean;
  /** 加载失败时显示的文字（默认取 alt 第一个字符） */
  fallbackChar?: string;
}

/**
 * 优化图片组件
 * - 加载状态骨架屏占位
 * - 加载失败优雅降级（显示首字符占位）
 * - 异步解码避免阻塞主线程
 * - 懒加载默认开启
 * - 平滑淡入动画（GPU 加速）
 */
function OptimizedImageInner({
  src,
  alt,
  className,
  wrapperClassName,
  loading = 'lazy',
  fetchPriority = 'auto',
  showSkeleton = true,
  fallbackChar,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // 当 src 变化时重置状态
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  // 空地址直接显示占位
  if (!src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-slate-100',
          wrapperClassName
        )}
      >
        <span className="text-5xl font-light text-slate-300 font-serif">
          {fallbackChar ?? alt.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-100',
        wrapperClassName
      )}
    >
      {/* 骨架屏占位 */}
      {!loaded && !error && showSkeleton && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 to-slate-200" />
      )}

      {/* 加载失败占位 */}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <span className="text-5xl font-light text-slate-300 font-serif">
            {fallbackChar ?? alt.charAt(0)}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500 will-change-[opacity]',
            loaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      )}
    </div>
  );
}

export const OptimizedImage = memo(OptimizedImageInner);
export default OptimizedImage;
