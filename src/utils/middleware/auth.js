const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const secret = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  const token = req.headers['x-token'];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);

    if (!user || !user.tokens.includes(token)) {
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token is invalid or expired' });
  }
};

module.exports = authenticateToken;
