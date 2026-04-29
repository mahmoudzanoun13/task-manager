import { useCallback } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { TaskList } from "../features/tasks/components/task-list";
import { TaskFilters } from "../features/tasks/components/task-filters";
import { TaskSearch } from "../features/tasks/components/task-search";
import { TaskForm } from "../features/tasks/components/task-form";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useTaskActions } from "@/features/tasks/hooks/use-task-actions";
import { useTaskSearch } from "@/features/tasks/hooks/use-task-search";
import { useTasks } from "@/features/tasks/hooks/use-tasks";
import { useTaskModals } from "@/features/tasks/hooks/use-task-modals";
import type { TaskFormValues } from "@/features/tasks/schema/task-schema";

export function TaskPage() {
  const { tasks, allTasks, isInitialLoading } = useTasks();
  const { searchValue, debouncedSearch, setSearchValue, clearSearch } =
    useTaskSearch();

  const isSearching = searchValue !== debouncedSearch;
  const isLoading = isInitialLoading || isSearching;

  const { addTask, updateTask, deleteTask, toggleTask } = useTaskActions();
  const {
    isFormOpen,
    editingTask,
    taskToDelete,
    openAddForm,
    openEditForm,
    closeForm,
    openDeleteDialog,
    closeDeleteDialog,
  } = useTaskModals();

  const handleFormSubmit = useCallback(
    (values: TaskFormValues) => {
      if (editingTask) {
        updateTask(editingTask.id, values.title, values.priority);
      } else {
        addTask(values.title, values.priority);
      }
      closeForm();
    },
    [editingTask, updateTask, addTask, closeForm],
  );

  const handleConfirmDelete = useCallback(() => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      closeDeleteDialog();
    }
  }, [taskToDelete, deleteTask, closeDeleteDialog]);

  return (
    <div className="app-layout">
      <AppHeader isLoading={isInitialLoading} />

      <main className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TaskSearch
            value={searchValue}
            onChange={setSearchValue}
            onClear={clearSearch}
          />
          <button onClick={openAddForm} className="btn btn-primary btn-md">
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Task
          </button>
        </div>

        <div className="mb-6">
          <TaskFilters />
        </div>

        <TaskList
          tasks={tasks}
          allTasks={allTasks}
          isPending={isLoading}
          onToggle={toggleTask}
          onEdit={openEditForm}
          onDelete={openDeleteDialog}
        />
      </main>

      <TaskForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
      />

      <ConfirmationDialog
        isOpen={taskToDelete !== null}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        isDestructive
      />
    </div>
  );
}
