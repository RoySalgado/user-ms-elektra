const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginUser = async (identifier, password) => {
  const user = await getUserByUsernameOrPhone(identifier);
  if (!user) {
    throw new Error('Invalid username or phone number');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }

  const token = generateToken(user);
  user.tokens.push(token);
  await user.save();
  
  return { user, token };
};

const logoutUser = async (identifier, token) => {
  const user = await getUserByUsernameOrPhone(identifier);
  if (!user) {
    throw new Error('User not found');
  }

  user.tokens = user.tokens.filter(t => t !== token);
  await user.save();
};

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });
};

const getUserByUsernameOrPhone = async (identifier) => {
  const user = await User.findOne({
    $or: [{ username: identifier }, { phoneNumber: identifier }],
  });
  return user;
};

module.exports = {
  getUserByUsernameOrPhone,
  generateToken,
  loginUser,
  logoutUser,
};
