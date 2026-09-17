# Puppet AI Pipeline: Multi-Model Extraction and Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Puppet's hard-coded single-model extraction path with a provider-agnostic, pin-aware, validated pipeline that can retry, fall back, selectively ensemble, and deterministically repair puppet geometry.

**Architecture:** Keep provider-specific API code behind `VisionProvider`/`SegmentationProvider` adapters. Convert all provider output into a canonical Zod-validated candidate, score it against structural and pin constraints, route weak candidates to targeted retry/fallback/ensemble, then run deterministic geometry validation and repair before returning the existing puppet data shape.

**Tech Stack:** TypeScript, React Start server functions, Zod, native `fetch`, existing Puppet types, Node test runner used by the repository's current `npm test` script.

**Spec:** `docs/superpowers/specs/2026-09-17-ai-pipeline-multi-model-design.md`

## Global Constraints

- Extraction must no longer depend on one hard-coded vision model.
- Pins are structured constraints and must be checked programmatically.
- Invalid model output is a failed candidate, not a successful extraction.
- Deterministic code owns geometry invariants; models own perception.
- A weak provider result must trigger recovery when another configured strategy can reasonably recover.
- Live paid model calls are excluded from automated tests.
- Existing `composeAnimation` behavior remains compatible.
- Do not redesign unrelated UI, auth, database, deployment, or animation-editor behavior.
- Do not silently invent missing anatomy during deterministic repair.

---

## File Structure

Create these focused modules under `src/lib/ai/`:

- `contracts.ts` — provider interfaces, request/result types, attempt metadata.
- `schemas.ts` — Zod schemas for canonical candidates, pins, policies, diagnostics.
- `prompts.ts` — provider-neutral extraction prompt construction from structured constraints.
- `xai-provider.ts` — xAI adapter containing API wire-format details currently embedded in `puppet-ai.ts`.
- `providers.ts` — provider registry and environment-backed configuration.
- `scoring.ts` — candidate quality and constraint scoring with explicit failure reasons.
- `geometry.ts` — deterministic graph/coordinate/range validation and safe repairs.
- `diagnostics.ts` — trace construction and secret-safe summaries.
- `pipeline.ts` — orchestration, retry/fallback/ensemble policy, candidate selection.
- `__tests__/...` — unit/contract tests colocated with AI modules.

Modify:

- `src/lib/ai/puppet-ai.ts` — preserve the public `analyzeFigure`, `composeAnimation`, and `conjureFigure` server-function interfaces while delegating extraction/animation chat behavior to the new provider infrastructure.
- `src/lib/puppet/types.ts` — add only compatibility types needed by the canonical pipeline; preserve existing `Joint`/`CutPart`/animation consumers.
- `package.json` — only if a test/runtime dependency is genuinely required; prefer existing dependencies and Node facilities.
- `docs/superpowers/specs/...` — read-only design authority; no implementation changes required.

Add regression fixtures under `src/lib/ai/fixtures/` only when suitable non-sensitive project fixture assets already exist or can be represented as compact synthetic cases. Do not commit user-private images.

---

### Task 1: Establish canonical contracts and schemas

**Files:**
- Create: `src/lib/ai/contracts.ts`
- Create: `src/lib/ai/schemas.ts`
- Create: `src/lib/ai/__tests__/schemas.test.ts`
- Modify: `src/lib/puppet/types.ts` only if a shared type needs a compatibility export

**Interfaces:**
- `ExtractionRequest`: `{ imageDataUrl: string; hint?: string; pins?: ExtractionPins; policy?: PipelinePolicy }`.
- `ExtractionPins`: required IDs, anchors, regions, graph constraints, orientation/scale hints, visibility hints, semantic hint.
- `VisionProvider`: `analyze(request: ProviderRequest): Promise<ProviderResult>`.
- `SegmentationProvider`: `segment(request: SegmentationRequest): Promise<SegmentationResult>`.
- `CanonicalCandidate`: figure metadata, `joints`, optional regions, provider metadata, confidence, warnings.
- `PipelinePolicy`: primary provider ID, fallback provider IDs, max attempts, acceptance threshold, regional retry threshold, ensemble enablement.
- `PipelineDiagnostic`: attempt ID, provider/model, stage, status, latency, validation/scoring details, repair summary.

