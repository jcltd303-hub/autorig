import { o as __toESM } from "../_runtime.mjs";
import { r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as extractJson } from "./diagnostics-Cmky3siG.mjs";
import { a as Scissors, c as Pin, d as Download, i as Sparkles, l as Pause, o as RotateCcw, r as Trash2, s as Play, t as WandSparkles, u as FolderOpen } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as Viewport, n as Scrollbar, r as Thumb, t as Root$1 } from "../_libs/@radix-ui/react-scroll-area+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as require_lib } from "../_libs/jszip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cb1ddvfE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "puppet";
}
var _jsxFileName$10 = "/app/applet/src/components/ui/badge.tsx";
function Badge({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("inline-flex items-center rounded-full bg-elevated px-2.5 py-0.5 text-xs font-medium tracking-wider text-muted uppercase shadow-border", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 12,
		columnNumber: 5
	}, this);
}
var _jsxFileName$9 = "/app/applet/src/components/ui/button.tsx";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg shadow-border hover:bg-ivory",
			secondary: "bg-elevated text-fg shadow-border hover:bg-surface",
			outline: "bg-transparent text-fg shadow-border hover:bg-elevated",
			ghost: "text-muted hover:bg-elevated hover:text-fg",
			danger: "bg-danger text-ivory hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$9,
		lineNumber: 37,
		columnNumber: 12
	}, void 0);
});
Button.displayName = "Button";
var _jsxFileName$8 = "/app/applet/src/components/ui/input.tsx";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
	type,
	className: cn("flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-border", "placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 6,
	columnNumber: 5
}, void 0));
Input.displayName = "Input";
var _jsxFileName$7 = "/app/applet/src/components/ui/label.tsx";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn("text-xs font-medium tracking-wide text-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 9,
	columnNumber: 3
}, void 0));
Label.displayName = "Label";
var _jsxFileName$6 = "/app/applet/src/components/ui/scroll-area.tsx";
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root$1, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Viewport, {
		className: "h-full w-full rounded-[inherit]",
		children
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 10,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scrollbar, {
		orientation: "vertical",
		className: "flex w-2.5 touch-none p-px select-none",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Thumb, { className: "relative flex-1 rounded-full bg-border" }, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 17,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 13,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$6,
	lineNumber: 9,
	columnNumber: 3
}, void 0));
ScrollArea.displayName = "ScrollArea";
var _jsxFileName$5 = "/app/applet/src/components/ui/separator.tsx";
function Separator({ className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("h-px w-full bg-border", className),
		role: "separator"
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 4,
		columnNumber: 10
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/ui/slider.tsx";
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none items-center select-none", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderTrack, {
		className: "relative h-1 w-full grow overflow-hidden rounded-full bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderRange, { className: "absolute h-full bg-accent" }, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 15,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 14,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderThumb, { className: "block size-4 rounded-full bg-ivory shadow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" }, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 17,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$4,
	lineNumber: 9,
	columnNumber: 3
}, void 0));
Slider.displayName = "Slider";
var _jsxFileName$3 = "/app/applet/src/components/ui/textarea.tsx";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
	className: cn("flex min-h-24 w-full rounded-md bg-elevated px-3 py-2 text-sm text-fg shadow-border", "placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 6,
	columnNumber: 5
}, void 0));
Textarea.displayName = "Textarea";
function clampAngle(joint, angle) {
	return Math.max(joint.minAngle, Math.min(joint.maxAngle, angle));
}
function easeT(t, ease) {
	const x = Math.max(0, Math.min(1, t));
	if (ease === "sine") return .5 - .5 * Math.cos(Math.PI * x);
	if (ease === "quad-out") return 1 - (1 - x) * (1 - x);
	if (ease === "quad-in") return x * x;
	return x;
}
function sampleTrack(keys, tNorm) {
	if (!keys.length) return 0;
	const sorted = [...keys].sort((a, b) => a.t - b.t);
	const first = sorted[0];
	const last = sorted[sorted.length - 1];
	if (!first || !last) return 0;
	if (tNorm <= first.t) return first.angle;
	if (tNorm >= last.t) return last.angle;
	for (let i = 0; i < sorted.length - 1; i++) {
		const a = sorted[i];
		const b = sorted[i + 1];
		if (!a || !b) continue;
		if (tNorm >= a.t && tNorm <= b.t) {
			const span = b.t - a.t || 1;
			const u = easeT((tNorm - a.t) / span, a.ease);
			return a.angle + (b.angle - a.angle) * u;
		}
	}
	return last.angle;
}
function anglesAt(joints, anim, time) {
	const out = {};
	for (const joint of joints) out[joint.id] = 0;
	if (!anim || anim.duration <= 0) return out;
	const tNorm = anim.loop ? (time / anim.duration % 1 + 1) % 1 : Math.max(0, Math.min(1, time / anim.duration));
	for (const joint of joints) {
		const track = anim.tracks[joint.id];
		if (!track) continue;
		out[joint.id] = clampAngle(joint, sampleTrack(track, tNorm));
	}
	return out;
}
function findJoint(joints, ...needles) {
	const n = needles.map((s) => s.toLowerCase());
	return joints.find((j) => n.some((k) => j.id === k || j.id.includes(k) || j.label.toLowerCase().includes(k)));
}
function k(t, angle, ease = "sine") {
	return {
		t,
		angle,
		ease
	};
}
function setTrack(tracks, joint, keys) {
	if (!joint) return;
	tracks[joint.id] = keys.map((key) => ({
		...key,
		angle: clampAngle(joint, key.angle)
	}));
}
function presetAnimation(name, joints) {
	const tracks = {};
	const head = findJoint(joints, "head");
	const torso = findJoint(joints, "torso", "chest", "body", "hips");
	const armL = findJoint(joints, "shoulder_l", "arm_l", "wing_l");
	const armR = findJoint(joints, "shoulder_r", "arm_r", "wing_r");
	const elbowL = findJoint(joints, "elbow_l");
	const elbowR = findJoint(joints, "elbow_r");
	const hipL = findJoint(joints, "hip_l", "leg_l");
	const hipR = findJoint(joints, "hip_r", "leg_r");
	const kneeL = findJoint(joints, "knee_l");
	const kneeR = findJoint(joints, "knee_r");
	const footL = findJoint(joints, "foot_l", "hand_l");
	const footR = findJoint(joints, "foot_r", "hand_r");
	const tail = findJoint(joints, "tail");
	const id = name.toLowerCase().replace(/\s+/g, "-");
	if (id === "idle") {
		setTrack(tracks, torso, [
			k(0, 0),
			k(.5, 3),
			k(1, 0)
		]);
		setTrack(tracks, head, [
			k(0, -4),
			k(.5, 5),
			k(1, -4)
		]);
		setTrack(tracks, armL, [
			k(0, -6),
			k(.5, 6),
			k(1, -6)
		]);
		setTrack(tracks, armR, [
			k(0, 6),
			k(.5, -6),
			k(1, 6)
		]);
		setTrack(tracks, tail, [
			k(0, -10),
			k(.5, 12),
			k(1, -10)
		]);
		return {
			id: "idle",
			name: "Idle",
			prompt: "idle breath",
			duration: 2.4,
			loop: true,
			tracks
		};
	}
	if (id === "walk" || id === "walking") {
		setTrack(tracks, hipL, [
			k(0, 28),
			k(.5, -24),
			k(1, 28)
		]);
		setTrack(tracks, hipR, [
			k(0, -24),
			k(.5, 28),
			k(1, -24)
		]);
		setTrack(tracks, kneeL, [
			k(0, 8),
			k(.25, 55),
			k(.5, 6),
			k(.75, 18),
			k(1, 8)
		]);
		setTrack(tracks, kneeR, [
			k(0, 6),
			k(.25, 18),
			k(.5, 8),
			k(.75, 55),
			k(1, 6)
		]);
		setTrack(tracks, armL, [
			k(0, -22),
			k(.5, 26),
			k(1, -22)
		]);
		setTrack(tracks, armR, [
			k(0, 26),
			k(.5, -22),
			k(1, 26)
		]);
		setTrack(tracks, elbowL, [
			k(0, 18),
			k(.5, 40),
			k(1, 18)
		]);
		setTrack(tracks, elbowR, [
			k(0, 40),
			k(.5, 18),
			k(1, 40)
		]);
		setTrack(tracks, head, [
			k(0, 4),
			k(.5, -4),
			k(1, 4)
		]);
		setTrack(tracks, tail, [
			k(0, 18),
			k(.5, -18),
			k(1, 18)
		]);
		setTrack(tracks, footL, [
			k(0, 8),
			k(.5, -6),
			k(1, 8)
		]);
		setTrack(tracks, footR, [
			k(0, -6),
			k(.5, 8),
			k(1, -6)
		]);
		return {
			id: "walk",
			name: "Walk",
			prompt: "walk cycle",
			duration: .86,
			loop: true,
			tracks
		};
	}
	if (id === "run" || id === "running") {
		setTrack(tracks, hipL, [
			k(0, 38),
			k(.5, -32),
			k(1, 38)
		]);
		setTrack(tracks, hipR, [
			k(0, -32),
			k(.5, 38),
			k(1, -32)
		]);
		setTrack(tracks, kneeL, [
			k(0, 20),
			k(.25, 80),
			k(.5, 10),
			k(1, 20)
		]);
		setTrack(tracks, kneeR, [
			k(0, 10),
			k(.5, 20),
			k(.75, 80),
			k(1, 10)
		]);
		setTrack(tracks, armL, [
			k(0, -40),
			k(.5, 36),
			k(1, -40)
		]);
		setTrack(tracks, armR, [
			k(0, 36),
			k(.5, -40),
			k(1, 36)
		]);
		setTrack(tracks, torso, [
			k(0, 6),
			k(.5, 2),
			k(1, 6)
		]);
		setTrack(tracks, head, [k(0, -6), k(1, -6)]);
		return {
			id: "run",
			name: "Run",
			prompt: "run cycle",
			duration: .52,
			loop: true,
			tracks
		};
	}
	if (id === "hunt" || id === "hunting" || id === "stalk") {
		setTrack(tracks, torso, [
			k(0, 16),
			k(.5, 22),
			k(1, 16)
		]);
		setTrack(tracks, head, [
			k(0, 12),
			k(.35, 18),
			k(.7, 8),
			k(1, 12)
		]);
		setTrack(tracks, hipL, [
			k(0, 18),
			k(.5, -8),
			k(1, 18)
		]);
		setTrack(tracks, hipR, [
			k(0, -10),
			k(.5, 16),
			k(1, -10)
		]);
		setTrack(tracks, kneeL, [
			k(0, 40),
			k(.5, 28),
			k(1, 40)
		]);
		setTrack(tracks, kneeR, [
			k(0, 30),
			k(.5, 44),
			k(1, 30)
		]);
		setTrack(tracks, armL, [
			k(0, 28),
			k(.5, 40),
			k(1, 28)
		]);
		setTrack(tracks, armR, [
			k(0, 34),
			k(.5, 22),
			k(1, 34)
		]);
		setTrack(tracks, tail, [
			k(0, -8),
			k(.5, 20),
			k(1, -8)
		]);
		return {
			id: "hunt",
			name: "Hunt",
			prompt: "hunting stalk",
			duration: 1.6,
			loop: true,
			tracks
		};
	}
	if (id === "spawn" || id === "appear" || id === "awaken") {
		setTrack(tracks, torso, [
			k(0, 28, "quad-out"),
			k(.45, -4, "sine"),
			k(1, 0)
		]);
		setTrack(tracks, head, [
			k(0, 40, "quad-out"),
			k(.5, -8),
			k(1, 0)
		]);
		setTrack(tracks, armL, [
			k(0, 70, "quad-out"),
			k(.55, -12),
			k(1, 0)
		]);
		setTrack(tracks, armR, [
			k(0, -70, "quad-out"),
			k(.55, 12),
			k(1, 0)
		]);
		setTrack(tracks, hipL, [
			k(0, 50, "quad-out"),
			k(.6, -6),
			k(1, 0)
		]);
		setTrack(tracks, hipR, [
			k(0, -50, "quad-out"),
			k(.6, 6),
			k(1, 0)
		]);
		setTrack(tracks, kneeL, [
			k(0, 80),
			k(.6, 8),
			k(1, 0)
		]);
		setTrack(tracks, kneeR, [
			k(0, 80),
			k(.6, 8),
			k(1, 0)
		]);
		return {
			id: "spawn",
			name: "Spawn",
			prompt: "spawning awaken",
			duration: 1.35,
			loop: false,
			tracks
		};
	}
	if (id === "wave") {
		setTrack(tracks, armR, [k(0, -70), k(1, -70)]);
		setTrack(tracks, elbowR, [
			k(0, -10),
			k(.25, -50),
			k(.5, -8),
			k(.75, -50),
			k(1, -10)
		]);
		setTrack(tracks, head, [
			k(0, 6),
			k(.5, -4),
			k(1, 6)
		]);
		setTrack(tracks, torso, [
			k(0, -4),
			k(.5, 4),
			k(1, -4)
		]);
		return {
			id: "wave",
			name: "Wave",
			prompt: "wave hello",
			duration: 1.2,
			loop: true,
			tracks
		};
	}
	if (id === "bend" || id === "bend-test") {
		setTrack(tracks, torso, [
			k(0, 0),
			k(.35, 32, "quad-out"),
			k(.7, 20),
			k(1, 0)
		]);
		setTrack(tracks, head, [
			k(0, 0),
			k(.35, 18),
			k(.7, 10),
			k(1, 0)
		]);
		setTrack(tracks, armL, [
			k(0, 0),
			k(.35, -18),
			k(.7, -10),
			k(1, 0)
		]);
		setTrack(tracks, armR, [
			k(0, 0),
			k(.35, 18),
			k(.7, 10),
			k(1, 0)
		]);
		setTrack(tracks, hipL, [
			k(0, 0),
			k(.35, 14),
			k(.7, 8),
			k(1, 0)
		]);
		setTrack(tracks, hipR, [
			k(0, 0),
			k(.35, 14),
			k(.7, 8),
			k(1, 0)
		]);
		setTrack(tracks, elbowL, [
			k(0, 0),
			k(.35, 28),
			k(.7, 12),
			k(1, 0)
		]);
		setTrack(tracks, elbowR, [
			k(0, 0),
			k(.35, 28),
			k(.7, 12),
			k(1, 0)
		]);
		return {
			id: "bend",
			name: "Bend test",
			prompt: "bend test",
			duration: 1.4,
			loop: true,
			tracks
		};
	}
	if (id === "bow") {
		setTrack(tracks, torso, [
			k(0, 0, "sine"),
			k(.45, 38, "sine"),
			k(.75, 38),
			k(1, 0)
		]);
		setTrack(tracks, head, [
			k(0, 0),
			k(.45, 22),
			k(.75, 22),
			k(1, 0)
		]);
		setTrack(tracks, armL, [
			k(0, 0),
			k(.45, 18),
			k(1, 0)
		]);
		setTrack(tracks, armR, [
			k(0, 0),
			k(.45, 18),
			k(1, 0)
		]);
		return {
			id: "bow",
			name: "Bow",
			prompt: "bow",
			duration: 1.8,
			loop: false,
			tracks
		};
	}
	if (id === "jump") {
		setTrack(tracks, hipL, [
			k(0, 8),
			k(.18, 40),
			k(.4, -8),
			k(.7, 12),
			k(1, 0)
		]);
		setTrack(tracks, hipR, [
			k(0, 8),
			k(.18, 40),
			k(.4, -8),
			k(.7, 12),
			k(1, 0)
		]);
		setTrack(tracks, kneeL, [
			k(0, 10),
			k(.18, 70),
			k(.4, 4),
			k(.7, 28),
			k(1, 0)
		]);
		setTrack(tracks, kneeR, [
			k(0, 10),
			k(.18, 70),
			k(.4, 4),
			k(.7, 28),
			k(1, 0)
		]);
		setTrack(tracks, armL, [
			k(0, 8),
			k(.18, -40),
			k(.45, 20),
			k(1, 0)
		]);
		setTrack(tracks, armR, [
			k(0, 8),
			k(.18, 40),
			k(.45, -20),
			k(1, 0)
		]);
		setTrack(tracks, torso, [
			k(0, 0),
			k(.18, 10),
			k(.4, -8),
			k(1, 0)
		]);
		return {
			id: "jump",
			name: "Jump",
			prompt: "jump",
			duration: .9,
			loop: false,
			tracks
		};
	}
	if (id === "look" || id === "look-around") {
		setTrack(tracks, head, [
			k(0, 0),
			k(.25, -28),
			k(.5, 26),
			k(.75, -12),
			k(1, 0)
		]);
		setTrack(tracks, torso, [
			k(0, 0),
			k(.25, -8),
			k(.5, 8),
			k(1, 0)
		]);
		return {
			id: "look",
			name: "Look around",
			prompt: "look around",
			duration: 2.2,
			loop: true,
			tracks
		};
	}
	return presetAnimation("idle", joints);
}
var PRESET_MOTIONS = [
	{
		id: "idle",
		label: "Idle"
	},
	{
		id: "wave",
		label: "Wave"
	},
	{
		id: "walk",
		label: "Walk"
	},
	{
		id: "bend",
		label: "Bend test"
	},
	{
		id: "run",
		label: "Run"
	},
	{
		id: "hunt",
		label: "Hunt"
	},
	{
		id: "spawn",
		label: "Spawn"
	},
	{
		id: "bow",
		label: "Bow"
	},
	{
		id: "jump",
		label: "Jump"
	},
	{
		id: "look",
		label: "Look"
	}
];
function normalizeAiAnimation(raw, joints, prompt) {
	const ids = new Set(joints.map((j) => j.id));
	const tracks = {};
	for (const [key, frames] of Object.entries(raw.tracks ?? {})) {
		let id = key;
		if (!ids.has(id)) {
			const match = joints.find((j) => j.id.includes(key) || key.includes(j.id) || j.label.toLowerCase() === key.toLowerCase());
			if (match) id = match.id;
			else continue;
		}
		const joint = joints.find((j) => j.id === id);
		if (!joint || !frames?.length) continue;
		tracks[id] = frames.map((f) => ({
			t: Math.max(0, Math.min(1, Number(f.t) || 0)),
			angle: clampAngle(joint, Number(f.angle) || 0),
			ease: [
				"linear",
				"sine",
				"quad-out",
				"quad-in"
			].includes(String(f.ease)) ? f.ease : "sine"
		})).sort((a, b) => a.t - b.t);
	}
	return {
		id: (raw.id || prompt || "custom").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "custom",
		name: raw.name?.trim() || prompt.trim() || "Custom",
		prompt,
		duration: Math.max(.35, Math.min(8, Number(raw.duration) || 1.2)),
		loop: raw.loop !== false,
		tracks
	};
}
var createSsrRpc = (functionId) => {
	const url = "/Puppet/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var analyzeFigure = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("a19ca5e08b5ab708fca8cab79e2c687689dd09bb80d72155b160f3f612d9359e"));
var composeAnimation = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("9234637ad8fb2b46fe76b02cf7f7a6da3338d782e4dac953cd3ca4bfed99579e"));
var conjureFigure = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("462cf28b778bc6a360ff5f6c317b7727b02a18c86766a0d4c52addb9e86307be"));
function loadHtmlImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that image"));
		img.src = src;
	});
}
function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read the file"));
		reader.readAsDataURL(file);
	});
}
async function prepareSource(src, maxSide = 1024) {
	const img = await loadHtmlImage(src);
	const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
	const width = Math.max(1, Math.round(img.width * scale));
	const height = Math.max(1, Math.round(img.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is unavailable");
	ctx.drawImage(img, 0, 0, width, height);
	return {
		dataUrl: canvas.toDataURL("image/png"),
		width,
		height
	};
}
async function jpegForVision(src, maxSide = 768) {
	const img = await loadHtmlImage(src);
	const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
	const width = Math.max(1, Math.round(img.width * scale));
	const height = Math.max(1, Math.round(img.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is unavailable");
	ctx.drawImage(img, 0, 0, width, height);
	return canvas.toDataURL("image/jpeg", .72);
}
function readImageData(img) {
	const canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("Canvas is unavailable");
	ctx.drawImage(img, 0, 0);
	return ctx.getImageData(0, 0, img.width, img.height);
}
function colorDist(r1, g1, b1, r2, g2, b2) {
	const dr = r1 - r2;
	const dg = g1 - g2;
	const db = b1 - b2;
	return Math.sqrt(dr * dr + dg * dg + db * db);
}
function detectBackground(image) {
	const { width, height, data } = image;
	const pts = [
		[2, 2],
		[width - 3, 2],
		[2, height - 3],
		[width - 3, height - 3],
		[Math.floor(width / 2), 2],
		[Math.floor(width / 2), height - 3],
		[2, Math.floor(height / 2)],
		[width - 3, Math.floor(height / 2)],
		[Math.floor(width * .25), 2],
		[Math.floor(width * .75), 2]
	];
	const samples = [];
	let hasTransparentSample = false;
	for (const [x, y] of pts) {
		const i = (y * width + x) * 4;
		const alpha = data[i + 3] ?? 0;
		hasTransparentSample ||= alpha < 12;
		samples.push([
			data[i] ?? 0,
			data[i + 1] ?? 0,
			data[i + 2] ?? 0
		]);
	}
	if (hasTransparentSample) return {
		r: 0,
		g: 0,
		b: 0,
		threshold: 0,
		lift: false
	};
	const med = [
		0,
		1,
		2
	].map((c) => {
		const v = samples.map((s) => s[c] ?? 0).sort((a, b) => a - b);
		return v[Math.floor(v.length / 2)] ?? 0;
	});
	let maxDist = 0;
	for (const s of samples) maxDist = Math.max(maxDist, colorDist(s[0] ?? 0, s[1] ?? 0, s[2] ?? 0, med[0], med[1], med[2]));
	const threshold = Math.max(30, maxDist + 20);
	const ratio = countFigurePixels(image, {
		r: med[0],
		g: med[1],
		b: med[2],
		threshold,
		lift: true
	}) / (width * height);
	return {
		r: med[0],
		g: med[1],
		b: med[2],
		threshold,
		lift: ratio > .04 && ratio < .88
	};
}
/**
* Build a silhouette without globally deleting pixels merely because their
* RGB value resembles the background. Background removal is edge-connected:
* only background-colored pixels reachable from the canvas border are lifted.
* This keeps dark eyes, outlines, shadows and other artwork intact even when
* they are the same color as the studio background.
*/
function buildFigureMask(image, bg) {
	const { width, height, data } = image;
	const mask = new Uint8Array(width * height);
	const background = new Uint8Array(width * height);
	const queue = new Int32Array(width * height);
	let head = 0;
	let tail = 0;
	const canBeBackground = (index) => {
		if ((data[index * 4 + 3] ?? 0) < 12) return true;
		if (!bg.lift) return false;
		return colorDist(data[index * 4] ?? 0, data[index * 4 + 1] ?? 0, data[index * 4 + 2] ?? 0, bg.r, bg.g, bg.b) < bg.threshold;
	};
	const seed = (index) => {
		if (background[index] || !canBeBackground(index)) return;
		background[index] = 1;
		queue[tail++] = index;
	};
	for (let x = 0; x < width; x++) {
		seed(x);
		seed((height - 1) * width + x);
	}
	for (let y = 1; y < height - 1; y++) {
		seed(y * width);
		seed(y * width + width - 1);
	}
	while (head < tail) {
		const index = queue[head++];
		const x = index % width;
		const y = Math.floor(index / width);
		const neighbors = [
			index - 1,
			index + 1,
			index - width,
			index + width
		];
		for (const next of neighbors) {
			if (next < 0 || next >= width * height) continue;
			if (next === index - 1 && x === 0) continue;
			if (next === index + 1 && x === width - 1) continue;
			if (next === index - width && y === 0) continue;
			if (next === index + width && y === height - 1) continue;
			if (!background[next]) seed(next);
		}
	}
	for (let i = 0; i < width * height; i++) if ((data[i * 4 + 3] ?? 0) >= 12 && !background[i]) mask[i] = 1;
	return mask;
}
function countFigurePixels(image, bg) {
	let n = 0;
	const { data, width, height } = image;
	for (let i = 0; i < width * height; i++) {
		if ((data[i * 4 + 3] ?? 0) < 12) continue;
		if (bg.lift && colorDist(data[i * 4] ?? 0, data[i * 4 + 1] ?? 0, data[i * 4 + 2] ?? 0, bg.r, bg.g, bg.b) < bg.threshold) continue;
		n++;
	}
	return n;
}
function figureBBox(mask, width, height) {
	let minX = width;
	let minY = height;
	let maxX = 0;
	let maxY = 0;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		if (!mask[y * width + x]) continue;
		if (x < minX) minX = x;
		if (y < minY) minY = y;
		if (x > maxX) maxX = x;
		if (y > maxY) maxY = y;
	}
	if (maxX < minX) return {
		x: 0,
		y: 0,
		w: width,
		h: height
	};
	const pad = 4;
	const x = Math.max(0, minX - pad);
	const y = Math.max(0, minY - pad);
	return {
		x,
		y,
		w: Math.min(width - x, maxX - minX + 8),
		h: Math.min(height - y, maxY - minY + 8)
	};
}
function contain(imgW, imgH, boxW, boxH) {
	const s = Math.min(boxW / imgW, boxH / imgH);
	const w = imgW * s;
	const h = imgH * s;
	return {
		x: (boxW - w) / 2,
		y: (boxH - h) / 2,
		w,
		h,
		s
	};
}
function childrenOf(id, joints) {
	return joints.filter((j) => j.parentId === id);
}
function sourceMask(image, bg) {
	return buildFigureMask(image, bg);
}
function pointSegmentDistanceSquared(px, py, ax, ay, bx, by) {
	const abx = bx - ax;
	const aby = by - ay;
	const apx = px - ax;
	const apy = py - ay;
	const ab2 = abx * abx + aby * aby;
	const t = ab2 === 0 ? 0 : Math.max(0, Math.min(1, (apx * abx + apy * aby) / ab2));
	const cx = ax + abx * t;
	const cy = ay + aby * t;
	const dx = px - cx;
	const dy = py - cy;
	return dx * dx + dy * dy;
}
function segmentProjection(px, py, ax, ay, bx, by) {
	const dx = bx - ax;
	const dy = by - ay;
	const lengthSquared = dx * dx + dy * dy;
	if (lengthSquared === 0) return 0;
	return ((px - ax) * dx + (py - ay) * dy) / lengthSquared;
}
function buildCutSegments(joints) {
	return joints.map((joint) => {
		const kids = childrenOf(joint.id, joints);
		if (kids.length === 1) {
			const child = kids[0];
			return {
				joint,
				ax: joint.x,
				ay: joint.y,
				bx: child.x,
				by: child.y,
				radius: Math.max(6, joint.thickness),
				leaf: false
			};
		}
		if (kids.length > 1) {
			const bx = kids.reduce((sum, child) => sum + child.x, joint.x) / (kids.length + 1);
			const by = kids.reduce((sum, child) => sum + child.y, joint.y) / (kids.length + 1);
			return {
				joint,
				ax: joint.x,
				ay: joint.y,
				bx,
				by,
				radius: Math.max(8, joint.thickness * 1.15),
				leaf: false
			};
		}
		const parent = joint.parentId ? joints.find((j) => j.id === joint.parentId) : null;
		if (parent) {
			const dx = joint.x - parent.x;
			const dy = joint.y - parent.y;
			const len = Math.hypot(dx, dy) || 1;
			const extension = Math.max(8, Math.min(28, len * .32));
			return {
				joint,
				ax: joint.x,
				ay: joint.y,
				bx: joint.x + dx / len * extension,
				by: joint.y + dy / len * extension,
				radius: Math.max(8, joint.thickness),
				leaf: true
			};
		}
		return {
			joint,
			ax: joint.x,
			ay: joint.y,
			bx: joint.x,
			by: joint.y,
			radius: Math.max(8, joint.thickness),
			leaf: true
		};
	});
}
/**
* Partition the complete foreground silhouette using the bone as a directional
* boundary, rather than deleting everything outside a fixed-width capsule.
*
* The projection gate keeps proximal torso pixels with the parent/root while
* allowing an articulated part to claim its entire visible silhouette width.
* A distance score still resolves overlaps between neighboring bones. There is
* deliberately no distal radius cutoff: artwork is the authority on the part's
* visible shape, while the skeleton only establishes where that shape belongs.
*/
function buildConstrainedOwnership(mask, width, height, segments, rootOwner = 0) {
	const owner = new Int16Array(width * height);
	owner.fill(-1);
	if (!segments.length) return owner;
	for (let i = 0; i < owner.length; i++) {
		if (!mask[i]) continue;
		const x = i % width;
		const y = Math.floor(i / width);
		let best = rootOwner;
		let bestScore = Infinity;
		for (let partIndex = 0; partIndex < segments.length; partIndex++) {
			const segment = segments[partIndex];
			const projection = segmentProjection(x, y, segment.ax, segment.ay, segment.bx, segment.by);
			const isRoot = partIndex === rootOwner;
			const proximalLimit = segment.leaf === true ? -.3 : isRoot ? -.15 : .12;
			const distalLimit = segment.leaf === true ? 1.7 : 1.25;
			if (projection < proximalLimit || projection > distalLimit) continue;
			const distance = Math.sqrt(pointSegmentDistanceSquared(x, y, segment.ax, segment.ay, segment.bx, segment.by));
			const widthScale = Math.max(6, segment.radius);
			const projectionPenalty = projection < 0 ? Math.abs(projection) * 2 : Math.max(0, projection - 1) * 1.5;
			const score = distance / widthScale + projectionPenalty;
			if (score < bestScore) {
				bestScore = score;
				best = partIndex;
			}
		}
		owner[i] = best;
	}
	return owner;
}
function overlapMask(mask, width, height, joint, radius) {
	const result = new Uint8Array(width * height);
	const r2 = radius * radius;
	const minX = Math.max(0, Math.floor(joint.x - radius));
	const maxX = Math.min(width - 1, Math.ceil(joint.x + radius));
	const minY = Math.max(0, Math.floor(joint.y - radius));
	const maxY = Math.min(height - 1, Math.ceil(joint.y + radius));
	for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
		if (!mask[y * width + x]) continue;
		const dx = x - joint.x;
		const dy = y - joint.y;
		if (dx * dx + dy * dy <= r2) result[y * width + x] = 1;
	}
	return result;
}
function boundsForPart(owner, mask, overlap, partIndex, width, height) {
	let minX = width, minY = height, maxX = -1, maxY = -1;
	for (let i = 0; i < owner.length; i++) {
		if (!mask[i] || owner[i] !== partIndex && !overlap[i]) continue;
		const x = i % width;
		const y = Math.floor(i / width);
		minX = Math.min(minX, x);
		minY = Math.min(minY, y);
		maxX = Math.max(maxX, x);
		maxY = Math.max(maxY, y);
	}
	return maxX < minX ? null : {
		minX,
		minY,
		maxX,
		maxY
	};
}
function maskToCanvas(alpha, width, height) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is unavailable");
	const img = ctx.createImageData(width, height);
	for (let i = 0; i < alpha.length; i++) {
		const d = i * 4;
		img.data[d] = 255;
		img.data[d + 1] = 255;
		img.data[d + 2] = 255;
		img.data[d + 3] = alpha[i] ? 255 : 0;
	}
	ctx.putImageData(img, 0, 0);
	return canvas;
}
function renderAttachmentFromMask(image, cropMinX, cropMinY, cw, ch, alpha) {
	const canvas = document.createElement("canvas");
	canvas.width = cw;
	canvas.height = ch;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is unavailable");
	const out = ctx.createImageData(cw, ch);
	let pixelCount = 0;
	for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
		const m = alpha[y * cw + x];
		if (!m) continue;
		const sx = cropMinX + x;
		const src = ((cropMinY + y) * image.width + sx) * 4;
		const dst = (y * cw + x) * 4;
		out.data[dst] = image.data[src] ?? 0;
		out.data[dst + 1] = image.data[src + 1] ?? 0;
		out.data[dst + 2] = image.data[src + 2] ?? 0;
		out.data[dst + 3] = Math.min(image.data[src + 3] ?? 0, m ? 255 : 0);
		pixelCount++;
	}
	ctx.putImageData(out, 0, 0);
	return {
		canvas,
		pixelCount
	};
}
function estimatePartConfidence(joint, pixelCount, cropWidth, cropHeight, thickness) {
	const density = pixelCount / Math.max(1, cropWidth * cropHeight);
	const expectedArea = Math.max(1, thickness * thickness * 2.5);
	const sizeScore = Math.min(1, pixelCount / expectedArea);
	return Math.max(0, Math.min(1, sizeScore * (density > .08 && density < .85 ? 1 : .5)));
}
async function cutParts(sourceDataUrl, joints, bg) {
	const image = readImageData(await loadHtmlImage(sourceDataUrl));
	const { width, height } = image;
	const mask = sourceMask(image, bg);
	const segments = buildCutSegments(joints);
	if (!segments.length) return [];
	const owner = buildConstrainedOwnership(mask, width, height, segments, 0);
	const overlaps = /* @__PURE__ */ new Map();
	for (const joint of joints) overlaps.set(joint.id, overlapMask(mask, width, height, joint, Math.max(12, joint.thickness * 1.6)));
	const parts = [];
	for (let partIndex = 0; partIndex < segments.length; partIndex++) {
		const joint = segments[partIndex].joint;
		const overlap = overlaps.get(joint.id) ?? new Uint8Array(width * height);
		const boundsOverlap = new Uint8Array(width * height);
		const kids = childrenOf(joint.id, joints);
		for (let i = 0; i < boundsOverlap.length; i++) if (overlap[i]) boundsOverlap[i] = 1;
		for (const child of kids) {
			const childOverlap = overlaps.get(child.id);
			if (!childOverlap) continue;
			for (let i = 0; i < boundsOverlap.length; i++) if (childOverlap[i]) boundsOverlap[i] = 1;
		}
		const bounds = boundsForPart(owner, mask, boundsOverlap, partIndex, width, height);
		if (!bounds) continue;
		const pad = 4;
		const cropMinX = Math.max(0, bounds.minX - pad);
		const cropMinY = Math.max(0, bounds.minY - pad);
		const cropMaxX = Math.min(width - 1, bounds.maxX + pad);
		const cropMaxY = Math.min(height - 1, bounds.maxY + pad);
		const cw = cropMaxX - cropMinX + 1;
		const ch = cropMaxY - cropMinY + 1;
		const alpha = new Uint8Array(cw * ch);
		for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
			const sx = cropMinX + x;
			const srcIndex = (cropMinY + y) * width + sx;
			const isOwned = owner[srcIndex] === partIndex;
			let isOverlap = overlap[srcIndex] === 1;
			if (!isOverlap) {
				for (const child of kids) if ((overlaps.get(child.id)?.[srcIndex] ?? 0) === 1) {
					isOverlap = true;
					break;
				}
			}
			if (!mask[srcIndex] || !isOwned && !isOverlap) continue;
			alpha[y * cw + x] = 255;
		}
		const { canvas: rgbCanvas, pixelCount } = renderAttachmentFromMask(image, cropMinX, cropMinY, cw, ch, alpha);
		if (pixelCount < 8) continue;
		const alphaCanvas = maskToCanvas(alpha, cw, ch);
		parts.push({
			id: joint.id,
			boneId: joint.id,
			label: joint.label,
			parentBoneId: joint.parentId,
			role: "main",
			dataUrl: rgbCanvas.toDataURL("image/png"),
			width: cw,
			height: ch,
			cropX: cropMinX,
			cropY: cropMinY,
			pivotX: joint.x,
			pivotY: joint.y,
			localPivotX: joint.x - cropMinX,
			localPivotY: joint.y - cropMinY,
			zIndex: joint.zIndex,
			minAngle: joint.minAngle,
			maxAngle: joint.maxAngle,
			thickness: joint.thickness,
			pixelCount,
			mask: {
				bboxX: cropMinX,
				bboxY: cropMinY,
				width: cw,
				height: ch,
				alphaPngDataUrl: alphaCanvas.toDataURL("image/png"),
				source: "auto",
				confidence: estimatePartConfidence(joint, pixelCount, cw, ch, joint.thickness)
			}
		});
	}
	return parts;
}
var HUMANOID = [
	{
		id: "hips",
		label: "Hips",
		parentId: null,
		x: .5,
		y: .52,
		thickness: .1,
		minAngle: -18,
		maxAngle: 18,
		zIndex: 4
	},
	{
		id: "torso",
		label: "Torso",
		parentId: "hips",
		x: .5,
		y: .34,
		thickness: .12,
		minAngle: -22,
		maxAngle: 22,
		zIndex: 5
	},
	{
		id: "head",
		label: "Head",
		parentId: "torso",
		x: .5,
		y: .12,
		thickness: .11,
		minAngle: -38,
		maxAngle: 38,
		zIndex: 8
	},
	{
		id: "shoulder_l",
		label: "Left shoulder",
		parentId: "torso",
		x: .34,
		y: .28,
		thickness: .055,
		minAngle: -80,
		maxAngle: 90,
		zIndex: 3
	},
	{
		id: "elbow_l",
		label: "Left elbow",
		parentId: "shoulder_l",
		x: .2,
		y: .4,
		thickness: .045,
		minAngle: -10,
		maxAngle: 140,
		zIndex: 2
	},
	{
		id: "hand_l",
		label: "Left hand",
		parentId: "elbow_l",
		x: .1,
		y: .52,
		thickness: .04,
		minAngle: -50,
		maxAngle: 50,
		zIndex: 1
	},
	{
		id: "shoulder_r",
		label: "Right shoulder",
		parentId: "torso",
		x: .66,
		y: .28,
		thickness: .055,
		minAngle: -90,
		maxAngle: 80,
		zIndex: 7
	},
	{
		id: "elbow_r",
		label: "Right elbow",
		parentId: "shoulder_r",
		x: .8,
		y: .4,
		thickness: .045,
		minAngle: -140,
		maxAngle: 10,
		zIndex: 8
	},
	{
		id: "hand_r",
		label: "Right hand",
		parentId: "elbow_r",
		x: .9,
		y: .52,
		thickness: .04,
		minAngle: -50,
		maxAngle: 50,
		zIndex: 9
	},
	{
		id: "hip_l",
		label: "Left hip",
		parentId: "hips",
		x: .42,
		y: .55,
		thickness: .06,
		minAngle: -40,
		maxAngle: 50,
		zIndex: 3
	},
	{
		id: "knee_l",
		label: "Left knee",
		parentId: "hip_l",
		x: .4,
		y: .74,
		thickness: .05,
		minAngle: -10,
		maxAngle: 110,
		zIndex: 2
	},
	{
		id: "foot_l",
		label: "Left foot",
		parentId: "knee_l",
		x: .38,
		y: .94,
		thickness: .04,
		minAngle: -40,
		maxAngle: 40,
		zIndex: 1
	},
	{
		id: "hip_r",
		label: "Right hip",
		parentId: "hips",
		x: .58,
		y: .55,
		thickness: .06,
		minAngle: -50,
		maxAngle: 40,
		zIndex: 6
	},
	{
		id: "knee_r",
		label: "Right knee",
		parentId: "hip_r",
		x: .6,
		y: .74,
		thickness: .05,
		minAngle: -110,
		maxAngle: 10,
		zIndex: 7
	},
	{
		id: "foot_r",
		label: "Right foot",
		parentId: "knee_r",
		x: .62,
		y: .94,
		thickness: .04,
		minAngle: -40,
		maxAngle: 40,
		zIndex: 8
	}
];
var TAIL = {
	id: "tail",
	label: "Tail",
	parentId: "hips",
	x: .58,
	y: .62,
	thickness: .045,
	minAngle: -70,
	maxAngle: 70,
	zIndex: 0
};
var QUADRUPED = [
	{
		id: "chest",
		label: "Chest",
		parentId: null,
		x: .48,
		y: .46,
		thickness: .12,
		minAngle: -16,
		maxAngle: 16,
		zIndex: 4
	},
	{
		id: "hips",
		label: "Hips",
		parentId: "chest",
		x: .68,
		y: .5,
		thickness: .11,
		minAngle: -20,
		maxAngle: 20,
		zIndex: 3
	},
	{
		id: "neck",
		label: "Neck",
		parentId: "chest",
		x: .34,
		y: .38,
		thickness: .07,
		minAngle: -30,
		maxAngle: 35,
		zIndex: 5
	},
	{
		id: "head",
		label: "Head",
		parentId: "neck",
		x: .2,
		y: .28,
		thickness: .09,
		minAngle: -40,
		maxAngle: 40,
		zIndex: 6
	},
	{
		id: "shoulder_l",
		label: "Front left",
		parentId: "chest",
		x: .4,
		y: .52,
		thickness: .05,
		minAngle: -50,
		maxAngle: 50,
		zIndex: 2
	},
	{
		id: "elbow_l",
		label: "Front left knee",
		parentId: "shoulder_l",
		x: .38,
		y: .7,
		thickness: .04,
		minAngle: -20,
		maxAngle: 90,
		zIndex: 1
	},
	{
		id: "hand_l",
		label: "Front left paw",
		parentId: "elbow_l",
		x: .36,
		y: .9,
		thickness: .035,
		minAngle: -30,
		maxAngle: 30,
		zIndex: 0
	},
	{
		id: "shoulder_r",
		label: "Front right",
		parentId: "chest",
		x: .46,
		y: .52,
		thickness: .05,
		minAngle: -50,
		maxAngle: 50,
		zIndex: 7
	},
	{
		id: "elbow_r",
		label: "Front right knee",
		parentId: "shoulder_r",
		x: .44,
		y: .7,
		thickness: .04,
		minAngle: -90,
		maxAngle: 20,
		zIndex: 8
	},
	{
		id: "hand_r",
		label: "Front right paw",
		parentId: "elbow_r",
		x: .42,
		y: .9,
		thickness: .035,
		minAngle: -30,
		maxAngle: 30,
		zIndex: 9
	},
	{
		id: "hip_l",
		label: "Hind left",
		parentId: "hips",
		x: .7,
		y: .54,
		thickness: .055,
		minAngle: -50,
		maxAngle: 50,
		zIndex: 2
	},
	{
		id: "knee_l",
		label: "Hind left knee",
		parentId: "hip_l",
		x: .74,
		y: .72,
		thickness: .045,
		minAngle: -20,
		maxAngle: 100,
		zIndex: 1
	},
	{
		id: "foot_l",
		label: "Hind left paw",
		parentId: "knee_l",
		x: .76,
		y: .92,
		thickness: .035,
		minAngle: -30,
		maxAngle: 30,
		zIndex: 0
	},
	{
		id: "hip_r",
		label: "Hind right",
		parentId: "hips",
		x: .74,
		y: .54,
		thickness: .055,
		minAngle: -50,
		maxAngle: 50,
		zIndex: 6
	},
	{
		id: "knee_r",
		label: "Hind right knee",
		parentId: "hip_r",
		x: .78,
		y: .72,
		thickness: .045,
		minAngle: -100,
		maxAngle: 20,
		zIndex: 7
	},
	{
		id: "foot_r",
		label: "Hind right paw",
		parentId: "knee_r",
		x: .8,
		y: .92,
		thickness: .035,
		minAngle: -30,
		maxAngle: 30,
		zIndex: 8
	},
	{
		id: "tail",
		label: "Tail",
		parentId: "hips",
		x: .88,
		y: .46,
		thickness: .04,
		minAngle: -80,
		maxAngle: 80,
		zIndex: 1
	}
];
var BIRD = [
	{
		id: "body",
		label: "Body",
		parentId: null,
		x: .5,
		y: .52,
		thickness: .14,
		minAngle: -16,
		maxAngle: 16,
		zIndex: 3
	},
	{
		id: "head",
		label: "Head",
		parentId: "body",
		x: .5,
		y: .22,
		thickness: .09,
		minAngle: -40,
		maxAngle: 40,
		zIndex: 6
	},
	{
		id: "wing_l",
		label: "Left wing",
		parentId: "body",
		x: .28,
		y: .48,
		thickness: .08,
		minAngle: -50,
		maxAngle: 80,
		zIndex: 1
	},
	{
		id: "wing_r",
		label: "Right wing",
		parentId: "body",
		x: .72,
		y: .48,
		thickness: .08,
		minAngle: -80,
		maxAngle: 50,
		zIndex: 5
	},
	{
		id: "leg_l",
		label: "Left leg",
		parentId: "body",
		x: .42,
		y: .72,
		thickness: .04,
		minAngle: -40,
		maxAngle: 50,
		zIndex: 2
	},
	{
		id: "foot_l",
		label: "Left foot",
		parentId: "leg_l",
		x: .4,
		y: .92,
		thickness: .035,
		minAngle: -30,
		maxAngle: 30,
		zIndex: 1
	},
	{
		id: "leg_r",
		label: "Right leg",
		parentId: "body",
		x: .58,
		y: .72,
		thickness: .04,
		minAngle: -50,
		maxAngle: 40,
		zIndex: 4
	},
	{
		id: "foot_r",
		label: "Right foot",
		parentId: "leg_r",
		x: .6,
		y: .92,
		thickness: .035,
		minAngle: -30,
		maxAngle: 30,
		zIndex: 5
	},
	{
		id: "tail",
		label: "Tail",
		parentId: "body",
		x: .5,
		y: .7,
		thickness: .06,
		minAngle: -35,
		maxAngle: 35,
		zIndex: 0
	}
];
var SIMPLE = [
	{
		id: "body",
		label: "Body",
		parentId: null,
		x: .5,
		y: .48,
		thickness: .14,
		minAngle: -12,
		maxAngle: 12,
		zIndex: 2
	},
	{
		id: "head",
		label: "Head",
		parentId: "body",
		x: .5,
		y: .18,
		thickness: .1,
		minAngle: -40,
		maxAngle: 40,
		zIndex: 5
	},
	{
		id: "arm_l",
		label: "Left arm",
		parentId: "body",
		x: .22,
		y: .42,
		thickness: .05,
		minAngle: -70,
		maxAngle: 80,
		zIndex: 1
	},
	{
		id: "arm_r",
		label: "Right arm",
		parentId: "body",
		x: .78,
		y: .42,
		thickness: .05,
		minAngle: -80,
		maxAngle: 70,
		zIndex: 4
	},
	{
		id: "leg_l",
		label: "Left leg",
		parentId: "body",
		x: .38,
		y: .8,
		thickness: .05,
		minAngle: -40,
		maxAngle: 50,
		zIndex: 0
	},
	{
		id: "leg_r",
		label: "Right leg",
		parentId: "body",
		x: .62,
		y: .8,
		thickness: .05,
		minAngle: -50,
		maxAngle: 40,
		zIndex: 3
	}
];
var KIND_LABEL = {
	humanoid: "Humanoid",
	tailed: "Tailed biped",
	quadruped: "Quadruped",
	bird: "Bird",
	simple: "Simple"
};
function specsFor(kind) {
	if (kind === "tailed") return [...HUMANOID, TAIL];
	if (kind === "quadruped") return QUADRUPED;
	if (kind === "bird") return BIRD;
	if (kind === "simple") return SIMPLE;
	return HUMANOID;
}
function jointsFromSpecs(specs, bbox) {
	const short = Math.min(bbox.w, bbox.h);
	return specs.map((s) => ({
		id: s.id,
		label: s.label,
		parentId: s.parentId,
		x: bbox.x + s.x * bbox.w,
		y: bbox.y + s.y * bbox.h,
		thickness: Math.max(8, s.thickness * short),
		minAngle: s.minAngle,
		maxAngle: s.maxAngle,
		zIndex: s.zIndex
	}));
}
var SAMPLES = [
	{
		id: "gingerbread",
		name: "Ginger loaf",
		src: "/samples/gingerbread.jpg",
		kind: "humanoid",
		blurb: "Clear limbs. A first pin."
	},
	{
		id: "fox",
		name: "Paper fox",
		src: "/samples/paper-fox.jpg",
		kind: "tailed",
		blurb: "Folk cut, with a tail."
	},
	{
		id: "dancer",
		name: "Basswood dancer",
		src: "/samples/wooden-dancer.jpg",
		kind: "humanoid",
		blurb: "Hinged wood, ready strings."
	}
];
function inMask(mask, width, height, x, y) {
	const ix = Math.round(x);
	const iy = Math.round(y);
	if (ix < 0 || iy < 0 || ix >= width || iy >= height) return false;
	return mask[iy * width + ix] === 1;
}
function centroid(mask, width, height, test) {
	let sx = 0;
	let sy = 0;
	let n = 0;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		if (!mask[y * width + x]) continue;
		if (!test(x, y)) continue;
		sx += x;
		sy += y;
		n++;
	}
	if (!n) return null;
	return {
		x: sx / n,
		y: sy / n
	};
}
function extremum(mask, width, height, score) {
	let best = -Infinity;
	let px = width / 2;
	let py = height / 2;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		if (!mask[y * width + x]) continue;
		const s = score(x, y);
		if (s > best) {
			best = s;
			px = x;
			py = y;
		}
	}
	return {
		x: px,
		y: py
	};
}
function localWidth(mask, width, height, ax, ay, bx, by) {
	const mx = (ax + bx) / 2;
	const my = (ay + by) / 2;
	const dx = bx - ax;
	const dy = by - ay;
	const len = Math.hypot(dx, dy) || 1;
	const nx = -dy / len;
	const ny = dx / len;
	let left = 0;
	let right = 0;
	for (let t = 1; t < 240; t++) {
		if (!inMask(mask, width, height, mx + nx * t, my + ny * t)) break;
		right = t;
	}
	for (let t = 1; t < 240; t++) {
		if (!inMask(mask, width, height, mx - nx * t, my - ny * t)) break;
		left = t;
	}
	return Math.max(6, (left + right) / 2);
}
function lerp(a, b, t) {
	return {
		x: a.x + (b.x - a.x) * t,
		y: a.y + (b.y - a.y) * t
	};
}
function placeFromSilhouette(mask, width, height, kind) {
	const bbox = figureBBox(mask, width, height);
	const joints = jointsFromSpecs(specsFor(kind), bbox);
	if (kind === "quadruped" || kind === "bird" || kind === "simple") {
		refineThickness(joints, mask, width, height);
		return joints;
	}
	const top = bbox.y + bbox.h * .16;
	const head = centroid(mask, width, height, (_x, y) => y <= top) ?? {
		x: bbox.x + bbox.w * .5,
		y: bbox.y + bbox.h * .12
	};
	const hips = centroid(mask, width, height, (x, y) => y >= bbox.y + bbox.h * .46 && y <= bbox.y + bbox.h * .6 && x >= bbox.x + bbox.w * .3 && x <= bbox.x + bbox.w * .7) ?? {
		x: bbox.x + bbox.w * .5,
		y: bbox.y + bbox.h * .52
	};
	const torso = lerp(head, hips, .45);
	const handL = extremum(mask, width, height, (x, y) => -x - y * .15);
	const handR = extremum(mask, width, height, (x, y) => x - y * .15);
	const footL = extremum(mask, width, height, (x, y) => y - x * .35);
	const footR = extremum(mask, width, height, (x, y) => y + x * .35);
	const shoulderL = {
		x: torso.x - bbox.w * .16,
		y: torso.y + bbox.h * .02
	};
	const shoulderR = {
		x: torso.x + bbox.w * .16,
		y: torso.y + bbox.h * .02
	};
	const elbowL = lerp(shoulderL, handL, .52);
	const elbowR = lerp(shoulderR, handR, .52);
	const hipL = {
		x: hips.x - bbox.w * .08,
		y: hips.y + bbox.h * .02
	};
	const hipR = {
		x: hips.x + bbox.w * .08,
		y: hips.y + bbox.h * .02
	};
	const byId = {
		hips,
		torso,
		head,
		shoulder_l: shoulderL,
		elbow_l: elbowL,
		hand_l: handL,
		shoulder_r: shoulderR,
		elbow_r: elbowR,
		hand_r: handR,
		hip_l: hipL,
		knee_l: lerp(hipL, footL, .52),
		foot_l: footL,
		hip_r: hipR,
		knee_r: lerp(hipR, footR, .52),
		foot_r: footR,
		tail: {
			x: hips.x + bbox.w * .08,
			y: hips.y + bbox.h * .12
		}
	};
	for (const joint of joints) {
		const p = byId[joint.id];
		if (!p) continue;
		joint.x = clamp(p.x, 2, width - 3);
		joint.y = clamp(p.y, 2, height - 3);
	}
	refineThickness(joints, mask, width, height);
	return joints;
}
function refineThickness(joints, mask, width, height) {
	const map = new Map(joints.map((j) => [j.id, j]));
	for (const joint of joints) {
		const parent = joint.parentId ? map.get(joint.parentId) : null;
		if (!parent) continue;
		const w = localWidth(mask, width, height, parent.x, parent.y, joint.x, joint.y);
		joint.thickness = Math.max(6, Math.min(joint.thickness * 1.6, w * 1.05));
	}
}
function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function applyAiJoints(raw, width, height, fallback) {
	if (!raw.length) return fallback;
	const short = Math.min(width, height);
	const seen = /* @__PURE__ */ new Set();
	const joints = [];
	for (const item of raw) {
		const id = String(item.id || "").trim().replace(/\s+/g, "_");
		if (!id || seen.has(id)) continue;
		seen.add(id);
		const x = item.x <= 1 && item.x >= 0 ? item.x * width : item.x;
		const y = item.y <= 1 && item.y >= 0 ? item.y * height : item.y;
		const parent = item.parent === id ? null : item.parent ?? null;
		joints.push({
			id,
			label: item.label?.trim() || id.replace(/_/g, " "),
			parentId: parent ? String(parent) : null,
			x: clamp(x, 1, width - 2),
			y: clamp(y, 1, height - 2),
			thickness: Math.max(6, (item.thickness ?? .05) <= 1 ? (item.thickness ?? .05) * short : item.thickness ?? 12),
			minAngle: item.min_angle ?? -45,
			maxAngle: item.max_angle ?? 45,
			zIndex: item.z_index ?? joints.length
		});
	}
	const ids = new Set(joints.map((j) => j.id));
	for (const joint of joints) if (joint.parentId && !ids.has(joint.parentId)) joint.parentId = null;
	if (!joints.some((j) => !j.parentId) && joints[0]) joints[0].parentId = null;
	return joints.length ? joints : fallback;
}
var blankBg = {
	r: 28,
	g: 25,
	b: 22,
	threshold: 36,
	lift: true
};
async function decodeFigure(dataUrl, name) {
	const prepared = await prepareSource(dataUrl);
	const imageData = readImageData(await loadHtmlImage(prepared.dataUrl));
	const bg = detectBackground(imageData);
	const mask = buildFigureMask(imageData, bg);
	return {
		source: {
			dataUrl: prepared.dataUrl,
			width: prepared.width,
			height: prepared.height,
			name
		},
		bg,
		mask
	};
}
var useStudio = create((set, get) => ({
	step: "figure",
	source: null,
	bg: null,
	kind: "humanoid",
	joints: [],
	selectedId: null,
	pinMode: "adjust",
	pinIndex: 0,
	attachments: [],
	attachmentsNeedReview: false,
	partDraftVersion: 0,
	jointVersion: 0,
	animations: [],
	activeAnimId: null,
	playing: false,
	time: 0,
	speed: 1,
	sweepId: null,
	busy: null,
	error: null,
	conjurePrompt: "",
	motionPrompt: "",
	setStep: (step) => {
		set({
			step,
			error: null
		});
		if (step === "parts" && get().source && get().joints.length && !get().attachments.length) get().cutPaper();
	},
	setKind: (kind) => {
		const { source, bg } = get();
		set({ kind });
		if (!source) return;
		(async () => {
			const imageData = readImageData(await loadHtmlImage(source.dataUrl));
			const joints = placeFromSilhouette(buildFigureMask(imageData, bg ?? detectBackground(imageData)), source.width, source.height, kind);
			set({
				joints,
				attachments: [],
				attachmentsNeedReview: false,
				jointVersion: get().jointVersion + 1,
				partDraftVersion: 0,
				selectedId: joints[0]?.id ?? null
			});
		})();
	},
	setName: (name) => {
		const source = get().source;
		if (!source) return;
		set({ source: {
			...source,
			name
		} });
	},
	setConjurePrompt: (v) => set({ conjurePrompt: v }),
	setMotionPrompt: (v) => set({ motionPrompt: v }),
	setSelected: (id) => set({ selectedId: id }),
	setPinMode: (mode) => set({
		pinMode: mode,
		pinIndex: 0
	}),
	moveJoint: (id, x, y) => {
		const { source } = get();
		if (!source) return;
		set({
			joints: get().joints.map((j) => j.id === id ? {
				...j,
				x: Math.max(1, Math.min(source.width - 2, x)),
				y: Math.max(1, Math.min(source.height - 2, y))
			} : j),
			jointVersion: get().jointVersion + 1,
			attachmentsNeedReview: get().attachments.length > 0
		});
	},
	updateJoint: (id, patch) => {
		const { jointVersion, attachments } = get();
		set({
			joints: get().joints.map((j) => j.id === id ? {
				...j,
				...patch
			} : j),
			jointVersion: jointVersion + 1,
			attachmentsNeedReview: attachments.length > 0
		});
	},
	deleteJoint: (id) => {
		const { selectedId, jointVersion, attachments } = get();
		set({
			joints: get().joints.filter((j) => j.id !== id).map((j) => j.parentId === id ? {
				...j,
				parentId: null
			} : j),
			selectedId: selectedId === id ? null : selectedId,
			jointVersion: jointVersion + 1,
			attachmentsNeedReview: attachments.length > 0
		});
	},
	loadFile: async (file) => {
		const dataUrl = await fileToDataUrl(file);
		const name = file.name.replace(/\.[^.]+$/, "") || "Figure";
		await get().loadDataUrl(dataUrl, name);
	},
	loadDataUrl: async (dataUrl, name, kind) => {
		set({
			busy: "Preparing the figure",
			error: null
		});
		try {
			const { source, bg, mask } = await decodeFigure(dataUrl, name);
			const usedKind = kind ?? get().kind;
			const joints = placeFromSilhouette(mask, source.width, source.height, usedKind);
			set({
				source,
				bg,
				kind: usedKind,
				joints,
				selectedId: joints[0]?.id ?? null,
				attachments: [],
				attachmentsNeedReview: false,
				jointVersion: 1,
				partDraftVersion: 0,
				animations: [],
				activeAnimId: null,
				playing: false,
				time: 0,
				step: "bones",
				busy: null,
				pinMode: "adjust",
				pinIndex: 0
			});
		} catch (err) {
			set({
				busy: null,
				error: err instanceof Error ? err.message : "Could not load the figure"
			});
		}
	},
	loadSample: async (src, name, kind) => {
		set({
			busy: "Opening the example",
			error: null,
			kind
		});
		try {
			const img = await loadHtmlImage(src);
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			if (!ctx) throw new Error("Canvas is unavailable");
			ctx.drawImage(img, 0, 0);
			const dataUrl = canvas.toDataURL("image/png");
			await get().loadDataUrl(dataUrl, name, kind);
			const state = get();
			if (state.source && state.joints.length) {
				await state.cutPaper();
				get().playPreset("wave");
			}
		} catch (err) {
			set({
				busy: null,
				error: err instanceof Error ? err.message : "Could not open the example"
			});
		}
	},
	tryExample: async (src, name, kind) => {
		await get().loadSample(src, name, kind);
	},
	conjure: async () => {
		const prompt = get().conjurePrompt.trim();
		if (!prompt) {
			set({ error: "Describe the figure first" });
			return;
		}
		set({
			busy: "Conjuring a figure",
			error: null
		});
		try {
			const result = await conjureFigure({ data: { prompt } });
			if (!result.ok) {
				set({
					busy: null,
					error: result.error
				});
				return;
			}
			await get().loadDataUrl(result.dataUrl, prompt.slice(0, 42), get().kind);
		} catch (err) {
			set({
				busy: null,
				error: err instanceof Error ? err.message : "Conjure failed"
			});
		}
	},
	autoPin: async () => {
		const { source, bg, kind } = get();
		if (!source) {
			console.error("AutoPin: No source");
			return;
		}
		console.log("AutoPin: Starting");
		try {
			const imageData = readImageData(await loadHtmlImage(source.dataUrl));
			const key = bg ?? detectBackground(imageData);
			const joints = placeFromSilhouette(buildFigureMask(imageData, key), source.width, source.height, kind);
			set({
				joints,
				selectedId: joints[0]?.id ?? null,
				jointVersion: get().jointVersion + 1,
				attachments: [],
				attachmentsNeedReview: false,
				bg: key
			});
			console.log("AutoPin: Success");
		} catch (e) {
			console.error("AutoPin: Error", e);
		}
	},
	askGrokToPin: async () => {
		const { source, kind } = get();
		if (!source) return;
		set({
			busy: "Reading the figure",
			error: null
		});
		try {
			const result = await analyzeFigure({ data: {
				imageDataUrl: await jpegForVision(source.dataUrl),
				hint: `Prefer a ${kind} skeleton.`
			} });
			if (!result.ok) {
				set({
					busy: null,
					error: result.error
				});
				return;
			}
			const parsed = extractJson(result.text);
			const fallback = get().joints;
			const joints = applyAiJoints(parsed.joints ?? [], source.width, source.height, fallback);
			const nextKind = parsed.kind && parsed.kind in KIND_LABEL ? parsed.kind : kind;
			set({
				joints,
				selectedId: joints[0]?.id ?? null,
				jointVersion: get().jointVersion + 1,
				attachmentsNeedReview: get().attachments.length > 0,
				busy: null,
				source: parsed.name ? {
					...source,
					name: parsed.name
				} : source,
				kind: nextKind
			});
		} catch (err) {
			set({
				busy: null,
				error: err instanceof Error ? err.message : "Could not read the figure"
			});
		}
	},
	placeNextPin: (x, y) => {
		const { joints, pinIndex, source } = get();
		if (!source || !joints.length) return;
		const joint = joints[pinIndex];
		if (!joint) {
			set({ pinMode: "adjust" });
			return;
		}
		get().moveJoint(joint.id, x, y);
		const next = pinIndex + 1;
		set({
			pinIndex: next,
			selectedId: joint.id,
			pinMode: next >= joints.length ? "adjust" : "pin"
		});
	},
	cutPaper: async () => {
		const { source, joints, bg } = get();
		if (!source || !joints.length) return;
		set({
			busy: "Cutting paper",
			error: null
		});
		try {
			const parts = await cutParts(source.dataUrl, joints, bg ?? blankBg);
			const animations = get().animations.length ? get().animations : [presetAnimation("idle", joints), presetAnimation("walk", joints)];
			set({
				attachments: parts,
				attachmentsNeedReview: false,
				partDraftVersion: get().jointVersion,
				busy: null,
				animations,
				activeAnimId: get().activeAnimId ?? animations[0]?.id ?? null
			});
		} catch (err) {
			set({
				busy: null,
				error: err instanceof Error ? err.message : "Cut failed"
			});
		}
	},
	playPreset: (id) => {
		const anim = presetAnimation(id, get().joints);
		set({
			animations: [...get().animations.filter((a) => a.id !== anim.id), anim],
			activeAnimId: anim.id,
			playing: true,
			time: 0,
			step: "motion"
		});
	},
	askGrokToDirect: async () => {
		const prompt = get().motionPrompt.trim();
		const { joints } = get();
		if (!prompt) {
			set({ error: "Describe the motion first" });
			return;
		}
		if (!joints.length) return;
		set({
			busy: "Directing the puppet",
			error: null
		});
		try {
			const result = await composeAnimation({ data: {
				prompt,
				joints: joints.map((j) => ({
					id: j.id,
					label: j.label,
					minAngle: j.minAngle,
					maxAngle: j.maxAngle
				}))
			} });
			if (!result.ok) {
				set({
					busy: null,
					error: result.error
				});
				return;
			}
			const anim = normalizeAiAnimation(extractJson(result.text), joints, prompt);
			set({
				animations: [...get().animations.filter((a) => a.id !== anim.id), anim],
				activeAnimId: anim.id,
				playing: true,
				time: 0,
				busy: null,
				step: "motion"
			});
		} catch (err) {
			set({
				busy: null,
				error: err instanceof Error ? err.message : "Could not direct the puppet"
			});
		}
	},
	setPlaying: (playing) => set({ playing }),
	setTime: (time) => set({ time }),
	setSpeed: (speed) => set({ speed }),
	toggleSweep: (id) => set({
		sweepId: get().sweepId === id ? null : id,
		playing: false
	}),
	currentAngles: () => {
		const { joints, animations, activeAnimId, time } = get();
		return anglesAt(joints, animations.find((a) => a.id === activeAnimId) ?? null, time);
	},
	reset: () => set({
		step: "figure",
		source: null,
		bg: null,
		joints: [],
		selectedId: null,
		attachments: [],
		attachmentsNeedReview: false,
		partDraftVersion: 0,
		jointVersion: 0,
		animations: [],
		activeAnimId: null,
		playing: false,
		time: 0,
		busy: null,
		error: null,
		sweepId: null
	}),
	needsRecut: () => {
		const { attachments, attachmentsNeedReview, partDraftVersion, jointVersion } = get();
		return !!attachments.length && (attachmentsNeedReview || partDraftVersion !== jointVersion);
	}
}));
var STEPS = [
	{
		id: "figure",
		label: "Input",
		numeral: "I"
	},
	{
		id: "bones",
		label: "Review parts",
		numeral: "II"
	},
	{
		id: "motion",
		label: "Test movement",
		numeral: "III"
	},
	{
		id: "archive",
		label: "Export",
		numeral: "IV"
	}
];
function indent(level) {
	return "  ".repeat(level);
}
function dump(value, level = 0) {
	if (value === null || value === void 0) return "null";
	if (typeof value === "string") {
		if (/^[A-Za-z0-9 _./+-]+$/.test(value) && value.length > 0) return value;
		return JSON.stringify(value);
	}
	if (typeof value === "number") return Number.isInteger(value) ? String(value) : value.toFixed(3).replace(/\.?0+$/, "");
	if (typeof value === "boolean") return value ? "true" : "false";
	if (Array.isArray(value)) {
		if (!value.length) return "[]";
		return value.map((item) => {
			if (item !== null && typeof item === "object" && !Array.isArray(item)) {
				const lines = dump(item, level + 1).split("\n");
				const first = lines[0] ?? "";
				const rest = lines.slice(1).map((l) => `${indent(level + 1)}${l}`);
				return `${indent(level)}- ${first}${rest.length ? `\n${rest.join("\n")}` : ""}`;
			}
			return `${indent(level)}- ${dump(item, level + 1)}`;
		}).join("\n");
	}
	if (typeof value === "object") {
		const entries = Object.entries(value).filter(([, v]) => v !== void 0);
		if (!entries.length) return "{}";
		return entries.map(([k, v]) => {
			if (v !== null && typeof v === "object") {
				const nested = dump(v, 0);
				if (nested === "{}" || nested === "[]") return `${k}: ${nested}`;
				return `${k}:\n${nested.split("\n").map((line) => `${indent(level + 1)}${line}`).join("\n")}`;
			}
			return `${k}: ${dump(v, level + 1)}`;
		}).join("\n");
	}
	return JSON.stringify(value);
}
function buildRigDocument(source, joints, attachments, animations) {
	const rest = {};
	for (const joint of joints) rest[joint.id] = 0;
	return {
		version: 2,
		generator: "Marionette",
		coordinate_space: {
			origin: "top-left of source.png",
			units: "pixels",
			y_axis: "down",
			rotation: "degrees, positive is clockwise (canvas space)",
			rest_pose: "the photographed figure; all animation angles are deltas from rest"
		},
		puppet: {
			name: source.name,
			source: "source.jpg",
			canvas: {
				width: source.width,
				height: source.height
			}
		},
		attachments: attachments.map((attachment) => ({
			id: attachment.id,
			bone: attachment.boneId,
			label: attachment.label,
			role: attachment.role,
			file: `parts/${attachment.id}.png`,
			mask: attachment.mask ? `masks/${attachment.id}.png` : void 0,
			crop: {
				x: Math.round(attachment.cropX),
				y: Math.round(attachment.cropY),
				width: attachment.width,
				height: attachment.height
			},
			local_pivot: {
				x: round(attachment.localPivotX),
				y: round(attachment.localPivotY)
			},
			z_offset: attachment.zIndex,
			visible: attachment.visible ?? true
		})),
		bones: joints.map((joint) => ({
			id: joint.id,
			label: joint.label,
			parent: joint.parentId,
			pivot: {
				x: round(joint.x),
				y: round(joint.y)
			},
			limits: {
				min_angle: joint.minAngle,
				max_angle: joint.maxAngle
			},
			thickness_px: round(joint.thickness),
			z_base: joint.zIndex
		})),
		animations: Object.fromEntries(animations.map((anim) => [anim.id, {
			name: anim.name,
			duration_seconds: anim.duration,
			loop: anim.loop,
			tracks: Object.fromEntries(Object.entries(anim.tracks).map(([id, keys]) => [id, keys.map((key) => ({
				t: key.t,
				angle: round(key.angle),
				ease: key.ease
			}))]))
		}]))
	};
}
function round(n) {
	return Math.round(n * 100) / 100;
}
function toYaml(source, joints, attachments, animations) {
	return `# Marionette puppet rig v2
${dump(buildRigDocument(source, joints, attachments, animations))}
`;
}
function archiveReadme(name) {
	return `${name} — Marionette puppet archive
=====================================

source.jpg          original figure
parts/*.png         transparent overlapping layers, one per bone
marionette.yaml     rotation points, stop ranges, poses, animation tracks

How to draw
-----------
1. Load source canvas size from puppet.canvas.
2. Sort parts by z_index ascending.
3. For each part, walk from the root to that joint and accumulate:
     translate(rotation_point.canvas)
     rotate(angle_degrees)
     translate(-rotation_point.canvas)
4. Draw the PNG at crop.x, crop.y.
5. Clamp every angle to stop_points.min_angle .. max_angle.

Child parts include an extra disc of pixels over the parent pivot so
the hinge stays covered through the full range of motion.
`;
}
function dataUrlToBytes(dataUrl) {
	const comma = dataUrl.indexOf(",");
	const b64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
	const binary = atob(b64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
async function buildArchive(source, joints, attachments, animations) {
	const zip = new import_lib.default();
	const root = slugify(source.name);
	zip.file(`${root}/source.jpg`, dataUrlToBytes(source.dataUrl));
	zip.file(`${root}/marionette.yaml`, toYaml(source, joints, attachments, animations));
	zip.file(`${root}/README.txt`, archiveReadme(source.name));
	for (const attachment of attachments) {
		zip.file(`${root}/parts/${attachment.id}.png`, dataUrlToBytes(attachment.dataUrl));
		if (attachment.mask?.alphaPngDataUrl) zip.file(`${root}/masks/${attachment.id}.png`, dataUrlToBytes(attachment.mask.alphaPngDataUrl));
	}
	return {
		blob: await zip.generateAsync({ type: "blob" }),
		filename: `${root}-puppet.zip`
	};
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
var _jsxFileName$2 = "/app/applet/src/components/studio/stage-canvas.tsx";
var imageCache = /* @__PURE__ */ new Map();
async function cached(src) {
	const hit = imageCache.get(src);
	if (hit && hit.complete) return hit;
	const img = await loadHtmlImage(src);
	imageCache.set(src, img);
	return img;
}
function chainOf(joint, byId) {
	const chain = [];
	const guard = /* @__PURE__ */ new Set();
	let cur = joint;
	while (cur && !guard.has(cur.id)) {
		guard.add(cur.id);
		chain.push(cur);
		cur = cur.parentId ? byId.get(cur.parentId) : void 0;
	}
	chain.reverse();
	return chain;
}
function applyChain(ctx, joint, byId, angles) {
	for (const j of chainOf(joint, byId)) {
		const a = (angles[j.id] ?? 0) * Math.PI / 180;
		ctx.translate(j.x, j.y);
		ctx.rotate(a);
		ctx.translate(-j.x, -j.y);
	}
}
function paintChecker(ctx, w, h) {
	ctx.fillStyle = "#161412";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#1e1b18";
	const size = 14;
	for (let y = 0; y < h; y += size) for (let x = 0; x < w; x += size) if ((x / size | 0) % 2 === (y / size | 0) % 2) ctx.fillRect(x, y, size, size);
}
function StageCanvas({ mode }) {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const source = useStudio((s) => s.source);
	const joints = useStudio((s) => s.joints);
	const selectedId = useStudio((s) => s.selectedId);
	const pinMode = useStudio((s) => s.pinMode);
	const pinIndex = useStudio((s) => s.pinIndex);
	const attachments = useStudio((s) => s.attachments);
	const setSelected = useStudio((s) => s.setSelected);
	const moveJoint = useStudio((s) => s.moveJoint);
	const placeNextPin = useStudio((s) => s.placeNextPin);
	const fitRef = (0, import_react.useRef)({
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		s: 1
	});
	const dragRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap || !source) return;
		let dead = false;
		let raf = 0;
		let drawing = false;
		const draw = async () => {
			if (dead || drawing) return;
			drawing = true;
			try {
				const rect = wrap.getBoundingClientRect();
				const cssW = Math.max(1, rect.width);
				const cssH = Math.max(1, rect.height);
				const dpr = Math.min(window.devicePixelRatio || 1, 2);
				if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
					canvas.width = Math.round(cssW * dpr);
					canvas.height = Math.round(cssH * dpr);
					canvas.style.width = `${cssW}px`;
					canvas.style.height = `${cssH}px`;
				}
				const ctx = canvas.getContext("2d");
				if (!ctx) return;
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				paintChecker(ctx, cssW, cssH);
				const fit = contain(source.width, source.height, cssW, cssH);
				fitRef.current = fit;
				ctx.save();
				ctx.translate(fit.x, fit.y);
				ctx.scale(fit.s, fit.s);
				const state = useStudio.getState();
				const angles = state.currentAngles();
				if (state.sweepId) {
					const joint = state.joints.find((j) => j.id === state.sweepId);
					if (joint) {
						const t = performance.now() / 1400 % 2;
						const u = t < 1 ? t : 2 - t;
						angles[joint.id] = joint.minAngle + (joint.maxAngle - joint.minAngle) * u;
					}
				}
				if (mode === "bones" || !state.attachments.length) {
					try {
						const img = await cached(source.dataUrl);
						if (dead) return;
						ctx.drawImage(img, 0, 0, source.width, source.height);
					} catch {}
					drawBones(ctx, state.joints, state.selectedId, state.pinMode === "pin" ? state.joints[state.pinIndex]?.id ?? null : null);
				} else {
					const byId = new Map(state.joints.map((j) => [j.id, j]));
					const ordered = [...state.attachments].sort((a, b) => a.zIndex - b.zIndex);
					for (const attachment of ordered) {
						const joint = byId.get(attachment.boneId);
						if (!joint) continue;
						try {
							const img = await cached(attachment.dataUrl);
							if (dead) return;
							ctx.save();
							applyChain(ctx, joint, byId, angles);
							ctx.drawImage(img, attachment.cropX, attachment.cropY);
							ctx.restore();
						} catch {}
					}
				}
				ctx.restore();
			} finally {
				drawing = false;
			}
		};
		const loop = () => {
			draw();
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		const ro = new ResizeObserver(() => void draw());
		ro.observe(wrap);
		return () => {
			dead = true;
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, [
		source,
		joints,
		selectedId,
		pinMode,
		pinIndex,
		attachments,
		mode
	]);
	function imagePoint(e) {
		const canvas = canvasRef.current;
		if (!canvas || !source) return null;
		const rect = canvas.getBoundingClientRect();
		const px = e.clientX - rect.left;
		const py = e.clientY - rect.top;
		const fit = fitRef.current;
		return {
			x: (px - fit.x) / fit.s,
			y: (py - fit.y) / fit.s
		};
	}
	function hitJoint(x, y) {
		const r = 14 / fitRef.current.s;
		let best = null;
		let bestD = r;
		for (const joint of joints) {
			const d = Math.hypot(joint.x - x, joint.y - y);
			if (d <= bestD) {
				bestD = d;
				best = joint;
			}
		}
		return best;
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref: wrapRef,
		className: "relative h-full min-h-72 w-full overflow-hidden rounded-lg bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("canvas", {
			ref: canvasRef,
			className: "block h-full w-full touch-none",
			onPointerDown: (e) => {
				if (mode !== "bones" || !source) return;
				const p = imagePoint(e);
				if (!p) return;
				e.target.setPointerCapture(e.pointerId);
				if (pinMode === "pin") {
					placeNextPin(p.x, p.y);
					return;
				}
				const hit = hitJoint(p.x, p.y);
				if (hit) {
					setSelected(hit.id);
					dragRef.current = hit.id;
				} else setSelected(null);
			},
			onPointerMove: (e) => {
				if (!dragRef.current) return;
				const p = imagePoint(e);
				if (!p) return;
				moveJoint(dragRef.current, p.x, p.y);
			},
			onPointerUp: () => {
				dragRef.current = null;
			}
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 198,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 197,
		columnNumber: 5
	}, this);
}
function drawBones(ctx, joints, selectedId, pinId) {
	const byId = new Map(joints.map((j) => [j.id, j]));
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	for (const joint of joints) {
		if (!joint.parentId) continue;
		const parent = byId.get(joint.parentId);
		if (!parent) continue;
		ctx.strokeStyle = "rgba(217, 210, 197, 0.55)";
		ctx.lineWidth = 2.4;
		ctx.beginPath();
		ctx.moveTo(parent.x, parent.y);
		ctx.lineTo(joint.x, joint.y);
		ctx.stroke();
	}
	for (const joint of joints) {
		const selected = joint.id === selectedId;
		const pin = joint.id === pinId;
		ctx.beginPath();
		ctx.arc(joint.x, joint.y, selected || pin ? 7.5 : 5.5, 0, Math.PI * 2);
		ctx.fillStyle = pin ? "#f1ece4" : selected ? "#d9d2c5" : "#c4b8a5";
		ctx.fill();
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = "#0d0c0b";
		ctx.stroke();
		if (selected || pin) {
			ctx.font = "600 13px Outfit, sans-serif";
			ctx.fillStyle = "#f1ece4";
			ctx.strokeStyle = "rgba(13,12,11,0.7)";
			ctx.lineWidth = 3;
			ctx.strokeText(joint.label, joint.x + 10, joint.y - 10);
			ctx.fillText(joint.label, joint.x + 10, joint.y - 10);
		}
	}
}
function PartTiles({ attachments }) {
	const selectedId = useStudio((s) => s.selectedId);
	if (!attachments.length) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex gap-2 overflow-x-auto pb-1",
		children: attachments.map((part) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			onClick: () => useStudio.getState().setSelected(part.boneId),
			className: "flex w-24 shrink-0 flex-col gap-1 rounded-md bg-elevated p-1.5 text-left shadow-border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "checker-tile relative aspect-square overflow-hidden rounded-sm",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: part.dataUrl,
					alt: part.label,
					className: "h-full w-full object-contain"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 286,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 285,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: selectedId === part.boneId ? "truncate text-xs text-fg" : "truncate text-xs text-muted",
				children: part.label
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 288,
				columnNumber: 11
			}, this)]
		}, part.id, true, {
			fileName: _jsxFileName$2,
			lineNumber: 279,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 277,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/studio/studio-app.tsx";
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "16",
				cy: "11",
				r: "4.2",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 35,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "16",
				cy: "11",
				r: "1.4",
				fill: "currentColor"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 36,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				d: "M16 15.4V26",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 37,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				d: "M12 21h8",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 38,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 34,
		columnNumber: 5
	}, this);
}
function PlaybackClock() {
	const playing = useStudio((s) => s.playing);
	const speed = useStudio((s) => s.speed);
	const activeAnimId = useStudio((s) => s.activeAnimId);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		let raf = 0;
		let last = performance.now();
		const loop = (now) => {
			const dt = (now - last) / 1e3 * useStudio.getState().speed;
			last = now;
			const state = useStudio.getState();
			const current = state.animations.find((a) => a.id === state.activeAnimId);
			if (!current) return;
			let next = state.time + dt;
			if (next >= current.duration) {
				if (current.loop) next = next % current.duration;
				else {
					state.setTime(current.duration);
					state.setPlaying(false);
					return;
				}
			}
			state.setTime(next);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [
		playing,
		speed,
		activeAnimId
	]);
	return null;
}
function StudioApp() {
	const step = useStudio((s) => s.step);
	const source = useStudio((s) => s.source);
	const busy = useStudio((s) => s.busy);
	const error = useStudio((s) => s.error);
	const setStep = useStudio((s) => s.setStep);
	const loadFile = useStudio((s) => s.loadFile);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const state = useStudio.getState();
			if (e.code === "Space" && state.step === "motion" && state.source) {
				e.preventDefault();
				state.setPlaying(!state.playing);
			}
			if ((e.key === "Delete" || e.key === "Backspace") && state.step === "bones" && state.selectedId) {
				const tag = e.target?.tagName;
				if (tag === "INPUT" || tag === "TEXTAREA") return;
				state.deleteJoint(state.selectedId);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("flex min-h-dvh flex-col bg-bg text-fg", source && step !== "figure" && "h-dvh overflow-hidden"),
		onDragOver: (e) => {
			e.preventDefault();
		},
		onDrop: (e) => {
			e.preventDefault();
			const file = e.dataTransfer.files?.[0];
			if (file && file.type.startsWith("image/")) loadFile(file);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PlaybackClock, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 117,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
				theme: "dark",
				position: "bottom-center"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 118,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "flex items-center gap-2.5 text-fg",
						onClick: () => useStudio.getState().reset(),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mark, { className: "size-7 text-accent" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 125,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-2xl font-medium tracking-tight",
							children: "Marionette"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 126,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 120,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "hidden text-sm text-muted md:block",
						children: "Cut any picture into a stringed figure."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 128,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "flex min-w-0 flex-1 items-center gap-1 overflow-x-auto md:justify-center",
						children: STEPS.map((item) => {
							const active = item.id === step;
							const locked = item.id !== "figure" && !source;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								disabled: locked,
								onClick: () => setStep(item.id),
								className: cn("flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-elevated text-fg" : "text-muted hover:text-fg", locked && "opacity-40"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-xs text-subtle",
									children: item.numeral
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 145,
									columnNumber: 17
								}, this), item.label]
							}, item.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 134,
								columnNumber: 15
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 129,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 119,
				columnNumber: 7
			}, this),
			error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-b border-border bg-elevated px-4 py-2 text-sm text-danger md:px-6",
				children: error
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 154,
				columnNumber: 9
			}, this) : null,
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "relative flex min-h-0 flex-1 flex-col",
				children: [step === "figure" || !source ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FigureStep, {}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 158,
					columnNumber: 41
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Workbench, {}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 158,
					columnNumber: 58
				}, this), busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute inset-0 z-20 flex items-center justify-center bg-bg/70",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-display text-2xl italic text-ivory",
						children: busy
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 161,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 160,
					columnNumber: 11
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 157,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 103,
		columnNumber: 5
	}, this);
}
function FigureStep() {
	const loadFile = useStudio((s) => s.loadFile);
	const loadSample = useStudio((s) => s.loadSample);
	const conjure = useStudio((s) => s.conjure);
	const prompt = useStudio((s) => s.conjurePrompt);
	const setPrompt = useStudio((s) => s.setConjurePrompt);
	const inputRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-10 md:px-8 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-xl space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-medium tracking-[0.22em] text-muted uppercase",
						children: "Workshop"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 180,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-4xl leading-tight font-medium tracking-tight text-balance md:text-6xl",
						children: "A figure. Pins. Paper. Strings."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 181,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "max-w-md text-pretty text-muted",
						children: "Drop a character, let the bench find its hinges, cut overlapping transparent parts, and export a labeled archive with a YAML rig — pivots, stop ranges, poses, and animation tracks."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 184,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 179,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => inputRef.current?.click(),
				className: "flex min-h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-10 text-center transition-colors duration-150 hover:border-pin hover:bg-elevated",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FolderOpen, { className: "size-6 text-muted" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 195,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display text-2xl",
						children: "Drop a figure here"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 196,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-sm text-muted",
						children: "PNG, JPG, or WebP. Front-facing, limbs unoccluded works best."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 197,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						ref: inputRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => {
							const file = e.target.files?.[0];
							if (file) loadFile(file);
						}
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 198,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 190,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => void loadSample(sample.src, sample.name, sample.kind),
					className: "group overflow-hidden rounded-xl bg-surface text-left shadow-border",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "aspect-figure overflow-hidden bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: sample.src,
							alt: sample.name,
							className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 219,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 218,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-1 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-xl",
							children: sample.name
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 226,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-sm text-muted",
							children: sample.blurb
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 227,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 225,
						columnNumber: 13
					}, this)]
				}, sample.id, true, {
					fileName: _jsxFileName$1,
					lineNumber: 212,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 210,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-3 rounded-xl bg-surface p-4 shadow-border md:flex-row md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "conjure",
						children: "Or conjure a figure"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 235,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "conjure",
						value: prompt,
						placeholder: "a tin rabbit in a waistcoat",
						onChange: (e) => setPrompt(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") conjure();
						}
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 236,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 234,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					onClick: () => void conjure(),
					className: "shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 247,
						columnNumber: 11
					}, this), "Conjure"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 246,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 233,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 178,
		columnNumber: 5
	}, this);
}
function Workbench() {
	const step = useStudio((s) => s.step);
	const attachments = useStudio((s) => s.attachments);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid h-full min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(18rem,_1fr)_auto] lg:grid-cols-[1fr_20rem] lg:grid-rows-1",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "flex min-h-0 flex-col gap-3 p-3 md:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-h-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StageCanvas, { mode: step === "bones" ? "bones" : "puppet" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 262,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 261,
					columnNumber: 9
				}, this),
				step === "parts" || step === "archive" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PartTiles, { attachments }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 264,
					columnNumber: 51
				}, this) : null,
				step === "motion" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Timeline, {}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 265,
					columnNumber: 30
				}, this) : null
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 260,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: "h-inspector border-t border-border lg:border-t-0 lg:border-l",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollArea, {
				className: "h-full",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-5 p-4",
					children: [
						step === "bones" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BonesInspector, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 270,
							columnNumber: 33
						}, this) : null,
						step === "parts" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PartsInspector, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 271,
							columnNumber: 33
						}, this) : null,
						step === "motion" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MotionInspector, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 272,
							columnNumber: 34
						}, this) : null,
						step === "archive" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArchiveInspector, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 273,
							columnNumber: 35
						}, this) : null
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 269,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 268,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 267,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 259,
		columnNumber: 5
	}, this);
}
function BonesInspector() {
	const kind = useStudio((s) => s.kind);
	const joints = useStudio((s) => s.joints);
	const selectedId = useStudio((s) => s.selectedId);
	const pinMode = useStudio((s) => s.pinMode);
	const pinIndex = useStudio((s) => s.pinIndex);
	const selected = joints.find((j) => j.id === selectedId) ?? null;
	const next = joints[pinIndex];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-2xl",
				children: "Bones"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 293,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-pretty text-muted",
				children: "Drag pins onto hinges. Or walk the skeleton by placing each joint in order."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 294,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 292,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Skeleton" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 299,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-1.5",
				children: Object.keys(KIND_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => useStudio.getState().setKind(k),
					className: cn("h-9 rounded-full px-3 text-xs", k === kind ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
					children: KIND_LABEL[k]
				}, k, false, {
					fileName: _jsxFileName$1,
					lineNumber: 302,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 300,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 298,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					onClick: () => useStudio.getState().setPinMode(pinMode === "pin" ? "adjust" : "pin"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pin, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 318,
						columnNumber: 11
					}, this), pinMode === "pin" ? "Done pinning" : "Place bones"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 317,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					onClick: () => void useStudio.getState().autoPin(),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 322,
						columnNumber: 11
					}, this), "Auto-pin"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 321,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "col-span-2",
					onClick: () => void useStudio.getState().askGrokToPin(),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 326,
						columnNumber: 11
					}, this), "Ask Gemini to pin"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 325,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 316,
			columnNumber: 7
		}, this),
		pinMode === "pin" && next ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "rounded-md bg-elevated px-3 py-2 text-sm text-ivory",
			children: ["Click the ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "font-medium",
				children: next.label
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 332,
				columnNumber: 21
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 331,
			columnNumber: 9
		}, this) : null,
		selected ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(JointFields, { joint: selected }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 335,
			columnNumber: 19
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-sm text-muted",
			children: "Select a pin to edit its range."
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 335,
			columnNumber: 54
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			onClick: () => useStudio.getState().setStep("parts"),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scissors, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 337,
				columnNumber: 9
			}, this), "Cut paper"]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 336,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 291,
		columnNumber: 5
	}, this);
}
function JointFields({ joint }) {
	const j = useStudio((s) => s.joints.find((x) => x.id === joint.id));
	const update = useStudio((s) => s.updateJoint);
	if (!j) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3 rounded-lg bg-elevated p-3 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-medium",
					children: j.label
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 351,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center text-muted hover:text-danger",
					onClick: () => useStudio.getState().deleteJoint(j.id),
					"aria-label": "Remove joint",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 358,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 352,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 350,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Min angle",
				value: j.minAngle,
				min: -180,
				max: 180,
				onChange: (v) => update(j.id, { minAngle: v })
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 361,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Max angle",
				value: j.maxAngle,
				min: -180,
				max: 180,
				onChange: (v) => update(j.id, { maxAngle: v })
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 362,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Thickness",
				value: Math.round(j.thickness),
				min: 4,
				max: 80,
				onChange: (v) => update(j.id, { thickness: v })
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 363,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				size: "sm",
				className: "w-full",
				onClick: () => useStudio.getState().toggleSweep(j.id),
				children: "Sweep range of motion"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 364,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 349,
		columnNumber: 5
	}, this);
}
function Field({ label, value, min, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: label }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 387,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "font-mono text-xs tabular-nums text-muted",
				children: value
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 388,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 386,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider, {
			value: [value],
			min,
			max,
			step: 1,
			onValueChange: (v) => onChange(v[0] ?? value)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 390,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 385,
		columnNumber: 5
	}, this);
}
function PartsInspector() {
	const attachments = useStudio((s) => s.attachments);
	const needReview = useStudio((s) => s.attachmentsNeedReview);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-2xl",
				children: "Parts"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 401,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-pretty text-muted",
				children: "Each limb is a transparent layer with extra paper over the parent pivot, so the hinge stays covered through the sweep."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 402,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 400,
			columnNumber: 7
		}, this),
		needReview ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { children: "Pins moved — recut" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 407,
			columnNumber: 21
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { children: [attachments.length, " layers"] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 407,
			columnNumber: 57
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			onClick: () => void useStudio.getState().cutPaper(),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scissors, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 409,
				columnNumber: 9
			}, this), attachments.length ? "Recut" : "Cut paper"]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 408,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			onClick: () => useStudio.getState().setStep("motion"),
			children: "Direct motion"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 412,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 399,
		columnNumber: 5
	}, this);
}
function MotionInspector() {
	const prompt = useStudio((s) => s.motionPrompt);
	const setPrompt = useStudio((s) => s.setMotionPrompt);
	const animations = useStudio((s) => s.animations);
	const active = useStudio((s) => s.activeAnimId);
	const playing = useStudio((s) => s.playing);
	const speed = useStudio((s) => s.speed);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-2xl",
				children: "Motion"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 430,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-pretty text-muted",
				children: "Preset cycles, or prompt a walk, hunt, spawn — anything the joints can bear."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 431,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 429,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap gap-1.5",
			children: PRESET_MOTIONS.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => useStudio.getState().playPreset(m.id),
				className: cn("h-9 rounded-full px-3 text-xs", active === m.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
				children: m.label
			}, m.id, false, {
				fileName: _jsxFileName$1,
				lineNumber: 437,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 435,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
					htmlFor: "motion",
					children: "Direct with a prompt"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 451,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
					id: "motion",
					value: prompt,
					placeholder: "hunting stalk, then a pounce",
					onChange: (e) => setPrompt(e.target.value)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 452,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "w-full",
					onClick: () => void useStudio.getState().askGrokToDirect(),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 459,
						columnNumber: 11
					}, this), "Direct the puppet"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 458,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 450,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "secondary",
			className: "w-full",
			onClick: () => useStudio.getState().setPlaying(!playing),
			children: [playing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pause, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 464,
				columnNumber: 20
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "ml-0.5" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 464,
				columnNumber: 32
			}, this), playing ? "Pause" : "Play"]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 463,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
			label: "Speed",
			value: Math.round(speed * 100),
			min: 40,
			max: 200,
			onChange: (v) => useStudio.getState().setSpeed(v / 100)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 467,
			columnNumber: 7
		}, this),
		animations.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
			className: "space-y-1 text-sm",
			children: animations.map((anim) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				className: cn("w-full rounded-md px-2 py-2 text-left", anim.id === active ? "bg-elevated" : "text-muted"),
				onClick: () => useStudio.setState({
					activeAnimId: anim.id,
					time: 0,
					playing: true,
					step: "motion"
				}),
				children: [anim.name, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "ml-2 font-mono text-xs tabular-nums text-subtle",
					children: [anim.duration.toFixed(2), "s"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 486,
					columnNumber: 17
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 478,
				columnNumber: 15
			}, this) }, anim.id, false, {
				fileName: _jsxFileName$1,
				lineNumber: 477,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 475,
			columnNumber: 9
		}, this) : null,
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			onClick: () => useStudio.getState().setStep("archive"),
			children: "Pack the archive"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 492,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 428,
		columnNumber: 5
	}, this);
}
function Timeline() {
	const time = useStudio((s) => s.time);
	const animations = useStudio((s) => s.animations);
	const active = useStudio((s) => s.activeAnimId);
	const anim = animations.find((a) => a.id === active);
	if (!anim) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-3 rounded-lg bg-surface px-3 py-2 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "font-mono text-xs tabular-nums text-muted",
			children: [
				time.toFixed(2),
				" / ",
				anim.duration.toFixed(2),
				"s"
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 507,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider, {
			value: [Math.min(anim.duration, time)],
			min: 0,
			max: anim.duration,
			step: .01,
			onValueChange: (v) => {
				useStudio.getState().setPlaying(false);
				useStudio.getState().setTime(v[0] ?? 0);
			}
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 510,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 506,
		columnNumber: 5
	}, this);
}
function ArchiveInspector() {
	const source = useStudio((s) => s.source);
	const joints = useStudio((s) => s.joints);
	const attachments = useStudio((s) => s.attachments);
	const animations = useStudio((s) => s.animations);
	const name = source?.name ?? "puppet";
	async function download() {
		if (!source) return;
		if (!attachments.length) await useStudio.getState().cutPaper();
		const state = useStudio.getState();
		if (!state.source || !state.attachments.length) {
			toast.error("Cut parts before packing");
			return;
		}
		const { blob, filename } = await buildArchive(state.source, state.joints, state.attachments, state.animations);
		downloadBlob(blob, filename);
		toast.success("Archive packed");
	}
	function copyYaml() {
		if (!source) return;
		navigator.clipboard.writeText(toYaml(source, joints, attachments, animations));
		toast.success("YAML copied");
	}
	const yaml = source ? toYaml(source, joints, attachments, animations) : "";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-2xl",
				children: "Archive"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 555,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-pretty text-muted",
				children: "A zip of labeled transparent parts plus YAML that names every rotation point, stop, pose, and track."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 556,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 554,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
				htmlFor: "puppet-name",
				children: "Name"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 562,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
				id: "puppet-name",
				value: name,
				onChange: (e) => useStudio.getState().setName(e.target.value)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 563,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 561,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			className: "w-full",
			onClick: () => void download(),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 566,
				columnNumber: 9
			}, this), "Download puppet zip"]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 565,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			className: "w-full",
			onClick: copyYaml,
			children: "Copy YAML"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 569,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Separator, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 572,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
			className: "max-h-80 overflow-auto rounded-md bg-elevated p-3 font-mono text-xs leading-relaxed text-muted",
			children: yaml
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 573,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 553,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Home() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StudioApp, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 3,
		columnNumber: 10
	}, this);
}
//#endregion
export { Home as component };
