"use client";
import { Check, Moon, Sun, Play, RotateCcw, TerminalSquare, Copy, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const examples: Record<string, string> = {
  variables: `const name = "Osama";\nlet score = 10;\nscore += 5;\nconsole.log(name, score);`,
  functions: `function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(4, 6));`,
  "arrow-functions": `const multiply = (a, b) => a * b;\nconsole.log(multiply(3, 4));`,
  arrays: `const numbers = [1, 2, 3, 4];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);`,
  objects: `const user = { name: "Sara", age: 24 };\nconst { name, age } = user;\nconsole.log(name, age);`,
  callbacks: `setTimeout(() => {\n  console.log("Done");\n}, 500);`,
  promises: `Promise.resolve("Done")\n  .then(value => console.log(value))\n  .catch(error => console.error(error));`,
  "async-await": `async function main() {\n  const value = await Promise.resolve(42);\n  console.log(value);\n}\n\nmain();`,
  scope: `const outside = 1;\nif (true) {\n  const inside = 2;\n  console.log(outside, inside);\n}`,
};

export default function Actions({ slug }: { slug: string }) {
  const [done, setDone] = useState(false), [dark, setDark] = useState(false);
  const [code, setCode] = useState(""), [output, setOutput] = useState(""), [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const defaultCode = examples[slug] ?? `console.log("Hello JavaScript!");`;

  useEffect(() => {
    setDone(localStorage.getItem("done:" + slug) === "1");
    setDark(document.documentElement.dataset.theme === "dark");
    setCode(localStorage.getItem("code:" + slug) ?? defaultCode);
    setOutput(localStorage.getItem("output:" + slug) ?? "");
  }, [slug, defaultCode]);

  useEffect(() => { if (code) localStorage.setItem("code:" + slug, code); }, [code, slug]);
  useEffect(() => { localStorage.setItem("output:" + slug, output); }, [output, slug]);

  function finish() { const v=!done; setDone(v); localStorage.setItem("done:"+slug,v?"1":"0"); }
  function theme() { const v=!dark; setDark(v); document.documentElement.dataset.theme=v?"dark":"light"; localStorage.setItem("js-academy-theme",v?"dark":"light"); }
  function runCode() {
    setRunning(true); setOutput(""); const logs:string[]=[];
    const format=(v:unknown)=>typeof v==='string'?v:JSON.stringify(v,null,2);
    const originalLog=console.log, originalError=console.error;
    try { console.log=(...a)=>logs.push(a.map(format).join(" ")); console.error=(...a)=>logs.push("Error: "+a.map(format).join(" ")); new Function(code)(); setOutput(logs.join("\n")||"تم التنفيذ بنجاح — لا يوجد console output."); }
    catch(error){setOutput(`Error: ${error instanceof Error?error.message:String(error)}`)}
    finally{console.log=originalLog;console.error=originalError;setRunning(false)}
  }
  function resetCode(){setCode(defaultCode);setOutput("");}
  function clearOutput(){setOutput("");}
  async function copyCode(){await navigator.clipboard.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),1200)}
  function handleKeyDown(e:React.KeyboardEvent<HTMLTextAreaElement>){
    if(e.key==='Tab'){e.preventDefault();const el=e.currentTarget,start=el.selectionStart,end=el.selectionEnd;setCode(code.slice(0,start)+'  '+code.slice(end));requestAnimationFrame(()=>{el.selectionStart=el.selectionEnd=start+2})}
    if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();runCode()}
  }

  return <>
    <section className="playground" dir="rtl">
      <div className="playground-head"><div><span className="eyebrow"><TerminalSquare size={14}/> PRACTICE</span><h2>جرّب الكود بنفسك</h2><p>عدّل الكود وشغّله. <kbd>Ctrl</kbd> + <kbd>Enter</kbd> للتشغيل.</p></div><div className="playground-actions"><button onClick={copyCode}><Copy size={16}/>{copied?'تم النسخ':'نسخ'}</button><button onClick={resetCode}><RotateCcw size={16}/> إعادة</button><button className="run-button" onClick={runCode} disabled={running}><Play size={16}/>{running?'جاري التشغيل...':'تشغيل'}</button></div></div>
      <div className="editor-wrap"><div className="editor-bar"><span>JavaScript</span><span>Editable · محفوظ تلقائيًا</span></div><div className="editor-line"><textarea ref={editorRef} value={code} onChange={e=>setCode(e.target.value)} onKeyDown={handleKeyDown} spellCheck={false} aria-label="محرر JavaScript" /></div></div>
      <div className="output-wrap"><div className="output-title"><span>Output</span><button onClick={clearOutput}><Trash2 size={14}/> مسح</button></div><pre>{output||"اضغط تشغيل لرؤية النتيجة..."}</pre></div>
      <small className="playground-note">للتجربة التعليمية فقط. لا تضع أسرارًا أو بيانات حساسة. هذا المشغّل يعمل في المتصفح ولا يوفر Node.js APIs مثل fs وprocess.</small>
    </section>
    <div className="actions lesson-actions"><button className={done?'done':''} onClick={finish}>{done&&<Check size={16}/>} {done?'تمت المذاكرة':'علّم الدرس كمكتمل'}</button><button onClick={theme}>{dark?<Sun size={16}/>:<Moon size={16}/>} {dark?'الوضع الفاتح':'الوضع الداكن'}</button></div>
  </>;
}