- [ ] **Step 1: Write failing schema tests**

Cover these cases explicitly:

```ts
it("accepts a valid canonical joint graph", () => { /* valid normalized coordinates and parent IDs */ });
it("rejects coordinates outside 0..1", () => { /* x=1.2 */ });
it("rejects duplicate joint IDs", () => { /* two joints with same id */ });
it("rejects unsupported skeleton kinds", () => { /* unknown kind */ });
it("rejects malformed pins", () => { /* anchor outside normalized bounds */ });
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/schemas.test.ts`
Expected: FAIL because the schemas/contracts do not exist yet.

- [ ] **Step 3: Implement the canonical types and Zod schemas**

Use `z.object`, `z.array`, `z.record`, and refinements for duplicate IDs and normalized bounds. Keep provider metadata separate from user-visible geometry. Do not permit arbitrary provider JSON to cross the pipeline boundary.

- [ ] **Step 4: Run the focused test and confirm pass**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/schemas.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/ai/contracts.ts src/lib/ai/schemas.ts src/lib/ai/__tests__/schemas.test.ts src/lib/puppet/types.ts
git commit -m "refactor: define canonical AI extraction contracts"
```

---

### Task 2: Extract provider-specific xAI behavior and add registry

**Files:**
- Create: `src/lib/ai/xai-provider.ts`
- Create: `src/lib/ai/providers.ts`
- Create: `src/lib/ai/__tests__/xai-provider.test.ts`
- Modify: `src/lib/ai/puppet-ai.ts`

**Interfaces:**
- `createXaiProvider(config): VisionProvider`.
- `createProviderRegistry(config): ProviderRegistry`.
- Registry lookup returns a provider by stable ID and reports a structured unavailable-provider error when configuration is absent.

- [ ] **Step 1: Write failing adapter tests**

Mock `fetch` and verify:

```ts
it("maps a valid xAI response into CanonicalCandidate", async () => { /* mocked chat completion */ });
it("turns HTTP errors into ProviderFailure", async () => { /* status 429/500 */ });
it("rejects model JSON that fails the canonical schema", async () => { /* malformed joint */ });
it("does not expose the API key in the returned diagnostic", async () => { /* inspect diagnostic */ });
```

- [ ] **Step 2: Run tests to verify failure**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/xai-provider.test.ts`
Expected: FAIL because the adapter/registry do not exist.

- [ ] **Step 3: Move the existing xAI request into the adapter**

Preserve the current xAI endpoint and authentication behavior, but make model selection configuration-driven with the current `grok-4.5` as the default. Reuse the existing JSON extraction behavior only as an adapter parsing utility; immediately validate the parsed object against the canonical schema.

- [ ] **Step 4: Refactor `puppet-ai.ts` to use the registry without changing its server-function API**

`analyzeFigure` must construct an `ExtractionRequest` and call the pipeline entry point introduced later. `composeAnimation` may use the same provider registry but must preserve its current input/output contract. `conjureFigure` remains an image-generation operation and should not be coupled to extraction scoring.

- [ ] **Step 5: Run focused tests and typecheck**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/xai-provider.test.ts && npm run typecheck`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ai/xai-provider.ts src/lib/ai/providers.ts src/lib/ai/__tests__/xai-provider.test.ts src/lib/ai/puppet-ai.ts
git commit -m "refactor: isolate xAI behind provider interface"
```

---

### Task 3: Make pins explicit and implement candidate scoring

**Files:**
- Create: `src/lib/ai/prompts.ts`
- Create: `src/lib/ai/scoring.ts`
- Create: `src/lib/ai/__tests__/scoring.test.ts`

