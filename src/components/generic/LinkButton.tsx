import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  className?: string;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant, size, href, children, className, ...props }, ref) => (
    <Link
      ref={ref}
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  )
);

// Add display name for better debugging
LinkButton.displayName = "LinkButton";
