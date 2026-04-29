import { useState, useCallback } from "react";
import type { Task } from "../types/tasks-types";

export function useTaskModals() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const openAddForm = useCallback(() => {
    setEditingTask(null);
    setIsFormOpen(true);
  }, []);

  const openEditForm = useCallback((task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTask(null);
  }, []);

  const openDeleteDialog = useCallback((id: string) => {
    setTaskToDelete(id);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setTaskToDelete(null);
  }, []);

  return {
    isFormOpen,
    editingTask,
    taskToDelete,
    openAddForm,
    openEditForm,
    closeForm,
    openDeleteDialog,
    closeDeleteDialog,
  };
}
