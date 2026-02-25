import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">

      <h1 className="text-5xl font-extrabold mb-6">
        Welcome to User Manager
      </h1>

      <p className="text-gray-400 mb-8">
        Simple Website for managing users with Next.js and MySQL. Please login or register to continue.
      </p>

      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="bg-gray-700 px-6 py-3 rounded-lg"
        >
          Register
        </Link>
      </div>

    </div>
  );
}