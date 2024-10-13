import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const TextP = ({
  children,
  ...rest
}: { children: React.ReactNode } & DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p
      {...rest}
      className={clsx(["leading-7 [&:not(:first-child)]:mt-6", rest.className])}
    >
      {children}
    </p>
  );
};
