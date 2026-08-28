'use client';

import { CheckCircle2, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const KEY = 'js-academy-progress';

export default function StudyProgress({ lessonIds }: { lessonIds: string[] }) {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { setDone([]); } }, []);
  const completed = useMemo(() => lessonIds.filter(id => done.includes(id)).length, [done, lessonIds]);
  const percentage = lessonIds.length ? Math.round((completed / lessonIds.length) * 100) : 0;

  return <section className="my-8 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5" aria-label="تقدم الدراسة">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div><span className="eyebrow"><TrendingUp size={13}/> STUDY PROGRESS</span><h2 className="mt-1 text-lg font-black">تقدمك في المسار</h2></div>
      <strong className="text-2xl text-[var(--primary)]">{percentage}%</strong>
    </div>
    <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[var(--surface-2)]"><div className="h-full rounded-full bg-[var(--primary)] transition-all duration-700" style={{ width: `${percentage}%` }}/></div>
    <p className="mt-2 flex items-center gap-1 text-xs text-[var(--muted)]"><CheckCircle2 size={14}/> {completed} من {lessonIds.length} درس مكتمل</p>
  </section>;
}
