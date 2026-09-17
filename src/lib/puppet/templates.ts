import type { Joint, SkeletonKind } from "./types";

export type JointSpec = {
  id: string;
  label: string;
  parentId: string | null;
  /** Position inside the figure bounding box, 0–1. */
  x: number;
  y: number;
  /** Thickness as a fraction of the figure's shorter side. */
  thickness: number;
  minAngle: number;
  maxAngle: number;
  zIndex: number;
};

const HUMANOID: JointSpec[] = [
  { id: "hips", label: "Hips", parentId: null, x: 0.5, y: 0.52, thickness: 0.1, minAngle: -18, maxAngle: 18, zIndex: 4 },
  { id: "torso", label: "Torso", parentId: "hips", x: 0.5, y: 0.34, thickness: 0.12, minAngle: -22, maxAngle: 22, zIndex: 5 },
  { id: "head", label: "Head", parentId: "torso", x: 0.5, y: 0.12, thickness: 0.11, minAngle: -38, maxAngle: 38, zIndex: 8 },
  { id: "shoulder_l", label: "Left shoulder", parentId: "torso", x: 0.34, y: 0.28, thickness: 0.055, minAngle: -80, maxAngle: 90, zIndex: 3 },
  { id: "elbow_l", label: "Left elbow", parentId: "shoulder_l", x: 0.2, y: 0.4, thickness: 0.045, minAngle: -10, maxAngle: 140, zIndex: 2 },
  { id: "hand_l", label: "Left hand", parentId: "elbow_l", x: 0.1, y: 0.52, thickness: 0.04, minAngle: -50, maxAngle: 50, zIndex: 1 },
  { id: "shoulder_r", label: "Right shoulder", parentId: "torso", x: 0.66, y: 0.28, thickness: 0.055, minAngle: -90, maxAngle: 80, zIndex: 7 },
  { id: "elbow_r", label: "Right elbow", parentId: "shoulder_r", x: 0.8, y: 0.4, thickness: 0.045, minAngle: -140, maxAngle: 10, zIndex: 8 },
  { id: "hand_r", label: "Right hand", parentId: "elbow_r", x: 0.9, y: 0.52, thickness: 0.04, minAngle: -50, maxAngle: 50, zIndex: 9 },
  { id: "hip_l", label: "Left hip", parentId: "hips", x: 0.42, y: 0.55, thickness: 0.06, minAngle: -40, maxAngle: 50, zIndex: 3 },
  { id: "knee_l", label: "Left knee", parentId: "hip_l", x: 0.4, y: 0.74, thickness: 0.05, minAngle: -10, maxAngle: 110, zIndex: 2 },
  { id: "foot_l", label: "Left foot", parentId: "knee_l", x: 0.38, y: 0.94, thickness: 0.04, minAngle: -40, maxAngle: 40, zIndex: 1 },
  { id: "hip_r", label: "Right hip", parentId: "hips", x: 0.58, y: 0.55, thickness: 0.06, minAngle: -50, maxAngle: 40, zIndex: 6 },
  { id: "knee_r", label: "Right knee", parentId: "hip_r", x: 0.6, y: 0.74, thickness: 0.05, minAngle: -110, maxAngle: 10, zIndex: 7 },
  { id: "foot_r", label: "Right foot", parentId: "knee_r", x: 0.62, y: 0.94, thickness: 0.04, minAngle: -40, maxAngle: 40, zIndex: 8 },
];

const TAIL: JointSpec = {
  id: "tail",
  label: "Tail",
  parentId: "hips",
  x: 0.58,
  y: 0.62,
  thickness: 0.045,
  minAngle: -70,
  maxAngle: 70,
  zIndex: 0,
};

const QUADRUPED: JointSpec[] = [
  { id: "chest", label: "Chest", parentId: null, x: 0.48, y: 0.46, thickness: 0.12, minAngle: -16, maxAngle: 16, zIndex: 4 },
  { id: "hips", label: "Hips", parentId: "chest", x: 0.68, y: 0.5, thickness: 0.11, minAngle: -20, maxAngle: 20, zIndex: 3 },
  { id: "neck", label: "Neck", parentId: "chest", x: 0.34, y: 0.38, thickness: 0.07, minAngle: -30, maxAngle: 35, zIndex: 5 },
  { id: "head", label: "Head", parentId: "neck", x: 0.2, y: 0.28, thickness: 0.09, minAngle: -40, maxAngle: 40, zIndex: 6 },
  { id: "shoulder_l", label: "Front left", parentId: "chest", x: 0.4, y: 0.52, thickness: 0.05, minAngle: -50, maxAngle: 50, zIndex: 2 },
  { id: "elbow_l", label: "Front left knee", parentId: "shoulder_l", x: 0.38, y: 0.7, thickness: 0.04, minAngle: -20, maxAngle: 90, zIndex: 1 },
  { id: "hand_l", label: "Front left paw", parentId: "elbow_l", x: 0.36, y: 0.9, thickness: 0.035, minAngle: -30, maxAngle: 30, zIndex: 0 },
  { id: "shoulder_r", label: "Front right", parentId: "chest", x: 0.46, y: 0.52, thickness: 0.05, minAngle: -50, maxAngle: 50, zIndex: 7 },
  { id: "elbow_r", label: "Front right knee", parentId: "shoulder_r", x: 0.44, y: 0.7, thickness: 0.04, minAngle: -90, maxAngle: 20, zIndex: 8 },
  { id: "hand_r", label: "Front right paw", parentId: "elbow_r", x: 0.42, y: 0.9, thickness: 0.035, minAngle: -30, maxAngle: 30, zIndex: 9 },
  { id: "hip_l", label: "Hind left", parentId: "hips", x: 0.7, y: 0.54, thickness: 0.055, minAngle: -50, maxAngle: 50, zIndex: 2 },
  { id: "knee_l", label: "Hind left knee", parentId: "hip_l", x: 0.74, y: 0.72, thickness: 0.045, minAngle: -20, maxAngle: 100, zIndex: 1 },
  { id: "foot_l", label: "Hind left paw", parentId: "knee_l", x: 0.76, y: 0.92, thickness: 0.035, minAngle: -30, maxAngle: 30, zIndex: 0 },
  { id: "hip_r", label: "Hind right", parentId: "hips", x: 0.74, y: 0.54, thickness: 0.055, minAngle: -50, maxAngle: 50, zIndex: 6 },
  { id: "knee_r", label: "Hind right knee", parentId: "hip_r", x: 0.78, y: 0.72, thickness: 0.045, minAngle: -100, maxAngle: 20, zIndex: 7 },
  { id: "foot_r", label: "Hind right paw", parentId: "knee_r", x: 0.8, y: 0.92, thickness: 0.035, minAngle: -30, maxAngle: 30, zIndex: 8 },
  { id: "tail", label: "Tail", parentId: "hips", x: 0.88, y: 0.46, thickness: 0.04, minAngle: -80, maxAngle: 80, zIndex: 1 },
];

