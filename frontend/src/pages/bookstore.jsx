import { useEffect, useState } from "react";
import Topbar from "../components/topbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import SearchBar from "../components/searchbar";
import {useAuth} from "../AuthContext";

export default function Bookstore() {
  const { user, isLoggedIn, token } = useAuth();

  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]); 
  const [filteredBooks, setFilteredBooks] = useState([]); // filtered based on search
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all books and user's wishlist
  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setAllBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

  
  }, []);



  // Handle search and category filter
  const handleSearch = (query, category) => {
    const lowerQuery = query.toLowerCase();

    const filtered = allBooks.filter((book) => {
      const matchesCategory =
        category === "all" || book.category?.toLowerCase() === category;

      const matchesQuery =
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery);

      return matchesCategory && matchesQuery;
    });

    setFilteredBooks(filtered);
  };



//handle last read book
const markAsLastRead = async (bookId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/users/lastReadBook/${bookId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to update last read book");
    }
  } catch (err) {
    console.error("Error updating last read book:", err);
  }
};








  // Handle wishlist toggle
  const handleWishlistToggle = async (bookId) => {
  try {
    if (!token) {
      alert("Please log in to manage your wishlist.");
      return;
    }

    const isInWishlist = wishlist.includes(bookId);

    if (isInWishlist) {
      await axios.delete(`http://localhost:5000/api/users/wishlist/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(wishlist.filter((id) => id !== bookId));
    } else {
      await axios.post(
        `http://localhost:5000/api/users/wishlist/${bookId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlist([...wishlist, bookId]);
    }
  } catch (err) {
    console.log("Wishlist error", err);
  }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  

  return (
    <div className="store">
      <Topbar />
      <SearchBar onSearch={handleSearch} />
      <div className="bookstore-main grid grid-cols-5 gap-4 px-10 py-10">
        {filteredBooks.map((book) => (
          <div key={book._id} className="mb-10 flex flex-col items-center p-4">
            <div className="relative">
              <img
                src={book.image}
                alt={book.title}
                className="h-72 w-52 mb-2 object-cover rounded"
              />
              <button
                onClick={() => handleWishlistToggle(book._id)}
                className="absolute top-2 right-2 text-red-600 text-xl hover:cursor-pointer"
              >
                {wishlist.includes(book._id) ? <FaHeart /> : <FaRegHeart />}
              </button>
              <hr />
            </div>
            <h2 className="text-lg font-bold text-center">{book.title}</h2>
            <p className="text-sm text-gray-600 text-center">{book.author}</p>
            <p className="text-xs text-gray-500 text-center mb-2">
              {book.description}
            </p>
            <button
        className="home-button mt-2"
        onClick={() => {
            let url = book.eVersionLink;
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
              url = "http://" + url;
            }

            const newTab = window.open(url, "_blank", "noopener,noreferrer");
            if (!newTab) throw new Error("Pop-up blocked");

            if (token) {
              markAsLastRead(book._id); // ✅ cleaner
            }
          }}

      >
        Read Online
      </button>

          </div>
        ))}
      </div>
    </div>
  );
}
