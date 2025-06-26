const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

// ✅ GET /api/users/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate("wishlist")
      .populate({ path: "lastReadBook.book" }); 
    res.json(user);
    console.log(user);

  } catch (err) {
    res.status(500).json({ message: "Error fetching user info" });
  }
});

// ✅ POST /api/users/lastReadBook/:bookId
router.post("/lastReadBook/:bookId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.lastReadBook = {
      book: req.params.bookId,
      lastReadAt: new Date(),
    };
      console.log("Saving lastReadBook:", user.lastReadBook);
    await user.save();
    res.json({ message: "Last read book updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error updating last read book" });
  }
});

// ✅ POST /api/users/wishlist/:bookId
router.post("/wishlist/:bookId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user.wishlist.includes(req.params.bookId)) {
      user.wishlist.push(req.params.bookId);
      await user.save();
    }
    res.json({ message: "Book added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Error adding to wishlist" });
  }
});

// ✅ DELETE /api/users/wishlist/:bookId
router.delete("/wishlist/:bookId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.bookId
    );
    await user.save();
    res.json({ message: "Book removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Error removing from wishlist" });
  }
});



module.exports = router;