const BIRD: JointSpec[] = [
  { id: "body", label: "Body", parentId: null, x: 0.5, y: 0.52, thickness: 0.14, minAngle: -16, maxAngle: 16, zIndex: 3 },
  { id: "head", label: "Head", parentId: "body", x: 0.5, y: 0.22, thickness: 0.09, minAngle: -40, maxAngle: 40, zIndex: 6 },
  { id: "wing_l", label: "Left wing", parentId: "body", x: 0.28, y: 0.48, thickness: 0.08, minAngle: -50, maxAngle: 80, zIndex: 1 },
  { id: "wing_r", label: "Right wing", parentId: "body", x: 0.72, y: 0.48, thickness: 0.08, minAngle: -80, maxAngle: 50, zIndex: 5 },
  { id: "leg_l", label: "Left leg", parentId: "body", x: 0.42, y: 0.72, thickness: 0.04, minAngle: -40, maxAngle: 50, zIndex: 2 },
  { id: "foot_l", label: "Left foot", parentId: "leg_l", x: 0.4, y: 0.92, thickness: 0.035, minAngle: -30, maxAngle: 30, zIndex: 1 },
  { id: "leg_r", label: "Right leg", parentId: "body", x: 0.58, y: 0.72, thickness: 0.04, minAngle: -50, maxAngle: 40, zIndex: 4 },
  { id: "foot_r", label: "Right foot", parentId: "leg_r", x: 0.6, y: 0.92, thickness: 0.035, minAngle: -30, maxAngle: 30, zIndex: 5 },
  { id: "tail", label: "Tail", parentId: "body", x: 0.5, y: 0.7, thickness: 0.06, minAngle: -35, maxAngle: 35, zIndex: 0 },
];

const SIMPLE: JointSpec[] = [
  { id: "body", label: "Body", parentId: null, x: 0.5, y: 0.48, thickness: 0.14, minAngle: -12, maxAngle: 12, zIndex: 2 },
  { id: "head", label: "Head", parentId: "body", x: 0.5, y: 0.18, thickness: 0.1, minAngle: -40, maxAngle: 40, zIndex: 5 },
  { id: "arm_l", label: "Left arm", parentId: "body", x: 0.22, y: 0.42, thickness: 0.05, minAngle: -70, maxAngle: 80, zIndex: 1 },
  { id: "arm_r", label: "Right arm", parentId: "body", x: 0.78, y: 0.42, thickness: 0.05, minAngle: -80, maxAngle: 70, zIndex: 4 },
  { id: "leg_l", label: "Left leg", parentId: "body", x: 0.38, y: 0.8, thickness: 0.05, minAngle: -40, maxAngle: 50, zIndex: 0 },
  { id: "leg_r", label: "Right leg", parentId: "body", x: 0.62, y: 0.8, thickness: 0.05, minAngle: -50, maxAngle: 40, zIndex: 3 },
];

export const KIND_LABEL: Record<SkeletonKind, string> = {
  humanoid: "Humanoid",
  tailed: "Tailed biped",
  quadruped: "Quadruped",
  bird: "Bird",
  simple: "Simple",
};

export function specsFor(kind: SkeletonKind): JointSpec[] {
  if (kind === "tailed") return [...HUMANOID, TAIL];
  if (kind === "quadruped") return QUADRUPED;
  if (kind === "bird") return BIRD;
  if (kind === "simple") return SIMPLE;
  return HUMANOID;
}

export function pinOrder(kind: SkeletonKind): string[] {
  return specsFor(kind).map((s) => s.label);
}

export function jointsFromSpecs(
  specs: JointSpec[],
  bbox: { x: number; y: number; w: number; h: number },
): Joint[] {
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
    zIndex: s.zIndex,
  }));
}

export const SAMPLES = [
  {
    id: "gingerbread",
    name: "Ginger loaf",
    src: "/samples/gingerbread.jpg",
    kind: "humanoid" as SkeletonKind,
    blurb: "Clear limbs. A first pin.",
  },
  {
    id: "fox",
    name: "Paper fox",
    src: "/samples/paper-fox.jpg",
    kind: "tailed" as SkeletonKind,
    blurb: "Folk cut, with a tail.",
  },
  {
    id: "dancer",
    name: "Basswood dancer",
    src: "/samples/wooden-dancer.jpg",
    kind: "humanoid" as SkeletonKind,
    blurb: "Hinged wood, ready strings.",
  },
];
