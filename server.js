const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

// Initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4004;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', require('./routes/auth'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/uploads', require('./routes/upload'));

// Connect to MongoDB and Start Server

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Database connection error:', err));

