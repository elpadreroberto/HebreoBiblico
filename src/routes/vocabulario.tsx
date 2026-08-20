import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { VocabStudio } from "@/components/vocab-studio";

export const Route = createFileRoute("/vocabulario")({ component: VocabPage });

function VocabPage() {
  return (
    <AppShell current="vocabulario">
      <VocabStudio />
    </AppShell>
  );
}
