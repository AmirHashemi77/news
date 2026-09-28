"use client";

import { cn } from "@/shared/lib/cn";
import { Controller, type Control, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";

import type { ComponentProps } from "react";

type BaseDatePickerProps = Omit<
  ComponentProps<typeof DatePicker>,
  "value" | "onChange" | "name" | "id" | "calendar" | "locale" | "format" | "multiple" | "range" | "className" | "inputClass" | "containerClassName"
>;

export type DateInputProps = BaseDatePickerProps & {
  name: string;
  id?: string;
  label?: string;

  value?: Date | null;
  onChange?: (value: Date | null) => void;
  onBlur?: () => void;

  error?: string;

  className?: string;
  inputClassName?: string;
  calendarClassName?: string;
  containerClassName?: string;
};

export function DateInput({
  name,
  id,
  label,
  value = null,
  onChange,
  onBlur,
  error,

  className,
  inputClassName,
  calendarClassName,
  containerClassName,

  disabled,
  placeholder,

  ...props
}: DateInputProps) {
  const inputId = id ?? name;

  return (
    <div dir="rtl" className={cn("flex w-full min-w-0 flex-col gap-1", className)}>
      {label && (
        <label htmlFor={inputId} className="pr-1 text-sm font-medium leading-6 text-gray-700">
          {label}
        </label>
      )}

      <DatePicker
        {...props}
        id={inputId}
        name={name}
        value={value}
        disabled={disabled}
        calendar={persian}
        locale={persianFa}
        format="YYYY/MM/DD"
        calendarPosition="bottom-right"
        placeholder={placeholder}
        containerClassName={cn("w-full", containerClassName)}
        inputClass={cn(
          "h-8 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3",
          "text-start text-base text-foreground shadow-sm sm:text-sm",
          "placeholder:text-gray-400",
          "transition-[border-color,box-shadow,background-color] duration-200",
          "motion-reduce:transition-none",

          "enabled:hover:border-gray-300",

          "focus:border-gray-400",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-gray-200",

          "disabled:cursor-not-allowed",
          "disabled:bg-gray-100",
          "disabled:text-gray-400",
          "disabled:shadow-none",

          error && "border-red-400 focus:border-red-400 focus:ring-red-100",

          inputClassName,
        )}
        className={calendarClassName}
        onChange={(selectedDate) => {
          if (!selectedDate || Array.isArray(selectedDate)) {
            onChange?.(null);
            return;
          }

          onChange?.(selectedDate.toDate());
        }}
        onClose={() => {
          onBlur?.();
        }}
      />
      <div className="min-h-6 px-1">
        {error && (
          <p role="alert" className="pr-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

type FormDateInputProps<T extends FieldValues> = Omit<DateInputProps, "name" | "value" | "onChange" | "onBlur" | "error"> & {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, FieldPath<T>>;
};

export function FormDateInput<T extends FieldValues>({ control, name, rules, ...props }: FormDateInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <DateInput {...props} name={field.name} value={field.value ?? null} onChange={field.onChange} onBlur={field.onBlur} disabled={field.disabled} error={fieldState.error?.message} />
      )}
    />
  );
}

export default DateInput;
