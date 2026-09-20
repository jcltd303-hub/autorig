import { o as __toESM } from "../_runtime.mjs";
import { r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { i as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as extractJson } from "./diagnostics-Cmky3siG.mjs";
import { C as Eye, D as Check, E as Crosshair, S as FolderOpen, T as Download, _ as Paintbrush, a as Undo2, b as Image$1, c as Sparkles, d as Scissors, f as RotateCcw, g as Pause, h as Pin, i as WandSparkles, l as SlidersVertical, m as Play, n as ZoomOut, p as Redo2, r as X, s as Trash2, t as ZoomIn, u as ShieldAlert, v as Maximize2, w as Eraser, x as Ghost, y as Magnet } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as Viewport, n as Scrollbar, r as Thumb, t as Root$1 } from "../_libs/@radix-ui/react-scroll-area+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as require_lib } from "../_libs/jszip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-hHilj3ni.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "puppet";
}
var _jsxFileName$12 = "/app/applet/src/components/ui/badge.tsx";
function Badge({ className, variant, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase shadow-border", variant === "outline" ? "border border-border bg-transparent text-muted" : "bg-elevated text-muted", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 14,
		columnNumber: 5
	}, this);
}
var _jsxFileName$11 = "/app/applet/src/components/ui/button.tsx";
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
		fileName: _jsxFileName$11,
		lineNumber: 37,
		columnNumber: 12
	}, void 0);
});
Button.displayName = "Button";
var _jsxFileName$10 = "/app/applet/src/components/ui/input.tsx";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
	type,
	className: cn("flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-border", "placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 6,
	columnNumber: 5
}, void 0));
Input.displayName = "Input";
var _jsxFileName$9 = "/app/applet/src/components/ui/label.tsx";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn("text-xs font-medium tracking-wide text-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$9,
	lineNumber: 9,
	columnNumber: 3
}, void 0));
Label.displayName = "Label";
var _jsxFileName$8 = "/app/applet/src/components/ui/scroll-area.tsx";
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root$1, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Viewport, {
		className: "h-full w-full rounded-[inherit]",
		children
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 10,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scrollbar, {
		orientation: "vertical",
		className: "flex w-2.5 touch-none p-px select-none",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Thumb, { className: "relative flex-1 rounded-full bg-border" }, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 17,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 13,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$8,
	lineNumber: 9,
	columnNumber: 3
}, void 0));
ScrollArea.displayName = "ScrollArea";
var _jsxFileName$7 = "/app/applet/src/components/ui/separator.tsx";
function Separator({ className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("h-px w-full bg-border", className),
		role: "separator"
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 4,
		columnNumber: 10
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/ui/slider.tsx";
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none items-center select-none", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderTrack, {
		className: "relative h-1 w-full grow overflow-hidden rounded-full bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderRange, { className: "absolute h-full bg-accent" }, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 15,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 14,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderThumb, { className: "block size-4 rounded-full bg-ivory shadow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" }, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 17,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$6,
	lineNumber: 9,
	columnNumber: 3
}, void 0));
Slider.displayName = "Slider";
var _jsxFileName$5 = "/app/applet/src/components/ui/textarea.tsx";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
	className: cn("flex min-h-24 w-full rounded-md bg-elevated px-3 py-2 text-sm text-fg shadow-border", "placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
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
	const url = "/_serverFn/" + functionId;
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
var editFigureImage = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("5e685ba558231b0ef858c8f19a474219213c1390f893af741df4d401b3f3be89"));
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
function percentile(values, p) {
	if (!values.length) return 0;
	const sorted = [...values].sort((a, b) => a - b);
	return sorted[Math.min(sorted.length - 1, Math.max(0, Math.ceil((sorted.length - 1) * p)))] ?? 0;
}
function detectBackground(image) {
	const { width, height, data } = image;
	const strip = Math.max(2, Math.min(4, Math.floor(Math.min(width, height) / 16) || 2));
	const samples = [];
	let hasTransparentSample = false;
	const addSample = (x, y) => {
		const i = (y * width + x) * 4;
		const alpha = data[i + 3] ?? 0;
		hasTransparentSample ||= alpha < 12;
		samples.push([
			data[i] ?? 0,
			data[i + 1] ?? 0,
			data[i + 2] ?? 0
		]);
	};
	const xStep = Math.max(1, Math.floor(width / 128));
	const yStep = Math.max(1, Math.floor(height / 128));
	for (let y = 0; y < Math.min(strip, height); y++) for (let x = 0; x < width; x += xStep) addSample(x, y);
	for (let y = Math.max(strip, height - strip); y < height; y++) for (let x = 0; x < width; x += xStep) addSample(x, y);
	for (let x = 0; x < Math.min(strip, width); x++) for (let y = strip; y < height - strip; y += yStep) addSample(x, y);
	for (let x = Math.max(strip, width - strip); x < width; x++) for (let y = strip; y < height - strip; y += yStep) addSample(x, y);
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
	const distances = samples.map((s) => colorDist(s[0] ?? 0, s[1] ?? 0, s[2] ?? 0, med[0], med[1], med[2]));
	const spread = percentile(distances, .9);
	const threshold = Math.max(18, Math.min(52, spread + 10));
	const support = distances.filter((distance) => distance <= threshold).length / Math.max(1, distances.length);
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
		lift: support >= .8 && spread <= 42 && ratio > .04 && ratio < .92
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
/**
* Apply localized, non-destructive repair strokes to an attachment alpha mask.
* The input mask is never mutated, so callers can retain an undo snapshot.
*/
function applyMaskEdits(mask, width, height, edits) {
	if (mask.length !== width * height) throw new Error("Mask dimensions do not match the supplied pixel buffer");
	const result = new Uint8Array(mask);
	for (const edit of edits) {
		const radius = Math.max(0, edit.radius);
		if (!Number.isFinite(edit.x) || !Number.isFinite(edit.y) || !Number.isFinite(radius)) continue;
		const minX = Math.max(0, Math.floor(edit.x - radius));
		const maxX = Math.min(width - 1, Math.ceil(edit.x + radius));
		const minY = Math.max(0, Math.floor(edit.y - radius));
		const maxY = Math.min(height - 1, Math.ceil(edit.y + radius));
		const radiusSquared = radius * radius;
		for (let y = minY; y <= maxY; y++) {
			const rowOffset = y * width;
			for (let x = minX; x <= maxX; x++) {
				const dx = x - edit.x;
				const dy = y - edit.y;
				if (dx * dx + dy * dy > radiusSquared) continue;
				result[rowOffset + x] = edit.mode === "add" ? 255 : 0;
			}
		}
	}
	return result;
}
/**
* Snap a point (x, y) to nearby crosshairs, concentric circle radii, or crosshair axes.
*/
function snapToCrosshairsAndCircles(x, y, points, threshold = 10) {
	if (!points.length || threshold <= 0) return {
		x,
		y,
		snapped: false
	};
	let bestDist = threshold;
	let bestSnap = {
		x,
		y,
		snapped: false
	};
	for (const pt of points) {
		const dCenter = Math.hypot(x - pt.x, y - pt.y);
		if (dCenter < bestDist) {
			bestDist = dCenter;
			bestSnap = {
				x: pt.x,
				y: pt.y,
				snapped: true,
				type: "center",
				targetPoint: pt
			};
		}
		for (const r of pt.radii) {
			if (r <= 0) continue;
			const dCircle = Math.abs(dCenter - r);
			if (dCircle < bestDist && dCenter > .5) {
				bestDist = dCircle;
				let angle = Math.atan2(y - pt.y, x - pt.x);
				const deg = angle * 180 / Math.PI;
				const snappedDeg = Math.round(deg / 15) * 15;
				if (Math.abs(deg - snappedDeg) < 3.5) angle = snappedDeg * Math.PI / 180;
				bestSnap = {
					x: pt.x + r * Math.cos(angle),
					y: pt.y + r * Math.sin(angle),
					snapped: true,
					type: "circle",
					targetPoint: pt,
					targetRadius: r
				};
			}
		}
		const maxR = Math.max(...pt.radii, 30) * 1.5;
		if (Math.abs(x - pt.x) <= maxR && Math.abs(y - pt.y) <= maxR) {
			const dX = Math.abs(x - pt.x);
			if (dX < bestDist) {
				bestDist = dX;
				bestSnap = {
					x: pt.x,
					y,
					snapped: true,
					type: "axis",
					targetPoint: pt
				};
			}
			const dY = Math.abs(y - pt.y);
			if (dY < bestDist) {
				bestDist = dY;
				bestSnap = {
					x,
					y: pt.y,
					snapped: true,
					type: "axis",
					targetPoint: pt
				};
			}
		}
	}
	return bestSnap;
}
/**
* Clean isolated dangling pixel specks and floating fragments from the mask.
* Uses connected component analysis to preserve the main body and purge debris.
*/
function cleanDanglingPixels(mask, width, height, anchorX, anchorY, minSizeThreshold = 45) {
	const len = width * height;
	const result = new Uint8Array(mask);
	const visited = new Uint8Array(len);
	const components = [];
	const anchorIdx = anchorX !== void 0 && anchorY !== void 0 && anchorX >= 0 && anchorX < width && anchorY >= 0 && anchorY < height ? Math.floor(anchorY) * width + Math.floor(anchorX) : -1;
	for (let i = 0; i < len; i++) {
		if (result[i] === 0 || visited[i]) continue;
		const queue = [i];
		visited[i] = 1;
		const pixels = [];
		let touchesAnchor = false;
		let head = 0;
		while (head < queue.length) {
			const curr = queue[head++];
			pixels.push(curr);
			const cx = curr % width;
			const cy = Math.floor(curr / width);
			if (anchorIdx >= 0) {
				const ax = anchorIdx % width;
				const ay = Math.floor(anchorIdx / width);
				if (Math.hypot(cx - ax, cy - ay) <= 15) touchesAnchor = true;
			}
			for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
				if (dx === 0 && dy === 0) continue;
				const nx = cx + dx;
				const ny = cy + dy;
				if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
				const nIdx = ny * width + nx;
				if (result[nIdx] > 0 && !visited[nIdx]) {
					visited[nIdx] = 1;
					queue.push(nIdx);
				}
			}
		}
		components.push({
			pixels,
			touchesAnchor,
			size: pixels.length
		});
	}
	if (components.length <= 1) return {
		cleanedMask: result,
		removedPixels: 0
	};
	let mainComponent = components.find((c) => c.touchesAnchor);
	if (!mainComponent) mainComponent = components.reduce((max, c) => c.size > max.size ? c : max, components[0]);
	let removedPixels = 0;
	for (const comp of components) {
		if (comp === mainComponent) continue;
		if (comp.size < Math.min(12, minSizeThreshold)) for (const idx of comp.pixels) {
			result[idx] = 0;
			removedPixels++;
		}
	}
	return {
		cleanedMask: result,
		removedPixels
	};
}
/**
* Smart socket cap shaper: creates or trims a smooth circular hinge cap at the rotation point.
*/
function applySocketCap(mask, width, height, cx, cy, radius, mode) {
	const result = new Uint8Array(mask);
	const rSquared = radius * radius;
	if (mode === "add") {
		const minX = Math.max(0, Math.floor(cx - radius));
		const maxX = Math.min(width - 1, Math.ceil(cx + radius));
		const minY = Math.max(0, Math.floor(cy - radius));
		const maxY = Math.min(height - 1, Math.ceil(cy + radius));
		for (let y = minY; y <= maxY; y++) {
			const rowOffset = y * width;
			for (let x = minX; x <= maxX; x++) {
				const dx = x - cx;
				const dy = y - cy;
				if (dx * dx + dy * dy <= rSquared) result[rowOffset + x] = 255;
			}
		}
	} else if (mode === "trim_outside") {
		const searchR = radius * 1.4;
		const searchRSquared = searchR * searchR;
		const minX = Math.max(0, Math.floor(cx - searchR));
		const maxX = Math.min(width - 1, Math.ceil(cx + searchR));
		const minY = Math.max(0, Math.floor(cy - searchR));
		const maxY = Math.min(height - 1, Math.ceil(cy + searchR));
		for (let y = minY; y <= maxY; y++) {
			const rowOffset = y * width;
			for (let x = minX; x <= maxX; x++) {
				const dx = x - cx;
				const dy = y - cy;
				const distSq = dx * dx + dy * dy;
				if (distSq <= searchRSquared && distSq > rSquared) result[rowOffset + x] = 0;
			}
		}
	}
	return result;
}
/**
* Comprehensive smoothing pass before brush save.
* Purges all 1px hangs, spurs, whiskers, pinholes, and pixelation staircases,
* ensuring the resulting mask path is organically smooth and free of any 1px artifacts.
*/
function ensureSmoothMask(mask, width, height, anchorX, anchorY) {
	let working = new Uint8Array(mask);
	if (anchorX !== void 0 && anchorY !== void 0) working = cleanDanglingPixels(working, width, height, anchorX, anchorY, 25).cleanedMask;
	for (let pass = 0; pass < 3; pass++) {
		const next = new Uint8Array(working);
		for (let y = 1; y < height - 1; y++) {
			const row = y * width;
			for (let x = 1; x < width - 1; x++) {
				const idx = row + x;
				const val = working[idx];
				const nU = working[idx - width] > 0 ? 1 : 0;
				const nD = working[idx + width] > 0 ? 1 : 0;
				const nL = working[idx - 1] > 0 ? 1 : 0;
				const nR = working[idx + 1] > 0 ? 1 : 0;
				const nCard = nU + nD + nL + nR;
				const nUL = working[idx - width - 1] > 0 ? 1 : 0;
				const nUR = working[idx - width + 1] > 0 ? 1 : 0;
				const nDL = working[idx + width - 1] > 0 ? 1 : 0;
				const nDR = working[idx + width + 1] > 0 ? 1 : 0;
				const nTotal = nCard + nUL + nUR + nDL + nDR;
				if (val > 0) {
					if (nCard === 0 || nCard === 1 && nTotal <= 2 || nTotal <= 2) next[idx] = 0;
					else if (nCard === 2 && nTotal === 2) next[idx] = 0;
				} else if (nCard >= 3 || nTotal >= 7) next[idx] = 255;
			}
		}
		working = next;
	}
	const smoothed = new Uint8Array(working);
	const rKernelSq = 2.2 * 2.2;
	for (let y = 2; y < height - 2; y++) {
		const row = y * width;
		for (let x = 2; x < width - 2; x++) {
			const idx = row + x;
			let fg3x3 = 0;
			for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (working[(y + dy) * width + (x + dx)] > 0) fg3x3++;
			if (fg3x3 === 0 || fg3x3 === 9) {
				smoothed[idx] = working[idx];
				continue;
			}
			let weightSum = 0;
			let valSum = 0;
			for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
				const dSq = dx * dx + dy * dy;
				if (dSq > rKernelSq) continue;
				const w = 1 - dSq / 5.44;
				weightSum += w;
				if (working[(y + dy) * width + (x + dx)] > 0) valSum += w;
			}
			smoothed[idx] = valSum / Math.max(.001, weightSum) >= .48 ? 255 : 0;
		}
	}
	const finalResult = new Uint8Array(smoothed);
	for (let y = 1; y < height - 1; y++) {
		const row = y * width;
		for (let x = 1; x < width - 1; x++) {
			const idx = row + x;
			if (smoothed[idx] > 0) {
				let n8 = 0;
				for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
					if (dx === 0 && dy === 0) continue;
					if (smoothed[(y + dy) * width + (x + dx)] > 0) n8++;
				}
				if (n8 <= 2) finalResult[idx] = 0;
			}
		}
	}
	return finalResult;
}
function childrenOf(id, joints) {
	return joints.filter((j) => j.parentId === id);
}
function sourceMask(image, bg) {
	let mask = buildFigureMask(image, bg);
	let fgCount = 0;
	for (let i = 0; i < mask.length; i++) if (mask[i]) fgCount++;
	if (fgCount < image.width * image.height * .005) {
		const fallbackMask = buildFigureMask(image, {
			r: 0,
			g: 0,
			b: 0,
			threshold: 20,
			lift: false
		});
		let fallbackFgCount = 0;
		for (let i = 0; i < fallbackMask.length; i++) if (fallbackMask[i]) fallbackFgCount++;
		if (fallbackFgCount > fgCount) {
			mask = fallbackMask;
			fgCount = fallbackFgCount;
		}
	}
	if (fgCount < image.width * image.height * .005) mask.fill(1);
	return mask;
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
		if (joint.id === "hips" || joint.id.includes("hip") && !joint.parentId || joint.id === "pelvis" || joint.label.toLowerCase().includes("hip")) {
			const legStarts = kids.filter((k) => k.id.includes("hip_") || k.id.includes("thigh") || k.id.includes("leg") || k.label.toLowerCase().includes("hip") || k.label.toLowerCase().includes("thigh") || k.label.toLowerCase().includes("leg"));
			const actualLegStarts = legStarts.length > 0 ? legStarts : kids.filter((k) => !k.id.includes("spine") && !k.id.includes("chest") && !k.id.includes("torso"));
			const spineKid = kids.find((k) => k.id.includes("spine") || k.id.includes("chest") || k.id.includes("torso"));
			const bx = spineKid ? spineKid.x : joint.x;
			const by = spineKid ? spineKid.y : joint.y;
			let minX = joint.x - joint.thickness;
			let maxX = joint.x + joint.thickness;
			let minY = joint.y - joint.thickness;
			let maxY = joint.y + joint.thickness;
			for (const leg of actualLegStarts) {
				minX = Math.min(minX, leg.x - leg.thickness);
				maxX = Math.max(maxX, leg.x + leg.thickness);
				minY = Math.min(minY, leg.y - leg.thickness);
				maxY = Math.max(maxY, leg.y + leg.thickness);
			}
			return {
				joint,
				ax: joint.x,
				ay: joint.y,
				bx,
				by,
				radius: Math.max(10, joint.thickness * 1.2),
				leaf: false,
				isHip: true,
				legStarts: actualLegStarts,
				minX,
				maxX,
				minY,
				maxY
			};
		}
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
			const extension = Math.max(20, Math.min(80, len * .8));
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
* Partition the complete unmasked figure image without discarding non-joint regions.
*
* Every single pixel belonging to the figure mask is assigned to exactly one base part,
* following the unmasked image contours between joints.
* Terminal parts (hands, feet, head top) trace the edges from the wrist/ankle joint outward
* to enclose all remaining extremities and details.
* Only areas inside joints (and their overlapping rotation sockets) are duplicated between
* connected parts so puppets rotate cleanly without gaps.
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
			const isLeaf = segment.leaf === true;
			const isRoot = partIndex === rootOwner;
			const projection = segmentProjection(x, y, segment.ax, segment.ay, segment.bx, segment.by);
			if (projection < (isLeaf ? -.1 : isRoot ? -.3 : .05)) continue;
			const distSq = pointSegmentDistanceSquared(x, y, segment.ax, segment.ay, segment.bx, segment.by);
			const distance = Math.sqrt(distSq);
			const widthScale = Math.max(6, segment.radius);
			let projectionPenalty = 0;
			if (projection < 0) projectionPenalty = Math.abs(projection) * 2.5;
			else if (!isLeaf && projection > 1) projectionPenalty = (projection - 1) * 2;
			const leafBonus = isLeaf && projection >= 0 ? .8 : 1;
			const score = (distance / widthScale + projectionPenalty) * leafBonus;
			if (score < bestScore) {
				bestScore = score;
				best = partIndex;
			}
		}
		if (bestScore === Infinity) {
			let minDist = Infinity;
			for (let partIndex = 0; partIndex < segments.length; partIndex++) {
				const seg = segments[partIndex];
				const d = pointSegmentDistanceSquared(x, y, seg.ax, seg.ay, seg.bx, seg.by);
				if (d < minDist) {
					minDist = d;
					best = partIndex;
				}
			}
		}
		owner[i] = best;
	}
	return owner;
}
function getCurvedRadiusAtAngle(joint, angle) {
	const baseR = Math.max(8, joint.thickness) * 1.5;
	if (!joint.radialOffsets || joint.radialOffsets.length !== 8) return baseR;
	let a = angle;
	if (a < 0) a += Math.PI * 2;
	a = a % (Math.PI * 2);
	const angleStep = Math.PI / 4;
	const index1 = Math.floor(a / angleStep) % 8;
	const index2 = (index1 + 1) % 8;
	const t = (a - index1 * angleStep) / angleStep;
	const mu = (1 - Math.cos(t * Math.PI)) / 2;
	const r1 = baseR * (joint.radialOffsets[index1] ?? 1);
	const r2 = baseR * (joint.radialOffsets[index2] ?? 1);
	return r1 * (1 - mu) + r2 * mu;
}
function overlapMask(mask, width, height, joint, radius) {
	const result = new Uint8Array(width * height);
	const hasRadialOffsets = joint.radialOffsets && joint.radialOffsets.length === 8;
	let maxR = hasRadialOffsets ? Math.max(8, joint.thickness) * 1.5 : radius;
	if (hasRadialOffsets && joint.radialOffsets) for (let i = 0; i < 8; i++) {
		const r = Math.max(8, joint.thickness) * 1.5 * (joint.radialOffsets[i] ?? 1);
		if (r > maxR) maxR = r;
	}
	const minX = Math.max(0, Math.floor(joint.x - maxR));
	const maxX = Math.min(width - 1, Math.ceil(joint.x + maxR));
	const minY = Math.max(0, Math.floor(joint.y - maxR));
	const maxY = Math.min(height - 1, Math.ceil(joint.y + maxR));
	for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
		if (!mask[y * width + x]) continue;
		const dx = x - joint.x;
		const dy = y - joint.y;
		const d = Math.hypot(dx, dy);
		if (hasRadialOffsets) {
			if (d <= getCurvedRadiusAtAngle(joint, Math.atan2(dy, dx))) result[y * width + x] = 1;
		} else if (d <= radius) result[y * width + x] = 1;
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
function renderAttachmentRaw(image, cropMinX, cropMinY, cw, ch) {
	const canvas = document.createElement("canvas");
	canvas.width = cw;
	canvas.height = ch;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is unavailable");
	const out = ctx.createImageData(cw, ch);
	for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
		const sx = cropMinX + x;
		const src = ((cropMinY + y) * image.width + sx) * 4;
		const dst = (y * cw + x) * 4;
		out.data[dst] = image.data[src] ?? 0;
		out.data[dst + 1] = image.data[src + 1] ?? 0;
		out.data[dst + 2] = image.data[src + 2] ?? 0;
		out.data[dst + 3] = image.data[src + 3] ?? 0;
	}
	ctx.putImageData(out, 0, 0);
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
	const rootIndex = segments.findIndex((s) => !s.joint.parentId);
	const owner = buildConstrainedOwnership(mask, width, height, segments, rootIndex >= 0 ? rootIndex : 0);
	const overlaps = /* @__PURE__ */ new Map();
	for (const joint of joints) {
		const socketRadius = Math.max(8, joint.thickness * 1.15);
		overlaps.set(joint.id, overlapMask(mask, width, height, joint, socketRadius));
	}
	const parts = [];
	for (let partIndex = 0; partIndex < segments.length; partIndex++) {
		const segment = segments[partIndex];
		const joint = segment.joint;
		const overlap = overlaps.get(joint.id) ?? new Uint8Array(width * height);
		const boundsOverlap = new Uint8Array(width * height);
		const kids = childrenOf(joint.id, joints);
		for (let i = 0; i < boundsOverlap.length; i++) if (overlap[i]) boundsOverlap[i] = 1;
		for (const child of kids) {
			const childOverlap = overlaps.get(child.id);
			if (!childOverlap) continue;
			for (let i = 0; i < boundsOverlap.length; i++) if (childOverlap[i]) boundsOverlap[i] = 1;
		}
		if (segment.isHip && segment.legStarts) for (const leg of segment.legStarts) {
			const legOverlap = overlaps.get(leg.id);
			if (!legOverlap) continue;
			for (let i = 0; i < boundsOverlap.length; i++) if (legOverlap[i]) boundsOverlap[i] = 1;
		}
		const bounds = boundsForPart(owner, mask, boundsOverlap, partIndex, width, height);
		let cropMinX = bounds ? Math.max(0, bounds.minX - 4) : 0;
		let cropMinY = bounds ? Math.max(0, bounds.minY - 4) : 0;
		let cropMaxX = bounds ? Math.min(width - 1, bounds.maxX + 4) : 0;
		let cropMaxY = bounds ? Math.min(height - 1, bounds.maxY + 4) : 0;
		let cw = bounds ? cropMaxX - cropMinX + 1 : 0;
		let ch = bounds ? cropMaxY - cropMinY + 1 : 0;
		let alpha = new Uint8Array(cw * ch);
		if (bounds && cw > 0 && ch > 0) {
			for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
				const sx = cropMinX + x;
				const srcIndex = (cropMinY + y) * width + sx;
				if (!mask[srcIndex]) continue;
				const isOwned = owner[srcIndex] === partIndex;
				let isJointSocketOverlap = overlap[srcIndex] === 1;
				if (!isJointSocketOverlap) {
					for (const child of kids) if ((overlaps.get(child.id)?.[srcIndex] ?? 0) === 1) {
						isJointSocketOverlap = true;
						break;
					}
				}
				if (!isJointSocketOverlap && segment.isHip && segment.legStarts) {
					for (const leg of segment.legStarts) if ((overlaps.get(leg.id)?.[srcIndex] ?? 0) === 1) {
						isJointSocketOverlap = true;
						break;
					}
				}
				if (isOwned || isJointSocketOverlap) alpha[y * cw + x] = 255;
			}
			alpha = ensureSmoothMask(alpha, cw, ch, joint.x - cropMinX, joint.y - cropMinY);
		}
		let rendered = bounds && cw > 0 && ch > 0 ? renderAttachmentFromMask(image, cropMinX, cropMinY, cw, ch, alpha) : {
			canvas: document.createElement("canvas"),
			pixelCount: 0
		};
		let rgbCanvas = rendered.canvas;
		let pixelCount = rendered.pixelCount;
		if (pixelCount < 8) {
			const r = Math.max(16, Math.round(joint.thickness * 1.6));
			cropMinX = Math.max(0, Math.floor(Math.min(segment.ax, segment.bx) - r));
			cropMinY = Math.max(0, Math.floor(Math.min(segment.ay, segment.by) - r));
			cropMaxX = Math.min(width - 1, Math.ceil(Math.max(segment.ax, segment.bx) + r));
			cropMaxY = Math.min(height - 1, Math.ceil(Math.max(segment.ay, segment.by) + r));
			cw = cropMaxX - cropMinX + 1;
			ch = cropMaxY - cropMinY + 1;
			alpha = new Uint8Array(cw * ch);
			for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
				const sx = cropMinX + x;
				const sy = cropMinY + y;
				if (pointSegmentDistanceSquared(sx, sy, segment.ax, segment.ay, segment.bx, segment.by) <= r * r && mask[sy * width + sx]) alpha[y * cw + x] = 255;
			}
			rendered = renderAttachmentFromMask(image, cropMinX, cropMinY, cw, ch, alpha);
			rgbCanvas = rendered.canvas;
			pixelCount = rendered.pixelCount;
			if (pixelCount < 4) {
				for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (pointSegmentDistanceSquared(cropMinX + x, cropMinY + y, segment.ax, segment.ay, segment.bx, segment.by) <= r * r) alpha[y * cw + x] = 255;
				rendered = renderAttachmentFromMask(image, cropMinX, cropMinY, cw, ch, alpha);
				rgbCanvas = rendered.canvas;
				pixelCount = rendered.pixelCount;
			}
		}
		if (pixelCount < 1 || cw < 1 || ch < 1) continue;
		const alphaCanvas = maskToCanvas(alpha, cw, ch);
		const rawCanvas = renderAttachmentRaw(image, cropMinX, cropMinY, cw, ch);
		parts.push({
			id: joint.id,
			boneId: joint.id,
			label: joint.label,
			parentBoneId: joint.parentId,
			role: "main",
			dataUrl: rgbCanvas.toDataURL("image/png"),
			baseDataUrl: rawCanvas.toDataURL("image/png"),
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
				confidence: estimatePartConfidence(joint, pixelCount, cw, ch, joint.thickness),
				pixelMask: new Uint8Array(alpha)
			},
			sourceVersion: 0,
			repaired: false
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
function regionEndpoint(mask, width, height, bbox, region, side) {
	const centerX = bbox.x + bbox.w * .5;
	const minX = side === "left" ? bbox.x : centerX;
	const maxX = side === "left" ? centerX : bbox.x + bbox.w;
	const minY = region === "hand" ? bbox.y + bbox.h * .28 : bbox.y + bbox.h * .62;
	const maxY = region === "hand" ? bbox.y + bbox.h * .72 : bbox.y + bbox.h;
	let best = -Infinity;
	let px = side === "left" ? minX : maxX;
	let py = region === "hand" ? (minY + maxY) / 2 : maxY;
	for (let y = Math.max(0, Math.floor(minY)); y < Math.min(height, Math.ceil(maxY)); y++) for (let x = Math.max(0, Math.floor(minX)); x < Math.min(width, Math.ceil(maxX)); x++) {
		if (!mask[y * width + x]) continue;
		const lateral = side === "left" ? centerX - x : x - centerX;
		const vertical = region === "foot" ? y - minY : Math.abs(y - (minY + maxY) / 2);
		const score = lateral * 2 - vertical * .35;
		if (score > best) {
			best = score;
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
	const handL = regionEndpoint(mask, width, height, bbox, "hand", "left");
	const handR = regionEndpoint(mask, width, height, bbox, "hand", "right");
	const footL = regionEndpoint(mask, width, height, bbox, "foot", "left");
	const footR = regionEndpoint(mask, width, height, bbox, "foot", "right");
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
		joint.thickness = Math.max(6, Math.min(joint.thickness * 1.25, w * 1.05, width));
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
var decodeCache = /* @__PURE__ */ new Map();
async function decodeFigure(dataUrl, name) {
	if (decodeCache.has(dataUrl)) return decodeCache.get(dataUrl);
	const prepared = await prepareSource(dataUrl);
	const imageData = readImageData(await loadHtmlImage(prepared.dataUrl));
	const bg = detectBackground(imageData);
	const mask = buildFigureMask(imageData, bg);
	const result = {
		source: {
			dataUrl: prepared.dataUrl,
			width: prepared.width,
			height: prepared.height,
			name
		},
		bg,
		mask
	};
	decodeCache.set(dataUrl, result);
	return result;
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
	brush: {
		mode: "add",
		radius: 20,
		opacity: 1,
		enabled: false,
		attachmentId: null
	},
	onionSkinning: false,
	animations: [],
	activeAnimId: null,
	playing: false,
	time: 0,
	speed: 1,
	sweepId: null,
	busy: null,
	error: null,
	conjurePrompt: "",
	editPrompt: "",
	motionPrompt: "",
	setStep: (step) => {
		set({
			step,
			error: null
		});
		if (step === "parts" && get().source && get().joints.length) {
			if (!get().attachments.length && !get().busy) get().cutPaper();
		}
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
	setEditPrompt: (v) => set({ editPrompt: v }),
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
			attachments: attachments.filter((attachment) => attachment.boneId !== id),
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
	editImage: async () => {
		const { source, editPrompt, kind } = get();
		if (!source) return;
		const prompt = editPrompt.trim();
		if (!prompt) {
			set({ error: "Describe the image edit first" });
			return;
		}
		set({
			busy: "Editing figure with Gemini",
			error: null
		});
		try {
			const result = await editFigureImage({ data: {
				prompt,
				imageDataUrl: source.dataUrl
			} });
			if (!result.ok) {
				set({
					busy: null,
					error: result.error
				});
				return;
			}
			await get().loadDataUrl(result.dataUrl, `${source.name} (edited)`, kind);
			set({ editPrompt: "" });
		} catch (err) {
			set({
				busy: null,
				error: err instanceof Error ? err.message : "Image edit failed"
			});
		}
	},
	autoPin: async () => {
		const { source, bg, kind } = get();
		if (!source) {
			set({ error: "Load a figure first" });
			return;
		}
		set({
			busy: "Auto-pinning skeleton...",
			error: null
		});
		try {
			const imageData = readImageData(await loadHtmlImage(source.dataUrl));
			const key = bg ?? detectBackground(imageData);
			const joints = placeFromSilhouette(buildFigureMask(imageData, key), source.width, source.height, kind);
			set({
				joints,
				selectedId: joints[0]?.id ?? null,
				jointVersion: get().jointVersion + 1,
				attachmentsNeedReview: true,
				bg: key,
				busy: null
			});
		} catch (e) {
			set({
				busy: null,
				error: e instanceof Error ? e.message : "Auto-pin failed"
			});
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
		const draftVersion = get().jointVersion;
		const { source, joints, bg, attachments, partDraftVersion } = get();
		if (!source || !joints.length) return;
		if (attachments.length && partDraftVersion === draftVersion) {
			set({ step: "parts" });
			return;
		}
		set({
			busy: "Cutting paper into parts...",
			error: null
		});
		try {
			let activeBg = bg;
			if (!activeBg) try {
				activeBg = detectBackground(readImageData(await loadHtmlImage(source.dataUrl)));
			} catch {
				activeBg = blankBg;
			}
			const parts = await cutParts(source.dataUrl, joints, activeBg ?? blankBg);
			if (!parts.length) throw new Error("No parts could be cut from the silhouette. Please check pin placements.");
			const animations = get().animations.length ? get().animations : [presetAnimation("idle", joints), presetAnimation("walk", joints)];
			set({
				attachments: parts.map((p) => {
					const existing = attachments.find((a) => a.id === p.id);
					return existing ? {
						...p,
						mask: existing.mask,
						sourceVersion: existing.sourceVersion,
						repaired: existing.repaired
					} : {
						...p,
						sourceVersion: 0,
						repaired: false
					};
				}),
				attachmentsNeedReview: false,
				partDraftVersion: draftVersion,
				busy: null,
				animations,
				activeAnimId: get().activeAnimId ?? animations[0]?.id ?? null,
				step: "parts",
				bg: activeBg
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
	toggleOnionSkinning: () => set((s) => ({ onionSkinning: !s.onionSkinning })),
	setBrush: (brush) => set((s) => ({ brush: {
		...s.brush,
		...brush
	} })),
	updateAttachmentMask: (attachmentId, newMask) => {
		set((s) => ({ attachments: s.attachments.map((a) => {
			if (a.id !== attachmentId) return a;
			const updatedMask = typeof newMask === "object" && newMask !== null && "bboxX" in newMask ? newMask : {
				...a.mask,
				pixelMask: newMask
			};
			return {
				...a,
				mask: updatedMask,
				repaired: true,
				sourceVersion: a.sourceVersion + 1
			};
		}) }));
	},
	saveAttachmentCut: (attachmentId, maskArray, cutDataUrl, alphaPngDataUrl, pixelCount) => {
		set((s) => ({
			attachments: s.attachments.map((a) => {
				if (a.id !== attachmentId) return a;
				return {
					...a,
					dataUrl: cutDataUrl,
					pixelCount,
					repaired: true,
					sourceVersion: a.sourceVersion + 1,
					mask: {
						...a.mask,
						alphaPngDataUrl,
						pixelMask: new Uint8Array(maskArray),
						source: "edited"
					}
				};
			}),
			attachmentsNeedReview: false
		}));
	},
	setAttachmentsNeedReview: (need) => set({ attachmentsNeedReview: need }),
	toggleSweep: (id) => set({
		sweepId: get().sweepId === id ? null : id,
		playing: false
	}),
	currentAngles: () => {
		const { joints, animations, activeAnimId, time } = get();
		return anglesAt(joints, animations.find((a) => a.id === activeAnimId) ?? null, time);
	},
	reset: () => {
		decodeCache.clear();
		set({
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
			sweepId: null,
			brush: {
				mode: "add",
				radius: 20,
				opacity: 1,
				enabled: false,
				attachmentId: null
			}
		});
	},
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
	const jointsById = new Map(joints.map((joint) => [joint.id, joint]));
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
		attachments: attachments.map((attachment) => {
			const bone = jointsById.get(attachment.boneId);
			if (!bone) throw new Error(`Attachment ${attachment.id} references missing bone ${attachment.boneId}`);
			return {
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
					x: round(bone.x - attachment.cropX),
					y: round(bone.y - attachment.cropY)
				},
				z_offset: attachment.zIndex,
				visible: attachment.visible ?? true
			};
		}),
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
masks/*.png         explicit per-part alpha masks when present
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
var _jsxFileName$4 = "/app/applet/src/components/studio/stage-canvas.tsx";
var imageCache = /* @__PURE__ */ new Map();
function clearImageCache(src) {
	if (src) imageCache.delete(src);
	else imageCache.clear();
}
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
	const updateJoint = useStudio((s) => s.updateJoint);
	const placeNextPin = useStudio((s) => s.placeNextPin);
	const fitRef = (0, import_react.useRef)({
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		s: 1
	});
	const dragRef = (0, import_react.useRef)(null);
	const [canvasCursor, setCanvasCursor] = (0, import_react.useState)("default");
	const [activeResizeId, setActiveResizeId] = (0, import_react.useState)(null);
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
				if (state.onionSkinning && state.activeAnimId && mode === "puppet") {
					const anim = state.animations.find((a) => a.id === state.activeAnimId);
					if (anim) {
						const prevTime = Math.max(0, state.time - .1);
						const nextTime = Math.min(anim.duration, state.time + .1);
						const prevAngles = anglesAt(state.joints, anim, prevTime);
						const nextAngles = anglesAt(state.joints, anim, nextTime);
						const byId = new Map(state.joints.map((j) => [j.id, j]));
						const ordered = [...state.attachments].sort((a, b) => a.zIndex - b.zIndex);
						ctx.globalAlpha = .2;
						for (const angles of [prevAngles, nextAngles]) for (const attachment of ordered) {
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
						ctx.globalAlpha = 1;
					}
				}
				if (mode === "bones" || !state.attachments.length) {
					try {
						const img = await cached(source.dataUrl);
						if (dead) return;
						ctx.drawImage(img, 0, 0, source.width, source.height);
					} catch {}
					drawBones(ctx, state.joints, state.selectedId, state.pinMode === "pin" ? state.joints[state.pinIndex]?.id ?? null : null, activeResizeId);
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
							if (state.step === "parts" && state.selectedId === attachment.boneId) drawRotationCrosshair(ctx, joint.x, joint.y, joint.thickness, true, false, activeResizeId === joint.id, joint.label, joint);
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
		mode,
		activeResizeId
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
		const s = fitRef.current.s || 1;
		if (selectedId) {
			const sel = joints.find((j) => j.id === selectedId);
			if (sel) {
				const d = Math.hypot(sel.x - x, sel.y - y);
				if (d <= Math.max(14 / s, Math.min(20, sel.thickness * .4))) return {
					joint: sel,
					type: "move"
				};
				const socketR = sel.thickness;
				const minRim = Math.max(8 / s, socketR * .45);
				const maxRim = Math.max(socketR * 1.5 + 14 / s, 36 / s);
				if (d >= minRim && d <= maxRim) return {
					joint: sel,
					type: "resize"
				};
			}
		}
		let bestMove = null;
		let bestResize = null;
		for (const joint of joints) {
			const d = Math.hypot(joint.x - x, joint.y - y);
			if (d <= Math.max(14 / s, Math.min(20, joint.thickness * .4))) {
				if (!bestMove || d < bestMove.dist) bestMove = {
					joint,
					dist: d
				};
			} else {
				const socketR = joint.thickness;
				const minRim = Math.max(8 / s, socketR * .45);
				const maxRim = Math.max(socketR * 1.5 + 14 / s, 36 / s);
				if (d >= minRim && d <= maxRim) {
					const rimDist = Math.abs(d - socketR);
					if (!bestResize || rimDist < bestResize.dist) bestResize = {
						joint,
						dist: rimDist
					};
				}
			}
		}
		if (bestMove) return {
			joint: bestMove.joint,
			type: "move"
		};
		if (bestResize) return {
			joint: bestResize.joint,
			type: "resize"
		};
		return null;
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref: wrapRef,
		className: "relative h-full min-h-72 w-full overflow-hidden rounded-lg bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("canvas", {
			ref: canvasRef,
			style: { cursor: canvasCursor },
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
				if (selectedId) {
					const sel = joints.find((j) => j.id === selectedId);
					if (sel) {
						const offsets = sel.radialOffsets || [
							1,
							1,
							1,
							1,
							1,
							1,
							1,
							1
						];
						const s = fitRef.current.s || 1;
						const t = Math.max(8, sel.thickness);
						for (let i = 0; i < 8; i++) {
							const angle = i * Math.PI / 4;
							const r = t * 1.5 * (offsets[i] ?? 1);
							const hx = sel.x + r * Math.cos(angle);
							const hy = sel.y + r * Math.sin(angle);
							if (Math.hypot(hx - p.x, hy - p.y) <= 12 / s) {
								dragRef.current = {
									type: "radialOffset",
									jointId: sel.id,
									pointIndex: i,
									centerX: sel.x,
									centerY: sel.y
								};
								setActiveResizeId(null);
								return;
							}
						}
					}
				}
				const hit = hitJoint(p.x, p.y);
				if (hit) {
					setSelected(hit.joint.id);
					if (hit.type === "resize") {
						dragRef.current = {
							type: "resize",
							jointId: hit.joint.id,
							centerX: hit.joint.x,
							centerY: hit.joint.y
						};
						setActiveResizeId(hit.joint.id);
					} else {
						dragRef.current = {
							type: "move",
							jointId: hit.joint.id
						};
						setActiveResizeId(null);
					}
				} else {
					setSelected(null);
					setActiveResizeId(null);
				}
			},
			onPointerMove: (e) => {
				const p = imagePoint(e);
				if (!p) return;
				if (dragRef.current) {
					if (dragRef.current.type === "move") moveJoint(dragRef.current.jointId, p.x, p.y);
					else if (dragRef.current.type === "resize") {
						const d = Math.hypot(p.x - dragRef.current.centerX, p.y - dragRef.current.centerY);
						const newThickness = Math.max(6, Math.min(180, Math.round(d)));
						updateJoint(dragRef.current.jointId, { thickness: newThickness });
					} else if (dragRef.current.type === "radialOffset") {
						const jointId = dragRef.current.jointId;
						const idx = dragRef.current.pointIndex;
						const joint = joints.find((j) => j.id === jointId);
						if (joint) {
							const angle = idx * Math.PI / 4;
							const dx = p.x - joint.x;
							const dy = p.y - joint.y;
							const projD = dx * Math.cos(angle) + dy * Math.sin(angle);
							const baseR = Math.max(8, joint.thickness) * 1.5;
							const mult = Math.max(.15, Math.min(3.5, projD / baseR));
							const currentOffsets = joint.radialOffsets ? [...joint.radialOffsets] : [
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1
							];
							currentOffsets[idx] = Number(mult.toFixed(3));
							updateJoint(jointId, { radialOffsets: currentOffsets });
						}
					}
					return;
				}
				if (mode === "bones" && pinMode !== "pin") {
					let hoverRadial = false;
					if (selectedId) {
						const sel = joints.find((j) => j.id === selectedId);
						if (sel) {
							const offsets = sel.radialOffsets || [
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1
							];
							const s = fitRef.current.s || 1;
							const t = Math.max(8, sel.thickness);
							for (let i = 0; i < 8; i++) {
								const angle = i * Math.PI / 4;
								const r = t * 1.5 * (offsets[i] ?? 1);
								const hx = sel.x + r * Math.cos(angle);
								const hy = sel.y + r * Math.sin(angle);
								if (Math.hypot(hx - p.x, hy - p.y) <= 12 / s) {
									hoverRadial = true;
									break;
								}
							}
						}
					}
					if (hoverRadial) setCanvasCursor("pointer");
					else {
						const hit = hitJoint(p.x, p.y);
						if (hit) setCanvasCursor(hit.type === "resize" ? "ew-resize" : "move");
						else setCanvasCursor("default");
					}
				} else setCanvasCursor(pinMode === "pin" ? "crosshair" : "default");
			},
			onPointerUp: () => {
				const wasRadial = dragRef.current?.type === "radialOffset";
				dragRef.current = null;
				setActiveResizeId(null);
				if (wasRadial) useStudio.getState().cutPaper();
			}
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 295,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 294,
		columnNumber: 5
	}, this);
}
function drawRotationCrosshair(ctx, x, y, thickness, isSelected, isPin, isResizing = false, label, joint) {
	const t = Math.max(8, thickness);
	const r1 = Math.round(t * .5);
	const r2 = Math.round(t);
	const r3 = Math.round(t * 1.5);
	const crossExtent = r3 + 8;
	ctx.save();
	ctx.lineWidth = 1;
	ctx.beginPath();
	if (joint && joint.radialOffsets && joint.radialOffsets.length === 8) {
		const points = [];
		for (let i = 0; i < 8; i++) {
			const angle = i * Math.PI / 4;
			const r = t * 1.5 * (joint.radialOffsets[i] ?? 1);
			points.push({
				x: x + r * Math.cos(angle),
				y: y + r * Math.sin(angle)
			});
		}
		const lastPt = points[7];
		const firstPt = points[0];
		ctx.moveTo((lastPt.x + firstPt.x) / 2, (lastPt.y + firstPt.y) / 2);
		for (let i = 0; i < 8; i++) {
			const p = points[i];
			const next = points[(i + 1) % 8];
			ctx.quadraticCurveTo(p.x, p.y, (p.x + next.x) / 2, (p.y + next.y) / 2);
		}
		ctx.closePath();
	} else ctx.arc(x, y, r3, 0, Math.PI * 2);
	ctx.fillStyle = isSelected ? "rgba(99, 246, 255, 0.08)" : "rgba(241, 236, 228, 0.03)";
	ctx.fill();
	ctx.strokeStyle = isSelected ? "rgba(99, 246, 255, 0.45)" : "rgba(241, 236, 228, 0.2)";
	ctx.setLineDash([3, 3]);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x, y, r2, 0, Math.PI * 2);
	ctx.strokeStyle = isResizing ? "#ffc53d" : isSelected ? "#63f6ff" : isPin ? "#ff5f9e" : "rgba(241, 236, 228, 0.6)";
	ctx.lineWidth = isResizing ? 2.5 : isSelected ? 1.8 : 1;
	ctx.setLineDash([]);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x, y, r1, 0, Math.PI * 2);
	ctx.strokeStyle = isSelected ? "rgba(99, 246, 255, 0.65)" : "rgba(241, 236, 228, 0.3)";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x - crossExtent, y);
	ctx.lineTo(x + crossExtent, y);
	ctx.moveTo(x, y - crossExtent);
	ctx.lineTo(x, y + crossExtent);
	ctx.strokeStyle = isSelected ? "rgba(99, 246, 255, 0.9)" : isPin ? "rgba(255, 95, 158, 0.9)" : "rgba(241, 236, 228, 0.65)";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x, y, isSelected || isPin ? 4 : 3, 0, Math.PI * 2);
	ctx.fillStyle = isSelected ? "#63f6ff" : isPin ? "#ff5f9e" : "#f1ece4";
	ctx.fill();
	ctx.strokeStyle = "#0d0c0b";
	ctx.lineWidth = 1;
	ctx.stroke();
	if (isSelected || isResizing) {
		const handleAngles = [
			0,
			Math.PI * .5,
			Math.PI,
			Math.PI * 1.5
		];
		for (let i = 0; i < handleAngles.length; i++) {
			const a = handleAngles[i];
			const hx = x + r2 * Math.cos(a);
			const hy = y + r2 * Math.sin(a);
			ctx.beginPath();
			ctx.arc(hx, hy, i === 0 ? 5 : 3.5, 0, Math.PI * 2);
			ctx.fillStyle = isResizing ? "#ffc53d" : "#63f6ff";
			ctx.fill();
			ctx.strokeStyle = "#0d0c0b";
			ctx.lineWidth = 1.2;
			ctx.stroke();
		}
	}
	if (isSelected && joint) {
		const offsets = joint.radialOffsets || [
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1
		];
		for (let i = 0; i < 8; i++) {
			const angle = i * Math.PI / 4;
			const r = t * 1.5 * (offsets[i] ?? 1);
			const hx = x + r * Math.cos(angle);
			const hy = y + r * Math.sin(angle);
			ctx.beginPath();
			ctx.moveTo(x + r1 * Math.cos(angle), y + r1 * Math.sin(angle));
			ctx.lineTo(hx, hy);
			ctx.strokeStyle = "rgba(99, 246, 255, 0.35)";
			ctx.setLineDash([2, 2]);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
			ctx.fillStyle = "#ff5f9e";
			ctx.fill();
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 1.2;
			ctx.stroke();
		}
	}
	if (label && (isSelected || isPin || isResizing)) {
		ctx.font = "600 12px Outfit, sans-serif";
		ctx.fillStyle = isResizing ? "#ffc53d" : isSelected ? "#63f6ff" : "#f1ece4";
		ctx.strokeStyle = "rgba(13,12,11,0.9)";
		ctx.lineWidth = 3;
		const text = isResizing ? `${label} • R: ${r2}px (drag circle to resize)` : `${label} (R: ${r2}px)`;
		ctx.strokeText(text, x + crossExtent + 6, y - 4);
		ctx.fillText(text, x + crossExtent + 6, y - 4);
	}
	ctx.restore();
}
function drawBones(ctx, joints, selectedId, pinId, activeResizeId = null) {
	for (const joint of joints) {
		const selected = joint.id === selectedId;
		const pin = joint.id === pinId;
		const isResizing = joint.id === activeResizeId;
		drawRotationCrosshair(ctx, joint.x, joint.y, joint.thickness, selected, pin, isResizing, joint.label, joint);
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
			className: cn("flex w-24 shrink-0 flex-col gap-1 rounded-md bg-elevated p-1.5 text-left shadow-border transition-all", selectedId === part.boneId ? "ring-2 ring-accent" : "hover:bg-elevated/80"),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "checker-tile relative aspect-square overflow-hidden rounded-sm group",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: part.dataUrl,
					alt: part.label,
					className: "h-full w-full object-contain"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 654,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute bottom-1 right-1 p-1 rounded bg-black/70 hover:bg-accent text-white opacity-80 hover:opacity-100 transition-all cursor-pointer",
					onClick: (e) => {
						e.stopPropagation();
						useStudio.getState().setBrush({
							enabled: true,
							attachmentId: part.id
						});
					},
					title: `Edit mask for ${part.label}`,
					role: "button",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Paintbrush, { className: "size-3" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 664,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 655,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 653,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: selectedId === part.boneId ? "truncate text-xs text-fg" : "truncate text-xs text-muted",
				children: part.label
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 667,
				columnNumber: 11
			}, this)]
		}, part.id, true, {
			fileName: _jsxFileName$4,
			lineNumber: 644,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 642,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/studio/ai-image-modal.tsx";
var CREATE_PRESETS = [
	"Wooden acrobat in striped jester attire",
	"Steampunk brass automaton with visible clockwork gears",
	"Origami paper samurai warrior with folded armor",
	"Stained-glass winged fairy figure",
	"Clockwork tin rabbit in a velvet waistcoat",
	"Porcelain knight with silver filigree armor"
];
var EDIT_PRESETS = [
	"Add a golden crown and flowing royal cape",
	"Add steampunk brass goggles and miniature back wings",
	"Change costume to glowing neon cybernetic plating",
	"Add elaborate robotic wings attached to the shoulders",
	"Give it a vintage magician top hat and silver cane",
	"Make the surface weathered antique bronze with verdigris patina"
];
function AiImageModal({ open, onClose, defaultTab }) {
	const source = useStudio((s) => s.source);
	const busy = useStudio((s) => s.busy);
	const kind = useStudio((s) => s.kind);
	const setKind = useStudio((s) => s.setKind);
	const conjurePrompt = useStudio((s) => s.conjurePrompt);
	const setConjurePrompt = useStudio((s) => s.setConjurePrompt);
	const editPrompt = useStudio((s) => s.editPrompt);
	const setEditPrompt = useStudio((s) => s.setEditPrompt);
	const conjure = useStudio((s) => s.conjure);
	const editImage = useStudio((s) => s.editImage);
	const [tab, setTab] = (0, import_react.useState)(defaultTab || (source ? "edit" : "create"));
	if (!open) return null;
	const handleCreate = async () => {
		await conjure();
		if (!useStudio.getState().error) onClose();
	};
	const handleEdit = async () => {
		await editImage();
		if (!useStudio.getState().error) onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative flex w-full max-w-2xl flex-col rounded-xl border border-border bg-surface shadow-2xl overflow-hidden",
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-b border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5 text-accent" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 78,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-xl font-medium text-fg",
								children: "Gemini AI Image Studio"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 79,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "text-xs font-mono border-accent/40 text-accent",
								children: "gemini-3.1-flash-image-preview"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 82,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 77,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-md p-1.5 text-muted hover:bg-elevated hover:text-fg transition-colors",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 92,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 86,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 76,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex border-b border-border bg-bg/50 px-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setTab("create"),
						className: cn("flex items-center gap-2 border-b-2 py-3 px-3 text-sm font-medium transition-colors", tab === "create" ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image$1, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 108,
							columnNumber: 13
						}, this), "Create New Figure"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 98,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						disabled: !source,
						onClick: () => setTab("edit"),
						className: cn("flex items-center gap-2 border-b-2 py-3 px-3 text-sm font-medium transition-colors", tab === "edit" ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg", !source && "opacity-40 cursor-not-allowed"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Paintbrush, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 123,
								columnNumber: 13
							}, this),
							"Edit Current Figure",
							!source && /* @__PURE__ */ (void 0)("span", {
								className: "text-xs text-subtle",
								children: "(Load a figure first)"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 125,
								columnNumber: 25
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 111,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 97,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-6 space-y-5 overflow-y-auto max-h-[70vh]",
					children: tab === "create" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "create-prompt",
									className: "text-sm font-medium text-fg",
									children: "Prompt for New Figure"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 134,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									id: "create-prompt",
									rows: 3,
									value: conjurePrompt,
									onChange: (e) => setConjurePrompt(e.target.value),
									placeholder: "Describe a character, creature, or puppet to generate from scratch...",
									className: "resize-none"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 137,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 133,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted",
									children: "Skeleton Skeleton Archetype"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 149,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-1.5",
									children: Object.keys(KIND_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setKind(k),
										className: cn("rounded-full px-3 py-1 text-xs transition-colors", k === kind ? "bg-accent text-accent-fg font-medium" : "bg-elevated text-muted hover:text-fg"),
										children: KIND_LABEL[k]
									}, k, false, {
										fileName: _jsxFileName$3,
										lineNumber: 152,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 150,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 148,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted",
									children: "Inspiration Prompts"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 171,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-1.5",
									children: CREATE_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setConjurePrompt(preset),
										className: "rounded-md border border-border bg-elevated/60 px-2.5 py-1 text-xs text-muted hover:bg-elevated hover:text-fg transition-colors text-left",
										children: preset
									}, preset, false, {
										fileName: _jsxFileName$3,
										lineNumber: 174,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 172,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 170,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-2 flex justify-end gap-2 border-t border-border",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									onClick: onClose,
									disabled: Boolean(busy),
									children: "Cancel"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 187,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									onClick: () => void handleCreate(),
									disabled: Boolean(busy) || !conjurePrompt.trim(),
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 195,
										columnNumber: 19
									}, this), busy ? "Generating Figure..." : "Create Figure with Gemini"]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 190,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 186,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 132,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [
							source ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4 rounded-lg border border-border bg-elevated/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: source.dataUrl,
									alt: source.name,
									className: "size-16 rounded-md object-contain bg-black/40 border border-border"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 204,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "font-medium text-fg truncate",
											children: source.name
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 210,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-muted",
											children: [
												source.width,
												" × ",
												source.height,
												"px • ",
												KIND_LABEL[kind],
												" skeleton"
											]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 211,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-accent mt-0.5",
											children: "Gemini will edit this figure while preserving limbs and stance for rigging."
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 214,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 209,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 203,
								columnNumber: 17
							}, this) : null,
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "edit-prompt",
									className: "text-sm font-medium text-fg",
									children: "Edit Instructions"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 222,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									id: "edit-prompt",
									rows: 3,
									value: editPrompt,
									onChange: (e) => setEditPrompt(e.target.value),
									placeholder: "Describe modifications to apply (e.g., 'Add a top hat and brass goggles', 'Make the robes crimson silk', 'Add dragon wings')...",
									className: "resize-none"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 225,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 221,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted",
									children: "Quick Modifications"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 237,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-1.5",
									children: EDIT_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setEditPrompt(preset),
										className: "rounded-md border border-border bg-elevated/60 px-2.5 py-1 text-xs text-muted hover:bg-elevated hover:text-fg transition-colors text-left",
										children: preset
									}, preset, false, {
										fileName: _jsxFileName$3,
										lineNumber: 240,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 238,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 236,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-2 flex justify-end gap-2 border-t border-border",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									onClick: onClose,
									disabled: Boolean(busy),
									children: "Cancel"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 253,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									onClick: () => void handleEdit(),
									disabled: Boolean(busy) || !editPrompt.trim() || !source,
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 261,
										columnNumber: 19
									}, this), busy ? "Editing Figure..." : "Apply Edit with Gemini"]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 256,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 252,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 201,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 130,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 70,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 69,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/studio/brush-editor.tsx";
