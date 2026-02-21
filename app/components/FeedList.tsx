"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient, FeedItem, FeedType } from "@/lib/supabase";
import FeedCard from "./FeedCard";

interface FeedListProps {
  filterType?: FeedType;
}

const FeedList = ({ filterType }: FeedListProps) => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const supabase = createSupabaseClient();
        let query = supabase
          .from("node_feed")
          .select("*")
          .order("date", { ascending: false });

        if (filterType) {
          query = query.eq("type", filterType);
        }

        const { data, error } = await query;

        if (error) throw error;
        setFeed(data ?? []);
      } catch (err) {
        console.error("Error fetching feed:", err);
        setError("Failed to load updates.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [filterType]);

  if (loading) {
    return (
      <section className="mx-auto max-w-screen-sm bg-white px-4 py-6">
        <p className="text-center text-sm font-normal text-neutral-400">Loading updates...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-screen-sm bg-white px-4 py-6">
        <p className="text-center text-sm font-normal text-neutral-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-screen-sm flex-col gap-6 bg-white px-4 py-6">
      {feed.length === 0 ? (
        <p className="text-center text-sm font-normal text-neutral-400">No updates found.</p>
      ) : (
        feed.map((item) => (
          <FeedCard
            key={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            type={item.type}
          />
        ))
      )}
    </section>
  );
};

export default FeedList;
