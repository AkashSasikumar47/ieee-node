import { createClient } from "@ieee/supabase/server";
import { AppHeader } from "@/components/app-header";
import { PostCard } from "@/components/post-card";
import { today } from "@/lib/date";
import type { Post } from "@/lib/posts";

async function getPosts(): Promise<Post[] | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ieee_node_posts")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Failed to load posts:", error.message);
    return null;
  }
  return data;
}

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

function Message({ children }: { children: React.ReactNode }) {
  return (
    <p className="py-16 text-center text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export default async function FeedPage() {
  const posts = await getPosts();
  const cutoff = today();
  const upcoming = posts?.filter((post) => post.event_date >= cutoff) ?? [];
  const past =
    posts?.filter((post) => post.event_date < cutoff).reverse() ?? [];

  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto flex max-w-md flex-col gap-8 px-4 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {posts === null ? (
          <Message>Couldn&apos;t load updates. Pull down to try again.</Message>
        ) : posts.length === 0 ? (
          <Message>Nothing posted yet. Check back soon.</Message>
        ) : (
          <>
            <Section title="Upcoming">
              {upcoming.length === 0 ? (
                <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                  No upcoming events right now.
                </p>
              ) : (
                upcoming.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </Section>
            {past.length > 0 && (
              <Section title="Past">
                {past.map((post) => (
                  <PostCard key={post.id} post={post} past />
                ))}
              </Section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
