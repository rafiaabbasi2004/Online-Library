const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userroutes");
const bookRoutes = require("./routes/bookRoutes");
const adminRoutes = require("./routes/adminroutes");

// Middleware to serve static files from the "uploads" directory
app.use(express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth", authRoutes); // for login/register
app.use("/api/users", userRoutes); // for wishlist, me, etc.
app.use("/api/books", bookRoutes); // if you have book-related APIs
app.use("/api/admin", adminRoutes); // for admin-related APIs

// After other app.use() calls
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple route
app.get('/', (req, res) => {
  res.send('Library Tracker API running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
