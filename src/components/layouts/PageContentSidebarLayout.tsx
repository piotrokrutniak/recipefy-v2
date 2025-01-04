export const PageContentSidebarLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="flex flex-1 gap-16 mx-auto w-full min-h-screen pt-16 px-3 max-w-7xl">
      {children}
    </section>
  );
};
