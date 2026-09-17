import type { AnimationDef, Attachment, Joint, SourceFigure } from "./types";

function indent(level: number) {
  return "  ".repeat(level);
}

function dump(value: unknown, level = 0): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "string") {
    if (/^[A-Za-z0-9 _./+-]+$/.test(value) && value.length > 0) return value;
    return JSON.stringify(value);
  }
  if (typeof value === "number") return Number.isInteger(value) ? String(value) : value.toFixed(3).replace(/\.?0+$/, "");
  if (typeof value === "boolean") return value ? "true" : "false";
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return value
      .map((item) => {
        if (item !== null && typeof item === "object" && !Array.isArray(item)) {
          const lines = dump(item, level + 1).split("\n");
          const first = lines[0] ?? "";
          const rest = lines.slice(1).map((l) => `${indent(level + 1)}${l}`);
          return `${indent(level)}- ${first}${rest.length ? `\n${rest.join("\n")}` : ""}`;
        }
        return `${indent(level)}- ${dump(item, level + 1)}`;
      })
      .join("\n");
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(([, v]) => v !== undefined);
    if (!entries.length) return "{}";
    return entries
      .map(([k, v]) => {
        if (v !== null && typeof v === "object") {
          const nested = dump(v, 0);
          if (nested === "{}" || nested === "[]") return `${k}: ${nested}`;
          return `${k}:\n${nested
            .split("\n")
            .map((line) => `${indent(level + 1)}${line}`)
            .join("\n")}`;
        }
        return `${k}: ${dump(v, level + 1)}`;
      })
      .join("\n");
  }
  return JSON.stringify(value);
}

export function buildRigDocument(
  source: SourceFigure,
  joints: Joint[],
  attachments: Attachment[],
  animations: AnimationDef[],
) {
  const rest: Record<string, number> = {};
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
      rest_pose: "the photographed figure; all animation angles are deltas from rest",
    },
    puppet: {
      name: source.name,
      source: "source.jpg",
      canvas: { width: source.width, height: source.height },
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
        mask: attachment.mask ? `masks/${attachment.id}.png` : undefined,
        crop: { x: Math.round(attachment.cropX), y: Math.round(attachment.cropY), width: attachment.width, height: attachment.height },
        local_pivot: {
          x: round(bone.x - attachment.cropX),
          y: round(bone.y - attachment.cropY),
        },
        z_offset: attachment.zIndex,
        visible: attachment.visible ?? true,
      };
    }),
    bones: joints.map((joint) => ({
      id: joint.id,
      label: joint.label,
      parent: joint.parentId,
      pivot: { x: round(joint.x), y: round(joint.y) },
      limits: { min_angle: joint.minAngle, max_angle: joint.maxAngle },
      thickness_px: round(joint.thickness),
      z_base: joint.zIndex,
    })),
    animations: Object.fromEntries(
      animations.map((anim) => [
        anim.id,
        {
          name: anim.name,
          duration_seconds: anim.duration,
          loop: anim.loop,
          tracks: Object.fromEntries(
            Object.entries(anim.tracks).map(([id, keys]) => [
              id,
              keys.map((key) => ({
                t: key.t,
                angle: round(key.angle),
                ease: key.ease,
              })),
            ]),
          ),
        },
      ]),
    ),
  };
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}

export function toYaml(source: SourceFigure, joints: Joint[], attachments: Attachment[], animations: AnimationDef[]) {
  const doc = buildRigDocument(source, joints, attachments, animations);
  return `# Marionette puppet rig v2
${dump(doc)}
`;
}

export function archiveReadme(name: string) {
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