import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/store/tasks-slice';
import { saveTasks } from '@/lib/storage';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// Subscribe to store changes to persist tasks
store.subscribe(() => {
  const state = store.getState();
  saveTasks(state.tasks.tasks);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
