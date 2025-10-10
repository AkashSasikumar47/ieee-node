"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Card from "../Card/Card";

interface FeedItem {
  Title: string;
  Description: string;
  Date: string;
  Type: string;
}

interface FeedProps {
  filterType?: string;
}

const Feed: React.FC<FeedProps> = ({ filterType }) => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const sheetUrl = process.env.NEXT_PUBLIC_SHEET_URL;
        if (!sheetUrl) throw new Error("Sheet URL not found in environment");

        const res = await fetch(sheetUrl);
        if (!res.ok) throw new Error("Failed to fetch sheet");
        const csv = await res.text();

        const parsed = Papa.parse(csv, { header: true });
        const data = parsed.data as FeedItem[];

        let filtered = data.filter(
          (item) => item.Title && item.Description && item.Date && item.Type
        );

        if (filterType) {
          filtered = filtered.filter(
            (item) => item.Type.toLowerCase() === filterType.toLowerCase()
          );
        }

        const sorted = filtered.sort(
          (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
        );

        setFeed(sorted);
      } catch (err) {
        console.error("❌ Error fetching sheet data:", err);
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
        feed.map((item, index) => (
          <Card
            key={index}
            title={item.Title}
            description={item.Description}
            date={item.Date}
            type={item.Type}
          />
        ))
      )}
    </section>
  );
};

export default Feed;
