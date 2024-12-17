const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json('Authentication required');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json('Invalid token');
    }
    req.user = decoded; // Attach user info to request object
    next();
  });
};

module.exports = authMiddleware;
