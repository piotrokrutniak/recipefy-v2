import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";

interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

export const LinkButton = ({
  variant,
  size,
  href,
  children,
}: LinkButtonProps) => (
  <Link href={href} className={buttonVariants({ variant, size })}>
    {children}
  </Link>
);
