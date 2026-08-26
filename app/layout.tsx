import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({ subsets: ['arabic'], display: 'swap', variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'JS Academy — JavaScript & Node.js',
  description: 'منصة عربية احترافية لفهم JavaScript والبرمجة غير المتزامنة وNode.js من الأساسيات إلى التطبيق.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.variable}>{children}</body>
    </html>
  );
}
