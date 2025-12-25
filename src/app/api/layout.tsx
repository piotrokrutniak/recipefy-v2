// This layout prevents the root layout from wrapping API routes
export default function ApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
