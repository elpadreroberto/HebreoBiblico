import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AuthSlot } from "@/components/auth-slot";

export function AppShell({
  children,
}: {
  children: ReactNode;
  current?: "study" | "login" | "home" | "alefato" | "vocabulario";
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
          <nav aria-label="Cuenta" className="flex items-center gap-1">
            <AuthSlot />
          </nav>
        </div>
      </header>
      <div id="contenido">{children}</div>
    </div>
  );
}
