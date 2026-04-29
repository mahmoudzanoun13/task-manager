import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Priority } from '../types/tasks-types';

// Base selector for the tasks slice state
const selectTasksState = (state: RootState) => state.tasks;

// Select all tasks, sorted by order
export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasksState) => {
    const sorted = [...tasksState.tasks].sort((a, b) => a.order - b.order);
    return sorted;
  }
);

// Select filtered tasks based on optional criteria
export const selectFilteredTasks = createSelector(
  [
    selectAllTasks,
    (_state: RootState, priority: Priority | null) => priority,
    (_state: RootState, _priority: Priority | null, search: string | null) => search,
    (_state: RootState, _priority: Priority | null, _search: string | null, completed: boolean | null) => completed,
  ],
  (tasks, priority, search, completed) => {
    return tasks.filter((task) => {
      const matchesPriority = priority ? task.priority === priority : true;
      const matchesCompleted = completed !== null && completed !== undefined ? task.completed === completed : true;
      const matchesSearch = search ? task.title.toLowerCase().includes(search.toLowerCase()) : true;
      return matchesPriority && matchesCompleted && matchesSearch;
    });
  }
);

// Export types for selector results
export type AllTasks = ReturnType<typeof selectAllTasks>;
export type FilteredTasks = ReturnType<typeof selectFilteredTasks>;
