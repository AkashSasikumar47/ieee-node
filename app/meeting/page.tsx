"use client";

import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Feed from "../components/Feed/Feed";

export default function MeetingsPage() {
  return (
    <div>
      <Header />
      <Navbar />
      <Feed filterType="Meeting" />
    </div>
  );
}
