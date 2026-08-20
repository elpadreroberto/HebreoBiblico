import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shuffle, d as ChevronRight, f as ChevronLeft, n as X, s as MessageCircle } from "../_libs/lucide-react.mjs";
import { i as shuffle, n as Button, r as cn, t as AppShell } from "./app-shell-BdDM6Chw.mjs";
import { t as recordScore } from "./progress-fcUNaNJD.mjs";
import { n as conversationPhrases, r as vocabGroups, t as allMeanings } from "./vocabulario-CIVhvk6P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vocabulario-B3v-OElE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VocabStudio() {
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [order, setOrder] = (0, import_react.useState)(() => vocabGroups[0].cards);
	const [flipped, setFlipped] = (0, import_react.useState)({});
	const [examOpen, setExamOpen] = (0, import_react.useState)(false);
	const group = vocabGroups[idx];
	(0, import_react.useEffect)(() => {
		setOrder(group.cards);
		setFlipped({});
	}, [group]);
	function mix() {
		setOrder(shuffle(group.cards));
		setFlipped({});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col items-center gap-3 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
						children: [
							"Grupo ",
							group.id,
							" de ",
							vocabGroups.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold tracking-tight sm:text-3xl",
						children: group.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-full bg-raised px-3 py-1 text-sm font-semibold tabular-nums text-accent shadow-[0_0_0_1px_var(--color-border)]",
						children: [group.percent.toFixed(1), "% del texto bíblico"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => setIdx((i) => Math.max(0, i - 1)),
						disabled: idx === 0,
						"aria-label": "Grupo anterior",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}), "Anterior"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: mix,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, {}), "Mezclar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "teal",
						onClick: () => setExamOpen(true),
						children: "Examen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => setIdx((i) => Math.min(vocabGroups.length - 1, i + 1)),
						disabled: idx === vocabGroups.length - 1,
						"aria-label": "Grupo siguiente",
						children: ["Siguiente", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center gap-1.5",
				role: "group",
				"aria-label": "Grupos",
				children: vocabGroups.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": i === idx,
					onClick: () => setIdx(i),
					className: cn("h-9 min-w-9 rounded-md px-2 text-xs font-bold tabular-nums transition-colors duration-150", i === idx ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
					title: g.name,
					children: g.id
				}, g.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3",
				children: order.map((card, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "h-[340px] min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipCard, {
						card,
						flipped: !!flipped[i],
						onToggle: () => setFlipped((f) => ({
							...f,
							[i]: !f[i]
						}))
					})
				}, `${card.h}-${i}`))
			}),
			examOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamOverlay, {
				groupIdx: idx,
				onClose: () => setExamOpen(false)
			})
		]
	});
}
function FlipCard({ card, flipped, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onToggle,
		"aria-pressed": flipped,
		className: cn("flip-card h-full w-full min-w-0 overflow-hidden text-left", flipped && "is-flipped"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: flipped ? `${card.t}: ${card.m}. ${card.v} ${card.c}` : `Hebreo ${card.h}. Pulsa para ver el significado.`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flip-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flip-face rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full min-w-0 flex-col items-center justify-center overflow-hidden px-5 py-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							dir: "rtl",
							lang: "he",
							className: "font-hebrew text-6xl leading-none whitespace-nowrap text-accent",
							children: card.h
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							dir: "rtl",
							lang: "he",
							className: "mt-4 line-clamp-3 w-full max-w-[18rem] font-hebrew text-sm leading-snug break-words text-muted",
							children: card.hv
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 text-xs font-semibold tracking-wide text-teal",
							children: card.c
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flip-back flip-face rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full min-w-0 flex-col items-center justify-center overflow-hidden px-5 py-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl font-semibold text-accent",
							children: card.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 font-display text-2xl font-semibold text-fg",
							children: card.m
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-4 line-clamp-4 w-full max-w-prose border-t border-border pt-4 text-sm italic leading-relaxed text-muted",
							children: [card.v, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block not-italic font-semibold text-teal",
								children: card.c
							})]
						})
					]
				})
			})]
		})]
	});
}
function ExamOverlay({ groupIdx, onClose }) {
	const [phase, setPhase] = (0, import_react.useState)("ask");
	const [conversation, setConversation] = (0, import_react.useState)(false);
	const [queue, setQueue] = (0, import_react.useState)(() => shuffle(vocabGroups[groupIdx].cards));
	const [pos, setPos] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [mistakes, setMistakes] = (0, import_react.useState)([]);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const dialogRef = (0, import_react.useRef)(null);
	const current = queue[pos];
	const meanings = (0, import_react.useMemo)(() => allMeanings(), []);
	const options = (0, import_react.useMemo)(() => {
		if (!current || phase !== "ask") return [];
		const correct = current.m;
		const pool = conversation ? conversationPhrases.filter((p) => p.level <= groupIdx).map((p) => p.m) : meanings;
		const opts = [correct];
		const shuffledPool = shuffle(pool.filter((m) => m !== correct));
		for (const m of shuffledPool) {
			if (opts.length >= 4) break;
			opts.push(m);
		}
		return shuffle(opts);
	}, [
		current,
		phase,
		conversation,
		groupIdx,
		meanings
	]);
	(0, import_react.useEffect)(() => {
		dialogRef.current?.focus();
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
			if (phase === "ask" && !picked) {
				const n = Number(e.key);
				if (n >= 1 && n <= 4 && options[n - 1]) choose(options[n - 1]);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		phase,
		picked,
		options
	]);
	function choose(answer) {
		if (!current || picked) return;
		const ok = answer === current.m;
		setPicked(answer);
		const nextScore = score + (ok ? 1 : 0);
		const nextMistakes = ok ? mistakes : [...mistakes, current];
		if (ok) setScore(nextScore);
		else setMistakes(nextMistakes);
		window.setTimeout(() => {
			const nextPos = pos + 1;
			if (nextPos >= queue.length) {
				recordScore("vocab", conversation ? `conv-${groupIdx}` : String(groupIdx + 1), nextScore / queue.length);
				setPhase("done");
			} else {
				setPos(nextPos);
				setPicked(null);
			}
		}, ok ? 350 : 900);
	}
	function startConversation() {
		const available = shuffle(conversationPhrases.filter((p) => p.level <= groupIdx)).slice(0, 10);
		setQueue(available);
		setPos(0);
		setScore(0);
		setMistakes([]);
		setPicked(null);
		setConversation(true);
		setPhase("ask");
	}
	function review() {
		if (!mistakes.length) return;
		setQueue(shuffle(mistakes));
		setPos(0);
		setScore(0);
		setMistakes([]);
		setPicked(null);
		setPhase("ask");
	}
	const pct = queue.length ? Math.round(score / queue.length * 100) : 0;
	const dominated = conversation ? pct : (score / queue.length * vocabGroups[groupIdx].percent).toFixed(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/95 p-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "exam-title",
		ref: dialogRef,
		tabIndex: -1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-border)] sm:p-8",
			children: [phase === "ask" && current && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					id: "exam-title",
					className: "text-center text-xs font-semibold uppercase tracking-[0.16em] text-subtle",
					children: conversation ? `Conversación · niveles 1–${groupIdx + 1}` : `Pregunta ${pos + 1} de ${queue.length}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					dir: "rtl",
					lang: "he",
					className: "my-6 text-center font-hebrew text-5xl leading-tight text-accent sm:text-6xl",
					children: "h" in current ? current.h : ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: options.map((o, i) => {
						const isCorrect = o === current.m;
						const show = picked !== null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: picked !== null,
							onClick: () => choose(o),
							className: cn("min-h-12 rounded-lg bg-raised px-4 py-3 text-left text-base font-medium shadow-[0_0_0_1px_var(--color-border)] transition-colors duration-150 hover:bg-bg", show && isCorrect && "bg-ok text-accent-fg shadow-none", show && picked === o && !isCorrect && "bg-danger text-fg shadow-none"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-2 inline-grid size-6 place-items-center rounded bg-surface text-xs text-muted",
								children: i + 1
							}), o]
						}, o);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					className: "mt-6 w-full",
					onClick: onClose,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), "Cancelar"]
				})
			] }), phase === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "exam-title",
						className: "font-display text-2xl font-semibold",
						children: "Examen terminado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-display text-5xl font-semibold tabular-nums text-accent",
						children: [
							score,
							"/",
							queue.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted",
						children: conversation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Acertaste el ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-fg",
								children: [pct, "%"]
							}),
							" de las frases."
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Acertaste el ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-fg",
								children: [pct, "%"]
							}),
							" de este grupo. Ahora cubres aproximadamente",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-teal",
								children: [dominated, "%"]
							}),
							" del texto bíblico (sobre el ",
							vocabGroups[groupIdx].percent,
							"% de este nivel)."
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap justify-center gap-2",
						children: [
							mistakes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "danger",
								onClick: review,
								children: "Repasar errores"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "teal",
								onClick: startConversation,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}), "Conversar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: onClose,
								children: "Seguir estudiando"
							})
						]
					})
				]
			})]
		})
	});
}
function VocabPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		current: "vocabulario",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VocabStudio, {})
	});
}
//#endregion
export { VocabPage as component };
