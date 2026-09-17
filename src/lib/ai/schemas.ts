import { z } from "zod";

export const canonicalJointSchema = z.object({
  id: z.string().min(1).max(80),
  label: z.string().min(1).max(120),
  parentId: z.string().min(1).max(80).nullable(),
  x: z.number().finite(),
  y: z.number().finite(),
  thickness: z.number().finite(),
  minAngle: z.number().finite(),
  maxAngle: z.number().finite(),
  zIndex: z.number().finite(),
});

export const canonicalCandidateSchema = z.object({
  name: z.string().min(1).max(160),
  kind: z.enum(["humanoid", "tailed", "quadruped", "bird", "simple", "creature"]),
  joints: z.array(canonicalJointSchema).min(1).max(128),
});

export const modelCandidateEnvelopeSchema = z.object({
  name: z.string().min(1).max(160).catch("puppet_figure"),
  kind: z.enum(["humanoid", "tailed", "quadruped", "bird", "simple", "creature"]).catch("humanoid"),
  joints: z.array(z.object({
    id: z.string().min(1),
    label: z.string().min(1).optional().transform((v) => v ?? "joint"),
    parent: z.string().nullable().optional().transform((v) => v ?? null),
    x: z.number(),
    y: z.number(),
    thickness: z.number().optional().default(0.06),
    min_angle: z.number().optional().default(-45),
    max_angle: z.number().optional().default(45),
    z_index: z.number().optional().default(1),
  })).min(1).max(128),
});

export type ModelCandidateEnvelope = z.infer<typeof modelCandidateEnvelopeSchema>;
