import type { AnimationDef, EaseName, Joint, Keyframe } from "./types";

export function clampAngle(joint: Joint, angle: number) {
  return Math.max(joint.minAngle, Math.min(joint.maxAngle, angle));
}

function easeT(t: number, ease: EaseName) {
  const x = Math.max(0, Math.min(1, t));
  if (ease === "sine") return 0.5 - 0.5 * Math.cos(Math.PI * x);
  if (ease === "quad-out") return 1 - (1 - x) * (1 - x);
  if (ease === "quad-in") return x * x;
  return x;
}

export function sampleTrack(keys: Keyframe[], tNorm: number) {
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

export function anglesAt(joints: Joint[], anim: AnimationDef | null, time: number): Record<string, number> {
  const out: Record<string, number> = {};
  for (const joint of joints) out[joint.id] = 0;
  if (!anim || anim.duration <= 0) return out;
  const tNorm = anim.loop
    ? ((time / anim.duration) % 1 + 1) % 1
    : Math.max(0, Math.min(1, time / anim.duration));
  for (const joint of joints) {
    const track = anim.tracks[joint.id];
    if (!track) continue;
    out[joint.id] = clampAngle(joint, sampleTrack(track, tNorm));
  }
  return out;
}

function findJoint(joints: Joint[], ...needles: string[]) {
  const n = needles.map((s) => s.toLowerCase());
  return joints.find((j) => n.some((k) => j.id === k || j.id.includes(k) || j.label.toLowerCase().includes(k)));
}

function k(t: number, angle: number, ease: EaseName = "sine"): Keyframe {
  return { t, angle, ease };
}

function setTrack(tracks: Record<string, Keyframe[]>, joint: Joint | undefined, keys: Keyframe[]) {
  if (!joint) return;
  tracks[joint.id] = keys.map((key) => ({
    ...key,
    angle: clampAngle(joint, key.angle),
  }));
}

export function presetAnimation(name: string, joints: Joint[]): AnimationDef {
  const tracks: Record<string, Keyframe[]> = {};
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
    setTrack(tracks, torso, [k(0, 0), k(0.5, 3), k(1, 0)]);
    setTrack(tracks, head, [k(0, -4), k(0.5, 5), k(1, -4)]);
    setTrack(tracks, armL, [k(0, -6), k(0.5, 6), k(1, -6)]);
    setTrack(tracks, armR, [k(0, 6), k(0.5, -6), k(1, 6)]);
    setTrack(tracks, tail, [k(0, -10), k(0.5, 12), k(1, -10)]);
    return { id: "idle", name: "Idle", prompt: "idle breath", duration: 2.4, loop: true, tracks };
  }

  if (id === "walk" || id === "walking") {
    setTrack(tracks, hipL, [k(0, 28), k(0.5, -24), k(1, 28)]);
    setTrack(tracks, hipR, [k(0, -24), k(0.5, 28), k(1, -24)]);
    setTrack(tracks, kneeL, [k(0, 8), k(0.25, 55), k(0.5, 6), k(0.75, 18), k(1, 8)]);
    setTrack(tracks, kneeR, [k(0, 6), k(0.25, 18), k(0.5, 8), k(0.75, 55), k(1, 6)]);
    setTrack(tracks, armL, [k(0, -22), k(0.5, 26), k(1, -22)]);
    setTrack(tracks, armR, [k(0, 26), k(0.5, -22), k(1, 26)]);
    setTrack(tracks, elbowL, [k(0, 18), k(0.5, 40), k(1, 18)]);
    setTrack(tracks, elbowR, [k(0, 40), k(0.5, 18), k(1, 40)]);
    setTrack(tracks, head, [k(0, 4), k(0.5, -4), k(1, 4)]);
    setTrack(tracks, tail, [k(0, 18), k(0.5, -18), k(1, 18)]);
    setTrack(tracks, footL, [k(0, 8), k(0.5, -6), k(1, 8)]);
    setTrack(tracks, footR, [k(0, -6), k(0.5, 8), k(1, -6)]);
    return { id: "walk", name: "Walk", prompt: "walk cycle", duration: 0.86, loop: true, tracks };
  }

  if (id === "run" || id === "running") {
    setTrack(tracks, hipL, [k(0, 38), k(0.5, -32), k(1, 38)]);
    setTrack(tracks, hipR, [k(0, -32), k(0.5, 38), k(1, -32)]);
    setTrack(tracks, kneeL, [k(0, 20), k(0.25, 80), k(0.5, 10), k(1, 20)]);
    setTrack(tracks, kneeR, [k(0, 10), k(0.5, 20), k(0.75, 80), k(1, 10)]);
    setTrack(tracks, armL, [k(0, -40), k(0.5, 36), k(1, -40)]);
    setTrack(tracks, armR, [k(0, 36), k(0.5, -40), k(1, 36)]);
    setTrack(tracks, torso, [k(0, 6), k(0.5, 2), k(1, 6)]);
    setTrack(tracks, head, [k(0, -6), k(1, -6)]);
    return { id: "run", name: "Run", prompt: "run cycle", duration: 0.52, loop: true, tracks };
  }

  if (id === "hunt" || id === "hunting" || id === "stalk") {
    setTrack(tracks, torso, [k(0, 16), k(0.5, 22), k(1, 16)]);
    setTrack(tracks, head, [k(0, 12), k(0.35, 18), k(0.7, 8), k(1, 12)]);
    setTrack(tracks, hipL, [k(0, 18), k(0.5, -8), k(1, 18)]);
    setTrack(tracks, hipR, [k(0, -10), k(0.5, 16), k(1, -10)]);
    setTrack(tracks, kneeL, [k(0, 40), k(0.5, 28), k(1, 40)]);
    setTrack(tracks, kneeR, [k(0, 30), k(0.5, 44), k(1, 30)]);
    setTrack(tracks, armL, [k(0, 28), k(0.5, 40), k(1, 28)]);
    setTrack(tracks, armR, [k(0, 34), k(0.5, 22), k(1, 34)]);
    setTrack(tracks, tail, [k(0, -8), k(0.5, 20), k(1, -8)]);
    return { id: "hunt", name: "Hunt", prompt: "hunting stalk", duration: 1.6, loop: true, tracks };
  }

  if (id === "spawn" || id === "appear" || id === "awaken") {
    setTrack(tracks, torso, [k(0, 28, "quad-out"), k(0.45, -4, "sine"), k(1, 0)]);
    setTrack(tracks, head, [k(0, 40, "quad-out"), k(0.5, -8), k(1, 0)]);
    setTrack(tracks, armL, [k(0, 70, "quad-out"), k(0.55, -12), k(1, 0)]);
    setTrack(tracks, armR, [k(0, -70, "quad-out"), k(0.55, 12), k(1, 0)]);
    setTrack(tracks, hipL, [k(0, 50, "quad-out"), k(0.6, -6), k(1, 0)]);
    setTrack(tracks, hipR, [k(0, -50, "quad-out"), k(0.6, 6), k(1, 0)]);
    setTrack(tracks, kneeL, [k(0, 80), k(0.6, 8), k(1, 0)]);
    setTrack(tracks, kneeR, [k(0, 80), k(0.6, 8), k(1, 0)]);
    return { id: "spawn", name: "Spawn", prompt: "spawning awaken", duration: 1.35, loop: false, tracks };
  }

  if (id === "wave") {
    setTrack(tracks, armR, [k(0, -70), k(1, -70)]);
    setTrack(tracks, elbowR, [k(0, -10), k(0.25, -50), k(0.5, -8), k(0.75, -50), k(1, -10)]);
    setTrack(tracks, head, [k(0, 6), k(0.5, -4), k(1, 6)]);
    setTrack(tracks, torso, [k(0, -4), k(0.5, 4), k(1, -4)]);
    return { id: "wave", name: "Wave", prompt: "wave hello", duration: 1.2, loop: true, tracks };
  }

  if (id === "bend" || id === "bend-test") {
    setTrack(tracks, torso, [k(0, 0), k(0.35, 32, "quad-out"), k(0.7, 20), k(1, 0)]);
    setTrack(tracks, head, [k(0, 0), k(0.35, 18), k(0.7, 10), k(1, 0)]);
    setTrack(tracks, armL, [k(0, 0), k(0.35, -18), k(0.7, -10), k(1, 0)]);
    setTrack(tracks, armR, [k(0, 0), k(0.35, 18), k(0.7, 10), k(1, 0)]);
    setTrack(tracks, hipL, [k(0, 0), k(0.35, 14), k(0.7, 8), k(1, 0)]);
    setTrack(tracks, hipR, [k(0, 0), k(0.35, 14), k(0.7, 8), k(1, 0)]);
    setTrack(tracks, elbowL, [k(0, 0), k(0.35, 28), k(0.7, 12), k(1, 0)]);
    setTrack(tracks, elbowR, [k(0, 0), k(0.35, 28), k(0.7, 12), k(1, 0)]);
    return { id: "bend", name: "Bend test", prompt: "bend test", duration: 1.4, loop: true, tracks };
  }

  if (id === "bow") {
    setTrack(tracks, torso, [k(0, 0, "sine"), k(0.45, 38, "sine"), k(0.75, 38), k(1, 0)]);
    setTrack(tracks, head, [k(0, 0), k(0.45, 22), k(0.75, 22), k(1, 0)]);
    setTrack(tracks, armL, [k(0, 0), k(0.45, 18), k(1, 0)]);
    setTrack(tracks, armR, [k(0, 0), k(0.45, 18), k(1, 0)]);
    return { id: "bow", name: "Bow", prompt: "bow", duration: 1.8, loop: false, tracks };
  }

  if (id === "jump") {
    setTrack(tracks, hipL, [k(0, 8), k(0.18, 40), k(0.4, -8), k(0.7, 12), k(1, 0)]);
    setTrack(tracks, hipR, [k(0, 8), k(0.18, 40), k(0.4, -8), k(0.7, 12), k(1, 0)]);
    setTrack(tracks, kneeL, [k(0, 10), k(0.18, 70), k(0.4, 4), k(0.7, 28), k(1, 0)]);
    setTrack(tracks, kneeR, [k(0, 10), k(0.18, 70), k(0.4, 4), k(0.7, 28), k(1, 0)]);
    setTrack(tracks, armL, [k(0, 8), k(0.18, -40), k(0.45, 20), k(1, 0)]);
    setTrack(tracks, armR, [k(0, 8), k(0.18, 40), k(0.45, -20), k(1, 0)]);
    setTrack(tracks, torso, [k(0, 0), k(0.18, 10), k(0.4, -8), k(1, 0)]);
    return { id: "jump", name: "Jump", prompt: "jump", duration: 0.9, loop: false, tracks };
  }

  if (id === "look" || id === "look-around") {
    setTrack(tracks, head, [k(0, 0), k(0.25, -28), k(0.5, 26), k(0.75, -12), k(1, 0)]);
    setTrack(tracks, torso, [k(0, 0), k(0.25, -8), k(0.5, 8), k(1, 0)]);
    return { id: "look", name: "Look around", prompt: "look around", duration: 2.2, loop: true, tracks };
  }

  return presetAnimation("idle", joints);
}

