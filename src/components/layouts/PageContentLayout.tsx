import clsx from "clsx";

const sizes = {
  full: "w-full",
  lg: "w-full max-w-7xl",
};

export const PageContentLayout = ({
  children,
  className,
  size = "lg",
}: {
  children?: React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
}) => {
  return (
    <div
      className={clsx([
        "relative gap-8 flex flex-col flex-1 items-center",
        className,
        sizes[size],
      ])}
    >
      {children}
    </div>
  );
};
