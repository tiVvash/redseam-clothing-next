"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import Link from "next/link";

export default function LoginForm() {
  const context = useData();

  if (!context) {
    return (
      <div className="w-[554px] p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-500">DataProvider is missing. Wrap this component inside DataProvider.</p>
      </div>
    );
  }

  const { login, authError, authLoading } = context;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="w-[554px] p-6 bg-white rounded-lg flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-[#10151F]">Login</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-[#3E424A]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4000]"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-[#3E424A]">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4000]"
            required
          />
        </div>

        {authError && <p className="text-sm text-red-500">{authError}</p>}

        <button
          type="submit"
          className={`w-full h-10 bg-[#FF4000] text-white rounded-md flex items-center justify-center gap-2 hover:bg-[#e63a00] ${
            authLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={authLoading}
        >
          {authLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center text-[#3E424A]">
        Not a member?{" "}
        <Link href="/register">Register</Link>
      </p>
    </div>
  );
}
