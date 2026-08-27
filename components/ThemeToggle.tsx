'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem('js-academy-theme');
    const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    setDark(isDark);
  }, []);
  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    localStorage.setItem('js-academy-theme', next ? 'dark' : 'light');
    setDark(next);
  }
  return <button className="theme-toggle" onClick={toggle} aria-label={dark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'} title={dark ? 'الوضع الفاتح' : 'الوضع الداكن'}>{dark ? <Sun size={17}/> : <Moon size={17}/>}<span>{dark ? 'فاتح' : 'داكن'}</span></button>;
}
