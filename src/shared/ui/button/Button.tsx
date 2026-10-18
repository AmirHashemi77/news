import type { ComponentPropsWithRef, ReactNode } from "react";
import { buttonStyles, type ButtonStyleProps } from "./buttonStyles";

export type ButtonProps = ComponentPropsWithRef<"button"> & ButtonStyleProps & {
  isLoading?: boolean;
  loadingText?: ReactNode;
};

export default function Button({
  type = "button",
  variant,
  size,
  fullWidth,
  className,
  disabled,
  isLoading = false,
  loadingText,
  children,
  "aria-busy": ariaBusy,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || ariaBusy}
      className={buttonStyles({ variant, size, fullWidth, className })}
    >
      {isLoading && (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
        />
      )}
      {isLoading && loadingText !== undefined ? loadingText : children}
    </button>
  );
}
