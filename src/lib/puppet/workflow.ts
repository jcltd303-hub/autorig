import type { StudioStep } from "./types";

export const WORKSHOP_NAV: { id: StudioStep; label: string; numeral: string }[] = [
  { id: "figure", label: "Input", numeral: "I" },
  { id: "bones", label: "Review parts", numeral: "II" },
  { id: "motion", label: "Test movement", numeral: "III" },
  { id: "archive", label: "Export", numeral: "IV" },
];

/** Existing cutouts are artwork; moving joints should not silently recut them. */
export function shouldAutoCutParts(partCount: number, _partsStale: boolean) {
  return partCount === 0;
}
