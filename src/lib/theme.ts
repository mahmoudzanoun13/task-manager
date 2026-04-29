import { loadTheme, saveTheme } from "@/lib/storage";

export type Theme = 'light' | 'dark';

export function getInitialTheme(): Theme {
  const savedTheme = loadTheme();
  if (savedTheme) {
    return savedTheme;
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function initializeTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);
}

export function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
  saveTheme(newTheme);
}
