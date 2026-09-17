import { spawn } from "node:child_process";
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

async function prepareDist() {
  const distDir = join(process.cwd(), "dist");
  const publicDir = join(process.cwd(), ".output", "public");

  mkdirSync(distDir, { recursive: true });

  if (existsSync(publicDir)) {
    cpSync(publicDir, distDir, { recursive: true });
    console.log("[prepare-dist] Copied static assets from .output/public to dist/");
  }

  const serverBundle = join(process.cwd(), ".output", "server", "index.mjs");
  if (existsSync(serverBundle)) {
    console.log("[prepare-dist] Rendering index.html from server bundle...");
    const testPort = "54321";
    const child = spawn("node", [serverBundle], {
      env: { ...process.env, PORT: testPort, HOST: "127.0.0.1", NODE_ENV: "production" },
      stdio: "ignore",
    });

    let html = null;
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 100));
      try {
        const res = await fetch(`http://127.0.0.1:${testPort}/`);
        if (res.ok) {
          html = await res.text();
          break;
        }
      } catch (_err) {
        // Server might still be booting, retry
      }
    }

    try {
      child.kill("SIGTERM");
    } catch (_err) {
      // Child process may have already exited
    }

    if (html) {
      writeFileSync(join(distDir, "index.html"), html, "utf8");
      console.log(`[prepare-dist] Rendered and wrote dist/index.html (${html.length} bytes)`);
    } else {
      console.warn("[prepare-dist] Warning: Could not render HTML from server bundle; generating fallback");
      const fallback = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>Marionette</title><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="icon" type="image/svg+xml" href="/favicon.svg"/></head><body><div id="root"></div></body></html>`;
      writeFileSync(join(distDir, "index.html"), fallback, "utf8");
    }
  }

  console.log("[prepare-dist] dist/ directory is fully prepared for production deployment.");
}

prepareDist().catch((err) => {
  console.error("[prepare-dist] Error preparing dist:", err);
  process.exit(1);
});
