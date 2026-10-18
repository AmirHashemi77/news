import Link from "next/link";
import type { ComponentPropsWithRef } from "react";
import { buttonStyles, type ButtonStyleProps } from "./buttonStyles";

export type ButtonLinkProps = ComponentPropsWithRef<typeof Link> & ButtonStyleProps;

export default function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link {...props} className={buttonStyles({ variant, size, fullWidth, className })} />;
}
