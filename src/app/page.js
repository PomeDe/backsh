'use client'
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(json => setData(json.data || []));
  }, []);

 const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password}),
    });

    const result = await response.json();
    if (result.success) {
        const res = await fetch('/api/users');
  const json = await res.json();
  setData(json.data || []);
      setName('');
      setEmail('');
      setPassword('');
    } 
  };


  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center py-10 px-6">
      
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-center mt-2">
        Users List
      </h1>

      <form
        onSubmit={handleSubmit}
        className=" flex flex-col space-y-3  items-center mb-10 px-6 py-3 mt-5 bg-gray-600  rounded-lg text-lg font-semibold transition duration-300"
      >
        <h1 className="text-2xl">Add New User</h1>
        <div>
        <label htmlFor="name" >Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border-2 border-white rounded-xl ml-2"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
           className="border-2 border-white rounded-xl ml-2"
        />
      </div>
            <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
           className="border-2 border-white rounded-xl ml-2"
        />
      </div>
      <button type="submit" className="mb-10 px-6 py-3 mt-5 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition duration-300">Add User</button>
      </form>

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5">
        {data.map((user, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                Name: <span className="font-normal">{user.name}</span>
              </p>
              <p className="text-lg font-semibold">
                Email: <span className="font-normal">{user.email}</span>
              </p>
              <p className="text-lg font-semibold">
                Password: <span className="font-normal">{user.password}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
