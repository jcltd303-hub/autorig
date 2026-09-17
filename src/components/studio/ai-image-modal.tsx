import { useState } from "react";
import { Sparkles, Wand2, X, Image as ImageIcon, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useStudio } from "@/lib/puppet/store";
import { KIND_LABEL } from "@/lib/puppet/templates";
import type { SkeletonKind } from "@/lib/puppet/types";
import { cn } from "@/lib/utils";

interface AiImageModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "create" | "edit";
}

const CREATE_PRESETS = [
  "Wooden acrobat in striped jester attire",
  "Steampunk brass automaton with visible clockwork gears",
  "Origami paper samurai warrior with folded armor",
  "Stained-glass winged fairy figure",
  "Clockwork tin rabbit in a velvet waistcoat",
  "Porcelain knight with silver filigree armor",
];

const EDIT_PRESETS = [
  "Add a golden crown and flowing royal cape",
  "Add steampunk brass goggles and miniature back wings",
  "Change costume to glowing neon cybernetic plating",
  "Add elaborate robotic wings attached to the shoulders",
  "Give it a vintage magician top hat and silver cane",
  "Make the surface weathered antique bronze with verdigris patina",
];

export function AiImageModal({ open, onClose, defaultTab }: AiImageModalProps) {
  const source = useStudio((s) => s.source);
  const busy = useStudio((s) => s.busy);
  const kind = useStudio((s) => s.kind);
  const setKind = useStudio((s) => s.setKind);
  const conjurePrompt = useStudio((s) => s.conjurePrompt);
  const setConjurePrompt = useStudio((s) => s.setConjurePrompt);
  const editPrompt = useStudio((s) => s.editPrompt);
  const setEditPrompt = useStudio((s) => s.setEditPrompt);
  const conjure = useStudio((s) => s.conjure);
  const editImage = useStudio((s) => s.editImage);

  const [tab, setTab] = useState<"create" | "edit">(
    defaultTab || (source ? "edit" : "create")
  );

  if (!open) return null;

  const handleCreate = async () => {
    await conjure();
    if (!useStudio.getState().error) {
      onClose();
    }
  };

  const handleEdit = async () => {
    await editImage();
    if (!useStudio.getState().error) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div
        className="relative flex w-full max-w-2xl flex-col rounded-xl border border-border bg-surface shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="size-5 text-accent" />
            <h2 className="font-display text-xl font-medium text-fg">
              Gemini AI Image Studio
            </h2>
            <Badge variant="outline" className="text-xs font-mono border-accent/40 text-accent">
              gemini-3.1-flash-image-preview
            </Badge>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted hover:bg-elevated hover:text-fg transition-colors"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-bg/50 px-6">
          <button
            type="button"
            onClick={() => setTab("create")}
            className={cn(
              "flex items-center gap-2 border-b-2 py-3 px-3 text-sm font-medium transition-colors",
              tab === "create"
                ? "border-accent text-fg"
                : "border-transparent text-muted hover:text-fg"
            )}
          >
            <ImageIcon className="size-4" />
            Create New Figure
          </button>
          <button
            type="button"
            disabled={!source}
            onClick={() => setTab("edit")}
            className={cn(
              "flex items-center gap-2 border-b-2 py-3 px-3 text-sm font-medium transition-colors",
              tab === "edit"
                ? "border-accent text-fg"
                : "border-transparent text-muted hover:text-fg",
              !source && "opacity-40 cursor-not-allowed"
            )}
          >
            <Paintbrush className="size-4" />
            Edit Current Figure
            {!source && <span className="text-xs text-subtle">(Load a figure first)</span>}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {tab === "create" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="create-prompt" className="text-sm font-medium text-fg">
                  Prompt for New Figure
                </Label>
                <Textarea
                  id="create-prompt"
                  rows={3}
                  value={conjurePrompt}
                  onChange={(e) => setConjurePrompt(e.target.value)}
                  placeholder="Describe a character, creature, or puppet to generate from scratch..."
                  className="resize-none"
                />
              </div>

              {/* Skeleton Archetype Selection */}
              <div className="space-y-2">
                <Label className="text-xs text-muted">Skeleton Skeleton Archetype</Label>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(KIND_LABEL) as SkeletonKind[]).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKind(k)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs transition-colors",
                        k === kind
                          ? "bg-accent text-accent-fg font-medium"
                          : "bg-elevated text-muted hover:text-fg"
                      )}
                    >
                      {KIND_LABEL[k]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inspiration Presets */}
              <div className="space-y-2">
                <Label className="text-xs text-muted">Inspiration Prompts</Label>
                <div className="flex flex-wrap gap-1.5">
                  {CREATE_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setConjurePrompt(preset)}
                      className="rounded-md border border-border bg-elevated/60 px-2.5 py-1 text-xs text-muted hover:bg-elevated hover:text-fg transition-colors text-left"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-border">
                <Button variant="outline" onClick={onClose} disabled={Boolean(busy)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => void handleCreate()}
                  disabled={Boolean(busy) || !conjurePrompt.trim()}
                  className="gap-2"
                >
                  <Sparkles className="size-4" />
                  {busy ? "Generating Figure..." : "Create Figure with Gemini"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {source ? (
                <div className="flex items-center gap-4 rounded-lg border border-border bg-elevated/40 p-3">
                  <img
                    src={source.dataUrl}
                    alt={source.name}
                    className="size-16 rounded-md object-contain bg-black/40 border border-border"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-fg truncate">{source.name}</p>
                    <p className="text-xs text-muted">
                      {source.width} × {source.height}px • {KIND_LABEL[kind]} skeleton
                    </p>
                    <p className="text-xs text-accent mt-0.5">
                      Gemini will edit this figure while preserving limbs and stance for rigging.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="edit-prompt" className="text-sm font-medium text-fg">
                  Edit Instructions
                </Label>
                <Textarea
                  id="edit-prompt"
                  rows={3}
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="Describe modifications to apply (e.g., 'Add a top hat and brass goggles', 'Make the robes crimson silk', 'Add dragon wings')..."
                  className="resize-none"
                />
              </div>

              {/* Edit Suggestions */}
              <div className="space-y-2">
                <Label className="text-xs text-muted">Quick Modifications</Label>
                <div className="flex flex-wrap gap-1.5">
                  {EDIT_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setEditPrompt(preset)}
                      className="rounded-md border border-border bg-elevated/60 px-2.5 py-1 text-xs text-muted hover:bg-elevated hover:text-fg transition-colors text-left"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-border">
                <Button variant="outline" onClick={onClose} disabled={Boolean(busy)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => void handleEdit()}
                  disabled={Boolean(busy) || !editPrompt.trim() || !source}
                  className="gap-2"
                >
                  <Wand2 className="size-4" />
                  {busy ? "Editing Figure..." : "Apply Edit with Gemini"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
