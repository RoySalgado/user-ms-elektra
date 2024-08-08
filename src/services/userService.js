const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
  const existingUser = await User.findOne({
    $or: [{ username: userData.username }, { phoneNumber: userData.phoneNumber }],
  });

  if (existingUser) {
    throw new Error('Username or phone number already exists');
  }

  userData.password = await bcrypt.hash(userData.password, 10);
  const user = new User(userData);
  await user.save();
  return user;
};


const getUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const users = await User.find().skip(skip).limit(limit);
  const totalUsers = await User.countDocuments();
  return {
    users,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  };
};

module.exports = {
  createUser,
  getUsers,
};
