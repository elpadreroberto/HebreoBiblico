import type { AlefatoNivel, FlashItem } from "./types";
import raw from "./alefato.json";

type RawNivel = {
  id: number;
  titulo: string;
  resumen: string;
  partes?: { id: string; titulo: string; items: FlashItem[] }[];
  items?: FlashItem[];
};

const nivelesRaw = raw.niveles as Record<string, RawNivel>;

export const nivelMotivaciones = raw.motivaciones as Record<string, string>;

export const alefatoNiveles: AlefatoNivel[] = [1, 2, 3, 4, 5].map((n) => nivelesRaw[String(n)]);

export const CHUNK = 5;

export type Parte = {
  id: string;
  label: string;
  titulo: string;
  items: FlashItem[];
  isGlobal?: boolean;
};

export function itemsDeNivel(nivel: AlefatoNivel): FlashItem[] {
  if (nivel.partes?.length) {
    return nivel.partes.flatMap((p) => p.items);
  }
  return nivel.items ?? [];
}

export function partesDeNivel(nivel: AlefatoNivel): Parte[] {
  const items = itemsDeNivel(nivel);
  const partes: Parte[] = [];
  const total = Math.ceil(items.length / CHUNK);
  for (let p = 0; p < total; p++) {
    const chunk = items.slice(p * CHUNK, (p + 1) * CHUNK);
    partes.push({
      id: String(p + 1),
      label: String(p + 1),
      titulo: `Parte ${p + 1}`,
      items: chunk,
    });
  }
  partes.push({
    id: "global",
    label: "Todo",
    titulo: "Examen del nivel",
    items: [...items],
    isGlobal: true,
  });
  return partes;
}

export function extraInfo(item: FlashItem, nivelId: number) {
  return {
    motivacion: item.imp || nivelMotivaciones[String(nivelId)] || "",
    stat: item.stat || "Aparece con una frecuencia vital en los escritos sagrados del Tanaj.",
    cur: item.cur || "El hebreo bíblico encierra conceptos profundos en cada raíz.",
  };
}
