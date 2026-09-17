import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const svg = readFileSync("/workspace/public/favicon.svg", "utf8");
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 96, height: 200 } });
await page.setContent(`<!doctype html>
<html><body style="margin:0;background:#5a534c;display:flex;flex-direction:column;gap:8px;padding:8px">
  <div style="width:16px;height:16px">${svg.replace("<svg", '<svg width="16" height="16"')}</div>
  <div style="width:32px;height:32px">${svg.replace("<svg", '<svg width="32" height="32"')}</div>
  <div style="width:64px;height:64px">${svg.replace("<svg", '<svg width="64" height="64"')}</div>
</body></html>`);
await page.locator("body").screenshot({ path: "/workspace/.grok/favicon-readback.png" });
await browser.close();
console.log("wrote /workspace/.grok/favicon-readback.png");
