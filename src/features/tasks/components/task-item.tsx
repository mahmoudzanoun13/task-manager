import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/features/tasks/types/tasks-types";
import { PriorityBadge } from "@/components/ui/badge";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-item ${
        isDragging ? "task-item-dragging" : "task-item-hover"
      } ${task.completed ? "task-item-completed" : ""}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          {...attributes}
          {...listeners}
          className="drag-handle"
          aria-label="Drag handle"
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </button>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.title}" as ${
            task.completed ? "incomplete" : "complete"
          }`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onToggle(task.id);
            }
          }}
          className="checkbox"
        />

        <div className="flex flex-col overflow-hidden">
          <span
            className={`task-title ${
              task.completed ? "task-title-completed" : ""
            }`}
          >
            {task.title}
          </span>
          <PriorityBadge priority={task.priority} className="mt-1 w-max" />
        </div>
      </div>

      <div className="flex items-center gap-2 pl-2">
        <button
          onClick={() => onEdit(task)}
          disabled={task.completed}
          className="btn-icon"
          aria-label={
            task.completed ? "Cannot edit completed task" : "Edit task"
          }
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn-icon-danger"
          aria-label="Delete task"
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});
