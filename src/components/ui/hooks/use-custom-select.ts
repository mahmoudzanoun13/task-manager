import { useState, useRef, useEffect, useCallback } from "react";
import type { CustomSelectOption } from "../custom-select";

export function useCustomSelect(
  options: CustomSelectOption[],
  value: string | null,
  onChange: (value: string) => void,
) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleOptionSelect = useCallback(
    (val: string) => {
      onChange(val);
      setIsOpen(false);
    },
    [onChange],
  );

  const currentLabel =
    options.find((opt) => opt.value === value)?.label ?? options[0]?.label;

  return {
    isOpen,
    dropdownRef,
    toggleDropdown,
    handleOptionSelect,
    currentLabel,
  };
}
