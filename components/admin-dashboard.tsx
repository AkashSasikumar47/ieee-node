"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ieee/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ieee/ui/components/tabs";
import { PostCard } from "@/components/post-card";
import { PostSheet, type Draft } from "@/components/post-sheet";
import { today } from "@/lib/date";
import type { Post } from "@/lib/posts";

const newDraft = (): Draft => ({
  id: null,
  title: "",
  description: "",
  event_date: today(),
  type: "Event",
});

async function send(url: string, init: RequestInit, fallback: string) {
  try {
    const response = await fetch(url, init);
    if (response.ok) return null;
    const data = await response.json().catch(() => ({}));
    return (data.error as string | undefined) ?? fallback;
  } catch {
    return "Couldn't reach the server. Check your connection.";
  }
}

export function AdminDashboard({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const cutoff = today();
  const upcoming = posts
    .filter((post) => post.event_date >= cutoff)
    .sort((a, b) => a.event_date.localeCompare(b.event_date));
  const past = posts
    .filter((post) => post.event_date < cutoff)
    .sort((a, b) => b.event_date.localeCompare(a.event_date));

  const stats = [
    { label: "Upcoming", value: upcoming.length },
    { label: "Past", value: past.length },
    { label: "Total", value: posts.length },
  ];

  async function save({ id, ...body }: Draft) {
    const failure = await send(
      id ? `/api/posts/${id}` : "/api/posts",
      {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      "Couldn't save the post",
    );
    if (!failure) {
      setDraft(null);
      router.refresh();
    }
    return failure;
  }

  async function remove(id: string) {
    setError("");
    setDeleting(id);
    const failure = await send(
      `/api/posts/${id}`,
      { method: "DELETE" },
      "Couldn't delete the post",
    );
    setDeleting(null);
    if (failure) setError(failure);
    else router.refresh();
  }

  function list(items: Post[], empty: string) {
    if (items.length === 0) {
      return (
        <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
          {empty}
        </p>
      );
    }
    return items.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        actions={
          <>
            <Button
              variant="outline"
              onClick={() =>
                setDraft({
                  id: post.id,
                  title: post.title,
                  description: post.description,
                  event_date: post.event_date,
                  type: post.type,
                })
              }
            >
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={deleting === post.id}>
                  {deleting === post.id ? "Deleting…" : "Delete"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                  <AlertDialogDescription>
                    &ldquo;{post.title}&rdquo; will be removed from the feed.
                    This can&apos;t be undone.
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
    ));
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="gap-1 py-4">
            <CardHeader className="gap-1 px-4">
              <CardDescription className="text-xs">
                {stat.label}
              </CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Button size="lg" onClick={() => setDraft(newDraft())}>
        <Plus />
        New post
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="upcoming" className="gap-5">
        <TabsList className="w-full">
          <TabsTrigger value="upcoming">
            Upcoming ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="flex flex-col gap-3">
          {list(upcoming, "Nothing upcoming. Publish the next event.")}
        </TabsContent>
        <TabsContent value="past" className="flex flex-col gap-3">
          {list(past, "No past posts yet.")}
        </TabsContent>
      </Tabs>

      <PostSheet draft={draft} onClose={() => setDraft(null)} onSave={save} />
    </div>
  );
}
