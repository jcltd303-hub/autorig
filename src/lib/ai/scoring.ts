import type { CanonicalCandidate, CandidateScore, ExtractionPins } from "./contracts";
import { validateCandidate } from "./geometry";

const preferredIds = ["hips", "torso", "head", "shoulder_l", "elbow_l", "hand_l", "shoulder_r", "elbow_r", "hand_r", "hip_l", "knee_l", "foot_l", "hip_r", "knee_r", "foot_r", "tail"];

function clamp01(value: number): number { return Math.max(0, Math.min(1, value)); }

export function scoreCandidate(candidate: CanonicalCandidate, pins: ExtractionPins = {}, peers: CanonicalCandidate[] = []): CandidateScore {
  const issues = validateCandidate(candidate);
  const errors = issues.filter((i) => i.severity === "error").length;
  const schema = clamp01(1 - errors / Math.max(4, candidate.joints.length));
  const required = pins.requiredIds?.length ? pins.requiredIds : preferredIds.filter((id) => candidate.kind === "humanoid" || candidate.kind === "tailed");
  const present = new Set(candidate.joints.map((j) => j.id));
  const coverage = required.length ? required.filter((id) => present.has(id)).length / required.length : 1;
  const graph = pins.graph?.length ? pins.graph.filter((g) => candidate.joints.some((j) => j.id === g.childId && j.parentId === g.parentId)).length / pins.graph.length : 1;
  const coordinates = candidate.joints.filter((j) => j.x >= 0 && j.x <= 1 && j.y >= 0 && j.y <= 1 && j.thickness > 0 && j.thickness <= 0.5 && j.minAngle <= j.maxAngle).length / Math.max(1, candidate.joints.length);
  const anchors = pins.anchors ?? [];
  const pinHits = anchors.length ? anchors.filter((a) => {
    const j = candidate.joints.find((item) => item.id === a.id);
    if (!j || a.x == null || a.y == null) return false;
    const tolerance = a.tolerance ?? 0.08;
    return Math.hypot(j.x - a.x, j.y - a.y) <= tolerance;
  }).length / anchors.length : 1;
  const duplicatePairs = candidate.joints.reduce((count, a, index) => count + candidate.joints.slice(index + 1).filter((b) => Math.hypot(a.x - b.x, a.y - b.y) < 0.012).length, 0);
  const duplicates = clamp01(1 - duplicatePairs / Math.max(3, candidate.joints.length));
  const independentPeers = peers.filter((peer) => peer !== candidate && peer.providerId !== candidate.providerId);
  const agreement = independentPeers.length
    ? clamp01(independentPeers.reduce((sum, peer) => sum + overlapAgreement(candidate, peer), 0) / independentPeers.length)
    : 0;
  const total = 0.2 * schema + 0.2 * coverage + 0.15 * graph + 0.15 * coordinates + 0.15 * pinHits + 0.05 * duplicates + 0.1 * agreement;
  return { total, schema, coverage, graph, coordinates, pins: pinHits, duplicates, agreement, issues };
}

function overlapAgreement(a: CanonicalCandidate, b: CanonicalCandidate): number {
  const byId = new Map(b.joints.map((j) => [j.id, j]));
  const shared = a.joints.filter((j) => byId.has(j.id));
  if (!shared.length) return 0;
  return shared.reduce((sum, j) => {
    const other = byId.get(j.id)!;
    return sum + clamp01(1 - Math.hypot(j.x - other.x, j.y - other.y) / 0.15);
  }, 0) / shared.length;
}
