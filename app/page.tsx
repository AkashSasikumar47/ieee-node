"use client";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Feed from "./components/Feed/Feed";

export default function Page() {
  return (
    <div className="bg-gray-400">
      <Header />
      <Navbar />
      <Feed />
    </div>
  );
}
