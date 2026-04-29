import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  reorderTasks,
  setTasks,
} from '@/features/tasks/store/tasks-slice';
import type { Task, TasksState } from '@/features/tasks/types/tasks-types';

describe('tasks slice', () => {
  let initialState: TasksState;

  beforeEach(() => {
    initialState = {
      tasks: [],
      initialized: false,
    };
  });

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      tasks: [],
      initialized: false,
    });
  });

  it('should handle setTasks', () => {
    const tasks: Task[] = [
      { id: '1', title: 'Task 1', priority: 'high', completed: false, createdAt: '2023-01-01T00:00:00.000Z', order: 0 },
    ];
    const actual = reducer(initialState, setTasks(tasks));
    expect(actual.tasks).toEqual(tasks);
    expect(actual.initialized).toBe(true);
  });

  it('should handle addTask', () => {
    const actual = reducer(initialState, addTask('New Task', 'medium'));
    expect(actual.tasks.length).toBe(1);
    expect(actual.tasks[0].title).toBe('New Task');
    expect(actual.tasks[0].priority).toBe('medium');
    expect(actual.tasks[0].completed).toBe(false);
    expect(actual.tasks[0].order).toBe(0);
    expect(actual.tasks[0].id).toBeDefined();
  });

  it('should handle updateTask', () => {
    const state: TasksState = {
      tasks: [
        { id: '1', title: 'Task 1', priority: 'high', completed: false, createdAt: '', order: 0 },
      ],
      initialized: true,
    };
    const actual = reducer(state, updateTask({ id: '1', changes: { title: 'Updated Task', priority: 'low' } }));
    expect(actual.tasks[0].title).toBe('Updated Task');
    expect(actual.tasks[0].priority).toBe('low');
  });

  it('should handle deleteTask', () => {
    const state: TasksState = {
      tasks: [
        { id: '1', title: 'Task 1', priority: 'high', completed: false, createdAt: '', order: 0 },
        { id: '2', title: 'Task 2', priority: 'medium', completed: false, createdAt: '', order: 1 },
      ],
      initialized: true,
    };
    const actual = reducer(state, deleteTask('1'));
    expect(actual.tasks.length).toBe(1);
    expect(actual.tasks[0].id).toBe('2');
  });

  it('should handle toggleTask', () => {
    const state: TasksState = {
      tasks: [
        { id: '1', title: 'Task 1', priority: 'high', completed: false, createdAt: '', order: 0 },
      ],
      initialized: true,
    };
    const actual = reducer(state, toggleTask('1'));
    expect(actual.tasks[0].completed).toBe(true);
    const actual2 = reducer(actual, toggleTask('1'));
    expect(actual2.tasks[0].completed).toBe(false);
  });

  it('should handle reorderTasks', () => {
    const state: TasksState = {
      tasks: [
        { id: '1', title: 'Task 1', priority: 'high', completed: false, createdAt: '', order: 0 },
        { id: '2', title: 'Task 2', priority: 'medium', completed: false, createdAt: '', order: 1 },
        { id: '3', title: 'Task 3', priority: 'low', completed: false, createdAt: '', order: 2 },
      ],
      initialized: true,
    };
    
    // Move task at index 0 to index 2
    const actual = reducer(state, reorderTasks({ sourceIndex: 0, destinationIndex: 2 }));
    expect(actual.tasks[0].id).toBe('2');
    expect(actual.tasks[0].order).toBe(0);
    
    expect(actual.tasks[1].id).toBe('3');
    expect(actual.tasks[1].order).toBe(1);
    
    expect(actual.tasks[2].id).toBe('1');
    expect(actual.tasks[2].order).toBe(2);
  });
});
