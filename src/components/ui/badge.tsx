import type { Priority } from "@/features/tasks/types/tasks-types";

interface BadgeProps {
  priority: Priority;
  className?: string;
}

const variantMap: Record<Priority, string> = {
  high: "badge-high",
  medium: "badge-medium",
  low: "badge-low",
};

export function PriorityBadge({ priority, className = "" }: BadgeProps) {
  return (
    <span className={`badge ${variantMap[priority]} ${className}`}>
      {priority}
    </span>
  );
}