function BrushEditor() {
	const { brush, attachments, source, joints, saveAttachmentCut, setBrush } = useStudio();
	const containerRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const overlayCanvasRef = (0, import_react.useRef)(null);
	const attachment = attachments.find((a) => a.id === brush.attachmentId);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [mode, setMode] = (0, import_react.useState)("add");
	const [radius, setRadius] = (0, import_react.useState)(brush.radius || 18);
	const [zoom, setZoom] = (0, import_react.useState)(2.5);
	const [snapEnabled, setSnapEnabled] = (0, import_react.useState)(true);
	const [showCrosshairs, setShowCrosshairs] = (0, import_react.useState)(true);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [historyIndex, setHistoryIndex] = (0, import_react.useState)(-1);
	const [isDrawing, setIsDrawing] = (0, import_react.useState)(false);
	const [snapStatus, setSnapStatus] = (0, import_react.useState)(null);
	const [brushCursor, setBrushCursor] = (0, import_react.useState)(null);
	const baseImgRef = (0, import_react.useRef)(null);
	const activeMaskRef = (0, import_react.useRef)(null);
	const lastPosRef = (0, import_react.useRef)(null);
	const crosshairPoints = (0, import_react.useMemo)(() => {
		if (!attachment) return [];
		const points = [];
		const p1Thickness = Math.max(8, attachment.thickness || 20);
		const parentJoint = joints.find((j) => j.id === attachment.boneId);
		points.push({
			x: attachment.localPivotX,
			y: attachment.localPivotY,
			radii: [
				Math.round(p1Thickness * .5),
				Math.round(p1Thickness),
				Math.round(p1Thickness * 1.5)
			],
			label: "Hinge Pivot",
			isParent: true,
			joint: parentJoint
		});
		const childJoints = joints.filter((j) => j.parentId === attachment.boneId);
		for (const cj of childJoints) {
			const childLocalX = cj.x - attachment.cropX;
			const childLocalY = cj.y - attachment.cropY;
			const cThickness = Math.max(8, cj.thickness || 16);
			points.push({
				x: childLocalX,
				y: childLocalY,
				radii: [
					Math.round(cThickness * .5),
					Math.round(cThickness),
					Math.round(cThickness * 1.5)
				],
				label: cj.label || "Distal Hinge",
				isParent: false,
				joint: cj
			});
		}
		return points;
	}, [attachment, joints]);
	const computeCrosshairFitScale = (0, import_react.useCallback)(() => {
		if (!attachment || !containerRef.current) return 3;
		const rect = containerRef.current.getBoundingClientRect();
		const viewW = Math.max(300, rect.width - 64);
		const viewH = Math.max(300, rect.height - 64);
		if (crosshairPoints.length >= 2) {
			const p1 = crosshairPoints[0];
			const p2 = crosshairPoints[1];
			const maxR = Math.max(p1.radii[2] || 25, p2.radii[2] || 25);
			const minX = Math.min(p1.x, p2.x) - maxR * 1.4;
			const maxX = Math.max(p1.x, p2.x) + maxR * 1.4;
			const minY = Math.min(p1.y, p2.y) - maxR * 1.4;
			const maxY = Math.max(p1.y, p2.y) + maxR * 1.4;
			const spanW = Math.max(40, maxX - minX);
			const spanH = Math.max(40, maxY - minY);
			const targetScale = Math.min(viewW / spanW, viewH / spanH);
			return Math.min(7, Math.max(1.8, Number(targetScale.toFixed(2))));
		} else if (crosshairPoints.length === 1) {
			const p1 = crosshairPoints[0];
			const span = Math.max(p1.radii[2] * 2.2, attachment.width * .5, attachment.height * .5) * 2;
			const targetScale = Math.min(viewW / span, viewH / span);
			return Math.min(7, Math.max(2.2, Number(targetScale.toFixed(2))));
		} else {
			const targetScale = Math.min(viewW / attachment.width, viewH / attachment.height);
			return Math.min(6, Math.max(1.5, Number(targetScale.toFixed(2))));
		}
	}, [attachment, crosshairPoints]);
	const renderMaskCanvas = (0, import_react.useCallback)(() => {
		const canvas = canvasRef.current;
		const baseImg = baseImgRef.current;
		const mask = activeMaskRef.current;
		if (!canvas || !baseImg || !mask || !attachment) return;
		const { width: w, height: h } = attachment;
		if (canvas.width !== w) canvas.width = w;
		if (canvas.height !== h) canvas.height = h;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const tileSize = 10;
		for (let y = 0; y < h; y += tileSize) for (let x = 0; x < w; x += tileSize) {
			ctx.fillStyle = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0 ? "#141414" : "#202020";
			ctx.fillRect(x, y, tileSize, tileSize);
		}
		const offscreen = document.createElement("canvas");
		offscreen.width = w;
		offscreen.height = h;
		const offCtx = offscreen.getContext("2d");
		if (!offCtx) return;
		offCtx.drawImage(baseImg, 0, 0, w, h);
		const imgData = offCtx.getImageData(0, 0, w, h);
		const d = imgData.data;
		for (let i = 0; i < mask.length; i++) {
			const m = mask[i];
			const idx = i * 4;
			const origA = d[idx + 3];
			if (origA === 0) continue;
			if (m === 0) {
				d[idx] = Math.min(255, Math.floor(d[idx] * .4 + 175));
				d[idx + 1] = Math.floor(d[idx + 1] * .22);
				d[idx + 2] = Math.floor(d[idx + 2] * .22);
				d[idx + 3] = Math.floor(origA * .38);
			}
		}
		offCtx.putImageData(imgData, 0, 0);
		ctx.drawImage(offscreen, 0, 0);
	}, [attachment]);
	const renderOverlayCanvas = (0, import_react.useCallback)(() => {
		const overlay = overlayCanvasRef.current;
		if (!overlay || !attachment) return;
		const displayW = Math.round(attachment.width * zoom);
		const displayH = Math.round(attachment.height * zoom);
		if (overlay.width !== displayW || overlay.height !== displayH) {
			overlay.width = displayW;
			overlay.height = displayH;
		}
		const ctx = overlay.getContext("2d");
		if (!ctx) return;
		ctx.clearRect(0, 0, displayW, displayH);
		if (showCrosshairs) for (const pt of crosshairPoints) {
			const sx = pt.x * zoom;
			const sy = pt.y * zoom;
			const r1 = pt.radii[0] * zoom;
			const r2 = pt.radii[1] * zoom;
			const r3 = pt.radii[2] * zoom;
			const crossExtent = r3 + 14;
			ctx.save();
			ctx.lineWidth = 1;
			ctx.beginPath();
			if (pt.joint && pt.joint.radialOffsets && pt.joint.radialOffsets.length === 8) {
				const points = [];
				for (let i = 0; i < 8; i++) {
					const angle = i * Math.PI / 4;
					const r = pt.radii[1] * 1.5 * zoom * (pt.joint.radialOffsets[i] ?? 1);
					points.push({
						x: sx + r * Math.cos(angle),
						y: sy + r * Math.sin(angle)
					});
				}
				const lastPt = points[7];
				const firstPt = points[0];
				ctx.moveTo((lastPt.x + firstPt.x) / 2, (lastPt.y + firstPt.y) / 2);
				for (let i = 0; i < 8; i++) {
					const p = points[i];
					const next = points[(i + 1) % 8];
					ctx.quadraticCurveTo(p.x, p.y, (p.x + next.x) / 2, (p.y + next.y) / 2);
				}
				ctx.closePath();
			} else ctx.arc(sx, sy, r3, 0, Math.PI * 2);
			ctx.fillStyle = pt.isParent ? "rgba(99, 246, 255, 0.05)" : "rgba(255, 209, 102, 0.03)";
			ctx.fill();
			ctx.strokeStyle = "rgba(99, 246, 255, 0.35)";
			ctx.setLineDash([3, 3]);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(sx, sy, r2, 0, Math.PI * 2);
			ctx.strokeStyle = pt.isParent ? "#63f6ff" : "#ffd166";
			ctx.setLineDash([]);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(sx, sy, r1, 0, Math.PI * 2);
			ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
			ctx.stroke();
			if (pt.joint) {
				const offsets = pt.joint.radialOffsets || [
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1
				];
				for (let i = 0; i < 8; i++) {
					const angle = i * Math.PI / 4;
					const r = pt.radii[1] * 1.5 * zoom * (offsets[i] ?? 1);
					const hx = sx + r * Math.cos(angle);
					const hy = sy + r * Math.sin(angle);
					ctx.beginPath();
					ctx.moveTo(sx + r1 * Math.cos(angle), sy + r1 * Math.sin(angle));
					ctx.lineTo(hx, hy);
					ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
					ctx.setLineDash([2, 2]);
					ctx.stroke();
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.arc(hx, hy, 3, 0, Math.PI * 2);
					ctx.fillStyle = "#ff5f9e";
					ctx.fill();
					ctx.strokeStyle = "#000000";
					ctx.lineWidth = 1;
					ctx.stroke();
				}
			}
			ctx.beginPath();
			ctx.moveTo(Math.round(sx - crossExtent) + .5, Math.round(sy) + .5);
			ctx.lineTo(Math.round(sx + crossExtent) + .5, Math.round(sy) + .5);
			ctx.moveTo(Math.round(sx) + .5, Math.round(sy - crossExtent) + .5);
			ctx.lineTo(Math.round(sx) + .5, Math.round(sy + crossExtent) + .5);
			ctx.strokeStyle = pt.isParent ? "rgba(99, 246, 255, 0.85)" : "rgba(255, 209, 102, 0.85)";
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(sx, sy, 3, 0, Math.PI * 2);
			ctx.fillStyle = pt.isParent ? "#63f6ff" : "#ffd166";
			ctx.fill();
			ctx.strokeStyle = "#000000";
			ctx.stroke();
			ctx.font = "600 11px Outfit, sans-serif";
			ctx.fillStyle = pt.isParent ? "#63f6ff" : "#ffd166";
			ctx.strokeStyle = "rgba(0,0,0,0.8)";
			ctx.lineWidth = 3;
			const text = `${pt.label} (R:${pt.radii[1]}px)`;
			ctx.strokeText(text, sx + crossExtent + 4, sy + 3);
			ctx.fillText(text, sx + crossExtent + 4, sy + 3);
			ctx.restore();
		}
		if (snapStatus?.snapped && snapStatus.targetPoint) {
			const pt = snapStatus.targetPoint;
			const sx = pt.x * zoom;
			const sy = pt.y * zoom;
			ctx.save();
			if (snapStatus.type === "circle" && snapStatus.targetRadius) {
				const sr = snapStatus.targetRadius * zoom;
				ctx.beginPath();
				ctx.arc(sx, sy, sr, 0, Math.PI * 2);
				ctx.strokeStyle = "#ffe600";
				ctx.lineWidth = 2.5;
				ctx.shadowColor = "#ffe600";
				ctx.shadowBlur = 8;
				ctx.stroke();
			} else if (snapStatus.type === "axis") {
				ctx.beginPath();
				if (Math.abs(snapStatus.x - pt.x) < .01) {
					ctx.moveTo(Math.round(sx) + .5, 0);
					ctx.lineTo(Math.round(sx) + .5, displayH);
				} else {
					ctx.moveTo(0, Math.round(sy) + .5);
					ctx.lineTo(displayW, Math.round(sy) + .5);
				}
				ctx.strokeStyle = "#ffe600";
				ctx.lineWidth = 1.5;
				ctx.stroke();
			}
			const snapScreenX = snapStatus.x * zoom;
			const snapScreenY = snapStatus.y * zoom;
			ctx.beginPath();
			ctx.arc(snapScreenX, snapScreenY, 4.5, 0, Math.PI * 2);
			ctx.fillStyle = "#ffe600";
			ctx.fill();
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 1.5;
			ctx.stroke();
			ctx.restore();
		}
		if (brushCursor) {
			const bx = brushCursor.x * zoom;
			const by = brushCursor.y * zoom;
			const br = brushCursor.radius * zoom;
			ctx.save();
			ctx.beginPath();
			ctx.arc(bx, by, br, 0, Math.PI * 2);
			ctx.strokeStyle = brushCursor.mode === "add" ? "#63f6ff" : "#ff5f9e";
			ctx.lineWidth = 1.5;
			ctx.stroke();
			ctx.fillStyle = brushCursor.mode === "add" ? "#63f6ff" : "#ff5f9e";
			ctx.beginPath();
			ctx.arc(bx, by, 2, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
	}, [
		attachment,
		zoom,
		showCrosshairs,
		crosshairPoints,
		snapStatus,
		brushCursor
	]);
	(0, import_react.useEffect)(() => {
		if (!brush.enabled || !attachment) {
			baseImgRef.current = null;
			activeMaskRef.current = null;
			setHistory([]);
			setHistoryIndex(-1);
			return;
		}
		let isCancelled = false;
		setIsLoading(true);
		async function initialize() {
			if (!attachment) return;
			const { width: w, height: h } = attachment;
			try {
				let baseImg;
				if (attachment.baseDataUrl) baseImg = await loadHtmlImage(attachment.baseDataUrl);
				else if (source?.dataUrl) {
					const srcImg = await loadHtmlImage(source.dataUrl);
					const c = document.createElement("canvas");
					c.width = w;
					c.height = h;
					const cCtx = c.getContext("2d");
					if (cCtx) {
						cCtx.drawImage(srcImg, attachment.cropX, attachment.cropY, w, h, 0, 0, w, h);
						baseImg = await loadHtmlImage(c.toDataURL("image/png"));
					} else baseImg = await loadHtmlImage(attachment.dataUrl);
				} else baseImg = await loadHtmlImage(attachment.dataUrl);
				if (isCancelled) return;
				baseImgRef.current = baseImg;
				let initialMask;
				if (attachment.mask.pixelMask && attachment.mask.pixelMask.length === w * h) initialMask = new Uint8Array(attachment.mask.pixelMask);
				else if (attachment.mask.alphaPngDataUrl) {
					const alphaImg = await loadHtmlImage(attachment.mask.alphaPngDataUrl);
					const c = document.createElement("canvas");
					c.width = w;
					c.height = h;
					const cCtx = c.getContext("2d");
					if (cCtx) {
						cCtx.drawImage(alphaImg, 0, 0);
						const imgData = cCtx.getImageData(0, 0, w, h);
						initialMask = new Uint8Array(w * h);
						for (let i = 0; i < initialMask.length; i++) initialMask[i] = imgData.data[i * 4 + 3];
					} else initialMask = new Uint8Array(w * h).fill(255);
				} else initialMask = new Uint8Array(w * h).fill(255);
				if (isCancelled) return;
				activeMaskRef.current = initialMask;
				setHistory([initialMask]);
				setHistoryIndex(0);
				const idealScale = computeCrosshairFitScale();
				setZoom(idealScale);
				setIsLoading(false);
			} catch (err) {
				console.error("BrushEditor: Failed to load part images", err);
				if (!isCancelled) setIsLoading(false);
			}
		}
		initialize();
		return () => {
			isCancelled = true;
		};
	}, [
		brush.enabled,
		brush.attachmentId,
		attachment,
		source?.dataUrl,
		computeCrosshairFitScale
	]);
	(0, import_react.useEffect)(() => {
		if (!isLoading && containerRef.current && crosshairPoints.length > 0 && attachment) {
			const container = containerRef.current;
			let targetX = attachment.width / 2;
			let targetY = attachment.height / 2;
			if (crosshairPoints.length >= 2) {
				targetX = (crosshairPoints[0].x + crosshairPoints[1].x) / 2;
				targetY = (crosshairPoints[0].y + crosshairPoints[1].y) / 2;
			} else if (crosshairPoints.length === 1) {
				targetX = crosshairPoints[0].x;
				targetY = crosshairPoints[0].y;
			}
			const screenX = targetX * zoom;
			const screenY = targetY * zoom;
			container.scrollLeft = screenX - container.clientWidth / 2;
			container.scrollTop = screenY - container.clientHeight / 2;
		}
	}, [
		isLoading,
		zoom,
		crosshairPoints,
		attachment
	]);
	(0, import_react.useEffect)(() => {
		if (!isLoading && activeMaskRef.current && baseImgRef.current) {
			renderMaskCanvas();
			renderOverlayCanvas();
		}
	}, [
		isLoading,
		renderMaskCanvas,
		renderOverlayCanvas
	]);
	const getCanvasCoords = (e) => {
		const overlay = overlayCanvasRef.current;
		if (!overlay || !attachment) return null;
		const rect = overlay.getBoundingClientRect();
		const rawX = (e.clientX - rect.left) / zoom;
		const rawY = (e.clientY - rect.top) / zoom;
		if (snapEnabled && crosshairPoints.length > 0) {
			const snap = snapToCrosshairsAndCircles(rawX, rawY, crosshairPoints, 12 / zoom);
			return {
				x: snap.snapped ? snap.x : rawX,
				y: snap.snapped ? snap.y : rawY,
				snap
			};
		}
		return {
			x: rawX,
			y: rawY,
			snap: {
				x: rawX,
				y: rawY,
				snapped: false
			}
		};
	};
	const handlePointerDown = (e) => {
		const coords = getCanvasCoords(e);
		if (!coords || !attachment || !activeMaskRef.current) return;
		e.target.setPointerCapture(e.pointerId);
		setIsDrawing(true);
		lastPosRef.current = {
			x: coords.x,
			y: coords.y
		};
		setSnapStatus(coords.snap);
		const edits = [{
			x: coords.x,
			y: coords.y,
			radius,
			mode
		}];
		const nextMask = applyMaskEdits(activeMaskRef.current, attachment.width, attachment.height, edits);
		activeMaskRef.current = nextMask;
		setBrushCursor({
			x: coords.x,
			y: coords.y,
			radius,
			mode
		});
		renderMaskCanvas();
		renderOverlayCanvas();
	};
	const handlePointerMove = (e) => {
		const coords = getCanvasCoords(e);
		if (!coords || !attachment) return;
		setBrushCursor({
			x: coords.x,
			y: coords.y,
			radius,
			mode
		});
		setSnapStatus(coords.snap);
		if (!isDrawing || !activeMaskRef.current) {
			renderOverlayCanvas();
			return;
		}
		const last = lastPosRef.current ?? {
			x: coords.x,
			y: coords.y
		};
		const dist = Math.hypot(coords.x - last.x, coords.y - last.y);
		const stepSize = Math.max(1, radius * .25);
		const steps = Math.ceil(dist / stepSize);
		const edits = [];
		for (let i = 1; i <= steps; i++) {
			const t = i / steps;
			edits.push({
				x: last.x + (coords.x - last.x) * t,
				y: last.y + (coords.y - last.y) * t,
				radius,
				mode
			});
		}
		if (edits.length > 0) {
			const nextMask = applyMaskEdits(activeMaskRef.current, attachment.width, attachment.height, edits);
			activeMaskRef.current = nextMask;
			lastPosRef.current = {
				x: coords.x,
				y: coords.y
			};
			renderMaskCanvas();
			renderOverlayCanvas();
		}
	};
	const handlePointerUp = (e) => {
		if (!isDrawing) return;
		setIsDrawing(false);
		lastPosRef.current = null;
		try {
			e.target.releasePointerCapture(e.pointerId);
		} catch {}
		if (activeMaskRef.current) {
			const newHistory = history.slice(0, historyIndex + 1);
			newHistory.push(new Uint8Array(activeMaskRef.current));
			setHistory(newHistory);
			setHistoryIndex(newHistory.length - 1);
		}
	};
	const handlePointerLeave = () => {
		setBrushCursor(null);
		setSnapStatus(null);
		if (!isDrawing) renderOverlayCanvas();
	};
	const handleWheel = (e) => {
		if (!containerRef.current) return;
		e.preventDefault();
		const factor = e.deltaY < 0 ? 1.15 : .87;
		const nextZoom = Math.min(8, Math.max(.75, Number((zoom * factor).toFixed(2))));
		setZoom(nextZoom);
	};
	const handleUndo = () => {
		if (historyIndex <= 0) return;
		const nextIdx = historyIndex - 1;
		const prevMask = new Uint8Array(history[nextIdx]);
		activeMaskRef.current = prevMask;
		setHistoryIndex(nextIdx);
		renderMaskCanvas();
		renderOverlayCanvas();
	};
	const handleRedo = () => {
		if (historyIndex >= history.length - 1) return;
		const nextIdx = historyIndex + 1;
		const nextMask = new Uint8Array(history[nextIdx]);
		activeMaskRef.current = nextMask;
		setHistoryIndex(nextIdx);
		renderMaskCanvas();
		renderOverlayCanvas();
	};
	const handleReset = () => {
		if (history.length === 0) return;
		const initial = new Uint8Array(history[0]);
		activeMaskRef.current = initial;
		const newHistory = history.slice(0, historyIndex + 1);
		newHistory.push(initial);
		setHistory(newHistory);
		setHistoryIndex(newHistory.length - 1);
		renderMaskCanvas();
		renderOverlayCanvas();
	};
	const handleCleanDanglingPixels = () => {
		if (!attachment || !activeMaskRef.current) return;
		const { cleanedMask, removedPixels } = cleanDanglingPixels(activeMaskRef.current, attachment.width, attachment.height, attachment.localPivotX, attachment.localPivotY, 40);
		if (removedPixels === 0) {
			toast.info("No dangling debris detected on this part");
			return;
		}
		activeMaskRef.current = cleanedMask;
		const newHistory = history.slice(0, historyIndex + 1);
		newHistory.push(cleanedMask);
		setHistory(newHistory);
		setHistoryIndex(newHistory.length - 1);
		renderMaskCanvas();
		renderOverlayCanvas();
		toast.success(`Cleaned ${removedPixels} dangling pixels from cut!`);
	};
	const handleAddSocketCap = () => {
		if (!attachment || !activeMaskRef.current) return;
		const radius = Math.round(attachment.thickness || 20);
		const newMask = applySocketCap(activeMaskRef.current, attachment.width, attachment.height, attachment.localPivotX, attachment.localPivotY, radius, "add");
		activeMaskRef.current = newMask;
		const newHistory = history.slice(0, historyIndex + 1);
		newHistory.push(newMask);
		setHistory(newHistory);
		setHistoryIndex(newHistory.length - 1);
		renderMaskCanvas();
		renderOverlayCanvas();
		toast.success(`Applied circular socket cap (R:${radius}px) at hinge`);
	};
	const handleTrimHingeExcess = () => {
		if (!attachment || !activeMaskRef.current) return;
		const radius = Math.round(attachment.thickness || 20);
		const newMask = applySocketCap(activeMaskRef.current, attachment.width, attachment.height, attachment.localPivotX, attachment.localPivotY, radius, "trim_outside");
		activeMaskRef.current = newMask;
		const newHistory = history.slice(0, historyIndex + 1);
		newHistory.push(newMask);
		setHistory(newHistory);
		setHistoryIndex(newHistory.length - 1);
		renderMaskCanvas();
		renderOverlayCanvas();
		toast.success("Trimmed jagged hinge excess outside socket circle");
	};
	const handleSmoothContour = () => {
		if (!attachment || !activeMaskRef.current) return;
		const newMask = ensureSmoothMask(activeMaskRef.current, attachment.width, attachment.height, attachment.localPivotX, attachment.localPivotY);
		activeMaskRef.current = newMask;
		const newHistory = history.slice(0, historyIndex + 1);
		newHistory.push(newMask);
		setHistory(newHistory);
		setHistoryIndex(newHistory.length - 1);
		renderMaskCanvas();
		renderOverlayCanvas();
		toast.success("Contour smoothed: eliminated 1px hangs & irregular edges");
	};
	const handleSave = () => {
		if (!attachment || !baseImgRef.current || !activeMaskRef.current) return;
		const baseImg = baseImgRef.current;
		const { width: w, height: h } = attachment;
		const currentMask = ensureSmoothMask(activeMaskRef.current, w, h, attachment.localPivotX, attachment.localPivotY);
		activeMaskRef.current = currentMask;
		const cutCanvas = document.createElement("canvas");
		cutCanvas.width = w;
		cutCanvas.height = h;
		const cutCtx = cutCanvas.getContext("2d");
		if (!cutCtx) return;
		cutCtx.drawImage(baseImg, 0, 0, w, h);
		const imgData = cutCtx.getImageData(0, 0, w, h);
		const d = imgData.data;
		let pixelCount = 0;
		for (let i = 0; i < currentMask.length; i++) {
			const m = currentMask[i];
			const idx = i * 4;
			if (m === 0) d[idx + 3] = 0;
			else {
				d[idx + 3] = Math.min(d[idx + 3] || 255, m);
				if (d[idx + 3] > 8) pixelCount++;
			}
		}
		cutCtx.putImageData(imgData, 0, 0);
		const cutDataUrl = cutCanvas.toDataURL("image/png");
		const alphaCanvas = document.createElement("canvas");
		alphaCanvas.width = w;
		alphaCanvas.height = h;
		const alphaCtx = alphaCanvas.getContext("2d");
		if (!alphaCtx) return;
		const alphaImg = alphaCtx.createImageData(w, h);
		for (let i = 0; i < currentMask.length; i++) {
			const idx = i * 4;
			alphaImg.data[idx] = 255;
			alphaImg.data[idx + 1] = 255;
			alphaImg.data[idx + 2] = 255;
			alphaImg.data[idx + 3] = currentMask[i] ? 255 : 0;
		}
		alphaCtx.putImageData(alphaImg, 0, 0);
		const alphaPngDataUrl = alphaCanvas.toDataURL("image/png");
		clearImageCache(attachment.dataUrl);
		saveAttachmentCut(attachment.id, currentMask, cutDataUrl, alphaPngDataUrl, pixelCount);
		setBrush({
			enabled: false,
			attachmentId: null
		});
		toast.success(`Smoothed & saved refined mask for ${attachment.label}`);
	};
	const handleClose = () => {
		setBrush({
			enabled: false,
			attachmentId: null
		});
	};
	if (!brush.enabled || !attachment) return null;
	const displayWidth = Math.round(attachment.width * zoom);
	const displayHeight = Math.round(attachment.height * zoom);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200 select-none",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "bg-[#0c0c0c] border border-[#262626] rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col h-[94vh] overflow-hidden text-[#f5f5f5]",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-5 py-3 border-b border-[#222] flex items-center justify-between bg-[#111] shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-1.5 rounded-lg bg-[#63f6ff]/10 text-[#63f6ff]",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crosshair, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 839,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 838,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-display text-base font-semibold tracking-tight text-white",
								children: ["Precision Brush & Rigging: ", attachment.label]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 843,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] font-mono text-[#a3a3a3] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#333]",
								children: [
									attachment.width,
									"×",
									attachment.height,
									"px"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 846,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 842,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-[#888]",
							children: "1px crosshairs & concentric circles at rotation points • Snap enabled"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 850,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 841,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 837,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: handleClose,
						className: "text-[#a3a3a3] hover:text-white p-1.5 rounded-md hover:bg-[#222] transition-colors",
						title: "Close",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 860,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 855,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 836,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-5 py-2.5 border-b border-[#222] flex flex-wrap items-center justify-between gap-2.5 bg-[#141414] shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setMode("add"),
								className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${mode === "add" ? "bg-[#63f6ff] border-[#63f6ff] text-[#031012] shadow-md shadow-[#63f6ff]/20" : "bg-[#1f1f1f] border-[#333] text-[#a3a3a3] hover:text-white"}`,
								title: "Paint to add pixels back",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Paintbrush, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 877,
									columnNumber: 15
								}, this), "Brush (Add)"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 868,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setMode("erase"),
								className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${mode === "erase" ? "bg-[#ff5f9e] border-[#ff5f9e] text-white shadow-md shadow-[#ff5f9e]/20" : "bg-[#1f1f1f] border-[#333] text-[#a3a3a3] hover:text-white"}`,
								title: "Erase to cut out dangling debris",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eraser, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 889,
									columnNumber: 15
								}, this), "Eraser (Cut)"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 880,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 867,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 px-2.5 py-1 bg-[#1a1a1a] rounded-lg border border-[#2b2b2b]",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs text-[#a3a3a3] font-medium whitespace-nowrap",
								children: [
									"Radius: ",
									radius,
									"px"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 896,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "range",
								min: 3,
								max: 56,
								value: radius,
								onChange: (e) => setRadius(Number(e.target.value)),
								className: "w-20 sm:w-28 accent-[#63f6ff] cursor-pointer"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 899,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 895,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setSnapEnabled(!snapEnabled),
								className: `px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border ${snapEnabled ? "bg-[#ffe600]/15 border-[#ffe600]/50 text-[#ffe600]" : "bg-[#1a1a1a] border-[#333] text-[#888] hover:text-white"}`,
								title: "Snap brush and cut strokes to rotation point circles and axes",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Magnet, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 920,
										columnNumber: 15
									}, this),
									"Snap ",
									snapEnabled ? "ON" : "OFF"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 911,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setShowCrosshairs(!showCrosshairs),
								className: `px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border ${showCrosshairs ? "bg-[#63f6ff]/15 border-[#63f6ff]/40 text-[#63f6ff]" : "bg-[#1a1a1a] border-[#333] text-[#888] hover:text-white"}`,
								title: "Toggle 1px rotation point crosshairs and concentric circles",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crosshair, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 933,
									columnNumber: 15
								}, this), "Crosshairs"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 924,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 910,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1 bg-[#1a1a1a] px-2 py-1 rounded-lg border border-[#2b2b2b]",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setZoom(Math.max(.75, Number((zoom - .5).toFixed(1)))),
									className: "p-1 rounded text-[#a3a3a3] hover:text-white hover:bg-[#282828]",
									title: "Zoom Out",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ZoomOut, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 945,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 940,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-mono font-medium text-white px-1",
									children: [Math.round(zoom * 100), "%"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 947,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setZoom(Math.min(8, Number((zoom + .5).toFixed(1)))),
									className: "p-1 rounded text-[#a3a3a3] hover:text-white hover:bg-[#282828]",
									title: "Zoom In",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ZoomIn, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 955,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 950,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setZoom(computeCrosshairFitScale()),
									className: "px-2 py-0.5 text-[11px] rounded bg-[#282828] text-[#a3a3a3] hover:text-white ml-1 font-medium",
									title: "Scale between both rotation crosshairs",
									children: "Fit Crosshairs"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 957,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 939,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: handleUndo,
									disabled: historyIndex <= 0,
									className: "p-1.5 rounded-md border border-[#333] bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#282828] disabled:opacity-30 disabled:pointer-events-none transition-colors",
									title: "Undo (Ctrl+Z)",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Undo2, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 974,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 968,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: handleRedo,
									disabled: historyIndex >= history.length - 1,
									className: "p-1.5 rounded-md border border-[#333] bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#282828] disabled:opacity-30 disabled:pointer-events-none transition-colors",
									title: "Redo (Ctrl+Y)",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Redo2, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 982,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 976,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: handleReset,
									className: "p-1.5 rounded-md border border-[#333] bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#282828] transition-colors",
									title: "Reset to Original Cut",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 989,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 984,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 967,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 865,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-5 py-2 border-b border-[#222] flex flex-wrap items-center justify-between gap-2 bg-[#0e0e0e] shrink-0 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5 text-[#a3a3a3]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-[#63f6ff]" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 997,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium text-white",
							children: "Smart Shaping:"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 998,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 996,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: handleCleanDanglingPixels,
								className: "px-2.5 py-1 rounded-md bg-[#231a28] hover:bg-[#34243d] text-[#ff80bf] border border-[#ff80bf]/30 flex items-center gap-1.5 font-medium transition-colors",
								title: "Purge isolated dangling debris and disconnected scraps",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 1007,
									columnNumber: 15
								}, this), "Clean Dangling Debris"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 1002,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: handleAddSocketCap,
								className: "px-2.5 py-1 rounded-md bg-[#16272b] hover:bg-[#203a40] text-[#63f6ff] border border-[#63f6ff]/30 flex items-center gap-1.5 font-medium transition-colors",
								title: "Generate a clean circular hinge socket cap at rotation point",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 1016,
									columnNumber: 15
								}, this), "Round Socket Cap"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 1011,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: handleTrimHingeExcess,
								className: "px-2.5 py-1 rounded-md bg-[#24211a] hover:bg-[#332f24] text-[#ffd166] border border-[#ffd166]/30 flex items-center gap-1.5 font-medium transition-colors",
								title: "Trim jagged pixels outside rotation socket radius",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Maximize2, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 1025,
									columnNumber: 15
								}, this), "Trim Hinge Excess"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 1020,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: handleSmoothContour,
								className: "px-2.5 py-1 rounded-md bg-[#1c1c1c] hover:bg-[#282828] text-[#e0e0e0] border border-[#383838] flex items-center gap-1.5 font-medium transition-colors",
								title: "Eliminate 1px jagged spurs along cut boundaries",
								children: "Smooth Contour"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 1029,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 1001,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 995,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					ref: containerRef,
					onWheel: handleWheel,
					className: "flex-1 min-h-0 bg-[#080808] overflow-auto flex items-center justify-center p-8 relative",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center gap-3 text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-8 border-2 border-[#63f6ff] border-t-transparent rounded-full animate-spin" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 1047,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs",
							children: "Loading figure part and rotation hinges..."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 1048,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 1046,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative shadow-2xl rounded border border-[#2b2b2b] bg-[#141414] overflow-hidden",
						style: {
							width: `${displayWidth}px`,
							height: `${displayHeight}px`,
							minWidth: `${displayWidth}px`,
							minHeight: `${displayHeight}px`
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("canvas", {
							ref: canvasRef,
							style: {
								width: `${displayWidth}px`,
								height: `${displayHeight}px`,
								imageRendering: "pixelated",
								display: "block",
								position: "absolute",
								left: 0,
								top: 0
							}
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 1061,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("canvas", {
							ref: overlayCanvasRef,
							style: {
								width: `${displayWidth}px`,
								height: `${displayHeight}px`,
								display: "block",
								position: "absolute",
								left: 0,
								top: 0,
								cursor: "crosshair",
								pointerEvents: "auto",
								touchAction: "none"
							},
							onPointerDown: handlePointerDown,
							onPointerMove: handlePointerMove,
							onPointerUp: handlePointerUp,
							onPointerLeave: handlePointerLeave
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 1075,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 1051,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 1040,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-5 py-3 border-t border-[#222] flex flex-wrap items-center justify-between gap-3 bg-[#111] shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 text-xs text-[#a3a3a3]",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-[#63f6ff]" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 1101,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Primary Hinge:" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 1102,
										columnNumber: 15
									}, this),
									" ",
									attachment.localPivotX,
									",",
									attachment.localPivotY,
									" (R:",
									attachment.thickness,
									"px)"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 1100,
								columnNumber: 13
							}, this),
							crosshairPoints.length >= 2 && /* @__PURE__ */ (void 0)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (void 0)("span", { className: "size-2 rounded-full bg-[#ffd166]" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 1106,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("strong", { children: "Distal Hinge:" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 1107,
										columnNumber: 17
									}, this),
									" ",
									Math.round(crosshairPoints[1].x),
									",",
									Math.round(crosshairPoints[1].y)
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 1105,
								columnNumber: 15
							}, this),
							snapStatus?.snapped && /* @__PURE__ */ (void 0)("span", {
								className: "px-2 py-0.5 rounded bg-[#ffe600]/15 text-[#ffe600] border border-[#ffe600]/30 font-mono text-[11px] animate-pulse",
								children: ["SNAPPED TO ", snapStatus.type?.toUpperCase()]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 1111,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 1099,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2.5 ml-auto",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: handleClose,
							className: "px-4 py-2 rounded-lg text-sm font-medium border border-[#333] bg-[#181818] text-[#a3a3a3] hover:text-white hover:bg-[#222] transition-colors",
							children: "Cancel"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 1118,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: handleSave,
							className: "px-5 py-2 rounded-lg text-sm font-bold bg-[#63f6ff] hover:bg-[#51e7ef] text-[#031012] shadow-lg shadow-[#63f6ff]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-4 stroke-[2.5]" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 1130,
								columnNumber: 15
							}, this), "Apply & Save Cut"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 1125,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 1117,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 1098,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 834,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 833,
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
				lineNumber: 42,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "16",
				cy: "11",
				r: "1.4",
				fill: "currentColor"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 43,
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
				lineNumber: 44,
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
				lineNumber: 45,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 41,
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
	const [aiModalOpen, setAiModalOpen] = (0, import_react.useState)(false);
	const [aiModalTab, setAiModalTab] = (0, import_react.useState)("create");
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
				lineNumber: 126,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
				theme: "dark",
				position: "bottom-center"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 127,
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
							lineNumber: 134,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-2xl font-medium tracking-tight",
							children: "Marionette"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 135,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 129,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "hidden text-sm text-muted md:block",
						children: "Cut any picture into a stringed figure."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 137,
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
									lineNumber: 154,
									columnNumber: 17
								}, this), item.label]
							}, item.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 143,
								columnNumber: 15
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 138,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => {
								setAiModalTab(source ? "edit" : "create");
								setAiModalOpen(true);
							},
							className: "flex items-center gap-1.5 border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-accent-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 171,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "hidden sm:inline",
									children: "AI Studio"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 172,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "sm:hidden",
									children: "AI"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 173,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 161,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 160,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 128,
				columnNumber: 7
			}, this),
			error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-b border-border bg-elevated px-4 py-2 text-sm text-danger md:px-6",
				children: error
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 179,
				columnNumber: 9
			}, this) : null,
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "relative flex min-h-0 flex-1 flex-col",
				children: [step === "figure" || !source ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FigureStep, {}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 183,
					columnNumber: 41
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Workbench, {}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 183,
					columnNumber: 58
				}, this), busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-bg/70",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-12 animate-spin rounded-full border-4 border-accent border-t-transparent" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 186,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-display text-2xl italic text-ivory",
						children: busy
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 187,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 185,
					columnNumber: 11
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 182,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AiImageModal, {
				open: aiModalOpen,
				onClose: () => setAiModalOpen(false),
				defaultTab: aiModalTab
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 192,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 112,
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
						lineNumber: 212,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-4xl leading-tight font-medium tracking-tight text-balance md:text-6xl",
						children: "A figure. Pins. Paper. Strings."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 213,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "max-w-md text-pretty text-muted",
						children: "Drop a character, let the bench find its hinges, cut overlapping transparent parts, and export a labeled archive with a YAML rig — pivots, stop ranges, poses, and animation tracks."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 216,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 211,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => inputRef.current?.click(),
				className: "flex min-h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-10 text-center transition-colors duration-150 hover:border-pin hover:bg-elevated",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FolderOpen, { className: "size-6 text-muted" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 227,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display text-2xl",
						children: "Drop a figure here"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 228,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-sm text-muted",
						children: "PNG, JPG, or WebP. Front-facing, limbs unoccluded works best."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 229,
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
						lineNumber: 230,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 222,
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
							lineNumber: 251,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 250,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-1 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-xl",
							children: sample.name
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 258,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-sm text-muted",
							children: sample.blurb
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 259,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 257,
						columnNumber: 13
					}, this)]
				}, sample.id, true, {
					fileName: _jsxFileName$1,
					lineNumber: 244,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 242,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-3.5 rounded-xl border border-border bg-surface p-5 shadow-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-accent" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 268,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "conjure",
								className: "font-display text-lg text-fg",
								children: "Create figure with Gemini"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 269,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 267,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "outline",
							className: "text-xs font-mono border-accent/40 text-accent",
							children: "gemini-3.1-flash-image-preview"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 273,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 266,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted",
						children: "Describe any character, creature, or puppet. Gemini will generate a full-body isolated figure ready for string rigging."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 277,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-1.5 pb-1",
						children: [
							"Steampunk brass automaton",
							"Origami paper warrior",
							"Stained-glass fairy",
							"Tin rabbit in waistcoat",
							"Porcelain ballerina"
						].map((style) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setPrompt(style),
							className: "rounded-md border border-border bg-elevated/60 px-2.5 py-1 text-xs text-muted hover:bg-elevated hover:text-fg transition-colors",
							children: style
						}, style, false, {
							fileName: _jsxFileName$1,
							lineNumber: 288,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 280,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							id: "conjure",
							value: prompt,
							placeholder: "e.g. A clockwork clockmaker with brass spectacles and gears",
							onChange: (e) => setPrompt(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") conjure();
							},
							className: "flex-1"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 299,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => void conjure(),
							className: "shrink-0 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 310,
								columnNumber: 13
							}, this), "Create Figure"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 309,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 298,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 265,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 210,
		columnNumber: 5
	}, this);
}
function Workbench() {
	const step = useStudio((s) => s.step);
	const attachments = useStudio((s) => s.attachments);
	const joints = useStudio((s) => s.joints);
	const selectedId = useStudio((s) => s.selectedId);
	const [mobileTab, setMobileTab] = (0, import_react.useState)("stage");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col h-full min-h-0 flex-1 overflow-hidden p-2 md:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex md:hidden items-center justify-between gap-2 pb-2 shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex rounded-lg bg-elevated p-1 border border-border flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setMobileTab("stage"),
					className: cn("flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors", mobileTab === "stage" ? "bg-accent text-accent-fg shadow-sm" : "text-muted hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 341,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
						"Stage & Bones (",
						joints.length,
						")"
					] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 342,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 331,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setMobileTab("controls"),
					className: cn("flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors", mobileTab === "controls" ? "bg-accent text-accent-fg shadow-sm" : "text-muted hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersVertical, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 354,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Inspector & Pins" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 355,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 344,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 330,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 329,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 min-h-0 flex flex-col md:grid md:grid-cols-[auto_1fr_320px] lg:grid-cols-[auto_1fr_360px] gap-3 md:gap-4 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: "hidden md:flex md:flex-col gap-2 shrink-0",
					children: step === "bones" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BonesInspectorSidebar, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 364,
						columnNumber: 31
					}, this) : null
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 363,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: cn("flex-1 min-h-0 flex flex-col gap-3 overflow-hidden relative", mobileTab !== "stage" && "hidden md:flex"),
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative min-h-[360px] flex-1 rounded-xl bg-surface border border-border overflow-hidden",
							children: [
								step === "bones" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "md:hidden absolute top-3 left-3 z-10 flex flex-col gap-1.5 bg-surface/90 backdrop-blur-md p-1.5 rounded-xl border border-border shadow-lg",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BonesInspectorSidebar, {}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 378,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 377,
									columnNumber: 15
								}, this) : null,
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StageCanvas, { mode: step === "bones" ? "bones" : "puppet" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 382,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "md:hidden absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2 bg-surface/95 backdrop-blur-md px-3 py-2 rounded-xl border border-border shadow-xl",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 truncate",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: "outline",
											className: "border-accent/40 text-accent text-[10px] py-0 px-1.5 shrink-0",
											children: [joints.length, " bones"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 387,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs text-fg font-medium truncate",
											children: selectedId ? joints.find((j) => j.id === selectedId)?.label : "Tap pin on figure"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 390,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 386,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-1.5 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "sm",
											variant: "outline",
											className: "h-7 text-xs px-2.5",
											onClick: () => setMobileTab("controls"),
											children: "Adjust Pins"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 395,
											columnNumber: 17
										}, this), step === "bones" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "sm",
											className: "h-7 text-xs px-2.5 bg-accent text-accent-fg font-semibold shadow-sm",
											onClick: () => void useStudio.getState().cutPaper(),
											children: "Cut Parts"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 404,
											columnNumber: 19
										}, this) : null]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 394,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 385,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 374,
							columnNumber: 11
						}, this),
						step === "parts" || step === "archive" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PartTiles, { attachments }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 415,
							columnNumber: 53
						}, this) : null,
						step === "motion" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Timeline, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 416,
							columnNumber: 32
						}, this) : null
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 368,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: cn("h-full w-full md:w-80 lg:w-96 shrink-0 overflow-hidden", mobileTab !== "controls" && "hidden md:block"),
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollArea, {
						className: "h-full rounded-xl border border-border bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col gap-4 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "md:hidden flex items-center justify-between pb-2 border-b border-border",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted",
										children: "Bones & Settings"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 430,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-7 text-xs gap-1.5 text-accent border-accent/40",
										onClick: () => setMobileTab("stage"),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 437,
											columnNumber: 19
										}, this), "View on Stage"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 431,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 429,
									columnNumber: 15
								}, this),
								step === "bones" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BonesInspector, { onSwitchToStage: () => setMobileTab("stage") }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 442,
									columnNumber: 35
								}, this) : null,
								step === "parts" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PartsInspector, {}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 443,
									columnNumber: 35
								}, this) : null,
								step === "motion" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MotionInspector, {}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 444,
									columnNumber: 36
								}, this) : null,
								step === "archive" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArchiveInspector, {}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 445,
									columnNumber: 37
								}, this) : null
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 427,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 426,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 420,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 361,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 327,
		columnNumber: 5
	}, this);
}
function BonesInspectorSidebar() {
	const pinMode = useStudio((s) => s.pinMode);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				className: "size-11 p-0 flex items-center justify-center",
				onClick: () => useStudio.getState().setPinMode(pinMode === "pin" ? "adjust" : "pin"),
				title: pinMode === "pin" ? "Done pinning" : "Place bones",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pin, { className: "size-5" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 464,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 458,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				className: "size-11 p-0 flex items-center justify-center",
				onClick: () => void useStudio.getState().autoPin(),
				title: "Auto-pin",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-5" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 472,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 466,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				className: "size-11 p-0 flex items-center justify-center",
				onClick: () => void useStudio.getState().askGrokToPin(),
				title: "Ask Gemini to pin",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-5" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 479,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 474,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 457,
		columnNumber: 7
	}, this);
}
function BonesInspector({ onSwitchToStage }) {
	const kind = useStudio((s) => s.kind);
	const joints = useStudio((s) => s.joints);
	const selectedId = useStudio((s) => s.selectedId);
	const pinMode = useStudio((s) => s.pinMode);
	const pinIndex = useStudio((s) => s.pinIndex);
	const busy = useStudio((s) => s.busy);
	const selected = joints.find((j) => j.id === selectedId) ?? null;
	const next = joints[pinIndex];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-2xl",
					children: "Bones & Rotation Pins"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 499,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					className: "border-accent/40 text-accent gap-1 text-[11px] py-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crosshair, { className: "size-3" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 501,
						columnNumber: 13
					}, this), "1px Crosshairs"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 500,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 498,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-pretty text-muted",
				children: "Review pins and rotation points before cutting. Each hinge displays 1px crosshairs and concentric circles (core, socket, overlap)."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 505,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 497,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-lg border border-accent/25 bg-accent/5 p-2.5 text-xs text-muted flex items-start gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crosshair, { className: "size-4 text-accent shrink-0 mt-0.5" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 511,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "font-medium text-fg",
				children: "Precision Pinning Review"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 513,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[11px] text-muted leading-relaxed",
				children: "Verify rotation points on hinges. Concentric circles define your part socket overlap to eliminate dangling cut artifacts."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 514,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 512,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 510,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Skeleton" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 522,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-[11px] text-muted font-mono",
					children: KIND_LABEL[kind]
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 523,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 521,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-1.5",
				children: Object.keys(KIND_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => useStudio.getState().setKind(k),
					className: cn("size-11 rounded-lg flex items-center justify-center text-xs font-medium transition-all", k === kind ? "bg-accent text-accent-fg ring-2 ring-accent/30" : "bg-elevated text-muted hover:text-fg hover:bg-elevated/80"),
					title: KIND_LABEL[k],
					children: KIND_LABEL[k].slice(0, 2)
				}, k, false, {
					fileName: _jsxFileName$1,
					lineNumber: 527,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 525,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 520,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2 rounded-lg border border-border bg-elevated/40 p-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs font-semibold text-fg flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pin, { className: "size-3.5 text-accent" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 547,
							columnNumber: 13
						}, this),
						"Bone Hierarchy (",
						joints.length,
						" pins)"
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 546,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-[10px] text-muted",
					children: "Tap to inspect hinge"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 550,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 545,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1",
				children: joints.map((joint) => {
					const isSel = joint.id === selectedId;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => {
							useStudio.getState().setSelected(joint.id);
							onSwitchToStage?.();
						},
						className: cn("flex items-center justify-between gap-1 rounded px-2 py-1.5 text-left text-xs transition-colors border", isSel ? "border-accent bg-accent/20 text-fg font-medium shadow-xs" : "border-border/60 bg-surface/80 text-muted hover:text-fg hover:bg-elevated"),
						title: `Select ${joint.label}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 truncate",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("size-2 rounded-full shrink-0", isSel ? "bg-accent shadow-xs" : "bg-muted/50") }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 572,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "truncate",
								children: joint.label
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 573,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 571,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[10px] text-muted shrink-0",
							children: ["R:", Math.round(joint.thickness)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 575,
							columnNumber: 17
						}, this)]
					}, joint.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 556,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 552,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 544,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-lg border border-border bg-elevated/40 p-3 space-y-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs font-medium text-fg flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-accent" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 585,
							columnNumber: 13
						}, this), "Edit Figure with Gemini"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 584,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "text-[10px] font-mono border-accent/30 text-accent py-0",
						children: "gemini-3.1-flash-image-preview"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 588,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 583,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted",
					children: "Modify the costume, accessories, or materials of this figure."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 592,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-1",
					children: [
						"Add crown & cape",
						"Steampunk goggles & gears",
						"Dragon wings",
						"Weathered bronze"
					].map((quick) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => useStudio.getState().setEditPrompt(quick),
						className: "rounded border border-border bg-elevated px-2 py-0.5 text-[11px] text-muted hover:text-fg",
						children: quick
					}, quick, false, {
						fileName: _jsxFileName$1,
						lineNumber: 602,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 595,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						value: useStudio((s) => s.editPrompt),
						onChange: (e) => useStudio.getState().setEditPrompt(e.target.value),
						placeholder: "e.g. Add golden crown & wings...",
						className: "h-8 text-xs",
						onKeyDown: (e) => {
							if (e.key === "Enter") useStudio.getState().editImage();
						}
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 613,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						className: "size-8 shrink-0 p-0 flex items-center justify-center",
						disabled: !useStudio((s) => s.editPrompt).trim(),
						onClick: () => void useStudio.getState().editImage(),
						title: "Edit Figure",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 629,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 622,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 612,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 582,
			columnNumber: 7
		}, this),
		pinMode === "pin" && next ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "rounded-md bg-elevated px-3 py-2 text-sm text-ivory",
			children: ["Click the ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "font-medium",
				children: next.label
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 636,
				columnNumber: 21
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 635,
			columnNumber: 9
		}, this) : null,
		selected ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(JointFields, {
			joint: selected,
			onSwitchToStage
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 640,
			columnNumber: 9
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-sm text-muted",
			children: "Select a pin above or on stage to edit its range."
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 642,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			onClick: () => void useStudio.getState().cutPaper(),
			disabled: busy !== null,
			className: "gap-2 bg-accent text-accent-fg hover:bg-ivory shadow-md font-semibold transition-all",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scissors, { className: "size-4" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 649,
				columnNumber: 9
			}, this), busy?.includes("Cutting") ? "Cutting paper parts..." : "Review Complete — Cut Parts"]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 644,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 496,
		columnNumber: 5
	}, this);
}
function JointFields({ joint, onSwitchToStage }) {
	const j = useStudio((s) => s.joints.find((x) => x.id === joint.id));
	const update = useStudio((s) => s.updateJoint);
	if (!j) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3 rounded-lg bg-elevated p-3 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-semibold text-fg flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-accent inline-block" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 665,
						columnNumber: 13
					}, this), j.label]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 664,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[11px] text-muted",
					children: j.parentId ? `Linked to ${j.parentId.replace(/_/g, " ")}` : "Root hinge"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 668,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 663,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1",
					children: [onSwitchToStage ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "outline",
						className: "h-7 text-xs gap-1 md:hidden text-accent border-accent/30",
						onClick: onSwitchToStage,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 680,
							columnNumber: 15
						}, this), "Stage"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 674,
						columnNumber: 13
					}, this) : null, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "flex size-8 items-center justify-center rounded text-muted hover:text-danger hover:bg-danger/10 transition-colors",
						onClick: () => useStudio.getState().deleteJoint(j.id),
						"aria-label": "Remove joint",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 690,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 684,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 672,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 662,
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
				lineNumber: 694,
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
				lineNumber: 695,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Socket Radius (px)",
				value: Math.round(j.thickness),
				min: 4,
				max: 80,
				onChange: (v) => update(j.id, { thickness: v })
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 696,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				size: "sm",
				className: "w-full text-xs",
				onClick: () => useStudio.getState().toggleSweep(j.id),
				children: "Sweep range of motion"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 697,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 661,
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
				lineNumber: 720,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "font-mono text-xs tabular-nums text-muted",
				children: value
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 721,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 719,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider, {
			value: [value],
			min,
			max,
			step: 1,
			onValueChange: (v) => onChange(v[0] ?? value)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 723,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 718,
		columnNumber: 5
	}, this);
}
function PartsInspector() {
	const attachments = useStudio((s) => s.attachments);
	const needReview = useStudio((s) => s.attachmentsNeedReview);
	const selectedId = useStudio((s) => s.selectedId);
	const busy = useStudio((s) => s.busy);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-2xl",
					children: "Parts"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 738,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => useStudio.getState().setStep("bones"),
					className: "h-7 text-xs gap-1.5 text-muted hover:text-fg",
					title: "Review bone pinning and rotation crosshairs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crosshair, { className: "size-3 text-accent" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 746,
						columnNumber: 13
					}, this), "Review Pins"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 739,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 737,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-pretty text-muted",
				children: "Each limb is a transparent paper layer with extra paper over the parent pivot, so the hinge stays covered through motion."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 750,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 736,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: needReview ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					className: "bg-amber-500/15 text-amber-300 border-amber-500/30",
					children: "Pins moved — recut"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 759,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "outline",
					className: "h-6 text-[10px]",
					onClick: () => useStudio.getState().setAttachmentsNeedReview(false),
					children: "Mark Reviewed"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 760,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 758,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { children: [attachments.length, " cutout layers"] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 770,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 756,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: () => void useStudio.getState().cutPaper(),
				disabled: busy !== null,
				className: "flex-1 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scissors, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 780,
					columnNumber: 11
				}, this), busy?.includes("Cutting") ? "Cutting..." : attachments.length ? "Recut parts" : "Cut paper"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 775,
				columnNumber: 9
			}, this), attachments.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				onClick: () => useStudio.getState().setStep("motion"),
				children: "Motion"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 784,
				columnNumber: 11
			}, this) : null]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 774,
			columnNumber: 7
		}, this),
		attachments.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-lg border border-dashed border-border p-6 text-center space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scissors, { className: "mx-auto size-8 text-muted" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 792,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-medium text-fg",
					children: "No paper parts cut yet"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 793,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted",
					children: "Click \"Cut paper\" above to partition your figure into articulated limbs."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 794,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 791,
			columnNumber: 9
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-muted",
				children: "Limb Layers"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 800,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-2",
				children: attachments.map((part) => {
					const isSelected = selectedId === part.boneId;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => useStudio.getState().setSelected(part.boneId),
						className: cn("flex flex-col items-center gap-1.5 rounded-lg border p-2 text-left transition-all", isSelected ? "border-accent bg-accent/15 ring-1 ring-accent" : "border-border bg-elevated/60 hover:bg-elevated text-muted hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "checker-tile relative flex aspect-square w-full items-center justify-center overflow-hidden rounded bg-black/10",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: part.dataUrl,
								alt: part.label,
								className: "h-full w-full object-contain p-1"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 817,
								columnNumber: 21
							}, this), part.repaired && /* @__PURE__ */ (void 0)("div", {
								className: "absolute top-1 right-1 bg-emerald-500/80 size-2 rounded-full",
								title: "Mask repaired"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 819,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 816,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-full truncate text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block truncate text-xs font-medium text-fg",
									children: part.label
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 823,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-muted",
									children: [
										part.width,
										"×",
										part.height,
										"px"
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 824,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-fg", "size-8 mt-1 cursor-pointer flex items-center justify-center"),
									onClick: (e) => {
										e.stopPropagation();
										useStudio.getState().setBrush({
											enabled: true,
											attachmentId: part.id
										});
									},
									role: "button",
									title: "Edit Mask",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Paintbrush, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 837,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 825,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 822,
							columnNumber: 19
						}, this)]
					}, part.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 805,
						columnNumber: 17
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 801,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 799,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BrushEditor, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 846,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 735,
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
				lineNumber: 862,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-pretty text-muted",
				children: "Preset cycles, or prompt a walk, hunt, spawn — anything the joints can bear."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 863,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 861,
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
				lineNumber: 869,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 867,
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
					lineNumber: 883,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
					id: "motion",
					value: prompt,
					placeholder: "hunting stalk, then a pounce",
					onChange: (e) => setPrompt(e.target.value)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 884,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "w-full",
					onClick: () => void useStudio.getState().askGrokToDirect(),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 891,
						columnNumber: 11
					}, this), "Direct the puppet"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 890,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 882,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "secondary",
			className: "w-full",
			onClick: () => useStudio.getState().setPlaying(!playing),
			children: [playing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pause, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 896,
				columnNumber: 20
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "ml-0.5" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 896,
				columnNumber: 32
			}, this), playing ? "Pause" : "Play"]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 895,
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
			lineNumber: 899,
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
					lineNumber: 918,
					columnNumber: 17
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 910,
				columnNumber: 15
			}, this) }, anim.id, false, {
				fileName: _jsxFileName$1,
				lineNumber: 909,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 907,
			columnNumber: 9
		}, this) : null,
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			onClick: () => useStudio.getState().setStep("archive"),
			children: "Pack the archive"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 924,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 860,
		columnNumber: 5
	}, this);
}
function Timeline() {
	const time = useStudio((s) => s.time);
	const animations = useStudio((s) => s.animations);
	const active = useStudio((s) => s.activeAnimId);
	const onionSkinning = useStudio((s) => s.onionSkinning);
	const anim = animations.find((a) => a.id === active);
	if (!anim) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-3 rounded-lg bg-surface px-3 py-2 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: onionSkinning ? "default" : "ghost",
				size: "icon",
				className: "size-8",
				onClick: () => useStudio.getState().toggleOnionSkinning(),
				title: "Toggle onion skinning",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ghost, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 947,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 940,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "font-mono text-xs tabular-nums text-muted",
				children: [
					time.toFixed(2),
					" / ",
					anim.duration.toFixed(2),
					"s"
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 949,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider, {
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
				lineNumber: 952,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 939,
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
				lineNumber: 997,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-pretty text-muted",
				children: "A zip of labeled transparent parts plus YAML that names every rotation point, stop, pose, and track."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 998,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 996,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
				htmlFor: "puppet-name",
				children: "Name"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 1004,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
				id: "puppet-name",
				value: name,
				onChange: (e) => useStudio.getState().setName(e.target.value)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 1005,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 1003,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			className: "w-full",
			onClick: () => void download(),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 1008,
				columnNumber: 9
			}, this), "Download puppet zip"]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 1007,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			className: "w-full",
			onClick: copyYaml,
			children: "Copy YAML"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 1011,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Separator, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 1014,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
			className: "max-h-80 overflow-auto rounded-md bg-elevated p-3 font-mono text-xs leading-relaxed text-muted",
			children: yaml
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 1015,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 995,
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
