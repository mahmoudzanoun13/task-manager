import { useQueryState, parseAsStringEnum, parseAsBoolean } from 'nuqs';
import type { Priority } from '@/features/tasks/types/tasks-types';

export function useTaskFilters() {
  const [priority, setPriority] = useQueryState(
    'priority',
    parseAsStringEnum<Priority>(['high', 'medium', 'low'])
  );

  const [completed, setCompleted] = useQueryState(
    'completed',
    parseAsBoolean
  );

  return {
    priority,
    setPriority,
    completed,
    setCompleted,
  };
}
