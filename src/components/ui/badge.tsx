import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant,
  children,
}: {
  className?: string;
  variant?: "default" | "outline" | string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase shadow-border",
        variant === "outline"
          ? "border border-border bg-transparent text-muted"
          : "bg-elevated text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
