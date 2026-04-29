import { toggleTheme } from "@/lib/theme";
import { useAppSelector } from "@/app/hooks";
import { selectAllTasks } from "@/features/tasks/store/tasks-selectors";
import { Skeleton } from "@/components/ui/skeleton";

interface AppHeaderProps {
  isLoading?: boolean;
}

export function AppHeader({ isLoading }: AppHeaderProps) {
  const tasks = useAppSelector(selectAllTasks);
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title">Task Manager</h1>
          {isLoading ? (
            <Skeleton className="h-4 w-32 mt-1" />
          ) : (
            <p className="header-subtitle">
              {completedCount} / {tasks.length} tasks completed
            </p>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className="btn-icon"
          aria-label="Toggle theme"
        >
          {/* Moon icon for dark mode toggle (visible in light mode) */}
          <svg
            className="h-5 w-5 icon-light"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          {/* Sun icon for light mode toggle (visible in dark mode) */}
          <svg
            className="h-5 w-5 icon-dark"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
