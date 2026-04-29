import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  taskSchema,
  type TaskFormValues,
} from "@/features/tasks/schema/task-schema";
import { TASK_PRIORITY_OPTIONS } from "@/features/tasks/constants/task-constants";
import type { Task } from "@/features/tasks/types/tasks-types";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/custom-select";
import { Button } from "@/components/ui/button";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
  initialData?: Task | null;
}

export function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TaskFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      priority: "medium",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          title: initialData.title,
          priority: initialData.priority,
        });
      } else {
        reset({
          title: "",
          priority: "medium",
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const onSubmitHandler = handleSubmit((data) => {
    onSubmit(data);
    onClose();
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Task" : "Add New Task"}
    >
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
        <Input
          label="Title"
          id="title"
          autoFocus
          placeholder="What needs to be done?"
          error={errors.title?.message}
          {...register("title")}
        />

        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <CustomSelect
              label="Priority"
              id="priority"
              error={errors.priority?.message}
              value={field.value}
              onChange={field.onChange}
              options={TASK_PRIORITY_OPTIONS}
            />
          )}
        />

        <div className="mt-4 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {initialData ? "Save Changes" : "Add Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
