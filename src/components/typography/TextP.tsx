import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const TextP = ({
  children,
  noLeading,
  ...rest
}: { children?: React.ReactNode; noLeading?: boolean } & DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p
      {...rest}
      className={clsx([
        "leading-7",
        !noLeading && "[&:not(:first-child)]:mt-6",
        rest.className,
      ])}
    >
      {children}
    </p>
  );
};
