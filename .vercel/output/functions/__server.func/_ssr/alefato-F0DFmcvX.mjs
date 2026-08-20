import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Maximize2, d as ChevronRight, f as ChevronLeft, o as Minimize2, p as BookOpen, r as Type, t as ZoomIn } from "../_libs/lucide-react.mjs";
import { i as shuffle, n as Button, r as cn, t as AppShell } from "./app-shell-BdDM6Chw.mjs";
import { i as partesDeNivel, n as extraInfo, t as alefatoNiveles } from "./alefato-BgTcFrmk.mjs";
import { t as recordScore } from "./progress-fcUNaNJD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alefato-F0DFmcvX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HebrewWord({ children, className, size = "md", face = "classic" }) {
	const compact = [...typeof children === "string" ? children : ""].length <= 4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		dir: "rtl",
		lang: "he",
		className: cn(face === "serif" ? "hebrew-serif" : face === "bold" ? "hebrew-bold" : "hebrew-classic", size === "lg" ? "size-he-lg" : "size-he-md", "inline-block max-w-full text-fg", compact && "whitespace-nowrap", className),
		children
	});
}
function HebrewVerse({ html, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		dir: "rtl",
		lang: "he",
		className: cn("font-hebrew leading-relaxed text-fg", className),
		dangerouslySetInnerHTML: { __html: html }
	});
}
function AlefatoStudio() {
	const [nivelId, setNivelId] = (0, import_react.useState)(1);
	const [parteId, setParteId] = (0, import_react.useState)("1");
	const [modo, setModo] = (0, import_react.useState)("enseñar");
	const [indice, setIndice] = (0, import_react.useState)(0);
	const [items, setItems] = (0, import_react.useState)([]);
	const [aciertos, setAciertos] = (0, import_react.useState)(0);
	const [face, setFace] = (0, import_react.useState)("classic");
	const [large, setLarge] = (0, import_react.useState)(false);
	const [infoOpen, setInfoOpen] = (0, import_react.useState)(true);
	const [answered, setAnswered] = (0, import_react.useState)(false);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [opciones, setOpciones] = (0, import_react.useState)([]);
	const liveRef = (0, import_react.useRef)(null);
	const nivel = alefatoNiveles[nivelId - 1];
	const partes = (0, import_react.useMemo)(() => partesDeNivel(nivel), [nivel]);
	const parte = partes.find((p) => p.id === parteId) ?? partes[0];
	const cargar = (0, import_react.useCallback)((p, m) => {
		const next = m === "enseñar" ? p.items : shuffle(p.items);
		setItems(next);
		setIndice(0);
		setAciertos(0);
		setAnswered(false);
		setPicked(null);
	}, []);
	(0, import_react.useEffect)(() => {
		cargar(parte, modo);
	}, [
		parte,
		modo,
		cargar
	]);
	const item = items[indice];
	const examDone = modo === "examinar" && indice >= items.length && items.length > 0;
	(0, import_react.useEffect)(() => {
		if (modo !== "examinar" || !item || examDone) return;
		const pool = extraerPool(nivelId);
		let distractores = shuffle(pool.filter((x) => x.es !== item.es)).slice(0, 3);
		while (distractores.length < 3 && pool.length > 1) {
			const extra = pool[Math.floor(Math.random() * pool.length)];
			if (extra && extra.es !== item.es && !distractores.some((d) => d.es === extra.es)) distractores.push(extra);
			else break;
		}
		setOpciones(shuffle([item, ...distractores]));
		setAnswered(false);
		setPicked(null);
	}, [
		item,
		modo,
		examDone,
		nivelId
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (modo === "enseñar") {
				if (e.key === "ArrowRight") navegar(1);
				if (e.key === "ArrowLeft") navegar(-1);
			} else if (!examDone && !answered) {
				const n = Number(e.key);
				if (n >= 1 && n <= 4) {
					const opt = opciones[n - 1];
					if (opt && item) responder(opt.es === item.es, opt);
				}
			} else if (examDone) {
				if (e.key === "ArrowRight") siguienteParte();
				if (e.key === "ArrowLeft") cargar(parte, "examinar");
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		modo,
		examDone,
		answered,
		opciones,
		item,
		parte,
		indice,
		items
	]);
	function navegar(dir) {
		if (modo !== "enseñar") return;
		const next = indice + dir;
		if (next >= 0 && next < items.length) {
			setIndice(next);
			return;
		}
		const idx = partes.findIndex((p) => p.id === parte.id);
		if (dir < 0 && idx > 0) setParteId(partes[idx - 1].id);
		else if (dir > 0 && idx < partes.length - 1) setParteId(partes[idx + 1].id);
	}
	function siguienteParte() {
		const idx = partes.findIndex((p) => p.id === parte.id);
		if (idx < partes.length - 1) setParteId(partes[idx + 1].id);
	}
	function responder(ok, opt) {
		if (answered || !item) return;
		setAnswered(true);
		setPicked(opt.es);
		const nextHits = aciertos + (ok ? 1 : 0);
		if (ok) setAciertos(nextHits);
		if (liveRef.current) liveRef.current.textContent = ok ? "Correcto" : `Incorrecto. Era ${item.es}`;
		window.setTimeout(() => {
			const nextIdx = indice + 1;
			if (nextIdx >= items.length) recordScore("alefato", `${nivelId}-${parte.id}`, nextHits / items.length);
			setIndice(nextIdx);
			setAnswered(false);
		}, ok ? 450 : 1400);
	}
	const extra = item ? extraInfo(item, nivelId) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "tablist",
						"aria-label": "Modo",
						className: "flex rounded-lg bg-raised p-1",
						children: ["enseñar", "examinar"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": modo === m,
							className: cn("h-10 flex-1 rounded-md px-4 text-sm font-semibold capitalize transition-colors duration-150 sm:flex-none", modo === m ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
							onClick: () => setModo(m),
							children: m === "enseñar" ? "Estudiar" : "Examinar"
						}, m))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-center gap-1.5",
						role: "group",
						"aria-label": "Niveles",
						children: alefatoNiveles.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": n.id === nivelId,
							onClick: () => {
								setNivelId(n.id);
								setParteId("1");
							},
							className: cn("h-10 min-w-11 rounded-md px-3 text-sm font-semibold transition-colors duration-150", n.id === nivelId ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
							children: n.id
						}, n.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 sm:flex-row sm:justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "icon-sm",
								onClick: () => setFace((f) => f === "classic" ? "serif" : f === "serif" ? "bold" : "classic"),
								title: "Cambiar tipografía hebrea",
								"aria-label": "Cambiar tipografía hebrea",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "icon-sm",
								onClick: () => setLarge((v) => !v),
								title: "Cambiar tamaño",
								"aria-label": large ? "Tamaño normal" : "Tamaño grande",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex max-w-full flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle",
								children: [nivel.titulo, " · partes"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center gap-1.5",
								children: [
									modo === "enseñar" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "teal",
										size: "sm",
										onClick: () => navegar(-1),
										"aria-label": "Ficha anterior",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "Ant"
										})]
									}),
									partes.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": p.id === parte.id,
										onClick: () => setParteId(p.id),
										className: cn("h-9 min-w-9 rounded-md px-2.5 text-xs font-bold transition-colors duration-150", p.id === parte.id ? p.isGlobal ? "bg-accent text-accent-fg" : "bg-teal text-teal-fg" : p.isGlobal ? "bg-raised text-accent" : "bg-raised text-muted hover:text-fg"),
										children: p.label
									}, p.id)),
									modo === "enseñar" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "teal",
										size: "sm",
										onClick: () => navegar(1),
										"aria-label": "Ficha siguiente",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "Sig"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden max-w-48 text-right text-xs text-muted sm:block",
							children: nivel.resumen
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-label": "Ficha",
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-h-[280px] flex-col items-center justify-center rounded-xl bg-surface px-5 py-8 text-center shadow-[0_0_0_1px_var(--color-border)] sm:min-h-[320px]",
							children: examDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resultado, {
								aciertos,
								total: items.length,
								onRepetir: () => cargar(parte, "examinar"),
								onSiguiente: siguienteParte,
								haySiguiente: partes.findIndex((p) => p.id === parte.id) < partes.length - 1
							}) : item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "fade-swap w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
										children: modo === "enseñar" ? `Ficha ${indice + 1} de ${items.length}` : "¿Qué significa o cómo se lee?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HebrewWord, {
										size: large ? "lg" : "md",
										face,
										children: item.he
									}),
									modo === "enseñar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detalle, { item })
								]
							}, `${parte.id}-${indice}-${modo}`) : null
						}),
						modo === "examinar" && !examDone && item && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
							role: "group",
							"aria-label": "Opciones",
							children: opciones.map((o, i) => {
								const isCorrect = o.es === item.es;
								const show = answered;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: answered,
									onClick: () => responder(isCorrect, o),
									className: cn("flex min-h-14 items-center rounded-lg bg-raised px-3 py-3 text-left text-base font-medium shadow-[0_0_0_1px_var(--color-border)] transition-colors duration-150 hover:bg-surface disabled:opacity-100", show && isCorrect && "bg-ok text-accent-fg shadow-none", show && picked === o.es && !isCorrect && "bg-danger text-fg shadow-none", show && picked !== o.es && !isCorrect && "opacity-45"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-3 grid size-7 shrink-0 place-items-center rounded-md bg-surface text-xs text-muted",
										children: i + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [o.es, nivelId === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-2 text-sm font-normal text-muted",
										children: [
											"(",
											o.son,
											")"
										]
									})] })]
								}, `${o.es}-${i}`);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: liveRef,
							className: "min-h-6 text-center text-sm font-semibold",
							"aria-live": "polite"
						}),
						modo === "examinar" && !examDone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-sm tabular-nums text-muted",
							children: [
								"Pregunta ",
								Math.min(indice + 1, items.length),
								" de ",
								items.length
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between gap-2 border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 font-display text-lg font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
								className: "size-5 text-accent",
								"aria-hidden": "true"
							}), "Datos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							onClick: () => setInfoOpen((v) => !v),
							"aria-expanded": infoOpen,
							"aria-label": infoOpen ? "Ocultar panel" : "Mostrar panel",
							children: infoOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, {})
						})]
					}), infoOpen && extra && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBlock, {
								titulo: "Impacto del nivel",
								tone: "teal",
								body: extra.motivacion
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBlock, {
								titulo: "Frecuencia y uso",
								tone: "accent",
								body: extra.stat
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBlock, {
								titulo: "Dato único",
								tone: "muted",
								body: extra.cur
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-subtle",
				children: "Teclado: flechas para avanzar · 1–4 para responder en examen"
			})
		]
	});
}
function extraerPool(nivelId) {
	const n = alefatoNiveles[nivelId - 1];
	if (n.partes) return n.partes.flatMap((p) => p.items);
	return n.items ?? [];
}
function Detalle({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto mt-6 w-full max-w-xl rounded-lg bg-raised px-4 py-4 text-left shadow-[0_0_0_1px_var(--color-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-semibold text-teal",
				children: item.es
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-fg",
				children: ["Pronunciación: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.son })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: ["Transliteración: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: item.tr })]
			}),
			item.tipo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs font-semibold uppercase tracking-wider text-accent",
				children: item.tipo
			}),
			item.uso && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm italic text-muted",
				children: item.uso
			}),
			item.cita && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 border-t border-border pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HebrewVerse, {
						html: item.cita,
						className: "text-2xl"
					}),
					item.citaTr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm italic text-accent",
						children: item.citaTr
					}),
					item.citaEs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: item.citaEs
					})
				]
			})
		]
	});
}
function InfoBlock({ titulo, body, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-raised p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: cn("mb-1 text-xs font-semibold uppercase tracking-wider", tone === "teal" ? "text-teal" : tone === "accent" ? "text-accent" : "text-muted"),
			children: titulo
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-muted",
			children: body
		})]
	});
}
function Resultado({ aciertos, total, onRepetir, onSiguiente, haySiguiente }) {
	const pct = total ? Math.round(aciertos / total * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Parte completada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-4xl font-semibold tabular-nums text-teal",
				children: [
					aciertos,
					"/",
					total
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [pct, "% de aciertos"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onRepetir,
					children: "Repetir"
				}), haySiguiente && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: onSiguiente,
					children: ["Siguiente parte", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})]
				})]
			})
		]
	});
}
function AlefatoPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		current: "alefato",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlefatoStudio, {})
	});
}
//#endregion
export { AlefatoPage as component };
