import { cn } from "@/lib/utils";

export const OutlineContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "outline outline-2 outline-slate-200 rounded-sm p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};
