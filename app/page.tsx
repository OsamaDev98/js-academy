import Link from 'next/link';
import { ArrowLeft, BookOpen, Code2, Layers3, Zap, Brain, Terminal, ChevronLeft, Server, ShieldCheck } from 'lucide-react';
import { lessons } from '@/lib/lessons';
import { advancedLessons } from '@/lib/advanced';
import { advancedExtraLessons } from '@/lib/advanced-extra';
import { advancedNodeLessons } from '@/lib/advanced-node';
import { foundationExtraLessons } from '@/lib/foundation-extra';
import Reveal from '@/components/Reveal';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const cats = ['JavaScript', 'Async JavaScript', 'Node.js'];
  const deepLessons = [...foundationExtraLessons, ...advancedLessons, ...advancedExtraLessons, ...advancedNodeLessons];
  return (
    <main className="shell">
      <header className="top"><Link href="/" className="brand"><b>JS</b><span>Academy</span></Link><nav aria-label="التنقل الرئيسي"><a href="#courses">الدروس</a><a href="#advanced">المستوى العميق</a><a href="#backend">Backend</a><a href="#about">عن المنهج</a></nav><ThemeToggle/></header>
      <Reveal><section className="hero"><div className="hero-copy"><span className="eyebrow">JAVASCRIPT → ASYNC → NODE.JS → BACKEND</span><h1>ذاكر JavaScript وNode.js <em>بفهم حقيقي.</em></h1><p>منهج عربي عملي يبدأ من أساسيات JavaScript، ثم Async JavaScript وNode.js، وصولًا إلى HTTP وREST وMiddleware وBackend Architecture — مع المصطلحات والكود والتنفيذ الداخلي والأخطاء والتمارين.</p><div className="actions"><Link className="primary" href={`/learn/${lessons[0].slug}`}>ابدأ المذاكرة <ArrowLeft size={18}/></Link><a className="ghost" href="#courses">استكشف المنهج</a></div><div className="hero-points"><span>✓ شرح عربي واضح</span><span>✓ كود LTR</span><span>✓ تمارين عملية</span></div></div><div className="hero-visual"><img src="/hero-code.svg" alt="واجهة كود تعليمية لـ JavaScript وNode.js"/><div className="floating-badge badge-one"><Code2 size={15}/> Practice</div><div className="floating-badge badge-two"><Zap size={15}/> Async</div></div></section></Reveal>
      <Reveal><section id="courses" className="section"><div className="section-head"><div><span className="eyebrow">LEARNING PATH</span><h2>مسار المذاكرة الأساسي</h2><p>ابدأ من الأساسيات بالترتيب، ثم انتقل إلى المستوى العميق.</p></div><small>{lessons.length} درس</small></div><div className="grid">{cats.map((cat,i)=>{const list=lessons.filter(x=>x.category===cat);const Icon=[Code2,Zap,Layers3][i];return <article className="card" key={cat}><div className="icon"><Icon/></div><h3>{cat}</h3><p>{list.length} دروس — شرح + كود + تطبيق</p><div className="lesson-list">{list.map((l,n)=><Link href={`/learn/${l.slug}`} key={l.slug}><span>{String(n+1).padStart(2,'0')}</span><strong>{l.title}</strong><ChevronLeft size={15}/></Link>)}</div></article>})}</div></section></Reveal>
      <Reveal><section id="advanced" className="section"><div className="section-head"><div><span className="eyebrow">DEEP DIVE</span><h2>المستوى العميق 🧠</h2><p>من أساسيات اللغة وJavaScript internals إلى Node.js core: النظرية مرتبطة بالكود والتنفيذ الحقيقي.</p></div><small>{deepLessons.length} دروس</small></div><div className="grid">{deepLessons.map(l=><article className="card" key={l.slug}><div className="icon"><Brain size={21}/></div><small>{l.category} · Deep Dive</small><h3>{l.title}</h3><p>{l.summary}</p><Link className="primary" href={`/deep/${l.slug}`}>ابدأ الدرس <ArrowLeft size={14}/></Link><div className="stats"><Terminal size={15}/><span>مصطلحات + كود + Internals + أخطاء + تمرين</span></div></article>)}</div></section></Reveal>
      <Reveal><section id="backend" className="section"><div className="section-head"><div><span className="eyebrow">BACKEND PATH</span><h2>مسار Backend 🚀</h2><p>بعد Node.js Core، افهم HTTP ثم APIs والميدل وير وإدارة الأخطاء.</p></div><small>{advancedNodeLessons.length} دروس</small></div><div className="grid">{advancedNodeLessons.map((l,i)=><article className="card" key={l.slug}><div className="icon">{i<4?<Server size={21}/>:<ShieldCheck size={21}/>}</div><small>{l.category}</small><h3>{l.title}</h3><p>{l.summary}</p><Link className="primary" href={`/deep/${l.slug}`}>ابدأ الدرس <ArrowLeft size={14}/></Link><div className="stats"><Terminal size={15}/><span>شرح + كود + Internals + تمرين</span></div></article>)}</div></section></Reveal>
      <Reveal><section id="about" className="features"><div><BookOpen/><h3>افهم قبل ما تحفظ</h3><p>كل فصل يبدأ بالمفهوم ثم المصطلحات والسبب وطريقة العمل.</p></div><div><Code2/><h3>افهم الكود</h3><p>Syntax، مثال عملي، Output، وشرح سطرًا بسطر بدل نسخ الكود.</p></div><div><Zap/><h3>افهم ما وراء الكود</h3><p>Internals، الأخطاء الشائعة، أمثلة المشاريع وتمارين تثبت المعلومة.</p></div></section></Reveal>
      <footer>JS Academy · Built for focused learning</footer>
    </main>
  );
}
