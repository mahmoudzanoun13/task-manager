import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadTasks, saveTasks, loadTheme, saveTheme } from '@/lib/storage';
import type { Task } from '@/features/tasks/types/tasks-types';

describe('storage utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear mock functions
    vi.restoreAllMocks();
  });

  describe('tasks storage', () => {
    it('loadTasks should return empty array if nothing in storage', () => {
      expect(loadTasks()).toEqual([]);
    });

    it('loadTasks should return parsed tasks if valid JSON', () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task', priority: 'high', completed: false, createdAt: '', order: 0 }
      ];
      localStorage.setItem('task_manager_tasks', JSON.stringify(tasks));
      
      expect(loadTasks()).toEqual(tasks);
    });

    it('loadTasks should return empty array and log error if invalid JSON', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('task_manager_tasks', '{ invalid json }');
      
      expect(loadTasks()).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('saveTasks should stringify and save to storage', () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task', priority: 'high', completed: false, createdAt: '', order: 0 }
      ];
      saveTasks(tasks);
      
      const stored = localStorage.getItem('task_manager_tasks');
      expect(stored).toBe(JSON.stringify(tasks));
    });
  });

  describe('theme storage', () => {
    it('loadTheme should return null if nothing in storage', () => {
      expect(loadTheme()).toBeNull();
    });

    it('loadTheme should return "light" or "dark" if valid', () => {
      localStorage.setItem('task_manager_theme', 'dark');
      expect(loadTheme()).toBe('dark');
      
      localStorage.setItem('task_manager_theme', 'light');
      expect(loadTheme()).toBe('light');
    });

    it('loadTheme should return null if invalid value', () => {
      localStorage.setItem('task_manager_theme', 'blue');
      expect(loadTheme()).toBeNull();
    });

    it('saveTheme should save theme to storage', () => {
      saveTheme('dark');
      expect(localStorage.getItem('task_manager_theme')).toBe('dark');
    });
  });
});
