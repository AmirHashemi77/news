import { cn } from "@/shared/lib/cn";
import { FC, InputHTMLAttributes } from "react";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
}

const TextInput: FC<PropsType> = ({ placeholder, className, ...props }) => {
  return (
    <input type="text" placeholder={placeholder} className={cn("rounded-lg border border-gray-600 px-3 py-1 focus:outline-0 focus:shadow-md transition-shadow duration-300", className)} {...props} />
  );
};
export default TextInput;
