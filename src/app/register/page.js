'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password, age }),
    });

    const result = await res.json();

    if (result.success) {
      alert("Registered successfully!");
      router.push("/dashboard");
    } else {
      alert("Register failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">

      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input type="text" placeholder="First Name"
          className="w-full p-2 rounded bg-gray-700"
          onChange={(e) => setFirstName(e.target.value)}
          required />

        <input type="text" placeholder="Last Name"
          className="w-full p-2 rounded bg-gray-700"
          onChange={(e) => setLastName(e.target.value)}
          required />

        <input type="email" placeholder="Email"
          className="w-full p-2 rounded bg-gray-700"
          onChange={(e) => setEmail(e.target.value)}
          required />

        <input type="password" placeholder="Password"
          className="w-full p-2 rounded bg-gray-700"
          onChange={(e) => setPassword(e.target.value)}
          required />

        <input type="number" placeholder="Age"
          className="w-full p-2 rounded bg-gray-700"
          onChange={(e) => setAge(e.target.value)}
          required />

        <button className="w-full bg-blue-600 py-2 rounded">
          Register
        </button>

      </form>

    </div>
  );
}