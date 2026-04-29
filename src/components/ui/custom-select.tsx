import { useCustomSelect } from "./hooks/use-custom-select";

export interface CustomSelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  value: string | null;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  className?: string;
  label?: string;
  error?: string;
  id?: string;
  "aria-label"?: string;
}

export function CustomSelect({
  value,
  onChange,
  options,
  className = "",
  label,
  error,
  id,
  "aria-label": ariaLabel,
}: CustomSelectProps) {
  const {
    isOpen,
    dropdownRef,
    toggleDropdown,
    handleOptionSelect,
    currentLabel,
  } = useCustomSelect(options, value, onChange);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <div className="relative w-full" ref={dropdownRef}>
        <button
          id={id}
          type="button"
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={ariaLabel}
          className={`input flex w-full items-center justify-between cursor-pointer ${
            error ? "input-error" : ""
          }`}
        >
          <span className="block truncate">{currentLabel}</span>
          <svg
            className={`h-5 w-5 icon-muted transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="dropdown-menu" role="listbox">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                className={`dropdown-item ${
                  value === option.value
                    ? "dropdown-item-active"
                    : "dropdown-item-inactive"
                }`}
                onClick={() => handleOptionSelect(option.value)}
              >
                <span className="block truncate">{option.label}</span>
                {value === option.value && (
                  <span className="dropdown-check">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
