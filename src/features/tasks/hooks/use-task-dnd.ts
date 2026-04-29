import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useAppDispatch } from '@/app/hooks';
import { reorderTasks } from '@/features/tasks/store/tasks-slice';
import type { Task } from '@/features/tasks/types/tasks-types';

export function useTaskDnd(allTasks: Task[]) {
  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = allTasks.findIndex((t) => t.id === active.id);
      const overIndex = allTasks.findIndex((t) => t.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        dispatch(
          reorderTasks({ sourceIndex: activeIndex, destinationIndex: overIndex })
        );
      }
    }
  };

  return {
    sensors,
    handleDragEnd,
  };
}
