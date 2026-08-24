"use client";
import { Check, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
export default function Actions({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDone(localStorage.getItem("done:" + slug) === "1");
    setDark(document.documentElement.dataset.theme === "dark");
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
  return (
    <div className="actions lesson-actions">
      <button className={done ? "done" : ""} onClick={finish}>
        {done && <Check size={16} />}{" "}
        {done ? "تمت المذاكرة" : "علّم الدرس كمكتمل"}
      </button>
      <button onClick={theme}>
        {dark ? <Sun size={16} /> : <Moon size={16} />}{" "}
        {dark ? "الوضع الفاتح" : "الوضع الداكن"}
      </button>
    </div>
  );
}
