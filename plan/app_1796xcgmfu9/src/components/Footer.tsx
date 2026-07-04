import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: '行程总览', href: '#overview' },
    { label: '逐日详情', href: '#day1' },
    { label: '交通票务', href: '#transport' },
    { label: '预约提醒', href: '#booking' },
    { label: '避坑指南', href: '#tips' },
  ];

  return (
    <footer className="w-full bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-light tracking-widest text-slate-900" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              南京三日游
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              一份面向学生党的南京三日极致省钱攻略指南，涵盖行程规划、预算控制、交通票务与避坑建议。
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              快速导航
            </p>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              分享给朋友
            </p>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center size-10 rounded-full bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                aria-label="微信分享"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.952-7.062-6.122zm-2.18 2.769c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center size-10 rounded-full bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                aria-label="微博分享"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zm-2.28-3.03c-.44-.7-.03-1.613.93-2.04.96-.43 2.06-.2 2.45.5.38.69.04 1.56-.89 2.02-.97.46-2.07.27-2.49-.48zm2.46-3.49c-1.7-.19-3.08.59-3.08 1.75 0 1.17 1.43 2.26 3.14 2.45 1.71.2 3.09-.59 3.09-1.75 0-1.17-1.44-2.26-3.15-2.45zm5.92-1.13c-.38-.11-.56-.25-.4-.43.33-.36.6-.92.53-1.49-.11-.89-.88-1.61-1.79-1.73-.42-.06-.5-.27-.16-.46.82-.47 1.96-.25 2.66.57.66.77.72 1.84.19 2.61-.22.31-.63.53-1.03.93zm2.46-4.21c-1.39-1.32-3.39-1.7-5.3-1.18-.47.12-.61-.17-.31-.43 1.27-1.08 3.24-1.41 4.89-.78 1.61.62 2.72 2.01 3.03 3.58.08.38-.09.57-.35.39-1.03-.72-2.25-1.18-3.96-1.58z" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center size-10 rounded-full bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                aria-label="小红书分享"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5.5 2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            &copy; {currentYear} 南京三日游攻略 · 学生党极致省钱版
          </p>
          <p className="text-xs text-slate-400">
            内容仅供参考，出行前请以官方信息为准
          </p>
        </div>
      </div>
    </footer>
  );
}
