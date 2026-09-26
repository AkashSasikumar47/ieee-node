"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@ieee/ui/components/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ieee/ui/components/alert-dialog";
import { Button } from "@ieee/ui/components/button";
import { Input } from "@ieee/ui/components/input";
import { Label } from "@ieee/ui/components/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@ieee/ui/components/native-select";
import { Textarea } from "@ieee/ui/components/textarea";
import { PostCard } from "@/components/post-card";
import { today } from "@/lib/date";
import {
  DESCRIPTION_MAX,
  POST_TYPES,
  TITLE_MAX,
  type Post,
  type PostInput,
} from "@/lib/posts";

type Draft = PostInput & { id: string | null };

const emptyDraft = (): Draft => ({
  id: null,
  title: "",
  description: "",
  event_date: today(),
  type: "Event",
});

export function AdminConsole({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const editing = draft.id !== null;

  async function request(url: string, init: RequestInit, fallback: string) {
    setError("");
    setPending(true);
    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? fallback);
        return false;
      }
      router.refresh();
      return true;
    } catch {
      setError("Couldn't reach the server. Check your connection.");
      return false;
    } finally {
      setPending(false);
    }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const { id, ...body } = draft;
    const saved = await request(
      id ? `/api/posts/${id}` : "/api/posts",
      {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      "Couldn't save the post",
    );
    if (saved) setDraft(emptyDraft());
  }

  async function remove(id: string) {
    const removed = await request(
      `/api/posts/${id}`,
      { method: "DELETE" },
      "Couldn't delete the post",
    );
    if (removed && draft.id === id) setDraft(emptyDraft());
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  function edit(post: Post) {
    setDraft({
      id: post.id,
      title: post.title,
      description: post.description,
      event_date: post.event_date,
      type: post.type,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={save} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            {editing ? "Edit post" : "New post"}
          </h1>
          {editing && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setDraft(emptyDraft())}
            >
              Cancel
            </Button>
          )}
        </div>

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
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-date">Date</Label>
            <Input
              id="event-date"
              type="date"
              required
              value={draft.event_date}
              onChange={(event) =>
                setDraft({ ...draft, event_date: event.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2 *:data-[slot=native-select-wrapper]:w-full">
            <Label htmlFor="type">Type</Label>
            <NativeSelect
              id="type"
              value={draft.type}
              onChange={(event) =>
                setDraft({ ...draft, type: event.target.value })
              }
            >
              {POST_TYPES.map((type) => (
                <NativeSelectOption key={type} value={type}>
                  {type}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving…" : editing ? "Save changes" : "Publish"}
        </Button>
      </form>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          All posts ({posts.length})
        </h2>

        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
            Nothing published yet.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              actions={
                <>
                  <Button variant="outline" onClick={() => edit(post)}>
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" disabled={pending}>
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                        <AlertDialogDescription>
                          &ldquo;{post.title}&rdquo; will be removed from the
                          feed. This can&apos;t be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => remove(post.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              }
            />
          ))
        )}
      </section>

      <Button variant="ghost" className="self-start" onClick={logout}>
        Sign out
      </Button>
    </div>
  );
}
