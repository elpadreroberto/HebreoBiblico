import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HebrewWord({
  children,
  className,
  size = "md",
  face = "classic",
}: {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
  face?: "classic" | "serif" | "bold";
}) {
  const raw = typeof children === "string" ? children : "";
  const compact = [...raw].length <= 4;
  return (
    <span
      dir="rtl"
      lang="he"
      className={cn(
        face === "serif" ? "hebrew-serif" : face === "bold" ? "hebrew-bold" : "hebrew-classic",
        size === "lg" ? "size-he-lg" : "size-he-md",
        "inline-block max-w-full text-fg",
        compact && "whitespace-nowrap",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function HebrewVerse({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <p
      dir="rtl"
      lang="he"
      className={cn("font-hebrew leading-relaxed text-fg", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
