import type { CustomSelectOption } from "@/components/ui/custom-select";

export const TASK_PRIORITY_OPTIONS: CustomSelectOption[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export const TASK_FILTER_PRIORITY_OPTIONS: CustomSelectOption[] = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "low", label: "Low Priority" },
];

export const TASK_CONFIG = {
  SEARCH_DEBOUNCE_DELAY: 300,
  MAX_TITLE_LENGTH: 100,
} as const;
