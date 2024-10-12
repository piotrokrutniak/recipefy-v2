import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const TextLarge = ({
  children,
  ...rest
}: { children: React.ReactNode } & DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p {...rest} className={clsx(["text-lg font-semibold", rest.className])}>
      {children}
    </p>
  );
};
