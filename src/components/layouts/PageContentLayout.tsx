export const PageContentLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col flex-1 w-full items-center">
      <section className="flex flex-1 w-full border max-w-7xl">{children}</section>
    </div>
  );
};