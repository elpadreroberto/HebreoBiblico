import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <AppShell current="login">
      <main className="mx-auto grid min-h-[70dvh] max-w-md place-items-center px-4 py-16">
        <div className="w-full rounded-xl bg-surface p-8 shadow-[0_0_0_1px_var(--color-border)]">
          <p dir="rtl" lang="he" className="text-center font-hebrew text-4xl text-accent">
            שָׁלוֹם
          </p>
          <h1 className="mt-4 text-center font-display text-2xl font-semibold">Entrar</h1>
          <p className="mt-2 mb-6 text-center text-sm text-muted">
            Guarda tu progreso en este dispositivo; la cuenta es opcional.
          </p>
          {authEnabled ? (
            <div className="flex flex-col gap-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                >
                  Continuar con {p.label}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted">El acceso está desactivado.</p>
          )}
          <p className="mt-6 text-center">
            <Link to="/" className="text-sm text-accent underline-offset-4 hover:underline">
              Volver al inicio
            </Link>
          </p>
        </div>
      </main>
    </AppShell>
  );
}
