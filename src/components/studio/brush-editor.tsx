import React, { useRef, useEffect, useState } from 'react';
import { useStudio } from '@/lib/puppet/store';
import { applyMaskEdits, MaskEdit } from '@/lib/puppet/mask-utils';

export function BrushEditor() {
  const { brush, attachments, updateAttachmentMask, setBrush } = useStudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [history, setHistory] = useState<Uint8Array[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const attachment = attachments.find(a => a.id === brush.attachmentId);

  useEffect(() => {
    if (!attachment) return;
    setHistory([attachment.mask]);
    setHistoryIndex(0);
  }, [attachment?.id, attachment]);

  useEffect(() => {
    if (!canvasRef.current || !attachment) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Draw the mask
    const imgData = new ImageData(
      new Uint8ClampedArray(attachment.mask.length * 4).map((_, i) => {
        const pixelIdx = Math.floor(i / 4);
        const alpha = attachment.mask[pixelIdx] || 0;
        return (i + 1) % 4 === 0 ? alpha : 255; // White artwork + mask alpha
      }),
      attachment.bounds.width,
      attachment.bounds.height
    );
    ctx.putImageData(imgData, 0, 0);
  }, [attachment?.id, attachment]); // Include attachment to satisfy exhaustive-deps

  const commitEdit = (newMask: Uint8Array) => {
    updateAttachmentMask(attachment!.id, newMask);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newMask);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        updateAttachmentMask(attachment!.id, history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        updateAttachmentMask(attachment!.id, history[historyIndex + 1]);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || !attachment || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastPos.current) {
        // Simple interpolation logic
        const dist = Math.sqrt((x - lastPos.current.x) ** 2 + (y - lastPos.current.y) ** 2);
        const steps = Math.ceil(dist / (brush.radius * 0.5));
        
        const edits: MaskEdit[] = [];
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const px = lastPos.current.x + (x - lastPos.current.x) * t;
            const py = lastPos.current.y + (y - lastPos.current.y) * t;
            edits.push({ x: px, y: py, radius: brush.radius, mode: brush.mode });
        }

        const newMask = applyMaskEdits(attachment.mask, attachment.bounds.width, attachment.bounds.height, edits);
        commitEdit(newMask);
    }
    
    lastPos.current = { x, y };
  };

  if (!brush.enabled || !attachment) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Edit Mask: {attachment.id}</h2>
        <canvas
          ref={canvasRef}
          width={attachment.bounds.width}
          height={attachment.bounds.height}
          className="border border-gray-300"
          onPointerDown={(e) => {
              setIsDrawing(true);
              lastPos.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
          }}
          onPointerUp={() => {
              setIsDrawing(false);
              lastPos.current = null;
          }}
          onPointerMove={handlePointerMove}
        />
        <div className="flex gap-2 mt-2">
            <button onClick={undo} disabled={historyIndex <= 0}>Undo</button>
            <button onClick={redo} disabled={historyIndex >= history.length - 1}>Redo</button>
            <button onClick={() => setBrush({ enabled: false })}>Close</button>
        </div>
      </div>
    </div>
  );
}
