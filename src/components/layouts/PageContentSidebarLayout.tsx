import { AppBreadcrumbs } from "@/components/molecules/AppBreadcrumbs";
import { cn } from "@/lib/utils";

type BreadcrumbSegment = {
  label: string;
  href?: string;
};

export const PageContentSidebarLayout = ({
  children,
  className,
  breadcrumbs,
}: {
  children: React.ReactNode;
  className?: string;
  breadcrumbs?: BreadcrumbSegment[];
}) => {
  return (
    <section
      className={cn(
        "flex flex-1 lg:gap-2 mx-auto w-full min-h-screen py-4 sm:py-8 px-3 max-w-7xl",
        breadcrumbs ? "flex-col" : "md:flex-row flex-col",
        className,
      )}
    >
      {breadcrumbs && (
        <>
          <AppBreadcrumbs items={breadcrumbs} />
          <div
            className={cn("flex flex-1 gap-8 lg:gap-16 md:flex-row flex-col")}
          >
            {children}
          </div>
        </>
      )}
      {!breadcrumbs && children}
    </section>
  );
};
