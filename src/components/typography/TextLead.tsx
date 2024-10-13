import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const TextLead = ({
  children,
  ...rest
}: { children: React.ReactNode } & DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p
      {...rest}
      className={clsx(["text-xl text-muted-foreground"], rest.className)}
    >
      {children}
    </p>
  );
};
