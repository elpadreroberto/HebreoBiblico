import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Type,
  ZoomIn,
} from "lucide-react";
import {
  alefatoNiveles,
  extraInfo,
  partesDeNivel,
  type Parte,
} from "@/data/alefato";
import { buildPath } from "@/data/path";
import type { FlashItem } from "@/data/types";
import {
  applyVowelToHost,
  detectVowelKind,
  isVowelItem,
  pickHost,
} from "@/lib/hebrew-vowels";
import { recordScore } from "@/lib/progress";
import { cn, shuffle } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HebrewVerse, HebrewWord } from "@/components/hebrew-verse";
import { VocabStudio } from "@/components/vocab-studio";

type Modo = "enseñar" | "examinar";
type Face = "classic" | "serif" | "bold";

export function AlefatoStudio({ initialPathLevel = 1 }: { initialPathLevel?: number }) {
  const path = useMemo(() => buildPath(), []);
  const [pathLevel, setPathLevel] = useState(initialPathLevel);
  const current = path[Math.min(Math.max(pathLevel, 1), path.length) - 1];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
      <LevelRail path={path} pathLevel={current.id} onChange={setPathLevel} />
      {current.kind === "vocab" ? (
        <VocabStudio
          embedded
          groupIndex={current.vocabIndex ?? 0}
          onGroupIndexChange={(i) => setPathLevel(6 + i)}
        />
      ) : (
        <AlefatoBoard
          nivelId={current.alefatoId ?? 1}
          onAdvancePath={() => setPathLevel((n) => Math.min(path.length, n + 1))}
          haySiguienteNivel={current.id < path.length}
        />
      )}
    </div>
  );
}

function LevelRail({
  path,
  pathLevel,
  onChange,
}: {
  path: ReturnType<typeof buildPath>;
  pathLevel: number;
  onChange: (id: number) => void;
}) {
  const current = path[pathLevel - 1];
  return (
    <header className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
            Nivel {current.id} de {path.length}
            {current.kind === "vocab" ? " · vocabulario" : " · alefato"}
          </p>
          <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {current.title}
          </h1>
        </div>
        <p className="max-w-sm text-sm text-muted sm:text-right">{current.summary}</p>
      </div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Niveles">
        {path.map((n) => (
          <button
            key={n.id}
            type="button"
            title={n.title}
            aria-pressed={n.id === pathLevel}
            onClick={() => onChange(n.id)}
            className={cn(
              "h-10 min-w-10 rounded-md px-2.5 text-sm font-semibold transition-colors duration-150",
              n.id === pathLevel
                ? n.kind === "vocab"
                  ? "bg-teal text-teal-fg"
                  : "bg-accent text-accent-fg"
                : n.kind === "vocab"
                  ? "bg-raised text-teal hover:text-fg"
                  : "bg-raised text-muted hover:text-fg",
            )}
          >
            {n.id}
          </button>
        ))}
      </div>
    </header>
  );
}

