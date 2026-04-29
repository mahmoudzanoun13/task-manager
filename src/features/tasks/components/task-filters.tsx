import { CustomSelect } from "@/components/ui/custom-select";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";
import { TASK_FILTER_PRIORITY_OPTIONS } from "@/features/tasks/constants/task-constants";
import type { Priority } from "@/features/tasks/types/tasks-types";

export function TaskFilters() {
  const { priority, setPriority, completed, setCompleted } = useTaskFilters();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <CustomSelect
        value={priority ?? "all"}
        onChange={(val) =>
          setPriority(val === "all" ? null : (val as Priority))
        }
        options={TASK_FILTER_PRIORITY_OPTIONS}
        aria-label="Filter by priority"
        className="w-full sm:w-40"
      />
      <div
        className="filter-group"
        role="group"
        aria-label="Filter by completion status"
      >
        <button
          type="button"
          onClick={() => setCompleted(null)}
          aria-pressed={completed === null}
          className={`filter-btn filter-btn-first ${
            completed === null ? "filter-btn-active" : ""
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setCompleted(false)}
          aria-pressed={completed === false}
          className={`filter-btn filter-btn-middle ${
            completed === false ? "filter-btn-active" : ""
          }`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setCompleted(true)}
          aria-pressed={completed === true}
          className={`filter-btn filter-btn-last filter-btn-middle ${
            completed === true ? "filter-btn-active" : ""
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
