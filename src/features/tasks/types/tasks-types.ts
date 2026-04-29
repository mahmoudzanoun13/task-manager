export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: string; // ISO string
  order: number; // used for drag‑and‑drop ordering
}

export interface TasksState {
  tasks: Task[];
  initialized: boolean;
}
