export type SkeletonKind = "humanoid" | "tailed" | "quadruped" | "bird" | "simple";

export type StudioStep = "figure" | "bones" | "parts" | "motion" | "archive";

export type Vec2 = { x: number; y: number };

export type Joint = {
  id: string;
  label: string;
  parentId: string | null;
  x: number;
  y: number;
  /** Half-width of the limb, in source pixels. */
  thickness: number;
  /** Hard stop, degrees relative to the photographed rest pose. */
  minAngle: number;
  maxAngle: number;
  zIndex: number;
};

export type PartMaskSource = "auto" | "edited" | "ai";

export type PartMask = {
  bboxX: number;
  bboxY: number;
  width: number;
  height: number;
  alphaPngDataUrl: string;
  source: PartMaskSource;
  confidence: number;
};

export type BrushState = {
  mode: "add" | "erase";
  radius: number;
  opacity: number;
  enabled: boolean;
  attachmentId: string | null;
};

export type AttachmentRole = "main" | "overlap" | "repair";

export type Attachment = {
  id: string;
  boneId: string;
  label: string;
  parentBoneId: string | null;
  role: AttachmentRole;
  dataUrl: string;
  width: number;
  height: number;
  cropX: number;
  cropY: number;
  pivotX: number;
  pivotY: number;
  localPivotX: number;
  localPivotY: number;
  zIndex: number;
  minAngle: number;
  maxAngle: number;
  thickness: number;
  pixelCount: number;
  mask: PartMask;
  visible?: boolean;
  sourceVersion: number;
  repaired: boolean;
};

export type CutPart = Attachment;

export type EaseName = "linear" | "sine" | "quad-out" | "quad-in";

export type Keyframe = {
  t: number;
  angle: number;
  ease: EaseName;
};

export type AnimationDef = {
  id: string;
  name: string;
  prompt: string;
  duration: number;
  loop: boolean;
  tracks: Record<string, Keyframe[]>;
};

export type PoseDef = {
  id: string;
  name: string;
  angles: Record<string, number>;
};

export type BackgroundKey = {
  r: number;
  g: number;
  b: number;
  threshold: number;
  lift: boolean;
};

export type SourceFigure = {
  dataUrl: string;
  width: number;
  height: number;
  name: string;
};

export const STEPS: { id: StudioStep; label: string; numeral: string }[] = [
  { id: "figure", label: "Input", numeral: "I" },
  { id: "bones", label: "Review parts", numeral: "II" },
  { id: "motion", label: "Test movement", numeral: "III" },
  { id: "archive", label: "Export", numeral: "IV" },
];
