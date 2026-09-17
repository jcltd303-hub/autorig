export type ProviderKind = "vision" | "segmentation";

export type Vec2 = { x: number; y: number };

export type ExtractionPin = {
  id: string;
  x?: number;
  y?: number;
  tolerance?: number;
  required?: boolean;
};

export type ExtractionRegion = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  priority?: number;
};

export type ExtractionPins = {
  requiredIds?: string[];
  anchors?: ExtractionPin[];
  regions?: ExtractionRegion[];
  graph?: Array<{ childId: string; parentId: string | null }>;
  orientation?: "front" | "back" | "left" | "right" | "unknown";
  scale?: "full-body" | "cropped" | "unknown";
  visibility?: Record<string, "visible" | "occluded" | "unknown">;
  semanticHint?: string;
};

export type PipelinePolicy = {
  primaryProvider?: string;
  fallbackProviders?: string[];
  ensembleProviders?: string[];
  maxAttempts?: number;
  enableRegionalRetry?: boolean;
  enableEnsemble?: boolean;
  minScore?: number;
  consensusThreshold?: number;
};

export type ExtractionRequest = {
  imageDataUrl: string;
  hint?: string;
  pins?: ExtractionPins;
  policy?: PipelinePolicy;
};

export type CanonicalJoint = {
  id: string;
  label: string;
  parentId: string | null;
  x: number;
  y: number;
  thickness: number;
  minAngle: number;
  maxAngle: number;
  zIndex: number;
};

export type CanonicalCandidate = {
  providerId: string;
  model: string;
  name: string;
  kind: "humanoid" | "tailed" | "quadruped" | "bird" | "simple" | "creature";
  joints: CanonicalJoint[];
  raw?: unknown;
};

export type ValidationIssue = {
  code: string;
  message: string;
  jointId?: string;
  severity: "error" | "warning";
};

export type CandidateScore = {
  total: number;
  schema: number;
  coverage: number;
  graph: number;
  coordinates: number;
  pins: number;
  duplicates: number;
  agreement: number;
  issues: ValidationIssue[];
};

export type PipelineDiagnostic = {
  pipelineVersion: string;
  inputFingerprint: string;
  pinsSummary: { requiredIds: number; anchors: number; regions: number };
  attempts: Array<{
    providerId: string;
    model: string;
    kind: ProviderKind;
    latencyMs: number;
    status: "ok" | "error";
    error?: string;
    score?: CandidateScore;
  }>;
  retries: number;
  repairs: string[];
  finalStatus: "success" | "fallback" | "failed";
};

export type ProviderResult = {
  text: string;
  providerId: string;
  model: string;
};

export type VisionProvider = {
  id: string;
  kind: "vision";
  model: string;
  available: () => boolean;
  analyze: (request: ExtractionRequest, prompt: string) => Promise<ProviderResult>;
};

export type SegmentationProvider = {
  id: string;
  kind: "segmentation";
  model: string;
  available: () => boolean;
  analyze: (request: ExtractionRequest, prompt: string) => Promise<ProviderResult>;
};

export type AnyAiProvider = VisionProvider | SegmentationProvider;

export type PipelineResult = {
  candidate: CanonicalCandidate;
  score: CandidateScore;
  diagnostic: PipelineDiagnostic;
};
