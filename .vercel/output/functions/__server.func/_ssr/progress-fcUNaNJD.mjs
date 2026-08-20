//#region node_modules/.nitro/vite/services/ssr/assets/progress-fcUNaNJD.js
var KEY = "hebreo-biblio-progress-v1";
function empty() {
	return {
		alefatoBest: {},
		vocabBest: {}
	};
}
function loadProgress() {
	if (typeof window === "undefined") return empty();
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return empty();
		const parsed = JSON.parse(raw);
		return {
			alefatoBest: parsed.alefatoBest ?? {},
			vocabBest: parsed.vocabBest ?? {}
		};
	} catch {
		return empty();
	}
}
function saveProgress(next) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY, JSON.stringify(next));
}
function recordScore(kind, id, ratio) {
	const p = loadProgress();
	const bag = kind === "alefato" ? p.alefatoBest : p.vocabBest;
	bag[id] = Math.max(bag[id] ?? 0, ratio);
	saveProgress(p);
	return p;
}
//#endregion
export { recordScore as t };
