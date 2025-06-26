import { useEffect, useState } from "react";
import Topbar from "../components/topbar";
import logo from "../assets/logo.png";
import { useAuth } from "../AuthContext";

export default function Profilepage() {
  const { token, isLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  const fetchUserData = () => {
    fetch("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleRemoveWishlist = async (bookId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/wishlist/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove from wishlist");

      // Update UI locally after successful deletion
      setUserData((prev) => ({
        ...prev,
        wishlist: prev.wishlist.filter((book) => book._id !== bookId),
      }));
    } catch (err) {
      console.error("Remove wishlist error:", err);
      alert("Error removing book from wishlist");
    }
  };

  if (!isLoggedIn || loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!userData) return <p className="text-center mt-10">Unable to load profile.</p>;
console.log("User Data:", userData);

  return (
    
    <div className="profilepage">
      <Topbar />
      <div className="profile-container my-20 min-h-screen w-4/6 shadow-2xl rounded-2xl mx-auto p-8 bg-white">
        <div className="headsection flex flex-row gap-10 justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="border-gray-500 rounded-full w-28 h-28"
          />
          <div className="nameside flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <h3 className="text-gray-600">{userData.email}</h3>
          </div>
        </div>

        <hr className="my-10"/>




        <div className="below mt-10 ml-10">
          <h2 className="text-3xl font-bold mb-4">Continue Reading..</h2>
         {userData.lastReadBook?.book ? (
          <div className="book-continue flex gap-4 items-center">
            <img
              src={userData.lastReadBook.book.image}
              alt={userData.lastReadBook.book.title}
              className="w-24 h-32 object-cover rounded shadow"
            />
            <div>
              <h2 className="text-lg text-black font-semibold">{userData.lastReadBook.book.title}</h2>
              <p className="text-sm text-gray-600">{userData.lastReadBook.book.author}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No recent book found.</p>
        )}

        </div>







        <div className="wishlist mt-10 ml-10">
          <h2 className="text-3xl font-bold mb-4">My Wishlist</h2>
          {userData.wishlist && userData.wishlist.length > 0 ? (
            <div className="grid grid-cols-5 gap-6">
              {userData.wishlist.map((book) => (
                <div key={book._id} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded shadow"
                  />
                  <h3 className="mt-2 text-lg font-semibold text-center">
                    {book.title}
                  </h3>
                  <button
                    onClick={() => handleRemoveWishlist(book._id)}
                    className="remove-wishlist-button"
                  >
                    Remove
                  </button>
                  <button
        className="wishilist-read-button mt-2"
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
        Read 
      </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No books in wishlist.</p>
          )}
        </div>
      </div>
    </div>
  );
}
