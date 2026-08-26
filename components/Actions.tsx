"use client";
import { Check, Moon, Sun, Play, RotateCcw, TerminalSquare } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [done, setDone] = useState(false);
  const [dark, setDark] = useState(false);
  const [code, setCode] = useState(examples[slug] ?? `console.log("Hello JavaScript!");`);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setDone(localStorage.getItem("done:" + slug) === "1");
    setDark(document.documentElement.dataset.theme === "dark");
    setCode(examples[slug] ?? `console.log("Hello JavaScript!");`);
    setOutput("");
  }, [slug]);

  function finish() {
    const v = !done;
    setDone(v);
    localStorage.setItem("done:" + slug, v ? "1" : "0");
  }

  function theme() {
    const v = !dark;
    setDark(v);
    document.documentElement.dataset.theme = v ? "dark" : "light";
    localStorage.setItem("theme", v ? "dark" : "light");
  }

  function runCode() {
    setRunning(true);
    setOutput("");
    const logs: string[] = [];
    const format = (value: unknown) => {
      if (typeof value === "string") return value;
      try { return JSON.stringify(value, null, 2); } catch { return String(value); }
    };
    const originalLog = console.log;
    const originalError = console.error;
    try {
      console.log = (...args) => logs.push(args.map(format).join(" "));
      console.error = (...args) => logs.push("Error: " + args.map(format).join(" "));
      const execute = new Function(code);
      execute();
      setOutput(logs.join("\n") || "تم التنفيذ بنجاح — لا يوجد console output.");
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      console.log = originalLog;
      console.error = originalError;
      setRunning(false);
    }
  }

  function resetCode() {
    setCode(examples[slug] ?? `console.log("Hello JavaScript!");`);
    setOutput("");
  }

  return (
    <>
      <section className="playground" dir="rtl">
        <div className="playground-head">
          <div>
            <span className="eyebrow"><TerminalSquare size={14} /> PRACTICE</span>
            <h2>جرّب الكود بنفسك</h2>
            <p>عدّل المثال، اضغط تشغيل، وشاهد النتيجة فورًا. الكود يعمل داخل المتصفح.</p>
          </div>
          <div className="playground-actions">
            <button onClick={resetCode} title="استعادة المثال"><RotateCcw size={16} /> إعادة</button>
            <button className="run-button" onClick={runCode} disabled={running}><Play size={16} /> {running ? "جاري التشغيل..." : "تشغيل"}</button>
          </div>
        </div>
        <div className="editor-wrap">
          <div className="editor-bar"><span>JavaScript</span><span>Editable</span></div>
          <textarea value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} aria-label="محرر JavaScript" />
        </div>
        <div className="output-wrap">
          <div className="output-title">Output</div>
          <pre>{output || "اضغط تشغيل لرؤية النتيجة..."}</pre>
        </div>
        <small className="playground-note">ملاحظة: هذا المشغّل للتجربة التعليمية فقط. لا تضع فيه أسرارًا أو بيانات حساسة، ولا يمكنه استخدام Node.js APIs مثل fs وprocess بنفس بيئة الخادم.</small>
      </section>

      <div className="actions lesson-actions">
        <button className={done ? "done" : ""} onClick={finish}>
          {done && <Check size={16} />} {done ? "تمت المذاكرة" : "علّم الدرس كمكتمل"}
        </button>
        <button onClick={theme}>
          {dark ? <Sun size={16} /> : <Moon size={16} />} {dark ? "الوضع الفاتح" : "الوضع الداكن"}
        </button>
      </div>
    </>
  );
}
