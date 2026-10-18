import { cn } from "@/shared/lib/cn";

const variants = {
  primary: "bg-foreground text-background not-disabled:hover:opacity-90",
  secondary: "bg-white text-gray-600 shadow-sm not-disabled:hover:bg-gray-100 not-disabled:hover:text-gray-950",
  outline: "border border-gray-200 bg-white text-gray-700 shadow-sm not-disabled:hover:bg-gray-100 not-disabled:hover:text-foreground",
  ghost: "text-gray-600 not-disabled:hover:bg-gray-100 not-disabled:hover:text-gray-950",
  danger: "text-red-600 not-disabled:hover:bg-red-50",
  overlay: "rounded-full bg-black/25 text-white backdrop-blur-md not-disabled:hover:bg-black/45 focus-visible:ring-white",
  unstyled: "",
} as const;

const sizes = {
  sm: "min-h-9 px-3 py-2",
  md: "min-h-10 px-4 py-2.5",
  lg: "min-h-11 px-5 py-2.5",
  "icon-sm": "size-8 p-0",
  icon: "size-10 p-0",
  "icon-lg": "size-11 p-0",
  none: "",
} as const;

export interface ButtonStyleProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  fullWidth?: boolean;
  className?: string;
}

export function buttonStyles({ variant = "primary", size = "md", fullWidth = false, className }: ButtonStyleProps = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium",
    "cursor-pointer transition-[color,background-color,border-color,opacity,box-shadow] duration-200 motion-reduce:transition-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variant !== "unstyled" && "rounded-lg",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}
