# Puppet AI Pipeline: Multi-Model Extraction and Validation Design

**Date:** 2026-09-17  
**Status:** Approved for implementation planning

## Goal

Replace Puppet's single-model, prompt-dependent AI pipeline with a model-agnostic extraction pipeline that can use multiple vision/segmentation providers, treat pins as structured constraints, recover from weak model responses, and produce deterministic, validated puppet geometry.

## Current State

Puppet currently centralizes AI behavior in `src/lib/ai/puppet-ai.ts`. The analysis path calls the xAI chat-completions API with a hard-coded `grok-4.5` model, asks for JSON describing joints, and then relies on a generic JSON extraction helper. There is no provider abstraction, independent candidate generation, schema validation of the returned puppet geometry, confidence scoring, fallback model, region-level retry, or deterministic validation/repair stage. The current animation composer is similarly tied to the same chat helper. The project is a TypeScript/Vite/TanStack React Start application with Zod already available as a dependency.

## Approaches Considered

### 1. Provider router + deterministic core — recommended

Introduce a small provider interface and a canonical internal representation. A router runs a primary model, validates the result, and only invokes additional models or targeted retries when confidence/constraints fail. Deterministic geometry normalization, validation, and repair remain outside the models.

**Pros:** robust without paying the latency/cost of an ensemble on every request; providers can be added independently; testable with mocked adapters; failures become diagnosable.  
**Cons:** more initial architecture work than another prompt tweak.

### 2. Always-on multi-model ensemble

Run several vision models for every extraction, then fuse their joint/part proposals.

**Pros:** maximum independent evidence and strong resistance to one model's blind spots.  
**Cons:** higher latency/cost on every request; harder conflict resolution; unnecessary work on easy images.

### 3. Primary model + dedicated segmentation fallback

Keep a primary multimodal model for semantic joint detection and invoke a dedicated segmentation provider only after the primary result fails validation.

**Pros:** comparatively simple and economical; segmentation specialists can improve difficult boundaries.  
**Cons:** less resilient when the primary model's semantic interpretation is wrong but superficially valid.

### Decision

Use approach 1, with selective ensemble behavior. Normal requests use a primary provider and deterministic validation. Low-confidence or constraint-heavy requests can invoke a second provider and/or targeted regional retry. This gives Puppet multiple models without making every successful request an expensive ensemble run.

## Architecture

The pipeline becomes:

`Input asset -> normalization -> structured reference/pins -> provider router -> candidate generation -> canonical normalization -> scoring/constraint checks -> optional fallback/ensemble -> deterministic geometry repair -> final validation -> output + diagnostics`

### Provider abstraction

Create a `VisionProvider` contract that accepts an image plus a structured extraction request and returns a canonical candidate, provider metadata, and raw diagnostics. Provider adapters own API-specific request/response formats. The core pipeline must not know xAI/OpenAI/other provider wire formats.

Create a separate `SegmentationProvider` contract for providers whose primary output is masks or regions. Segmentation results are converted into the same canonical candidate model before scoring.

Initial deployment should preserve xAI as the existing provider while making its model and endpoint configuration explicit. Additional providers can then be registered without rewriting the extraction pipeline.

### Canonical extraction model

The internal result must distinguish semantic identity from geometry. At minimum it contains:

- figure metadata (`name`, `kind`)
- joints/parts with stable IDs, labels, parent relationships, normalized coordinates, thickness, angular limits, and draw order
- optional region/mask references for future cutout extraction
- provider/model metadata
- candidate-level and item-level confidence
- warnings produced during normalization

Zod schemas will validate both provider output and the final canonical representation. Invalid model output is a failed candidate, not a successful-but-bad result.

## Pins and References

Pins become first-class structured data rather than prose embedded only in prompts. The request model supports:

- required/expected joint IDs
- anchor points and optional bounding regions
- explicit keep/remove regions
- parent/child constraints
- expected orientation and scale constraints
- occlusion/visibility hints
- user-provided semantic hints

Prompts are generated from these constraints for providers that use natural-language instructions, but the constraints are also evaluated programmatically after the model responds. A model cannot satisfy a pin merely by claiming it did so.

## Routing and Recovery

Each extraction receives a policy describing the primary provider, fallback providers, maximum attempts, and confidence thresholds. The router behaves as follows:

