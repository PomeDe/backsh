'use client'
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const json = await res.json();
      setData(json.users || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;

    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      setData(prev => prev.filter(user => user.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="bg-gray-900 px-10 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold text-blue-500">
          Users Dashboard
        </h1>
        <span className="text-sm text-gray-400">
          Total Users: {data.length}
        </span>
      </nav>

      {/* Users Section */}
      <section className="px-10 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          All Registered Users
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading users...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((user) => (
              <div
                key={user.id}
                className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-2xl transition"
              >
                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>

                <button
                  onClick={() => handleDelete(user.id)}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 text-gray-500 text-sm">
        © 2026 UserManager
      </footer>

    </div>
  );
}