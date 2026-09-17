//#region node_modules/.nitro/vite/services/ssr/assets/diagnostics-Cmky3siG.js
var PIPELINE_VERSION = "2.0.0";
function fingerprint(input) {
	let hash = 2166136261;
	for (let i = 0; i < input.length; i++) {
		hash ^= input.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(16).padStart(8, "0");
}
function extractJson(text) {
	const raw = (text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] ?? text).trim();
	const start = raw.search(/[[{]/);
	if (start < 0) throw new Error("No JSON object or array in model response");
	const open = raw[start];
	const close = open === "{" ? "}" : "]";
	let depth = 0;
	let quoted = false;
	let escaped = false;
	for (let i = start; i < raw.length; i++) {
		const ch = raw[i];
		if (quoted) {
			if (escaped) escaped = false;
			else if (ch === "\\") escaped = true;
			else if (ch === "\"") quoted = false;
			continue;
		}
		if (ch === "\"") {
			quoted = true;
			continue;
		}
		if (ch === open) depth++;
		else if (ch === close) {
			depth--;
			if (depth === 0) return JSON.parse(raw.slice(start, i + 1));
		}
	}
	throw new Error("Unclosed JSON in model response");
}
function newDiagnostic(input, requiredIds = 0, anchors = 0, regions = 0) {
	return {
		pipelineVersion: PIPELINE_VERSION,
		inputFingerprint: fingerprint(input),
		pinsSummary: {
			requiredIds,
			anchors,
			regions
		},
		attempts: [],
		retries: 0,
		repairs: [],
		finalStatus: "failed"
	};
}
//#endregion
export { newDiagnostic as n, extractJson as t };
