import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({ subsets: ['arabic', 'latin'], display: 'swap', variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'JS Academy — JavaScript & Node.js',
  description: 'منصة عربية احترافية لفهم JavaScript والبرمجة غير المتزامنة وNode.js من الأساسيات إلى التطبيق.',
};

const themeScript = `(() => { try { const saved = localStorage.getItem('js-academy-theme'); const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.dataset.theme = dark ? 'dark' : 'light'; } catch {} })()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={cairo.className}>{children}</body>
    </html>
  );
}
