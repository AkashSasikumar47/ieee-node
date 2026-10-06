import { createClient } from "@ieee/supabase/server";
import { AppHeader } from "@/components/app-header";
import { FadeUp } from "@/components/motion/fade-up";
import { IntroProvider } from "@/components/motion/intro";
import { PostFeed } from "@/components/post-feed";

export default async function FeedPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("ieee_node_posts")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) console.error("Failed to load posts:", error.message);

  return (
    <IntroProvider>
      <AppHeader />
      <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4 pb-6">
        <h1 className="sr-only">IEEE SRMIST updates</h1>
        {posts ? (
          <PostFeed posts={posts} />
        ) : (
          <FadeUp
            as="p"
            className="py-16 text-center text-sm text-muted-foreground"
          >
            Couldn&apos;t load updates. Pull down to try again.
          </FadeUp>
        )}
      </main>
    </IntroProvider>
  );
}
