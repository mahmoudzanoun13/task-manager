import { useEffect } from "react";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { TaskPage } from "@/pages/task-page";
import { useAppDispatch } from "@/app/hooks";
import { setTasks } from "@/features/tasks/store/tasks-slice";
import { loadTasks } from "@/lib/storage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulate initial data loading delay to show skeleton loading
    const timer = setTimeout(() => {
      dispatch(setTasks(loadTasks()));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <TaskPage />
    </ErrorBoundary>
  );
}

export default App;
