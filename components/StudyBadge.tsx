import { BookOpen, Code2, Sparkles } from 'lucide-react';

export default function StudyBadge({ type = 'learn', children }: { type?: 'learn' | 'code' | 'deep'; children: React.ReactNode }) {
  const Icon = type === 'code' ? Code2 : type === 'deep' ? Sparkles : BookOpen;
  return <span className="study-badge"><Icon size={14} aria-hidden="true" />{children}</span>;
}
