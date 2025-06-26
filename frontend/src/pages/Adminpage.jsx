import { useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({
  title: "",
  author: "",
  description: "",
  category: "",
  image: "", // or image file if using upload
});

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Redirect to login page
};


const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  
    console.log(res.data); // ✅ Should show users
    setUsers(res.data);    // ✅ Save users into state
    setShowUsers(true);    // ✅ Show users section
    setShowBooks(false);
    setShowAddBook(false);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};


const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/admin/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data); // ✅ Should show books
      setBooks(res.data);    // ✅ Save books into state
      setShowBooks(true);    // ✅ Show books section
      setShowUsers(false);
      setShowAddBook(false);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000s/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBooks(prev => prev.filter(book => book._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full bg-amber-600 flex items-center justify-between p-4 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Page</h2>
        <button onClick={logout} className="home-button ml-4">
          Logout
        </button>
      </div>
      <p className="text-lg text-gray-700 mb-4 font-bold my-3">Welcome to the Admin Dashboard</p>

      <div className="bg-white p-8 rounded shadow-2xl min-w-4/5 flex flex-row items-center justify-center gap-4">
        <button onClick={fetchUsers} className="home-button mt-4">See Users</button>
        <button onClick={fetchBooks} className="home-button mt-4">Available Books</button>
        <button onClick={() => {
          setShowAddBook(true);
          setShowUsers(false);
          setShowBooks(false);
        }} className="home-button mt-4">Add New Book</button>
      </div>

      {/* Users List */}
      {showUsers && (
        <div className="bg-white mt-6 p-6 rounded shadow w-4/5">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul className="space-y-2">
              {users.map(user => (
                <li key={user._id} className="border-b pb-2 flex justify-between items-center">
                  <div>
                    <p className="text-black"><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                  <button onClick={() => deleteUser(user._id)} className="text-red-500 font-semibold hover:underline">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Books List */}
      {showBooks && (
        <div className="bg-white mt-6 p-6 rounded shadow w-4/5">
          <h2 className="text-xl font-semibold mb-4">Available Books</h2>
          {books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            <ul className="space-y-2">
              {books.map(book => (
                <li key={book._id} className="border-b pb-2 flex justify-between items-center">
                  <div>
                    <p><strong>Title:</strong> {book.title}</p>
                    <p><strong>Author:</strong> {book.author}</p>
                  </div>
                  <button onClick={() => deleteBook(book._id)} className="text-red-500 font-semibold hover:underline">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Add Book Placeholder */}
      {showAddBook && (
        <div className="bg-white mt-6 p-6 rounded shadow w-4/5">
  <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post("http://localhost:5000/api/admin/books", newBook, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Book added successfully!");
        setNewBook({ title: "", author: "", description: "", category: "", image: "" });
        setBooks((prev) => [...prev, res.data]);
        setShowBooks(true);
        setShowAddBook(false);
      } catch (err) {
        console.error("Error adding book:", err);
        alert("Failed to add book");
      }
    }}
    className="space-y-4"
  >
    <input
      type="text"
      placeholder="Title"
      value={newBook.title}
      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
      className="w-full p-2 border rounded"
      required
    />
    <input
      type="text"
      placeholder="Author"
      value={newBook.author}
      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
      className="w-full p-2 border rounded"
      required
    />
    <textarea
      placeholder="Description"
      value={newBook.description}
      onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
      className="w-full p-2 border rounded"
    />
    <input
      type="text"
      placeholder="Category"
      value={newBook.category}
      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
      className="w-full p-2 border rounded"
    />
    <input
      type="text"
      placeholder="Image URL (for now)"
      value={newBook.image}
      onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
      className="w-full p-2 border rounded"
    />
    <button type="submit" className="home-button mt-4">
      Submit Book
    </button>
  </form>
</div>

      )}
    </div>
  );
}
