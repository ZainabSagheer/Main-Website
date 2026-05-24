"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816]">
      <form
        onSubmit={handleSubmit}
        className="p-10 border border-white/10 rounded-2xl bg-[#0F172A]/60 backdrop-blur-xl w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-brand-cyan rounded-lg flex items-center justify-center font-bold text-brand-dark">
            B
          </div>
          <span className="text-2xl font-bold text-white">
            ADMIN<span className="text-brand-cyan">.</span>
          </span>
        </div>

        <h1 className="text-xl font-semibold text-white mb-6">Sign in to dashboard</h1>

        {error && (
          <p className="text-red-400 text-sm mb-4 px-3 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
            {error}
          </p>
        )}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-cyan transition-colors mb-4"
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-brand-cyan text-brand-dark font-bold hover:bg-brand-cyan/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
