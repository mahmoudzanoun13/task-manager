import { Input } from "@/components/ui/input";

interface TaskSearchProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

export function TaskSearch({ value, onChange, onClear }: TaskSearchProps) {
  return (
    <div className="search-input-container">
      <div className="search-icon-wrapper">
        <svg
          className="h-4 w-4 icon-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <Input
        type="text"
        placeholder="Search tasks..."
        aria-label="Search tasks"
        className="pl-9 pr-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={onClear}
          className="search-clear-btn"
          aria-label="Clear search"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
