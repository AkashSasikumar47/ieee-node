"use client";

import { useState } from "react";

interface FeedItem {
  Title: string;
  Description: string;
  Date: string;
  Type: "Event" | "Meeting" | "Workshop";
}

const AddFeedForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<FeedItem["Type"]>("Event");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !date || !type) {
      setMessage("Please fill all fields");
      return;
    }

    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      setMessage("Please select a valid date");
      return;
    }

    setLoading(true);
    setMessage(null);

    const payload: FeedItem = {
      Title: title,
      Description: description,
      Date: date,
      Type: type,
    };

    try {
      const res = await fetch("/api/addFeed", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status === "success") {
        setMessage("Feed item added successfully!");
        setTitle("");
        setDescription("");
        setDate("");
        setType("Event");
      } else {
        setMessage(
          "Error adding feed item: " + (data.error || "Unknown error")
        );
      }
    } catch {
      setMessage("Error submitting feed item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-lg border border-neutral-200 p-4 shadow-xs flex flex-col gap-4"
    >
      <h2 className="font-medium text-lg">Add New Feed Item</h2>
      {message && <p className="font-medium text-xs text-red-500">{message}</p>}
      <input
        type="text"
        placeholder="Title"
        className="w-full rounded-lg border border-neutral-200 p-4 shadow-xs font-medium text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full rounded-lg border border-neutral-200 p-4 shadow-xs font-medium text-sm"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="w-full rounded-lg border border-neutral-200 p-4 shadow-xs font-medium text-sm"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        className="w-full rounded-lg border border-neutral-200 p-4 shadow-xs font-medium text-sm"
        value={type}
        onChange={(e) => setType(e.target.value as FeedItem["Type"])}
      >
        <option value="Event">Event</option>
        <option value="Meeting">Meeting</option>
        <option value="Workshop">Workshop</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg p-2 font-medium text-lg text-white bg-black hover:bg-blue-500"
      >
        {loading ? "Submitting..." : "Add Feed Item"}
      </button>
    </form>
  );
};

export default AddFeedForm;
