import assert from "node:assert/strict";
import test from "node:test";
import { shouldAutoCutParts, WORKSHOP_NAV } from "./workflow";

test("parts are generated automatically only when no cutouts exist", () => {
  assert.equal(shouldAutoCutParts(0, false), true);
  assert.equal(shouldAutoCutParts(3, false), false);
  assert.equal(shouldAutoCutParts(3, true), false);
});

test("workshop navigation presents the user-facing four-stage flow", () => {
  assert.deepEqual(
    WORKSHOP_NAV.map((item) => item.label),
    ["Input", "Review parts", "Test movement", "Export"],
  );
});
