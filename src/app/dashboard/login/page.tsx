"use client";
import React, { useState } from "react";
import Label from "@/components/label";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data?.error || "Login failed");
      return;
    }
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          className="border rounded p-2 text-black dark:text-white placeholder:text-black dark:placeholder:text-white"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border rounded p-2 text-black dark:text-white placeholder:text-black dark:placeholder:text-white"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-red-400">
            <Label className="text-red-400">{error}</Label>
          </div>
        )}
        <button className="border rounded p-2 dark:border-white" type="submit">
          <Label>Login</Label>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
