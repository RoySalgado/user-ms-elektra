const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 40 },
  lastName: { type: String, required: true, maxlength: 40 },
  middleName: { type: String, maxlength: 40 },
  phoneNumber: { type: String, required: true, length: 10 },
  email: { type: String, maxlength: 40 },
  username: { type: String, required: true, maxlength: 30 },
  password: { type: String, required: true, maxlength: 100 },
  tokens: [{ type: String }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
