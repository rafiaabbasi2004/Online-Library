import React, { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // For toggle

  const API_KEY = "9bda0626858d4ce3a67b3f199204b69d";

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=literature&language=en&pageSize=9&apiKey=${API_KEY}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data) => {
        setBlogs(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading literary blogs...</p>;
  if (error) return <p>Error: {error}</p>;

  const visibleBlogs = showAll ? blogs : blogs.slice(0, 6);

  return (
    <div className="text-center mt-10">
      <div className="px-40 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleBlogs.map((blog, index) => (
          <div
            key={index}
            className="rounded-xl shadow-md overflow-hidden border p-4 hover:shadow-xl transition"
          >
            <img
              src={blog.urlToImage || "https://via.placeholder.com/150"}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="font-bold text-lg mb-1">{blog.title}</h3>
            <p className="text-sm text-gray-700 mb-2">
              {blog.description?.substring(0, 100)}...
            </p>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>

      {/* Toggle button */}
      {blogs.length > 6 && (
        <button
          className="mt-4 home-button"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Load More"}
        </button>
      )}
    </div>
  );
}
