import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(100, 'Title is too long'),
  priority: z.enum(['high', 'medium', 'low'] as const),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
