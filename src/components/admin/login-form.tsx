"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function signIn() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: "Login failed" }));
      setError(data.error || "Login failed");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div className="mx-auto mt-24 w-full max-w-md rounded-2xl border border-white/15 bg-white/[0.03] p-6">
      <h1 className="font-display text-3xl text-metal">Admin Login</h1>
      <p className="mt-2 text-slate-300">Secure admin access. Credentials are managed in environment settings.</p>
      <div className="mt-6 space-y-3">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <Button onClick={signIn} className="w-full">
          Sign In
        </Button>
      </div>
    </div>
  );
}
