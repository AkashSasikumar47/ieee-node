"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

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
      const res = await fetch("/api/login", {
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

      <div className="max-w-screen-sm bg-white mx-auto px-4 py-6">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-lg border border-neutral-200 p-4 shadow-xs flex flex-col gap-4"
        >
          <h2 className="font-medium text-lg">Admin Login</h2>
          {error && <p className="font-medium text-xs text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-lg border border-neutral-200 p-4 shadow-xs font-medium text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-neutral-200 p-4 shadow-xs font-medium text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg p-2 font-medium text-lg text-white bg-black hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
