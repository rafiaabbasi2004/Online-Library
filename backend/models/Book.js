
const e = require("cors");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  image: { type: String }, 
  eVersionLink: { type: String },
  category: { type: String, enum: ["Fiction","Non-fiction", "Adventure","Drama", "Dystopian","Satire","Philosophy","Historical Fiction", "Classic", "Romance", "Fantasy"], default: "Fiction" },

});

module.exports = mongoose.model("Book", bookSchema);
