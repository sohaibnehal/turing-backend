const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Verify the token
    jwt.verify(req.headers.token, '33FA3EF5ABD634AB4E12F95C49416');
    // Append the payload of user details to the request
    req.user = jwt.decode(req.headers.token);
    next();
  } catch (err) {
    res.status(401).json({
      message:
        'Authorization failed! Please make sure your are logged in and have access to this resource!'
    });
  }
};
