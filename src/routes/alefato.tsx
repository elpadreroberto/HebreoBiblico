import { createFileRoute } from "@tanstack/react-router";
import { AlefatoStudio } from "@/components/alefato-studio";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/alefato")({ component: AlefatoPage });

function AlefatoPage() {
  return (
    <AppShell current="study">
      <AlefatoStudio />
    </AppShell>
  );
}
