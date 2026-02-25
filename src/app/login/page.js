'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (result.success) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">

      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input type="email" placeholder="Email"
          className="w-full p-2 rounded bg-gray-700"
          onChange={(e) => setEmail(e.target.value)}
          required />

        <input type="password" placeholder="Password"
          className="w-full p-2 rounded bg-gray-700"
          onChange={(e) => setPassword(e.target.value)}
          required />

        <button className="w-full bg-blue-600 py-2 rounded">
          Login
        </button>

      </form>

    </div>
  );
}