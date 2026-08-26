import Link from 'next/link';
import {ArrowLeft,BookOpen,Code2,Layers3,Zap,Brain,Terminal} from 'lucide-react';
import {lessons} from '@/lib/lessons';
import {advancedLessons} from '@/lib/advanced';

export default function Home(){
  const cats=['JavaScript','Async JavaScript','Node.js'];
  return <main className="shell">
    <header className="top"><Link href="/" className="brand"><b>JS</b> Academy</Link><nav><a href="#courses">الدروس</a><a href="#advanced">المستوى العميق</a><a href="#about">عن المنهج</a></nav></header>

    <section className="hero"><div><span className="eyebrow">JAVASCRIPT → ASYNC → NODE.JS</span><h1>ذاكر JavaScript وNode.js <em>بفهم حقيقي.</em></h1><p>منهج عربي مرتب يبدأ من الأساسيات ثم ينتقل إلى البرمجة غير المتزامنة وNode.js، مع مسار عميق يشرح المصطلحات، الكود، التنفيذ الداخلي، الأخطاء والتمارين.</p><div className="actions"><Link className="primary" href={`/learn/${lessons[0].slug}`}>ابدأ المذاكرة <ArrowLeft size={18}/></Link><a className="ghost" href="#courses">استكشف المنهج</a></div></div><div className="hero-card"><div className="code"><span>● ● ●</span><pre>{`async function getData() {\n  const result = await fetch("/api");\n  return result.json();\n}`}</pre></div><div className="stats"><b>{lessons.length}</b> درس أساسي <b>{advancedLessons.length}</b> درس عميق <span>+ أمثلة + تمارين</span></div></div></section>

    <section id="courses" className="section"><div className="section-head"><div><span className="eyebrow">LEARNING PATH</span><h2>مسار المذاكرة الأساسي</h2></div><small>{lessons.length} درس</small></div><div className="grid">{cats.map((cat,i)=>{const list=lessons.filter(x=>x.category===cat);const Icon=[Code2,Zap,Layers3][i];return <article className="card" key={cat}><div className="icon"><Icon/></div><h3>{cat}</h3><p>{list.length} دروس — شرح عميق + كود + تطبيق</p>{list.map((l,n)=><Link href={`/learn/${l.slug}`} key={l.slug}><span>{String(n+1).padStart(2,'0')}</span>{l.title}<ArrowLeft size={14}/></Link>)}</article>})}</div></section>

    <section id="advanced" className="section"><div className="section-head"><div><span className="eyebrow">DEEP DIVE</span><h2>المستوى العميق 🧠</h2><p>دروس إضافية للمواضيع التي تحتاج فهمًا أعمق قبل الدخول في مشاريع Node.js الحقيقية.</p></div><small>{advancedLessons.length} دروس</small></div><div className="grid">{advancedLessons.map((l,n)=><article className="card" key={l.slug}><div className="icon"><Brain size={21}/></div><small>{l.category} · Deep Dive</small><h3>{l.title}</h3><p>{l.summary}</p><Link className="primary" href={`/deep/${l.slug}`}>ابدأ الدرس <ArrowLeft size={14}/></Link><div className="stats"><Terminal size={15}/><span>مصطلحات + كود + Internals + أخطاء + تمرين</span></div></article>)}</div></section>

    <section id="about" className="features"><div><BookOpen/><h3>افهم قبل ما تحفظ</h3><p>كل فصل يبدأ بالمفهوم ثم المصطلحات والسبب وطريقة العمل.</p></div><div><Code2/><h3>افهم الكود</h3><p>Syntax، مثال عملي، Output، وشرح سطرًا سطرًا بدل نسخ الكود فقط.</p></div><div><Zap/><h3>افهم ما وراء الكود</h3><p>Internals، الأخطاء الشائعة، أمثلة المشاريع وتمارين تثبت المعلومة.</p></div></section><footer>JS Academy · Built for focused learning</footer>
  </main>
}
