import { cn } from "@/shared/lib/cn";
import { FC, InputHTMLAttributes, ReactNode } from "react";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;

  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const TextInput: FC<PropsType> = ({ placeholder, className, name, label, id, error, type = "text", startIcon, endIcon, ...props }) => {
  const inputId = id ?? name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="pr-1 text-sm font-medium leading-6 text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {startIcon && <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-gray-400">{startIcon}</div>}

        <input
          id={inputId}
          type={type}
          name={name}
          placeholder={placeholder}
          aria-describedby={errorId}
          className={cn(
            "h-10 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-start text-base text-foreground shadow-sm sm:text-sm",
            "placeholder:text-gray-400 transition-[border-color,box-shadow,background-color] duration-200",
            "enabled:hover:border-gray-300 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200",
            "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
            "aria-invalid:border-red-400 aria-invalid:focus:ring-red-100",

            startIcon && "pr-10",
            endIcon && "pl-10",

            className,
          )}
          {...props}
        />

        {endIcon && <div className="absolute left-1 top-1/2 flex -translate-y-1/2 items-center">{endIcon}</div>}
      </div>

      <div className="min-h-6 px-1">
        {error && (
          <span id={errorId} className="text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
