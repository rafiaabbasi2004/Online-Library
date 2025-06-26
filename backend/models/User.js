const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  // New fields
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
  
  
  lastReadBook: {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    lastReadAt: { type: Date, default: Date.now },
  },
  role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user'
}
});

module.exports = mongoose.model("User", UserSchema);
