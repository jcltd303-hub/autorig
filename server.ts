import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

// When loaded by Nitro during build:
export default function () {}

// Check if running inside the built Nitro bundle vs directly running `server.ts`:
const isInsideNitroBundle = import.meta.url.includes(".output");
const isDirectEntry =
  !isInsideNitroBundle &&
  process.argv[1] &&
  (process.argv[1].endsWith("server.ts") || process.argv[1].endsWith("server.js"));

if (isDirectEntry) {
  if (!process.env.PORT) {
    process.env.PORT = "3000";
  }
  if (!process.env.HOST) {
    process.env.HOST = "0.0.0.0";
  }

  const serverEntry = pathToFileURL(resolve(".output/server/index.mjs")).href;
  await import(/* @vite-ignore */ serverEntry);
}
