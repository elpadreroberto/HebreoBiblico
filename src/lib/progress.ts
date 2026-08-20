const KEY = "hebreo-biblio-progress-v1";

export type Progress = {
  alefatoBest: Record<string, number>;
  vocabBest: Record<string, number>;
};

function empty(): Progress {
  return { alefatoBest: {}, vocabBest: {} };
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Progress;
    return {
      alefatoBest: parsed.alefatoBest ?? {},
      vocabBest: parsed.vocabBest ?? {},
    };
  } catch {
    return empty();
  }
}

export function saveProgress(next: Progress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function recordScore(kind: "alefato" | "vocab", id: string, ratio: number) {
  const p = loadProgress();
  const bag = kind === "alefato" ? p.alefatoBest : p.vocabBest;
  bag[id] = Math.max(bag[id] ?? 0, ratio);
  saveProgress(p);
  return p;
}
