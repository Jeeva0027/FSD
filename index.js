const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4004;

// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
