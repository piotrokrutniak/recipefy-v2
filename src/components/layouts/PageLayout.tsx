export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 flex-col w-full min-h-screen pt-14">{children}</main>
  );
};