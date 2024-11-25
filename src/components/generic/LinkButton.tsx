import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";

interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  className?: string;
}

export const LinkButton = ({
  variant,
  size,
  href,
  children,
  className,
}: LinkButtonProps) => (
  <Link
    href={href}
    className={cn(buttonVariants({ variant, size }), className)}
  >
    {children}
  </Link>
);
