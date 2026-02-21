"use client";

import { useState } from "react";
import { FeedType } from "@/lib/supabase";

const FeedForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<FeedType>("Event");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !date || !type) {
      setIsError(true);
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/feed", {
        method: "POST",
        body: JSON.stringify({ title, description, date, type }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status === "success") {
        setIsError(false);
        setMessage("Feed item added successfully!");
        setTitle("");
        setDescription("");
        setDate("");
        setType("Event");
      } else {
        setIsError(true);
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch {
      setIsError(true);
      setMessage("Error submitting feed item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-xs"
    >
      <h2 className="text-lg font-medium">Add New Feed Item</h2>
      {message && (
        <p
          className={`text-xs font-medium ${isError ? "text-red-500" : "text-green-600"}`}
        >
          {message}
        </p>
      )}
      <input
        type="text"
        placeholder="Title"
        className="w-full rounded-lg border border-neutral-200 p-4 text-sm font-medium shadow-xs"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full rounded-lg border border-neutral-200 p-4 text-sm font-medium shadow-xs"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="w-full rounded-lg border border-neutral-200 p-4 text-sm font-medium shadow-xs"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        className="w-full rounded-lg border border-neutral-200 p-4 text-sm font-medium shadow-xs"
        value={type}
        onChange={(e) => setType(e.target.value as FeedType)}
      >
        <option value="Event">Event</option>
        <option value="Meeting">Meeting</option>
        <option value="Workshop">Workshop</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black p-2 text-lg font-medium text-white hover:bg-blue-500 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Add Feed Item"}
      </button>
    </form>
  );
};

export default FeedForm;
