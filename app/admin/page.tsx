"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import FeedForm from "../components/FeedForm";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="mx-auto flex max-w-screen-sm flex-col gap-4 bg-white px-4 py-6">
        <FeedForm />
        <button
          onClick={handleLogout}
          className="text-xs font-medium text-neutral-400 hover:text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
