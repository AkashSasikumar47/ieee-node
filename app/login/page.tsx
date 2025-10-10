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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin");
    } else {
      setError("Invalid credentials");
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
            className="w-full rounded-lg p-2 font-medium text-lg text-white bg-black hover:bg-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
