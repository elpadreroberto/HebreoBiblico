import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Layers, m as ArrowRight, p as BookOpen, u as Keyboard } from "../_libs/lucide-react.mjs";
import { n as Button, t as AppShell } from "./app-shell-BdDM6Chw.mjs";
import { r as itemsDeNivel, t as alefatoNiveles } from "./alefato-BgTcFrmk.mjs";
import { r as vocabGroups } from "./vocabulario-CIVhvk6P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CGMUBbcM.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const fichas = alefatoNiveles.reduce((n, nivel) => n + itemsDeNivel(nivel).length, 0);
	const palabras = vocabGroups.reduce((n, g) => n + g.cards.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		current: "home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.22em] text-subtle",
							children: "Lectura del Tanaj en su lengua"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							dir: "rtl",
							lang: "he",
							className: "mt-5 font-hebrew text-[4.4rem] leading-none text-accent sm:text-[6.5rem]",
							children: "עִבְרִית"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl",
							children: "Hebreo Bíblico"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg",
							children: "Dos talleres en una sola página: el alefato con gramática, y el vocabulario de alta frecuencia que cubre casi todo el texto sagrado."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/alefato",
									children: ["Empezar por el alefato", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/vocabulario",
									children: "Ir al vocabulario"
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-4 px-4 pb-16 sm:px-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioCard, {
					to: "/alefato",
					kicker: "Taller 1",
					hebrew: "אָלֶף־בֵּית",
					title: "Alefato y gramática",
					body: "Vocales, 22 letras, formas sofit, luego sustantivos, verbos, adjetivos y conectores. Estudia o examínate por partes, con versículo y dato de frecuencia.",
					meta: `${fichas} fichas · 5 niveles`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioCard, {
					to: "/vocabulario",
					kicker: "Taller 2",
					hebrew: "מִלִּים",
					title: "Vocabulario del texto",
					body: "Once grupos ordenados por frecuencia. Voltea cada ficha, examínate y practica frases. El último grupo cubre el 97,5% de las palabras del Tanaj.",
					meta: `${palabras} palabras · 11 grupos`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-5" }),
							title: "De la letra al versículo",
							body: "Cada ficha muestra el hebreo, la pronunciación y un versículo real donde aparece."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" }),
							title: "Estudiar o examinar",
							body: "Lee con calma o ponte a prueba con cuatro opciones. El teclado funciona: flechas y teclas 1 a 4."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-5" }),
							title: "Hecho para leerse",
							body: "Tipografías hebreas, contraste alto, rumbo RTL y atajos. El progreso del examen se guarda en este dispositivo."
						})
					]
				})
			})
		] })
	});
}
function StudioCard({ to, kicker, hebrew, title, body, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group flex flex-col rounded-xl bg-surface p-6 no-underline shadow-[0_0_0_1px_var(--color-border)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-accent)_45%,transparent)] sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-subtle",
					children: kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					dir: "rtl",
					lang: "he",
					className: "font-hebrew text-2xl text-accent",
					children: hebrew
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-2xl font-semibold text-fg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 flex-1 text-sm leading-relaxed text-muted",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums text-subtle",
					children: meta
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 font-medium text-accent",
					children: ["Abrir", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-150 group-hover:translate-x-0.5" })]
				})]
			})
		]
	});
}
function Step({ icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 grid size-10 place-items-center rounded-lg bg-raised text-accent shadow-[0_0_0_1px_var(--color-border)]",
			children: icon
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-lg font-semibold",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: body
		})
	] });
}
//#endregion
export { Home as component };
