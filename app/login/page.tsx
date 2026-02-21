"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/admin");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />

      <div className="mx-auto max-w-screen-sm bg-white px-4 py-6">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-xs"
        >
          <h2 className="text-lg font-medium">Admin Login</h2>
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-lg border border-neutral-200 p-4 text-sm font-medium shadow-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-neutral-200 p-4 text-sm font-medium shadow-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-2 text-lg font-medium text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
