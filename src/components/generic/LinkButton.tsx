import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Link } from "@/i18n/navigation";
import { forwardRef, type ComponentProps } from "react";

interface LinkButtonProps
  extends ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {
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
