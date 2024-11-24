import clsx from "clsx";

export const TextH2 = ({
  children,
  withUnderline,
  className,
}: {
  children: React.ReactNode;
  withUnderline?: boolean;
  className?: string;
}) => {
  return (
    <h2
      className={clsx([
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        withUnderline && "border-b pb-2",
        className,
      ])}
    >
      {children}
    </h2>
  );
};