**Interfaces:**
- `buildExtractionPrompt(request): string` — converts structured pins into natural-language provider instructions without making the prompt the source of truth.
- `scoreCandidate(candidate, request): CandidateScore` — returns total score plus named component scores and failures.

- [ ] **Step 1: Write failing scoring tests**

Test:

```ts
it("penalizes missing required joints", () => { /* candidate lacks hand_l */ });
it("penalizes anchor displacement", () => { /* joint far from pinned anchor */ });
it("rejects cyclic parent graphs", () => { /* a -> b -> a */ });
it("penalizes duplicate/near-duplicate joints", () => { /* two joints at same location */ });
it("accepts a complete candidate within constraints", () => { /* all invariants satisfied */ });
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/scoring.test.ts`
Expected: FAIL because scoring is not implemented.

- [ ] **Step 3: Implement structured prompt construction**

Generate explicit sections for required IDs, anchors, parent constraints, orientation, visibility, scale, and semantic hints. Never instruct a provider that its own confidence is authoritative.

- [ ] **Step 4: Implement deterministic scoring**

Score independently on schema validity, required coverage, graph validity, coordinate/range plausibility, pin adherence, duplicate proximity, and optional multi-provider agreement. Return machine-readable failure reasons such as `missing-required-joint`, `anchor-distance`, `parent-cycle`, or `out-of-bounds`.

- [ ] **Step 5: Run focused tests and typecheck**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/scoring.test.ts && npm run typecheck`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ai/prompts.ts src/lib/ai/scoring.ts src/lib/ai/__tests__/scoring.test.ts
git commit -m "feat: score AI candidates against structured pins"
```

---

### Task 4: Implement deterministic geometry validation and repair

**Files:**
- Create: `src/lib/ai/geometry.ts`
- Create: `src/lib/ai/__tests__/geometry.test.ts`

**Interfaces:**
- `validateGeometry(candidate): GeometryValidation`.
- `repairGeometry(candidate, pins): GeometryRepairResult`.

- [ ] **Step 1: Write failing geometry tests**

Cover normalized coordinate cleanup, angle ordering, stable ordering, duplicate IDs, cycles, invalid parent references, and safe pin preservation. Include a case where a required joint is absent and assert that repair does **not** create it.

- [ ] **Step 2: Run tests and verify failure**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/geometry.test.ts`
Expected: FAIL because geometry functions do not exist.

- [ ] **Step 3: Implement validation**

Validate parent references and acyclicity, numeric ranges, finite values, normalized coordinates, unique IDs, and stable z-index/order semantics. Return reasons rather than throwing for ordinary candidate invalidity.

- [ ] **Step 4: Implement only safe repairs**

Repair formatting-level problems: finite numeric normalization, coordinate clamping when policy explicitly permits it, angle min/max ordering, deterministic precision, and stable ordering. Reject structural corruption that would require inventing anatomy.

- [ ] **Step 5: Run tests**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/geometry.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ai/geometry.ts src/lib/ai/__tests__/geometry.test.ts
git commit -m "feat: add deterministic puppet geometry validation"
```

---

### Task 5: Build routing, retry, fallback, and selective ensemble orchestration

**Files:**
- Create: `src/lib/ai/diagnostics.ts`
- Create: `src/lib/ai/pipeline.ts`
- Create: `src/lib/ai/__tests__/pipeline.test.ts`

**Interfaces:**
- `runExtractionPipeline(request, registry): Promise<PipelineResult>`.
- `createPipelineTrace(request): PipelineTrace`.
- `PipelineResult` is either a validated canonical candidate plus trace or a structured failure plus trace.

- [ ] **Step 1: Write failing routing tests with fake providers**

Verify these flows:

