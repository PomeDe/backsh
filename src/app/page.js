'use client'
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(json => setData(json.data || []));
  }, []);

  return (
    <div className="text-yellow-300 text-3xl flex flex-col items-center w-screen h-screen justify-evenly">
      {data.map(user => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p><p>Pass: {user.password}</p>
        </div>
      ))}
    </div>
  );
}
