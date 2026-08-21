import type { FlashItem } from "@/data/types";

const VOWEL_MARKS = new Set([
  "\u05B0", // sheva
  "\u05B1", // hataf segol
  "\u05B2", // hataf patah
  "\u05B3", // hataf qamats
  "\u05B4", // hiriq
  "\u05B5", // tsere
  "\u05B6", // segol
  "\u05B7", // patah
  "\u05B8", // qamats
  "\u05B9", // holam
  "\u05BA", // holam haser
  "\u05BB", // qubuts
]);

const DAGESH = "\u05BC";
const VAV = "\u05D5";

export const VOWEL_HOSTS = [
  { he: "\u05D1", name: "bet" },
  { he: "\u05D2", name: "guímel" },
  { he: "\u05D3", name: "dálet" },
  { he: "\u05D6", name: "záyin" },
  { he: "\u05D7", name: "jet" },
  { he: "\u05D8", name: "tet" },
  { he: "\u05DB", name: "kaf" },
  { he: "\u05DC", name: "lámed" },
  { he: "\u05DE", name: "mem" },
  { he: "\u05E0", name: "nun" },
  { he: "\u05E1", name: "sámej" },
  { he: "\u05E4", name: "pe" },
  { he: "\u05E6", name: "tsadi" },
  { he: "\u05E7", name: "qof" },
  { he: "\u05E8", name: "resh" },
  { he: "\u05EA", name: "tav" },
] as const;

export type VowelKind =
  | "patah"
  | "qamats"
  | "segol"
  | "tsere"
  | "hiriq"
  | "holam"
  | "shuruq"
  | "qubuts"
  | "sheva";

export function isVowelItem(item: FlashItem | undefined): boolean {
  if (!item) return false;
  const blob = `${item.es} ${item.tr} ${item.tipo ?? ""}`.toLowerCase();
  return /vocal|semivocal|pataj|pataḥ|kamatz|qamats|segol|tsere|jiriq|hiriq|ḥiriq|holam|ḥolam|shuruq|qubutz|qibbuts|shev/.test(
    blob,
  );
}

export function detectVowelKind(item: FlashItem): VowelKind | null {
  const blob = `${item.es} ${item.tr} ${item.tipo ?? ""} ${item.he}`.toLowerCase();
  if (/shuruq|shureq/.test(blob) || item.he.includes(`${VAV}${DAGESH}`)) return "shuruq";
  if (/pataj|pataḥ|patach/.test(blob) || item.he.includes("\u05B7")) return "patah";
  if (/kamatz|qamats/.test(blob) || item.he.includes("\u05B8")) return "qamats";
  if (/segol/.test(blob) || item.he.includes("\u05B6")) return "segol";
  if (/tsere|sere/.test(blob) || item.he.includes("\u05B5")) return "tsere";
  if (/jiriq|hiriq|ḥiriq/.test(blob) || item.he.includes("\u05B4")) return "hiriq";
  if (/holam|ḥolam/.test(blob) || item.he.includes("\u05B9")) return "holam";
  if (/qubutz|qubuts|qibbuts|kubutz/.test(blob) || item.he.includes("\u05BB")) return "qubuts";
  if (/shev/.test(blob) || item.he.includes("\u05B0")) return "sheva";
  return null;
}

export function applyVowelToHost(host: string, kind: VowelKind): string {
  switch (kind) {
    case "patah":
      return host + DAGESH + "\u05B7";
    case "qamats":
      return host + DAGESH + "\u05B8";
    case "segol":
      return host + DAGESH + "\u05B6";
    case "tsere":
      return host + DAGESH + "\u05B5";
    case "hiriq":
      return host + DAGESH + "\u05B4";
    case "holam":
      return host + DAGESH + "\u05B9";
    case "shuruq":
      return host + DAGESH + VAV + DAGESH;
    case "qubuts":
      return host + DAGESH + "\u05BB";
    case "sheva":
      return host + DAGESH + "\u05B0";
  }
}

export function pickHost(previousHe?: string) {
  const pool = VOWEL_HOSTS.filter((h) => h.he !== previousHe);
  return pool[Math.floor(Math.random() * pool.length)] ?? VOWEL_HOSTS[0];
}

export function isVowelMark(ch: string) {
  return VOWEL_MARKS.has(ch);
}

export function splitColoredHebrew(text: string): { ch: string; vowel: boolean }[] {
  const chars = [...text];
  const out: { ch: string; vowel: boolean }[] = [];
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const next = chars[i + 1];
    if (ch === VAV && next === DAGESH && i > 0) {
      out.push({ ch: VAV + DAGESH, vowel: true });
      i += 1;
      continue;
    }
    if (isVowelMark(ch)) {
      out.push({ ch, vowel: true });
      continue;
    }
    out.push({ ch, vowel: false });
  }
  return out;
}
