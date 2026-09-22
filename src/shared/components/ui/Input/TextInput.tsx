import { cn } from "@/shared/lib/cn";
import { FC, InputHTMLAttributes } from "react";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
}

const TextInput: FC<PropsType> = ({ placeholder, className, name, label, id, error, type = "text", ...props }) => {
  const inputId = id ?? name;
  const errorId = error ? `${inputId}-error` : undefined;
  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium leading-6 text-gray-700 pr-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-start text-base text-foreground shadow-sm sm:text-sm",
          "placeholder:text-gray-400 transition-[border-color,box-shadow,background-color] duration-200 motion-reduce:transition-none",
          "enabled:hover:border-gray-300 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200",
          "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none",
          "aria-invalid:border-red-400 aria-invalid:focus:ring-red-100",
          className,
        )}
        {...props}
      />

      {error && (
        <span id={errorId} className="px-1 text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};
export default TextInput;
