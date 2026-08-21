import { createFileRoute } from "@tanstack/react-router";
import { AlefatoStudio } from "@/components/alefato-studio";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell current="study">
      <AlefatoStudio />
    </AppShell>
  );
}