1. Normalize and fingerprint the input.
2. Run the primary vision provider.
3. Parse and validate the provider response against the canonical schema.
4. Score semantic completeness, geometry plausibility, pin adherence, and output consistency.
5. If the result clears the acceptance threshold, continue to deterministic cleanup.
6. If it fails, retry the smallest useful scope: first a corrected full-image request when parsing/formatting failed, then a regional request when only specific joints/regions are weak.
7. If confidence remains below threshold, call a configured fallback provider.
8. For persistent disagreement, run a selective ensemble and reconcile candidates using deterministic scoring rather than asking a model to choose blindly.
9. Emit either a validated result or a structured failure containing diagnostics.

No single provider failure should terminate the user-visible pipeline when another configured strategy can reasonably recover.

## Scoring

The scoring layer combines independent signals rather than trusting model self-reported confidence. Signals include:

- schema validity
- required-joint/part coverage
- parent graph validity and absence of cycles
- normalized coordinate bounds
- plausible thickness/range values
- pin/anchor distance
- expected orientation and ordering constraints
- duplicate or overlapping joint detection
- candidate agreement when multiple models are available
- regional completeness

Scores are used for routing and selection, not exposed as a simplistic guarantee of correctness. The pipeline records the individual reasons a candidate passed or failed.

## Deterministic Geometry Repair

Models remain responsible for perception; deterministic code remains responsible for invariants. The repair stage will:

- clamp or reject invalid normalized coordinates according to policy
- normalize angle/range ordering
- repair safe formatting inconsistencies
- reject impossible parent graphs
- remove duplicate IDs
- enforce stable ordering
- preserve user pins where they are within valid bounds
- normalize dimensions and coordinate precision
- produce predictable output regardless of provider response wording

Repairs must never silently invent missing anatomy. If a required region cannot be recovered safely, the pipeline must route to another attempt/provider or return a clear failure.

## Diagnostics

Every pipeline run gets a trace containing:

- pipeline version
- input fingerprint
- request/pin summary
- provider/model attempts
- latency and retry counts
- validation failures
- scoring breakdown
- selected candidate
- deterministic repairs performed
- final validation result

Diagnostics must be safe to log without storing secrets. Raw provider responses should be retained only where existing application policy permits; otherwise store normalized failure summaries.

## Testing Strategy

Testing is layered:

1. **Provider contract tests:** adapters map representative responses into the canonical model and convert API/transport errors into structured failures.
2. **Schema/property tests:** malformed JSON, missing fields, out-of-range coordinates, duplicate IDs, cycles, and invalid ranges are rejected deterministically.
3. **Routing tests:** mocked provider candidates prove primary success, fallback activation, selective retry, and multi-model reconciliation.
4. **Geometry tests:** deterministic repair produces stable output for known malformed candidates.
5. **Golden image fixtures:** the existing cut-paper/extraction failures become regression fixtures. Each fixture records expected structural properties rather than requiring pixel-perfect equality when model output can legitimately vary.
6. **End-to-end tests:** the server function produces a validated extraction or an actionable structured failure under mocked providers.

The tests must not require live paid model calls. Provider integration tests may be opt-in separately.

## Scope Boundaries

This phase focuses on the AI extraction/rigger pipeline and its reliability. It does not redesign the entire UI, animation editor, image-generation experience, authentication, database schema, or deployment architecture. Existing `composeAnimation` behavior should remain compatible while sharing the new provider infrastructure where useful.

## Expected File Organization

The implementation should keep responsibilities separated under `src/lib/ai/`, with focused modules for:

- provider contracts and registry
- xAI adapter
- canonical schemas/types
- prompt/request construction
- routing/retry policy
- candidate scoring
- deterministic geometry validation/repair
- diagnostics
- pipeline orchestration
- tests and golden fixtures

The exact filenames should follow the existing repository conventions after implementation inspection; the architecture must not force unrelated refactors.

## Success Criteria

The implementation is successful when:

- Puppet no longer depends on one hard-coded vision model for extraction.
- A provider can fail, return malformed output, or produce a low-confidence candidate without immediately producing a bad puppet.
- Pins are represented as structured constraints and are programmatically checked.
- Difficult cases can automatically use a fallback model or selective multi-model pass.
- Final geometry is schema-valid and deterministic invariants are enforced outside the model.
- Existing failing extraction/cut-paper fixtures are covered by regression tests.
- Diagnostics explain which provider, validation rule, or constraint caused a retry/failure.
- Existing animation composition remains functional.
