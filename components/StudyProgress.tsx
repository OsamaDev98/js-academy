'use client';

import { useEffect, useMemo, useState } from 'react';

const KEY = 'js-academy-progress';

export default function StudyProgress({ lessonIds }: { lessonIds: string[] }) {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { setDone([]); }
  }, []);

  const percentage = useMemo(() => lessonIds.length ? Math.round((lessonIds.filter(id => done.includes(id)).length / lessonIds.length) * 100) : 0, [done, lessonIds]);

  return (
    <section className="study-progress" aria-label="تقدم الدراسة">
      <div className="study-progress-head">
        <div><span className="eyebrow">STUDY PROGRESS</span><h2>تقدمك في المسار</h2></div>
        <strong>{percentage}%</strong>
      </div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${percentage}%` }} /></div>
      <p>{done.filter(id => lessonIds.includes(id)).length} من {lessonIds.length} درس مكتمل</p>
    </section>
  );
}
