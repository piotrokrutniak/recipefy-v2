import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const TextMedium = ({
  children,
  ...rest
}: { children: React.ReactNode } & DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p
      {...rest}
      className={clsx(["text-base leading-6 font-medium", rest.className])}
    >
      {children}
    </p>
  );
};
