import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAppDispatch } from '@/app/hooks';
import { addTask, updateTask, deleteTask, toggleTask } from '@/features/tasks/store/tasks-slice';
import type { Priority } from '@/features/tasks/types/tasks-types';

export function useTaskActions() {
  const dispatch = useAppDispatch();

  const handleAddTask = useCallback(
    (title: string, priority: Priority) => {
      dispatch(addTask(title, priority));
      toast.success('Task added successfully');
    },
    [dispatch]
  );

  const handleUpdateTask = useCallback(
    (id: string, title: string, priority: Priority) => {
      dispatch(updateTask({ id, changes: { title, priority } }));
      toast.success('Task updated successfully');
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTask(id));
      toast.success('Task deleted successfully');
    },
    [dispatch]
  );

  const handleToggleTask = useCallback(
    (id: string) => {
      dispatch(toggleTask(id));
    },
    [dispatch]
  );

  return {
    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    toggleTask: handleToggleTask,
  };
}
