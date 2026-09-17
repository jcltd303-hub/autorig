import JSZip from "jszip";
import { archiveReadme, toYaml } from "./yaml";
import { slugify } from "@/lib/utils";
import type { AnimationDef, Attachment, Joint, SourceFigure } from "./types";

function dataUrlToBytes(dataUrl: string) {
  const comma = dataUrl.indexOf(",");
  const b64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function buildArchive(
  source: SourceFigure,
  joints: Joint[],
  attachments: Attachment[],
  animations: AnimationDef[],
) {
  const zip = new JSZip();
  const root = slugify(source.name);
  zip.file(`${root}/source.jpg`, dataUrlToBytes(source.dataUrl));
  zip.file(`${root}/marionette.yaml`, toYaml(source, joints, attachments, animations));
  zip.file(`${root}/README.txt`, archiveReadme(source.name));
  for (const attachment of attachments) {
    zip.file(`${root}/parts/${attachment.id}.png`, dataUrlToBytes(attachment.dataUrl));
    if (attachment.mask?.alphaPngDataUrl) {
      zip.file(`${root}/masks/${attachment.id}.png`, dataUrlToBytes(attachment.mask.alphaPngDataUrl));
    }
  }
  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, filename: `${root}-puppet.zip` };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
