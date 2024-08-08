const generalService = require('../services/generalService');
const response = require('../utils/response');

exports.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        const { user, token } = await generalService.loginUser(identifier, password);
        return response(res, 200, 'Login successful', { user, token });
    } catch (err) {
        return response(res, 400, err.message);
    }
};

exports.logout = async (req, res, next) => {
    try {
      const { identifier } = req.body;
      const token = req.headers['x-token'];
      await generalService.logoutUser(identifier, token);
      return response(res, 200, 'Logout successful');
    } catch (err) {
      return response(res, 400, err.message);
    }
  };