"use client";

import { useState, useSyncExternalStore } from "react";
import { Alert, AlertDescription } from "@ieee/ui/components/alert";
import { Button } from "@ieee/ui/components/button";
import { Input } from "@ieee/ui/components/input";
import { Label } from "@ieee/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ieee/ui/components/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ieee/ui/components/sheet";
import { Textarea } from "@ieee/ui/components/textarea";
import {
  DESCRIPTION_MAX,
  POST_TYPES,
  TITLE_MAX,
  type PostInput,
} from "@/lib/posts";

export type Draft = PostInput & { id: string | null };

const DESKTOP = "(min-width: 768px)";

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(DESKTOP);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

export function PostSheet({
  draft,
  onClose,
  onSave,
}: {
  draft: Draft | null;
  onClose: () => void;
  onSave: (draft: Draft) => Promise<string | null>;
}) {
  const isDesktop = useIsDesktop();

  return (
    <Sheet open={draft !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side={isDesktop ? "right" : "bottom"}
        className={
          isDesktop
            ? "overflow-y-auto sm:max-w-md"
            : "max-h-[92dvh] overflow-y-auto rounded-t-xl pb-[env(safe-area-inset-bottom)]"
        }
      >
        {draft && (
          <PostForm key={draft.id ?? "new"} initial={draft} onSave={onSave} />
        )}
      </SheetContent>
    </Sheet>
  );
}

function PostForm({
  initial,
  onSave,
}: {
  initial: Draft;
  onSave: (draft: Draft) => Promise<string | null>;
}) {
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const editing = draft.id !== null;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    const failure = await onSave(draft);
    setPending(false);
    if (failure) setError(failure);
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>{editing ? "Edit post" : "New post"}</SheetTitle>
        <SheetDescription>
          {editing
            ? "Changes show on the feed as soon as you save."
            : "It shows on the feed as soon as you publish."}
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={submit} className="flex flex-col gap-4 px-4 pb-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            required
            maxLength={TITLE_MAX}
            value={draft.title}
            onChange={(event) =>
              setDraft({ ...draft, title: event.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            required
            rows={6}
            className="min-h-36"
            maxLength={DESCRIPTION_MAX}
            value={draft.description}
            onChange={(event) =>
              setDraft({ ...draft, description: event.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex min-w-0 flex-col gap-2">
            <Label htmlFor="event-date">Date</Label>
            <Input
              id="event-date"
              type="date"
              required
              className="min-w-0 appearance-none [&::-webkit-date-and-time-value]:text-left"
              value={draft.event_date}
              onChange={(event) =>
                setDraft({ ...draft, event_date: event.target.value })
              }
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={draft.type}
              onValueChange={(type) => setDraft({ ...draft, type })}
            >
              <SelectTrigger id="type" className="w-full text-base md:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {POST_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving…" : editing ? "Save changes" : "Publish"}
        </Button>
      </form>
    </>
  );
}
