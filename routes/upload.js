const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('cover'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

module.exports = router;
