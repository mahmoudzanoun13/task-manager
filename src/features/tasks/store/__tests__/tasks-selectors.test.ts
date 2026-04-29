import { describe, it, expect } from 'vitest';
import { selectAllTasks, selectFilteredTasks } from '@/features/tasks/store/tasks-selectors';
import type { Task, TasksState } from '@/features/tasks/types/tasks-types';
import type { RootState } from '@/app/store';

describe('tasks selectors', () => {
  const tasks: Task[] = [
    { id: '1', title: 'Buy groceries', priority: 'high', completed: false, createdAt: '', order: 1 },
    { id: '2', title: 'Clean house', priority: 'medium', completed: true, createdAt: '', order: 0 },
    { id: '3', title: 'Read book', priority: 'low', completed: false, createdAt: '', order: 2 },
  ];

  const state = {
    tasks: {
      tasks,
      initialized: true,
    } as TasksState,
  };

  it('selectAllTasks should return tasks sorted by order', () => {
    const result = selectAllTasks(state as unknown as RootState);
    expect(result.length).toBe(3);
    expect(result[0].id).toBe('2'); // order 0
    expect(result[1].id).toBe('1'); // order 1
    expect(result[2].id).toBe('3'); // order 2
  });

  describe('selectFilteredTasks', () => {
    it('should filter by priority', () => {
      const result = selectFilteredTasks(state as unknown as RootState, 'high', null, null);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });

    it('should filter by completion status', () => {
      const result = selectFilteredTasks(state as unknown as RootState, null, null, true);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');

      const activeResult = selectFilteredTasks(state as unknown as RootState, null, null, false);
      expect(activeResult.length).toBe(2);
      expect(activeResult[0].id).toBe('1');
      expect(activeResult[1].id).toBe('3');
    });

    it('should filter by search text (case insensitive)', () => {
      const result = selectFilteredTasks(state as unknown as RootState, null, 'house', null);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');

      const result2 = selectFilteredTasks(state as unknown as RootState, null, 'B', null); // "Buy groceries", "Read book"
      expect(result2.length).toBe(2);
    });

    it('should combine multiple filters', () => {
      const result = selectFilteredTasks(state as unknown as RootState, 'high', 'buy', false);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
      
      const noMatch = selectFilteredTasks(state as unknown as RootState, 'high', 'buy', true);
      expect(noMatch.length).toBe(0);
    });
  });
});
