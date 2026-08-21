import { createFileRoute } from "@tanstack/react-router";
import { AlefatoStudio } from "@/components/alefato-studio";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/vocabulario")({ component: VocabPage });

function VocabPage() {
  return (
    <AppShell current="study">
      <AlefatoStudio initialPathLevel={6} />
    </AppShell>
  );
}