export const PRESET_MOTIONS = [
  { id: "idle", label: "Idle" },
  { id: "wave", label: "Wave" },
  { id: "walk", label: "Walk" },
  { id: "bend", label: "Bend test" },
  { id: "run", label: "Run" },
  { id: "hunt", label: "Hunt" },
  { id: "spawn", label: "Spawn" },
  { id: "bow", label: "Bow" },
  { id: "jump", label: "Jump" },
  { id: "look", label: "Look" },
] as const;

export function normalizeAiAnimation(
  raw: {
    id?: string;
    name?: string;
    duration?: number;
    loop?: boolean;
    tracks?: Record<string, Array<{ t: number; angle: number; ease?: string }>>;
  },
  joints: Joint[],
  prompt: string,
): AnimationDef {
  const ids = new Set(joints.map((j) => j.id));
  const tracks: Record<string, Keyframe[]> = {};
  for (const [key, frames] of Object.entries(raw.tracks ?? {})) {
    let id = key;
    if (!ids.has(id)) {
      const match = joints.find((j) => j.id.includes(key) || key.includes(j.id) || j.label.toLowerCase() === key.toLowerCase());
      if (match) id = match.id;
      else continue;
    }
    const joint = joints.find((j) => j.id === id);
    if (!joint || !frames?.length) continue;
    tracks[id] = frames
      .map((f) => ({
        t: Math.max(0, Math.min(1, Number(f.t) || 0)),
        angle: clampAngle(joint, Number(f.angle) || 0),
        ease: (["linear", "sine", "quad-out", "quad-in"].includes(String(f.ease)) ? f.ease : "sine") as EaseName,
      }))
      .sort((a, b) => a.t - b.t);
  }
  return {
    id: (raw.id || prompt || "custom").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "custom",
    name: raw.name?.trim() || prompt.trim() || "Custom",
    prompt,
    duration: Math.max(0.35, Math.min(8, Number(raw.duration) || 1.2)),
    loop: raw.loop !== false,
    tracks,
  };
}
