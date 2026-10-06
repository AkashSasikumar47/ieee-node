"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ieee/ui/components/tabs";
import { FadeUp } from "@/components/motion/fade-up";
import { useIntroReady } from "@/components/motion/intro";
import { Reveal } from "@/components/motion/reveal";
import { DURATION, EASE_OUT, OFFSET } from "@/components/motion/timing";
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
      <Reveal>
        <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

function Cards({ posts }: { posts: Post[] }) {
  return posts.map((post) => (
    <Reveal key={post.id}>
      <PostCard post={post} />
    </Reveal>
  ));
}

function PostList({ posts, label }: { posts: Post[]; label: string }) {
  const cutoff = today();
  const upcoming = posts.filter((post) => post.event_date >= cutoff);
  const past = posts.filter((post) => post.event_date < cutoff).reverse();

  if (posts.length === 0) {
    return (
      <FadeUp
        as="p"
        className="py-16 text-center text-sm text-muted-foreground"
      >
        No {label.toLowerCase()} yet. Check back soon.
      </FadeUp>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Section title="Upcoming">
        {upcoming.length === 0 ? (
          <FadeUp
            as="p"
            className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground"
          >
            Nothing upcoming right now.
          </FadeUp>
        ) : (
          <Cards posts={upcoming} />
        )}
      </Section>
      {past.length > 0 && (
        <Section title="Past">
          <Cards posts={past} />
        </Section>
      )}
    </div>
  );
}

export function PostFeed({ posts }: { posts: Post[] }) {
  const ready = useIntroReady();
  const [tab, setTab] = useState({ value: "feed", direction: 0 });
  const indexOf = (value: string) =>
    TABS.findIndex((item) => item.value === value);

  function change(value: string) {
    setTab({
      value,
      direction: Math.sign(indexOf(value) - indexOf(tab.value)),
    });
  }

  return (
    <Tabs value={tab.value} onValueChange={change} className="gap-5">
      <motion.div
        initial={{ opacity: 0, y: OFFSET.rise }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: DURATION.enter, ease: EASE_OUT }}
      >
        <TabsList className="w-full">
          {TABS.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </motion.div>
      {TABS.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <motion.div
            initial={{ opacity: 0, x: tab.direction * OFFSET.tab }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: DURATION.tab, ease: EASE_OUT }}
          >
            <PostList
              label={item.value === "feed" ? "posts" : item.label}
              posts={
                item.type
                  ? posts.filter((post) => post.type === item.type)
                  : posts
              }
            />
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
