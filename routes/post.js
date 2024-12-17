const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(posts);
});

// Get single post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username');
  res.json(post);
});

// Create a new post
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, cover } = req.body;
  try {
    const post = await Post.create({ title, content, cover, author: req.user.id });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
