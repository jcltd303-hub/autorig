import assert from "node:assert/strict";
import test from "node:test";
import { extractJson } from "../diagnostics";

test("extractJson handles fenced JSON with braces inside strings", () => {
  const value = extractJson('prefix\n```json\n{"name":"figure {front}","joints":[]}\n```');
  assert.deepEqual(value, { name: "figure {front}", joints: [] });
});

test("extractJson rejects an unclosed object", () => {
  assert.throws(() => extractJson('{"name":"broken"'), /Unclosed JSON/);
});
