import type { Task } from '@/features/tasks/types/tasks-types';

const TASKS_STORAGE_KEY = 'task_manager_tasks';
const THEME_STORAGE_KEY = 'task_manager_theme';

export function loadTasks(): Task[] {
  try {
    const serialized = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!serialized) {
      return [];
    }
    return JSON.parse(serialized) as Task[];
  } catch (error) {
    console.error('Failed to load tasks from local storage:', error);
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    const serialized = JSON.stringify(tasks);
    localStorage.setItem(TASKS_STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save tasks to local storage:', error);
  }
}

export function loadTheme(): 'light' | 'dark' | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error('Failed to save theme to local storage:', error);
  }
}
