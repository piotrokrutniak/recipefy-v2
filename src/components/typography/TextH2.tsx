import clsx from "clsx";

export const TextH2 = ({ children, withUnderline }: { children: React.ReactNode, withUnderline?: boolean }) => {
  return (
    <h2 className={clsx(["scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0", withUnderline && "border-b pb-2"])}>
      {children}
    </h2>
  );
};
