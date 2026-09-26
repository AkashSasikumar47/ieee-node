"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ieee/ui/components/tabs";
import { PostCard } from "@/components/post-card";
import { today } from "@/lib/date";
import type { Post, PostType } from "@/lib/posts";

const TABS: { value: string; label: string; type: PostType | null }[] = [
  { value: "feed", label: "Feed", type: null },
  { value: "events", label: "Events", type: "Event" },
  { value: "meetings", label: "Meetings", type: "Meeting" },
  { value: "workshops", label: "Workshops", type: "Workshop" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function PostList({ posts, label }: { posts: Post[]; label: string }) {
  const cutoff = today();
  const upcoming = posts.filter((post) => post.event_date >= cutoff);
  const past = posts.filter((post) => post.event_date < cutoff).reverse();

  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No {label.toLowerCase()} yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Section title="Upcoming">
        {upcoming.length === 0 ? (
          <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
            Nothing upcoming right now.
          </p>
        ) : (
          upcoming.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </Section>
      {past.length > 0 && (
        <Section title="Past">
          {past.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Section>
      )}
    </div>
  );
}

export function PostFeed({ posts }: { posts: Post[] }) {
  return (
    <Tabs defaultValue="feed" className="gap-5">
      <TabsList className="w-full">
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <PostList
            label={tab.value === "feed" ? "posts" : tab.label}
            posts={
              tab.type ? posts.filter((post) => post.type === tab.type) : posts
            }
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
