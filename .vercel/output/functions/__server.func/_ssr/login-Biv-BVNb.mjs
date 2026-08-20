import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GROK_PROVIDERS } from "./router-CudEm2Lo.mjs";
import { a as signIn, n as Button, t as AppShell } from "./app-shell-BdDM6Chw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Biv-BVNb.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		current: "login",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto grid min-h-[70dvh] max-w-md place-items-center px-4 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full rounded-xl bg-surface p-8 shadow-[0_0_0_1px_var(--color-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						dir: "rtl",
						lang: "he",
						className: "text-center font-hebrew text-4xl text-accent",
						children: "שָׁלוֹם"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-center font-display text-2xl font-semibold",
						children: "Entrar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 mb-6 text-center text-sm text-muted",
						children: "Guarda tu progreso en este dispositivo; la cuenta es opcional."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							className: "w-full",
							onClick: () => signIn(p.providerId, { callbackURL: "/" }),
							children: ["Continuar con ", p.label]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-sm text-accent underline-offset-4 hover:underline",
							children: "Volver al inicio"
						})
					})
				]
			})
		})
	});
}
//#endregion
export { Login as component };
