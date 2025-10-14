"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import AddFeedForm from "../components/Feed/AddFeedForm";

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
      <div className="max-w-screen-sm bg-white mx-auto px-4 py-6 flex flex-col gap-6">
        <AddFeedForm />
        <div className="flex justify-start">
          <button
            onClick={handleLogout}
            className="font-medium text-sm hover:text-red-500 hover:underline"
          >
            ← Logout
          </button>
        </div>
      </div>
    </div>
  );
}
