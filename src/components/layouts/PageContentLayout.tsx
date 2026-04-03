import { AppBreadcrumbs } from "@/components/molecules/AppBreadcrumbs";
import clsx from "clsx";

const sizes = {
  full: "w-full",
  lg: "w-full max-w-7xl",
};

type BreadcrumbSegment = {
  label: string;
  href?: string;
};

export const PageContentLayout = ({
  children,
  className,
  size = "lg",
  breadcrumbs,
}: {
  children?: React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
  breadcrumbs?: BreadcrumbSegment[];
}) => {
  return (
    <div
      className={clsx([
        "relative gap-8 flex flex-col flex-1 items-start py-4 md:py-8",
        className,
        sizes[size],
      ])}
    >
      {breadcrumbs && <AppBreadcrumbs items={breadcrumbs} className="self-start" />}
      {children}
    </div>
  );
};