```ts
it("returns primary candidate when it clears the acceptance threshold", async () => { /* one provider call */ });
it("retries formatting failure before using fallback", async () => { /* malformed first response */ });
it("runs a regional retry when only one region is weak", async () => { /* weak hand region */ });
it("uses fallback after persistent low confidence", async () => { /* primary below threshold */ });
it("selects between disagreeing candidates deterministically", async () => { /* two candidates, score-based selection */ });
it("returns structured failure when all configured strategies fail", async () => { /* no valid candidate */ });
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/pipeline.test.ts`
Expected: FAIL because the orchestrator does not exist.

- [ ] **Step 3: Implement diagnostics first**

Record pipeline version, input fingerprint, pin summary, provider/model attempts, latency, retry count, validation reasons, scoring breakdown, repairs, and final status. Redact API keys and avoid storing raw provider responses by default.

- [ ] **Step 4: Implement primary-to-retry routing**

Run the primary provider, parse/validate, score it, and accept it only if the threshold is met. If parsing fails, perform one corrected full-image retry before regional retry/fallback. If only a subset of required regions fails, build a targeted request containing those regions.

- [ ] **Step 5: Implement fallback and selective ensemble**

Call configured fallback providers only after primary recovery attempts fail. If multiple candidates remain viable but disagree, reconcile them using deterministic scores and pin adherence. Never ask one model to blindly choose another model's output.

- [ ] **Step 6: Run focused tests and typecheck**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/pipeline.test.ts && npm run typecheck`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/lib/ai/diagnostics.ts src/lib/ai/pipeline.ts src/lib/ai/__tests__/pipeline.test.ts
git commit -m "feat: add resilient multi-model extraction routing"
```

---

### Task 6: Integrate the pipeline with the existing puppet workflow

**Files:**
- Modify: `src/lib/ai/puppet-ai.ts`
- Modify: `src/lib/puppet/types.ts` only where canonical-to-existing conversion requires it
- Create: `src/lib/ai/__tests__/puppet-ai.integration.test.ts`

**Interfaces:**
- `analyzeFigure` continues to accept `{ imageDataUrl: string; hint?: string }` and returns the existing `{ ok, text/error }` shape for compatibility.
- Internally it runs the new extraction pipeline and serializes the validated canonical result in the JSON format currently consumed by the UI.

- [ ] **Step 1: Write the integration test against mocked providers**

Assert that a valid canonical candidate is returned as the existing joint JSON shape, while malformed/low-confidence candidates produce an actionable error rather than bad geometry.

- [ ] **Step 2: Run test and verify failure**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/puppet-ai.integration.test.ts`
Expected: FAIL until `analyzeFigure` delegates to the pipeline.

- [ ] **Step 3: Integrate without changing consumer-facing fields**

Map canonical `parentId`/`zIndex` back to the current `parent`/`z_index` response schema where required. Preserve normalized coordinate semantics expected by the current prompt and downstream conversion.

- [ ] **Step 4: Keep animation composition functional**

Ensure `composeAnimation` still accepts the current joint list and returns its current animation JSON. If it uses the new provider abstraction, the migration must preserve model behavior and response shape rather than introduce extraction-specific validation into animation generation.

- [ ] **Step 5: Run integration test and repository checks**

Run:

```bash
node --experimental-strip-types --test src/lib/ai/__tests__/puppet-ai.integration.test.ts
npm run typecheck
npm test
npm run lint
```

Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ai/puppet-ai.ts src/lib/puppet/types.ts src/lib/ai/__tests__/puppet-ai.integration.test.ts
git commit -m "refactor: route puppet analysis through resilient pipeline"
```

---

### Task 7: Cover the cut-paper failure mode with structural regression fixtures

**Files:**
- Create: `src/lib/ai/__tests__/cut-paper-regression.test.ts`
- Modify: `src/lib/puppet/cut-parts.ts` only if regression analysis proves the extraction contract requires a safe downstream change
- Modify: `src/lib/puppet/types.ts` only if needed for the regression boundary

