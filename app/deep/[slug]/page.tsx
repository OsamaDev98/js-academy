import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb, AlertTriangle, Code2 } from 'lucide-react';
import { advancedLessons } from '@/lib/advanced';

export default async function DeepLesson({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = advancedLessons.findIndex(x => x.slug === slug);
  if (index < 0) notFound();

  const lesson = advancedLessons[index];
  const previous = advancedLessons[index - 1];
  const next = advancedLessons[index + 1];

  return (
    <main className="lesson-shell">
      <header className="lesson-top top">
        <Link href="/" className="brand"><b>JS</b> Academy</Link>
        <Link href="/" className="back"><ArrowRight size={16} /> العودة للمنهج</Link>
      </header>

      <div className="lesson-layout">
        <aside className="sidebar">
          <div className="side-title"><BookOpen size={18} /> الدروس المتقدمة</div>
          <div className="side-group">
            <b>{lesson.category}</b>
            {advancedLessons.map((item, i) => (
              <Link className={item.slug === slug ? 'active' : ''} key={item.slug} href={`/deep/${item.slug}`}>
                {String(i + 1).padStart(2, '0')} — {item.title}
              </Link>
            ))}
          </div>
        </aside>

        <article className="content">
          <span className="crumb">{lesson.category} · شرح عميق</span>
          <h1>{lesson.title}</h1>
          <p className="lead">{lesson.summary}</p>

          <section>
            <h2>📖 ما هو المفهوم؟</h2>
            <div className="definition"><p>{lesson.definition}</p></div>
          </section>

          <section>
            <h2>🤔 لماذا تحتاج إلى فهمه؟</h2>
            <p>{lesson.why}</p>
          </section>

          <section>
            <h2>🔤 المصطلحات المهمة</h2>
            <div className="terms">
              {lesson.terms.map(([term, meaning]) => (
                <div className="term" key={term}><b>{term}</b><p>{meaning}</p></div>
              ))}
            </div>
          </section>

          <section>
            <h2><Code2 size={22} /> المثال البرمجي</h2>
            <div className="code">
              <div className="code-head"><span>JavaScript / Node.js</span><span>Example</span></div>
              <pre>{lesson.code}</pre>
            </div>
            <div className="output"><strong>Output</strong><code>{lesson.output}</code></div>
          </section>

          <section>
            <h2>🔍 شرح الكود سطرًا بسطر</h2>
            <div className="line-list">
              {lesson.lineByLine.map((line, i) => (
                <div className="line-item" key={i}><span className="line-no">{i + 1}</span><p>{line}</p></div>
              ))}
            </div>
          </section>

          <section>
            <h2>🌍 مثال من مشروع حقيقي</h2>
            <div className="note"><p>{lesson.realWorld}</p></div>
          </section>

          <section>
            <h2>⚙️ ماذا يحدث خلف الكواليس؟</h2>
            <p>{lesson.underTheHood}</p>
          </section>

          <section>
            <h2><AlertTriangle size={22} /> الأخطاء الشائعة</h2>
            <div className="terms">
              {lesson.pitfalls.map((item, i) => (
                <div className="term" key={i}><b>خطأ {i + 1}</b><p>{item}</p></div>
              ))}
            </div>
          </section>

          <section>
            <h2><Lightbulb size={22} /> تمرين تطبيقي</h2>
            <div className="exercise"><p>{lesson.exercise}</p></div>
          </section>

          <section>
            <h2>✅ الحل المقترح</h2>
            <div className="code"><pre>{lesson.answer}</pre></div>
          </section>

          <div className="lesson-nav">
            {previous ? <Link href={`/deep/${previous.slug}`}><ArrowRight size={18} /><span><small>السابق</small>{previous.title}</span></Link> : <span />}
            {next ? <Link href={`/deep/${next.slug}`}><span><small>التالي</small>{next.title}</span><ArrowLeft size={18} /></Link> : <span />}
          </div>
        </article>
      </div>
    </main>
  );
}
