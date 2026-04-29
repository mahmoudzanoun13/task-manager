import { useAppSelector } from "@/app/hooks";
import { selectAllTasks, selectFilteredTasks } from "../store/tasks-selectors";
import { useTaskFilters } from "./use-task-filters";
import { useTaskSearch } from "./use-task-search";

export function useTasks() {
  const { priority, completed } = useTaskFilters();
  const { debouncedSearch } = useTaskSearch();

  const allTasks = useAppSelector(selectAllTasks);
  const isInitialized = useAppSelector((state) => state.tasks.initialized);
  const filteredTasks = useAppSelector((state) =>
    selectFilteredTasks(state, priority, debouncedSearch, completed)
  );

  return {
    tasks: filteredTasks,
    allTasks,
    isInitialLoading: !isInitialized,
  };
}
