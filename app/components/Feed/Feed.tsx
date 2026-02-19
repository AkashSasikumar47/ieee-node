"use client";

import React, { useEffect, useState } from "react";
import { createSupabaseClient, FeedItem } from "@/lib/supabase";
import Card from "../Card/Card";

interface FeedProps {
  filterType?: string;
}

const Feed: React.FC<FeedProps> = ({ filterType }) => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [filterType]);

  if (loading) {
    return (
      <section className="max-w-screen-sm bg-white mx-auto px-4 py-6">
        <p className="text-center text-neutral-400">Loading updates...</p>
      </section>
    );
  }

  return (
    <section className="max-w-screen-sm bg-white mx-auto px-4 py-6 flex flex-col gap-6">
      {feed.length === 0 ? (
        <p className="text-center text-neutral-400">No updates found.</p>
      ) : (
        feed.map((item) => (
          <Card
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

export default Feed;
