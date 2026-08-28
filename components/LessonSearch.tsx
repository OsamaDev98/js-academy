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
    <section className="search-panel" aria-label="البحث في الدروس">
      <div className="search-box">
        <Search size={19} aria-hidden="true" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن مفهوم مثل Promise أو Event Loop أو Node.js..." aria-label="ابحث في الدروس" />
        {query && <button type="button" onClick={() => setQuery('')} aria-label="مسح البحث">×</button>}
      </div>
      {query && <div className="search-results">{results.length ? results.map(item => <Link key={`${item.href || '/learn/'}${item.slug}`} href={item.href || `/learn/${item.slug}`}><span><b>{item.title}</b><small>{item.category} · {item.summary}</small></span><ArrowLeft size={16}/></Link>) : <p>لا توجد نتائج مطابقة. جرّب كلمة أخرى.</p>}</div>}
    </section>
  );
}
