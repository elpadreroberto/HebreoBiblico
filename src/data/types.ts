export type FlashItem = {
  id: number;
  he: string;
  es: string;
  son: string;
  tr: string;
  heNom: string | null;
  tipo: string | null;
  uso: string | null;
  cita: string | null;
  citaTr: string | null;
  citaEs: string | null;
  stat: string | null;
  cur: string | null;
  imp: string | null;
};

export type AlefatoNivel = {
  id: number;
  titulo: string;
  resumen: string;
  partes?: { id: string; titulo: string; items: FlashItem[] }[];
  items?: FlashItem[];
};

export type VocabCard = {
  h: string;
  t: string;
  m: string;
  v: string;
  hv: string;
  c: string;
};

export type VocabGroup = {
  id: number;
  name: string;
  percent: number;
  cards: VocabCard[];
};

export type Phrase = {
  h: string;
  m: string;
  level: number;
};
