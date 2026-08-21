import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Shuffle, X } from "lucide-react";
import { allMeanings, conversationPhrases, vocabGroups } from "@/data/vocabulario";
import type { Phrase, VocabCard } from "@/data/types";
import { recordScore } from "@/lib/progress";
import { cn, shuffle } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type QuizItem = VocabCard | (Phrase & { t?: string; v?: string; hv?: string; c?: string });

export function VocabStudio({
  embedded = false,
  groupIndex,
  onGroupIndexChange,
}: {
  embedded?: boolean;
  groupIndex?: number;
  onGroupIndexChange?: (index: number) => void;
}) {
  const [localIdx, setLocalIdx] = useState(groupIndex ?? 0);
  const idx = groupIndex ?? localIdx;

  function setIdx(n: number) {
    const next = Math.max(0, Math.min(vocabGroups.length - 1, n));
    if (onGroupIndexChange) onGroupIndexChange(next);
    else setLocalIdx(next);
  }

  const [order, setOrder] = useState<VocabCard[]>(() => vocabGroups[idx].cards);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [examOpen, setExamOpen] = useState(false);

  const group = vocabGroups[idx];

  useEffect(() => {
    setOrder(group.cards);
    setFlipped({});
  }, [group]);

  function mix() {
    setOrder(shuffle(group.cards));
    setFlipped({});
  }

  return (
    <div className={cn("flex w-full flex-col gap-6", !embedded && "mx-auto max-w-6xl px-4 py-6 sm:px-6")}>
      {!embedded && (
        <header className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
            Grupo {group.id} de {vocabGroups.length}
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {group.name}
          </h1>
          <p className="rounded-full bg-raised px-3 py-1 text-sm font-semibold tabular-nums text-accent shadow-[0_0_0_1px_var(--color-border)]">
            {group.percent.toFixed(1)}% del texto bíblico
          </p>
        </header>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="secondary" onClick={() => setIdx(idx - 1)} disabled={idx === 0} aria-label="Grupo anterior">
          <ChevronLeft />
          Anterior
        </Button>
        <Button variant="secondary" onClick={mix}>
          <Shuffle />
          Mezclar
        </Button>
        <Button variant="teal" onClick={() => setExamOpen(true)}>
          Examen
        </Button>
        <Button
          variant="secondary"
          onClick={() => setIdx(idx + 1)}
          disabled={idx === vocabGroups.length - 1}
          aria-label="Grupo siguiente"
        >
          Siguiente
          <ChevronRight />
        </Button>
      </div>

      {!embedded && (
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Grupos">
          {vocabGroups.map((g, i) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={i === idx}
              onClick={() => setIdx(i)}
              className={cn(
                "h-9 min-w-9 rounded-md px-2 text-xs font-bold tabular-nums transition-colors duration-150",
                i === idx ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
              )}
              title={g.name}
            >
              {g.id}
            </button>
          ))}
        </div>
      )}

      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {order.map((card, i) => (
          <li key={`${card.h}-${i}`} className="h-[360px] min-w-0">
            <FlipCard
              card={card}
              flipped={!!flipped[i]}
              onToggle={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
            />
          </li>
        ))}
      </ul>

      {examOpen && <ExamOverlay groupIdx={idx} onClose={() => setExamOpen(false)} />}
    </div>
  );
}

function FlipCard({
  card,
  flipped,
  onToggle,
}: {
  card: VocabCard;
  flipped: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={flipped}
      className={cn("flip-card h-full w-full min-w-0 overflow-hidden text-left", flipped && "is-flipped")}
    >
      <span className="sr-only">
        {flipped
          ? `${card.t}: ${card.m}. ${card.v} ${card.c}`
          : `Hebreo ${card.h}. Pulsa para ver el significado.`}
      </span>
      <div className="flip-inner">
        <div className="flip-face rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-border)]">
          <div className="flex h-full min-w-0 flex-col items-center justify-center overflow-hidden px-5 py-6 text-center">
            <span dir="rtl" lang="he" className="font-hebrew text-7xl leading-none whitespace-nowrap text-accent sm:text-8xl">
              {card.h}
            </span>
            <span
              dir="rtl"
              lang="he"
              className="mt-4 line-clamp-3 w-full max-w-[18rem] font-hebrew text-base leading-snug break-words text-muted"
            >
              {card.hv}
            </span>
            <span className="mt-2 text-xs font-semibold tracking-wide text-teal">{card.c}</span>
          </div>
        </div>
        <div className="flip-back flip-face rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-border)]">
          <div className="flex h-full min-w-0 flex-col items-center justify-center overflow-hidden px-5 py-6 text-center">
            <span className="text-xl font-semibold text-accent">{card.t}</span>
            <span className="mt-2 font-display text-2xl font-semibold text-fg">{card.m}</span>
            <span className="mt-4 line-clamp-4 w-full max-w-prose border-t border-border pt-4 text-sm italic leading-relaxed text-muted">
              {card.v}
              <span className="mt-2 block not-italic font-semibold text-teal">{card.c}</span>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function ExamOverlay({
  groupIdx,
  onClose,
}: {
  groupIdx: number;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"ask" | "done">("ask");
  const [conversation, setConversation] = useState(false);
  const [queue, setQueue] = useState<QuizItem[]>(() => shuffle(vocabGroups[groupIdx].cards));
  const [pos, setPos] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<QuizItem[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const current = queue[pos];
  const meanings = useMemo(() => allMeanings(), []);

  const options = useMemo(() => {
    if (!current || phase !== "ask") return [];
    const correct = current.m;
    const pool = conversation
      ? conversationPhrases.filter((p) => p.level <= groupIdx).map((p) => p.m)
      : meanings;
    const opts = [correct];
    const shuffledPool = shuffle(pool.filter((m) => m !== correct));
    for (const m of shuffledPool) {
      if (opts.length >= 4) break;
      opts.push(m);
    }
    return shuffle(opts);
  }, [current, phase, conversation, groupIdx, meanings]);

  useEffect(() => {
    dialogRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (phase === "ask" && !picked) {
        const n = Number(e.key);
        if (n >= 1 && n <= 4 && options[n - 1]) choose(options[n - 1]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, picked, options]);

  function choose(answer: string) {
    if (!current || picked) return;
    const ok = answer === current.m;
    setPicked(answer);
    const nextScore = score + (ok ? 1 : 0);
    const nextMistakes = ok ? mistakes : [...mistakes, current];
    if (ok) setScore(nextScore);
    else setMistakes(nextMistakes);

    window.setTimeout(() => {
      const nextPos = pos + 1;
      if (nextPos >= queue.length) {
        recordScore(
          "vocab",
          conversation ? `conv-${groupIdx}` : String(groupIdx + 1),
          nextScore / queue.length,
        );
        setPhase("done");
      } else {
        setPos(nextPos);
        setPicked(null);
      }
    }, ok ? 350 : 900);
  }

  function startConversation() {
    const available = shuffle(conversationPhrases.filter((p) => p.level <= groupIdx)).slice(0, 10);
    setQueue(available);
    setPos(0);
    setScore(0);
    setMistakes([]);
    setPicked(null);
    setConversation(true);
    setPhase("ask");
  }

  function review() {
    if (!mistakes.length) return;
    setQueue(shuffle(mistakes));
    setPos(0);
    setScore(0);
    setMistakes([]);
    setPicked(null);
    setPhase("ask");
  }

  const pct = queue.length ? Math.round((score / queue.length) * 100) : 0;
  const dominated = conversation
    ? pct
    : ((score / queue.length) * vocabGroups[groupIdx].percent).toFixed(1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exam-title"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div className="w-full max-w-lg rounded-xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)] sm:p-8">
        {phase === "ask" && current && (
          <>
            <p id="exam-title" className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
              {conversation
                ? `Conversación · niveles 1–${groupIdx + 1}`
                : `Pregunta ${pos + 1} de ${queue.length}`}
            </p>
            <p
              dir="rtl"
              lang="he"
              className="my-6 text-center font-hebrew text-6xl leading-tight text-accent sm:text-7xl"
            >
              {"h" in current ? current.h : ""}
            </p>
            <div className="grid gap-2">
              {options.map((o, i) => {
                const isCorrect = o === current.m;
                const show = picked !== null;
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => choose(o)}
                    className={cn(
                      "min-h-12 rounded-lg bg-raised px-4 py-3 text-left text-base font-medium shadow-[0_0_0_1px_var(--color-border)] transition-colors duration-150 hover:bg-bg",
                      show && isCorrect && "bg-ok text-accent-fg shadow-none",
                      show && picked === o && !isCorrect && "bg-danger text-fg shadow-none",
                    )}
                  >
                    <span className="mr-2 inline-grid size-6 place-items-center rounded bg-surface text-xs text-muted">
                      {i + 1}
                    </span>
                    {o}
                  </button>
                );
              })}
            </div>
            <Button variant="ghost" className="mt-6 w-full" onClick={onClose}>
              <X />
              Cancelar
            </Button>
          </>
        )}

        {phase === "done" && (
          <div className="text-center">
            <h2 id="exam-title" className="font-display text-2xl font-semibold">
              Examen terminado
            </h2>
            <p className="mt-4 font-display text-5xl font-semibold tabular-nums text-accent">
              {score}/{queue.length}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {conversation ? (
                <>
                  Acertaste el <strong className="text-fg">{pct}%</strong> de las frases.
                </>
              ) : (
                <>
                  Acertaste el <strong className="text-fg">{pct}%</strong> de este grupo. Ahora cubres
                  aproximadamente <strong className="text-teal">{dominated}%</strong> del texto bíblico
                  (sobre el {vocabGroups[groupIdx].percent}% de este nivel).
                </>
              )}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {mistakes.length > 0 && (
                <Button variant="danger" onClick={review}>
                  Repasar errores
                </Button>
              )}
              <Button variant="teal" onClick={startConversation}>
                <MessageCircle />
                Conversar
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Seguir estudiando
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
