import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AuthSlot } from "@/components/auth-slot";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/alefato", label: "Alefato" },
  { to: "/vocabulario", label: "Vocabulario" },
] as const;

export function AppShell({
  children,
  current,
}: {
  children: ReactNode;
  current: "home" | "alefato" | "vocabulario" | "login";
}) {
  return (
    <div className="min-h-dvh">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 text-fg no-underline">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-lg bg-raised font-hebrew text-lg text-accent shadow-[0_0_0_1px_var(--color-border)]"
            >
              א
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-semibold tracking-tight">
                Hebreo Bíblico
              </span>
              <span dir="rtl" lang="he" className="font-hebrew text-xs text-muted">
                עִבְרִית
              </span>
            </span>
          </Link>
          <nav aria-label="Principal" className="flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                (item.to === "/" && current === "home") ||
                (item.to === "/alefato" && current === "alefato") ||
                (item.to === "/vocabulario" && current === "vocabulario");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "hidden h-11 items-center rounded-md px-3 text-sm font-medium transition-colors duration-150 sm:inline-flex",
                    active ? "bg-raised text-fg" : "text-muted hover:bg-raised/70 hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <AuthSlot />
          </nav>
        </div>
        <div className="flex gap-1 border-t border-border px-2 py-1 sm:hidden" aria-label="Secciones">
          {NAV.map((item) => {
            const active =
              (item.to === "/" && current === "home") ||
              (item.to === "/alefato" && current === "alefato") ||
              (item.to === "/vocabulario" && current === "vocabulario");
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-10 flex-1 items-center justify-center rounded-md text-sm font-medium",
                  active ? "bg-raised text-fg" : "text-muted",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>
      <div id="contenido">{children}</div>
    </div>
  );
}
