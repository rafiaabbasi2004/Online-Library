import React, { useEffect, useState } from "react";
import "./navbar.css";
export default function TrendingBooks() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0); // for slider navigation
  const visibleCount = 3;


  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5); // Load more for smoother sliding
        setBooks(selected);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (startIndex + visibleCount < books.length) {
      setStartIndex(startIndex + 1);
    }
    else{
        setStartIndex(0);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
    else{
        setStartIndex(books.length-visibleCount);
    }
  };

  if (loading) return <p>Loading trending books...</p>;
  if (error) return <p>Error loading books: {error}</p>;

  const visibleBooks = books.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative px-10">

      <div className="flex items-center flex-row gap-2 justify-center mx-30">
        <button
          onClick={handlePrev}
          className="arrow-buttons text-2xl font-bold px-4 py-2 mr-2 rounded-full"
        >
          &lt;
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {visibleBooks.map((book) => (
            <div
              key={book._id}
              className="book-card p-4 flex flex-row items-center border-0 justify-center "
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-70 w-60 shadow-md object-cover rounded-xl mb-3"
              />
              <div className="card-text flex flex-col ml-5 justify-start items-start">
                <h3 className="font-medium font-serif text-2xl mb-6 ">{book.title}</h3>
                <p className="text-sm italic">by {book.author}</p>
                <p className="text-sm text-gray-600 ">
                {book.description.substring(0, 80)}...
              </p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleNext}
         className=" arrow-buttons text-2xl font-bold px-4 py-2 mr-2 rounded-full"
        >
          &gt;
        </button>
    </div>
    </div>
  );
}
