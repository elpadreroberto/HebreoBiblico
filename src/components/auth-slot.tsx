import { Link } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="size-9 animate-pulse rounded-full bg-raised" aria-hidden="true" />;
  }
  if (user) {
    return (
      <div className="max-w-[10rem] truncate text-sm text-muted sm:max-w-none">
        <UserButton />
      </div>
    );
  }
  return (
    <Link
      to="/login"
      className="inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-muted transition-colors duration-150 hover:bg-raised hover:text-fg"
    >
      Entrar
    </Link>
  );
}
