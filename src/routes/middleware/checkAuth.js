const jwt = require('jsonwebtoken');
require('dotenv').config();
const { AUTH_SALT } = process.env;

const checkAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(" ")[1];
  if (!token) {
    return res.status(401).json(
      { message: 'Unauthorized: No token provided' }
    );
  }

  jwt.verify(token, AUTH_SALT, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json(
        { message: 'Unauthorized: Invalid token' })
      ;
    }

    // Attach decoded user info to req object for further use
    req.user = decoded;
    const response = res.status(307).json('Auth checked!')
    next() || response;
  });
};

module.exports = { checkAuth };
