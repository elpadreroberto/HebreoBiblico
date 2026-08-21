import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { splitColoredHebrew } from "@/lib/hebrew-vowels";

export function HebrewWord({
  children,
  className,
  size = "md",
  face = "classic",
  highlightVowels = false,
}: {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
  face?: "classic" | "serif" | "bold";
  highlightVowels?: boolean;
}) {
  const raw = typeof children === "string" ? children : "";
  const compact = [...raw].length <= 6;
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
      {highlightVowels && raw ? <NiqqudColor text={raw} /> : children}
    </span>
  );
}

export function NiqqudColor({ text }: { text: string }) {
  return (
    <>
      {splitColoredHebrew(text).map((part, i) => (
        <span key={`${part.ch}-${i}`} className={part.vowel ? "niqqud-vowel" : "he-consonant"}>
          {part.ch}
        </span>
      ))}
    </>
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
