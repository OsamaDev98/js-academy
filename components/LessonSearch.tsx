'use client';

import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';

type Item = { slug: string; title: string; summary: string; category: string; href?: string };

export default function LessonSearch({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items.filter(x => `${x.title} ${x.summary} ${x.category}`.toLowerCase().includes(q)).slice(0, 8);
  }, [items, query]);

  return (
    <section className="mt-7 w-full max-w-2xl" aria-label="البحث في الدروس">
      <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 shadow-sm transition focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15">
        <Search size={19} className="shrink-0 text-[var(--muted)]" aria-hidden="true" />
        <input className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]" value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن Promise أو Event Loop أو Node.js..." aria-label="ابحث في الدروس" />
        {query && <button type="button" className="grid size-7 shrink-0 place-items-center rounded-lg bg-[var(--surface-2)] text-lg text-[var(--muted)] hover:text-[var(--text)]" onClick={() => setQuery('')} aria-label="مسح البحث">×</button>}
      </div>
      {query && <div className="mt-2 max-h-80 overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-xl">{results.length ? results.map(item => <Link className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-[var(--surface-2)]" key={`${item.href || '/learn/'}${item.slug}`} href={item.href || `/learn/${item.slug}`}><span className="min-w-0 flex-1"><b className="block truncate text-sm text-[var(--text)]">{item.title}</b><small className="mt-1 block truncate text-xs text-[var(--muted)]">{item.category} · {item.summary}</small></span><ArrowLeft size={16} className="shrink-0 text-[var(--primary)]"/></Link>) : <p className="p-4 text-sm text-[var(--muted)]">لا توجد نتائج مطابقة. جرّب كلمة أخرى.</p>}</div>}
    </section>
  );
}
