const express = require('express');
const router = express.Router(); // ✅ this is correct
const Book = require('../models/book');
const authMiddleware = require('../middleware/auth');
// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new book (Admin only - for now no auth check)
router.post('/', async (req, res) => {
  try {
    const { title, author, description, eVersionLink } = req.body;
    const newBook = new Book({ title, author, description, eVersionLink });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Add new book (Admin only - for now no auth check)
router.post('/', async (req, res) => {
  try {
    console.log('Received book:', req.body);
    const { title, author, description, eVersionLink } = req.body;
    const newBook = new Book({ title, author, description, eVersionLink });
    await newBook.save();
    console.log('Book saved:', newBook);
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/users/:id/reading
router.put("/:id/reading", async (req, res) => {
  try {
    const { bookId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        lastReadBook: {
          book: bookId,
          lastReadAt: new Date(),
        },
      },
      { new: true }
    ).populate("lastReadBook.book");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating reading history" });
  }
});


module.exports = router;     // ✅ Correct
