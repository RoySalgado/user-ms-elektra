const Joi = require('joi');
const userService = require('../services/userService');
const response = require('../utils/response');

const userSchema = Joi.object({
  firstName: Joi.string().max(40).pattern(/^[a-zA-Z\s]+$/).required(),
  lastName: Joi.string().max(40).pattern(/^[a-zA-Z\s]+$/).required(),
  middleName: Joi.string().max(40).pattern(/^[a-zA-Z\s]+$/),
  phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  email: Joi.string().max(40).email(),
  username: Joi.string().max(30).pattern(/^[a-zA-Z0-9]+$/).required(),
  password: Joi.string().max(20).required(),
});

exports.createUser = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return response(res, 400, error.details[0].message);

    const newUser = await userService.createUser(req.body);
    return response(res, 201, 'User created successfully', newUser);
  } catch (err) {
    if (err.message === 'Username or phone number already exists') {
      return response(res, 400, err.message);
    }
    next(err);
  }
};


exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await userService.getUsers(Number(page), Number(limit));
    return response(res, 200, 'Users retrieved successfully', users);
  } catch (err) {
    next(err);
  }
};
