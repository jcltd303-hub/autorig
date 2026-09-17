import type { CanonicalCandidate, CanonicalJoint, ValidationIssue } from "./contracts";

function finite(value: number): boolean { return Number.isFinite(value); }
function clamp(value: number, min: number, max: number): number { return Math.max(min, Math.min(max, value)); }

export function validateCandidate(candidate: CanonicalCandidate): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = new Set<string>();
  for (const joint of candidate.joints) {
    if (ids.has(joint.id)) issues.push({ code: "duplicate-id", message: `Duplicate joint id ${joint.id}`, jointId: joint.id, severity: "error" });
    ids.add(joint.id);
    if (![joint.x, joint.y, joint.thickness, joint.minAngle, joint.maxAngle, joint.zIndex].every(finite)) issues.push({ code: "non-finite", message: `Non-finite geometry for ${joint.id}`, jointId: joint.id, severity: "error" });
    if (joint.x < 0 || joint.x > 1 || joint.y < 0 || joint.y > 1) issues.push({ code: "out-of-range", message: `Joint ${joint.id} lies outside image`, jointId: joint.id, severity: "error" });
    if (joint.thickness <= 0 || joint.thickness > 0.5) issues.push({ code: "bad-thickness", message: `Invalid thickness for ${joint.id}`, jointId: joint.id, severity: "warning" });
    if (joint.minAngle > joint.maxAngle) issues.push({ code: "angle-range", message: `Invalid angle range for ${joint.id}`, jointId: joint.id, severity: "error" });
    if (joint.parentId === joint.id) issues.push({ code: "self-parent", message: `Joint ${joint.id} parents itself`, jointId: joint.id, severity: "error" });
  }
  for (const joint of candidate.joints) {
    if (joint.parentId && !ids.has(joint.parentId)) issues.push({ code: "missing-parent", message: `Missing parent ${joint.parentId}`, jointId: joint.id, severity: "error" });
  }
  for (const joint of candidate.joints) {
    const seen = new Set<string>();
    let current: CanonicalJoint | undefined = joint;
    while (current?.parentId) {
      if (seen.has(current.id)) {
        issues.push({ code: "cycle", message: `Parent cycle reaches ${current.id}`, jointId: joint.id, severity: "error" });
        break;
      }
      seen.add(current.id);
      current = candidate.joints.find((j) => j.id === current!.parentId);
      if (!current) break;
    }
  }
  return issues;
}

export function repairCandidate(candidate: CanonicalCandidate): { candidate: CanonicalCandidate; repairs: string[] } {
  const repairs: string[] = [];
  const ids = new Set<string>();
  const joints = candidate.joints.map((joint, index) => {
    let id = joint.id.trim() || `joint_${index + 1}`;
    if (ids.has(id)) { id = `${id}_${index + 1}`; repairs.push(`renamed duplicate joint to ${id}`); }
    ids.add(id);
    const repaired: CanonicalJoint = {
      ...joint,
      id,
      x: clamp(joint.x, 0, 1),
      y: clamp(joint.y, 0, 1),
      thickness: clamp(joint.thickness, 0.001, 0.5),
      minAngle: Math.min(joint.minAngle, joint.maxAngle),
      maxAngle: Math.max(joint.minAngle, joint.maxAngle),
      zIndex: Number.isFinite(joint.zIndex) ? joint.zIndex : index,
    };
    if (repaired.x !== joint.x || repaired.y !== joint.y) repairs.push(`clamped ${id} into normalized image bounds`);
    if (repaired.minAngle !== joint.minAngle || repaired.maxAngle !== joint.maxAngle) repairs.push(`normalized angle range for ${id}`);
    return repaired;
  });
  const validIds = new Set(joints.map((j) => j.id));
  for (const joint of joints) {
    if (joint.parentId && !validIds.has(joint.parentId)) { joint.parentId = null; repairs.push(`removed missing parent from ${joint.id}`); }
    if (joint.parentId === joint.id) { joint.parentId = null; repairs.push(`removed self-parent from ${joint.id}`); }
  }
  return { candidate: { ...candidate, joints }, repairs };
}

export function mergeCandidates(candidates: CanonicalCandidate[]): CanonicalCandidate {
  if (!candidates.length) throw new Error("Cannot merge zero candidates");
  const base = candidates[0];
  const ids = new Set(candidates.flatMap((c) => c.joints.map((j) => j.id)));
  const joints = [...ids].map((id) => {
    const present = candidates.flatMap((c) => c.joints.filter((j) => j.id === id));
    const x = present.reduce((s, j) => s + j.x, 0) / present.length;
    const y = present.reduce((s, j) => s + j.y, 0) / present.length;
    const nearest = present[0];
    return { ...nearest, x, y };
  });
  return { ...base, joints };
}
