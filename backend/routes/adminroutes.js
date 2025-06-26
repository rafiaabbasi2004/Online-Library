//admin routes

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Book = require("../models/book");


// Get all users (Admin only)
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get all books (Admin only)
router.get("/books", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
});
// Delete user by ID (Admin only)
router.delete("/users/:id", authMiddleware, async (req, res) => {

  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }

});

// Delete book by ID (Admin only)
router.delete("/books/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book" });
  }
});


router.post("/books", async (req, res) => {
  try {
    console.log("📦 Incoming book request body:", req.body);  // <--- Add this

    const { title, author, description, category, image } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const newBook = new Book({
      title,
      author,
      description,
      category,
      image,
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error("🔥 Error adding book:", error.message);
    res.status(500).json({ error: "Internal server error while adding book" });
  }
});



module.exports = router;