function AlefatoBoard({
  nivelId,
  onAdvancePath,
  haySiguienteNivel,
}: {
  nivelId: number;
  onAdvancePath: () => void;
  haySiguienteNivel: boolean;
}) {
  const [parteId, setParteId] = useState("1");
  const [modo, setModo] = useState<Modo>("enseñar");
  const [indice, setIndice] = useState(0);
  const [items, setItems] = useState<FlashItem[]>([]);
  const [aciertos, setAciertos] = useState(0);
  const [face, setFace] = useState<Face>("classic");
  const [large, setLarge] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [opciones, setOpciones] = useState<FlashItem[]>([]);
  const [host, setHost] = useState(() => pickHost());
  const liveRef = useRef<HTMLDivElement>(null);

  const nivel = alefatoNiveles[nivelId - 1];
  const partes = useMemo(() => partesDeNivel(nivel), [nivel]);
  const parte: Parte = partes.find((p) => p.id === parteId) ?? partes[0];

  const cargar = useCallback((p: Parte, m: Modo) => {
    const next = m === "enseñar" ? p.items : shuffle(p.items);
    setItems(next);
    setIndice(0);
    setAciertos(0);
    setAnswered(false);
    setPicked(null);
  }, []);

  useEffect(() => {
    setParteId("1");
  }, [nivelId]);

  useEffect(() => {
    cargar(parte, modo);
  }, [parte, modo, cargar]);

  const item = items[indice];
  const examDone = modo === "examinar" && indice >= items.length && items.length > 0;
  const vowel = item ? isVowelItem(item) : false;
  const vowelKind = item && vowel ? detectVowelKind(item) : null;
  const displayHe =
    item && vowel && vowelKind ? applyVowelToHost(host.he, vowelKind) : item?.he ?? "";

  useEffect(() => {
    if (item && isVowelItem(item)) {
      setHost((prev) => pickHost(prev.he));
    }
  }, [item?.id, indice, parte.id, modo]);

  useEffect(() => {
    if (modo !== "examinar" || !item || examDone) return;
    const pool = extraerPool(nivelId);
    let distractores = shuffle(pool.filter((x) => x.es !== item.es)).slice(0, 3);
    while (distractores.length < 3 && pool.length > 1) {
      const extra = pool[Math.floor(Math.random() * pool.length)];
      if (extra && extra.es !== item.es && !distractores.some((d) => d.es === extra.es)) {
        distractores.push(extra);
      } else break;
    }
    setOpciones(shuffle([item, ...distractores]));
    setAnswered(false);
    setPicked(null);
  }, [item, modo, examDone, nivelId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (modo === "enseñar") {
        if (e.key === "ArrowRight") navegar(1);
        if (e.key === "ArrowLeft") navegar(-1);
      } else if (!examDone && !answered) {
        const n = Number(e.key);
        if (n >= 1 && n <= 4) {
          const opt = opciones[n - 1];
          if (opt && item) responder(opt.es === item.es, opt);
        }
      } else if (examDone) {
        if (e.key === "ArrowRight") siguienteParte();
        if (e.key === "ArrowLeft") cargar(parte, "examinar");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modo, examDone, answered, opciones, item, parte, indice, items]);

  function navegar(dir: number) {
    if (modo !== "enseñar") return;
    const next = indice + dir;
    if (next >= 0 && next < items.length) {
      setIndice(next);
      return;
    }
    const idx = partes.findIndex((p) => p.id === parte.id);
    if (dir < 0 && idx > 0) {
      setParteId(partes[idx - 1].id);
    } else if (dir > 0 && idx < partes.length - 1) {
      setParteId(partes[idx + 1].id);
    } else if (dir > 0 && haySiguienteNivel) {
      onAdvancePath();
    }
  }

  function siguienteParte() {
    const idx = partes.findIndex((p) => p.id === parte.id);
    if (idx < partes.length - 1) setParteId(partes[idx + 1].id);
    else if (haySiguienteNivel) onAdvancePath();
  }

  function responder(ok: boolean, opt: FlashItem) {
    if (answered || !item) return;
    setAnswered(true);
    setPicked(opt.es);
    const nextHits = aciertos + (ok ? 1 : 0);
    if (ok) setAciertos(nextHits);
    if (liveRef.current) {
      liveRef.current.textContent = ok ? "Correcto" : `Incorrecto. Era ${item.es}`;
    }
    window.setTimeout(
      () => {
        const nextIdx = indice + 1;
        if (nextIdx >= items.length) {
          recordScore("alefato", `${nivelId}-${parte.id}`, nextHits / items.length);
        }
        setIndice(nextIdx);
        setAnswered(false);
      },
      ok ? 450 : 1400,
    );
  }

  const extra = item ? extraInfo(item, nivelId) : null;
  const hayOtraParte = partes.findIndex((p) => p.id === parte.id) < partes.length - 1;

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div role="tablist" aria-label="Modo" className="flex rounded-lg bg-raised p-1">
            {(["enseñar", "examinar"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={modo === m}
                className={cn(
                  "h-10 flex-1 rounded-md px-4 text-sm font-semibold capitalize transition-colors duration-150 sm:flex-none",
                  modo === m ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
                )}
                onClick={() => setModo(m)}
              >
                {m === "enseñar" ? "Estudiar" : "Examinar"}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={() =>
                setFace((f) => (f === "classic" ? "serif" : f === "serif" ? "bold" : "classic"))
              }
              title="Cambiar tipografía hebrea"
              aria-label="Cambiar tipografía hebrea"
            >
              <Type />
            </Button>
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={() => setLarge((v) => !v)}
              title="Cambiar tamaño"
              aria-label={large ? "Tamaño normal" : "Tamaño grande"}
            >
              <ZoomIn />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
            Partes de este nivel
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {modo === "enseñar" && (
              <Button variant="teal" size="sm" onClick={() => navegar(-1)} aria-label="Ficha anterior">
                <ChevronLeft />
                <span className="hidden sm:inline">Ant</span>
              </Button>
            )}
            {partes.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={p.id === parte.id}
                onClick={() => setParteId(p.id)}
                className={cn(
                  "h-9 min-w-9 rounded-md px-2.5 text-xs font-bold transition-colors duration-150",
                  p.id === parte.id
                    ? p.isGlobal
                      ? "bg-accent text-accent-fg"
                      : "bg-teal text-teal-fg"
                    : p.isGlobal
                      ? "bg-raised text-accent"
                      : "bg-raised text-muted hover:text-fg",
                )}
              >
                {p.label}
              </button>
            ))}
            {modo === "enseñar" && (
              <Button variant="teal" size="sm" onClick={() => navegar(1)} aria-label="Ficha siguiente">
                <span className="hidden sm:inline">Sig</span>
                <ChevronRight />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)]">
        <section aria-label="Ficha" className="flex flex-col gap-4">
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl bg-surface px-5 py-8 text-center shadow-[0_0_0_1px_var(--color-border)] sm:min-h-[380px]">
            {examDone ? (
              <Resultado
                aciertos={aciertos}
                total={items.length}
                onRepetir={() => cargar(parte, "examinar")}
                onSiguiente={siguienteParte}
                haySiguiente={hayOtraParte || haySiguienteNivel}
              />
            ) : item ? (
              <article key={`${parte.id}-${indice}-${modo}-${host.he}`} className="fade-swap w-full">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
                  {modo === "enseñar"
                    ? `Ficha ${indice + 1} de ${items.length}`
                    : "¿Qué significa o cómo se lee?"}
                </p>
                <HebrewWord size={large ? "lg" : "md"} face={face} highlightVowels={vowel}>
                  {displayHe}
                </HebrewWord>
                {vowel && modo === "enseñar" && (
                  <p className="mt-3 text-sm text-muted">
                    Vocal en <span className="font-semibold text-vowel">color</span>
                    {" · "}sobre <span dir="rtl" lang="he" className="font-hebrew">{host.he}</span>{" "}
                    ({host.name})
                  </p>
                )}
                {modo === "enseñar" && <Detalle item={item} />}
              </article>
            ) : null}
          </div>

          {modo === "examinar" && !examDone && item && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-label="Opciones">
              {opciones.map((o, i) => {
                const isCorrect = o.es === item.es;
                const show = answered;
                return (
                  <button
                    key={`${o.es}-${i}`}
                    type="button"
                    disabled={answered}
                    onClick={() => responder(isCorrect, o)}
                    className={cn(
                      "flex min-h-14 items-center rounded-lg bg-raised px-3 py-3 text-left text-base font-medium shadow-[0_0_0_1px_var(--color-border)] transition-colors duration-150 hover:bg-surface disabled:opacity-100",
                      show && isCorrect && "bg-ok text-accent-fg shadow-none",
                      show && picked === o.es && !isCorrect && "bg-danger text-fg shadow-none",
                      show && picked !== o.es && !isCorrect && "opacity-45",
                    )}
                  >
                    <span className="mr-3 grid size-7 shrink-0 place-items-center rounded-md bg-surface text-xs text-muted">
                      {i + 1}
                    </span>
                    <span>
                      {o.es}
                      {nivelId === 1 && (
                        <span className="ml-2 text-sm font-normal text-muted">({o.son})</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div ref={liveRef} className="min-h-6 text-center text-sm font-semibold" aria-live="polite" />
          {modo === "examinar" && !examDone && (
            <p className="text-center text-sm tabular-nums text-muted">
              Pregunta {Math.min(indice + 1, items.length)} de {items.length}
            </p>
          )}
        </section>

        <aside className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2 border-b border-border pb-3">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <BookOpen className="size-5 text-accent" aria-hidden="true" />
              Datos
            </h2>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setInfoOpen((v) => !v)}
              aria-expanded={infoOpen}
              aria-label={infoOpen ? "Ocultar panel" : "Mostrar panel"}
            >
              {infoOpen ? <Minimize2 /> : <Maximize2 />}
            </Button>
          </div>
          {infoOpen && extra && (
            <div className="flex flex-col gap-3">
              <InfoBlock titulo="Impacto del nivel" tone="teal" body={extra.motivacion} />
              <InfoBlock titulo="Frecuencia y uso" tone="accent" body={extra.stat} />
              <InfoBlock titulo="Dato único" tone="muted" body={extra.cur} />
            </div>
          )}
        </aside>
      </div>

      <p className="text-center text-xs text-subtle">
        Teclado: flechas para avanzar · 1–4 para responder en examen
      </p>
    </>
  );
}

function extraerPool(nivelId: number): FlashItem[] {
  const n = alefatoNiveles[nivelId - 1];
  if (n.partes) return n.partes.flatMap((p) => p.items);
  return n.items ?? [];
}

function Detalle({ item }: { item: FlashItem }) {
  return (
    <div className="mx-auto mt-6 w-full max-w-xl rounded-lg bg-raised px-4 py-4 text-left shadow-[0_0_0_1px_var(--color-border)]">
      <p className="font-display text-lg font-semibold text-teal">{item.es}</p>
      <p className="mt-1 text-sm text-fg">
        Pronunciación: <strong>{item.son}</strong>
      </p>
      <p className="text-sm text-muted">
        Transliteración: <em>{item.tr}</em>
      </p>
      {item.tipo && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-accent">{item.tipo}</p>
      )}
      {item.uso && <p className="mt-1 text-sm italic text-muted">{item.uso}</p>}
      {item.cita && (
        <div className="mt-3 border-t border-border pt-3">
          <HebrewVerse html={item.cita} className="text-3xl" />
          {item.citaTr && <p className="mt-2 text-sm italic text-accent">{item.citaTr}</p>}
          {item.citaEs && <p className="text-sm text-muted">{item.citaEs}</p>}
        </div>
      )}
    </div>
  );
}

function InfoBlock({
  titulo,
  body,
  tone,
}: {
  titulo: string;
  body: string;
  tone: "teal" | "accent" | "muted";
}) {
  const color =
    tone === "teal" ? "text-teal" : tone === "accent" ? "text-accent" : "text-muted";
  return (
    <div className="rounded-lg bg-raised p-3">
      <h3 className={cn("mb-1 text-xs font-semibold uppercase tracking-wider", color)}>{titulo}</h3>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function Resultado({
  aciertos,
  total,
  onRepetir,
  onSiguiente,
  haySiguiente,
}: {
  aciertos: number;
  total: number;
  onRepetir: () => void;
  onSiguiente: () => void;
  haySiguiente: boolean;
}) {
  const pct = total ? Math.round((aciertos / total) * 100) : 0;
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Parte completada</p>
      <p className="font-display text-4xl font-semibold tabular-nums text-teal">
        {aciertos}/{total}
      </p>
      <p className="text-muted">{pct}% de aciertos</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Button variant="secondary" onClick={onRepetir}>
          Repetir
        </Button>
        {haySiguiente && (
          <Button onClick={onSiguiente}>
            Siguiente
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
}
