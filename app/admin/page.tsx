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
      <div className="mx-auto flex max-w-screen-sm flex-col gap-6 bg-white px-4 py-6">
        <FeedForm />
        <div className="flex justify-start">
          <button
            onClick={handleLogout}
            className="text-sm font-medium hover:text-red-500 hover:underline"
          >
            ← Logout
          </button>
        </div>
      </div>
    </div>
  );
}
