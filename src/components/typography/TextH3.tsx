import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const TextH3 = ({
  children,
  ...rest
}: { children: React.ReactNode } & DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <h3
      {...rest}
      className={clsx([
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        rest.className,
      ])}
    >
      {children}
    </h3>
  );
};
