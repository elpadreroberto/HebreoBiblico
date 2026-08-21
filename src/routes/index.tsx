import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Keyboard, Layers } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { alefatoNiveles, itemsDeNivel } from "@/data/alefato";
import { vocabGroups } from "@/data/vocabulario";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const fichas = alefatoNiveles.reduce((n, nivel) => n + itemsDeNivel(nivel).length, 0);
  const palabras = vocabGroups.reduce((n, g) => n + g.cards.length, 0);

  return (
    <AppShell current="home">
      <main>
        <section className="relative overflow-hidden">
          <div className="hero-watermark" aria-hidden="true">
            <span className="top-6 right-[8%] text-[9rem] sm:text-[14rem]">א</span>
            <span className="bottom-0 left-[6%] text-[8rem] sm:text-[12rem]">ת</span>
          </div>
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
            <p className="inline-flex items-center rounded-full border border-border bg-raised/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Acceso libre · sin registro
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-subtle">
              Lectura del Tanaj en su lengua
            </p>
            <h1
              dir="rtl"
              lang="he"
              className="mt-5 font-hebrew text-[4.4rem] leading-none text-accent sm:text-[6.5rem]"
            >
              עִבְרִית
            </h1>
            <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Hebreo Bíblico
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Dos talleres en una sola página: el alefato con gramática, y el vocabulario
              de alta frecuencia que cubre casi todo el texto sagrado. Abierto para cualquiera.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/alefato">
                  Empezar por el alefato
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/vocabulario">Ir al vocabulario</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 sm:px-6 lg:grid-cols-2">
          <StudioCard
            to="/alefato"
            kicker="Taller 1"
            hebrew="אָלֶף־בֵּית"
            title="Alefato y gramática"
            body="Vocales, 22 letras, formas sofit, luego sustantivos, verbos, adjetivos y conectores. Estudia o examínate por partes, con versículo y dato de frecuencia."
            meta={`${fichas} fichas · 5 niveles`}
          />
          <StudioCard
            to="/vocabulario"
            kicker="Taller 2"
            hebrew="מִלִּים"
            title="Vocabulario del texto"
            body="Once grupos ordenados por frecuencia. Voltea cada ficha, examínate y practica frases. El último grupo cubre el 97,5% de las palabras del Tanaj."
            meta={`${palabras} palabras · 11 grupos`}
          />
        </section>

        <section className="border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6">
            <Step
              icon={<Layers className="size-5" />}
              title="De la letra al versículo"
              body="Cada ficha muestra el hebreo, la pronunciación y un versículo real donde aparece."
            />
            <Step
              icon={<BookOpen className="size-5" />}
              title="Estudiar o examinar"
              body="Lee con calma o ponte a prueba con cuatro opciones. El teclado funciona: flechas y teclas 1 a 4."
            />
            <Step
              icon={<Keyboard className="size-5" />}
              title="Hecho para leerse"
              body="Tipografías hebreas, contraste alto, rumbo RTL y atajos. El progreso se guarda en este dispositivo, sin cuenta."
            />
          </div>
        </section>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-center text-sm text-subtle sm:px-6">
            <p>Página pública: cualquiera puede usarla desde ahora.</p>
            <p dir="rtl" lang="he" className="font-hebrew text-accent">
              בְּרֵאשִׁית בָּרָא אֱלֹהִים
            </p>
          </div>
        </footer>
      </main>
    </AppShell>
  );
}

function StudioCard({
  to,
  kicker,
  hebrew,
  title,
  body,
  meta,
}: {
  to: "/alefato" | "/vocabulario";
  kicker: string;
  hebrew: string;
  title: string;
  body: string;
  meta: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-xl bg-surface/90 p-6 no-underline shadow-[0_0_0_1px_var(--color-border)] transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(0_0_0_/_0.28),0_0_0_1px_color-mix(in_oklab,var(--color-accent)_50%,transparent)] sm:p-8"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">{kicker}</p>
        <span dir="rtl" lang="he" className="font-hebrew text-2xl text-accent">
          {hebrew}
        </span>
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold text-fg">{title}</h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="tabular-nums text-subtle">{meta}</span>
        <span className="inline-flex items-center gap-1 font-medium text-accent">
          Abrir
          <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function Step({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="mb-3 grid size-10 place-items-center rounded-lg bg-raised text-accent shadow-[0_0_0_1px_var(--color-border)]">
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
