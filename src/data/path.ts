import { alefatoNiveles } from "./alefato";
import { vocabGroups } from "./vocabulario";

export type PathLevel = {
  id: number;
  kind: "alefato" | "vocab";
  title: string;
  summary: string;
  alefatoId?: number;
  vocabIndex?: number;
};

export function buildPath(): PathLevel[] {
  const alefato = alefatoNiveles.map((n) => ({
    id: n.id,
    kind: "alefato" as const,
    title: n.titulo,
    summary: n.resumen,
    alefatoId: n.id,
  }));
  const vocab = vocabGroups.map((g, i) => ({
    id: alefato.length + i + 1,
    kind: "vocab" as const,
    title: g.name,
    summary: `${g.percent.toFixed(1)}% del Tanaj`,
    vocabIndex: i,
  }));
  return [...alefato, ...vocab];
}

export const ALEFATO_LEVELS = 5;
