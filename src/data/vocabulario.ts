import type { Phrase, VocabGroup } from "./types";
import raw from "./vocabulario.json";

export const vocabGroups = raw.groups as VocabGroup[];
export const conversationPhrases = raw.conversationPhrases as Phrase[];

export function allMeanings(): string[] {
  return vocabGroups.flatMap((g) => g.cards.map((c) => c.m));
}
