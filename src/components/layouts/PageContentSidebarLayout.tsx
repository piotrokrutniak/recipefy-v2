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
        "flex flex-1 gap-8 lg:gap-16 mx-auto w-full min-h-screen py-4 sm:py-8 px-3 max-w-7xl",
        "md:flex-row flex-col",
        className
      )}
    >
      {children}
    </section>
  );
};
