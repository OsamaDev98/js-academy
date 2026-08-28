import { curriculumNext } from './curriculum-next';

/** Single source of truth for deep lessons used by the learning routes. */
export const allDeepLessons = curriculumNext;

export function getDeepLesson(slug: string) {
  return allDeepLessons.find((lesson) => lesson.slug === slug);
}

export function getDeepLessonIndex(slug: string) {
  return allDeepLessons.findIndex((lesson) => lesson.slug === slug);
}
