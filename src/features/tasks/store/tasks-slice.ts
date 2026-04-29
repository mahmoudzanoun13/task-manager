import { createSlice, type PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { Task, TasksState, Priority } from '../types/tasks-types';

const initialState: TasksState = {
  tasks: [],
  initialized: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      state.initialized = true;
    },
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        const task = action.payload;
        task.order = state.tasks.length;
        state.tasks.push(task);
      },
      // payload creator with title and priority
      prepare(title: string, priority: Priority) {
        const newTask: Task = {
          id: nanoid(),
          title,
          priority,
          completed: false,
          createdAt: new Date().toISOString(),
          order: 0, // placeholder, will be set in reducer
        };
        return { payload: newTask };
      },
    },
    updateTask(state, action: PayloadAction<{ id: string; changes: Partial<Omit<Task, 'id'>> }>) {
      const { id, changes } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        Object.assign(task, changes);
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    reorderTasks(
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [moved] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, moved);
      // reassign order based on array index
      state.tasks.forEach((t, i) => (t.order = i));
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  reorderTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