**Interfaces:**
- Existing `cutParts(sourceDataUrl, joints, bg)` remains compatible.
- Regression tests consume validated joints produced by the AI pipeline and verify structural properties of the resulting `CutPart[]`.

- [ ] **Step 1: Build synthetic regression fixtures from the known failure geometry**

Use generated/simple fixture images or numeric joint fixtures rather than committing private user photographs. Cover limb overlap, narrow limbs, joints close together, and background/foreground separation.

- [ ] **Step 2: Write failing regression assertions**

Assert that each required articulated region receives non-empty source pixels, pivots remain inside the source bounds, no required part vanishes, and the part graph matches the validated joint graph. Avoid pixel-perfect assertions where multiple valid masks are possible.

- [ ] **Step 3: Run the regression suite**

Run: `node --experimental-strip-types --test src/lib/ai/__tests__/cut-paper-regression.test.ts`
Expected: PASS for the canonical validated geometry; if an existing downstream invariant fails, isolate that defect before changing `cut-parts.ts`.

- [ ] **Step 4: Add only proven downstream fixes**

If a fixture exposes a deterministic `cutParts` defect, write the failing test against the smallest affected function, make the minimal repair, and rerun the entire puppet test set. Do not use downstream heuristics to compensate for missing AI anatomy.

- [ ] **Step 5: Commit**

```bash
git add src/lib/ai/__tests__/cut-paper-regression.test.ts src/lib/puppet/cut-parts.ts src/lib/puppet/types.ts
git commit -m "test: add cut-paper extraction regressions"
```

---

### Task 8: Final verification and implementation review

**Files:**
- Modify only files required to resolve verified test/type/lint failures.
- Create: `docs/superpowers/plans/` only for this plan; no additional documentation unless implementation discovers a necessary operator/configuration contract.

- [ ] **Step 1: Run the complete automated suite**

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: all commands pass without live model calls.

- [ ] **Step 2: Inspect the final dependency boundary**

Verify that `src/lib/ai/pipeline.ts`, scoring, geometry, and diagnostics contain no xAI-specific URLs, headers, API-key access, or provider wire-format assumptions. Only `xai-provider.ts` may contain those details.

- [ ] **Step 3: Verify failure semantics**

Manually inspect tests for these guarantees: malformed JSON cannot become a successful candidate; missing pinned anatomy cannot be invented by repair; primary provider failure can reach fallback; diagnostics contain no secrets; and all final accepted geometry passes canonical validation.

- [ ] **Step 4: Verify backward compatibility**

Confirm existing animation composition, puppet type consumers, and cut-parts interfaces still compile and their existing tests pass.

- [ ] **Step 5: Commit any final fixes separately**

```bash
git add <only-verified-fix-files>
git commit -m "fix: resolve AI pipeline verification findings"
```

- [ ] **Step 6: Request code review before claiming completion**

Review the complete diff against `docs/superpowers/specs/2026-09-17-ai-pipeline-multi-model-design.md`. Completion must not be claimed until verification output confirms the final state.

---

## Spec Coverage Review

- Provider abstraction and xAI preservation: Tasks 1–2.
- Canonical schema and invalid-output rejection: Tasks 1–2.
- Structured pins and programmatic enforcement: Task 3.
- Primary/fallback/retry/selective ensemble routing: Task 5.
- Deterministic scoring: Task 3.
- Deterministic geometry validation/repair: Task 4.
- Secret-safe diagnostics: Task 5.
- Golden/structural cut-paper regressions: Task 7.
- Existing animation composition compatibility: Task 6.
- No live paid model calls in automated tests: Tasks 2, 5, 6.
- Final build/type/lint verification: Task 8.

No spec requirement is intentionally uncovered.

## Execution Notes

The implementation should use TDD for every new module: failing focused test, minimal implementation, focused verification, then commit. Keep commits small enough to revert independently. During execution, any ambiguity should be resolved in favor of the approved spec and existing public interfaces rather than broad refactoring.
