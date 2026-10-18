"use client";

import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/shared/lib/cn";

export interface SelectBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectBoxProps = Omit<ComponentPropsWithRef<"select">, "children" | "multiple" | "size" | "value" | "defaultValue"> & {
  options: readonly SelectBoxOption[];
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  startIcon?: ReactNode;
  size?: "sm" | "md" | "lg";
  value?: string;
  defaultValue?: string;
  containerClassName?: string;
};

const sizes = {
  sm: "h-9",
  md: "h-10",
  lg: "h-11",
} as const;

export default function SelectBox({
  options,
  label,
  placeholder,
  hint,
  error,
  startIcon,
  size = "md",
  dir = "rtl",
  id,
  name,
  value,
  defaultValue,
  className,
  containerClassName,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: SelectBoxProps) {
  const generatedId = useId();
  const selectId = id ?? name ?? `select-${generatedId}`;
  const errorId = error ? `${selectId}-error` : undefined;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div dir={dir} className={cn("flex w-full min-w-0 flex-col gap-1", containerClassName)}>
      {label && (
        <label htmlFor={selectId} className="ps-1 text-sm font-medium leading-6 text-gray-700">
          {label}
        </label>
      )}

      <div className="group relative">
        {startIcon && (
          <span aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 flex -translate-y-1/2 items-center text-gray-400 group-has-[select:disabled]:text-gray-300">
            {startIcon}
          </span>
        )}

        <select
          {...props}
          id={selectId}
          name={name}
          dir={dir}
          value={value}
          defaultValue={value === undefined ? defaultValue ?? (placeholder ? "" : undefined) : undefined}
          aria-invalid={error ? true : ariaInvalid}
          aria-describedby={describedBy}
          className={cn(
            "w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white ps-3 pe-10 text-start text-base text-foreground shadow-sm sm:text-sm",
            "transition-[border-color,box-shadow,background-color] duration-200 motion-reduce:transition-none",
            "enabled:hover:border-gray-300 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200",
            "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none",
            "aria-invalid:border-red-400 aria-invalid:focus:ring-red-100",
            "has-[option[data-placeholder]:checked]:text-gray-400",
            sizes[size],
            startIcon && "ps-10",
            className,
          )}
        >
          {placeholder && (
            <option value="" disabled data-placeholder className="text-gray-400">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled} className="text-foreground disabled:text-gray-400">
              {option.label}
            </option>
          ))}
        </select>

        <FiChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-icon group-has-[select:disabled]:text-gray-300"
        />
      </div>

      <div className="min-h-6 px-1">
        {hint && <p id={hintId} className="text-xs leading-6 text-gray-500">{hint}</p>}
        {error && <p id={errorId} role="alert" className="text-xs leading-6 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
