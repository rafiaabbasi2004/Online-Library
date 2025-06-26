import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ContinueReading({ userId }) {
  const [lastBook, setLastBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${userId}/last-read`)
      .then(res => setLastBook(res.data))
      .catch(err => setError("No reading history found"));
  }, [userId]);

  if (error) return <p>{error}</p>;
  if (!lastBook) return <p>Loading last read book...</p>;

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full md:w-2/3 mx-auto my-5">
      <h2 className="text-xl font-semibold mb-3">📖 Continue Reading</h2>
      <div className="flex gap-4">
        <img src={lastBook.book.image} alt={lastBook.book.title} className="w-28 h-40 object-cover rounded" />
        <div>
          <h3 className="text-lg font-bold">{lastBook.book.title}</h3>
          <p className="text-sm italic">by {lastBook.book.author}</p>
          <p className="text-sm mt-2">{lastBook.book.description?.substring(0, 100)}...</p>
          <button className="mt-3 px-4 py-2 bg-amber-700 text-white rounded">
            Continue Reading
          </button>
        </div>
      </div>
    </div>
  );
}
