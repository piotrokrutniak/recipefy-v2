import { cn } from "@/lib/utils";

export const PageContentSidebarLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "flex flex-1 gap-16 mx-auto w-full min-h-screen py-8 px-3 max-w-7xl",
        className
      )}
    >
      {children}
    </section>
  );
};
