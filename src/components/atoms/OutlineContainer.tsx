import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const OutlineContainer = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "outline outline-1 outline-slate-200 rounded-sm p-4 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
