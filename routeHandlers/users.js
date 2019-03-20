const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
process.env.MY_SECRET = '33FA3EF5ABD634AB4E12F95C49415';

exports.createUser = async (req, res) => {
  if (req.body.email && req.body.username && req.body.password) {
    try {
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      };
      let user = await new User(userData).save();
      res.status(201).json({
        message: 'User has been created successfully',
        data: user
      });
    } catch (err) {
      sendError(err, 404);
    }
  } else {
    sendError('Email, username and password cant be empty', 400);
  }
};

exports.authenticate = async (req, res) => {
  if ((req.body.email || req.body.username) && req.body.password) {
    try {
      let user = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }]
      }).exec();
      if (user) {
        let result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = jwt.sign({ ...user }, process.env.MY_SECRET, {
            expiresIn: '12h'
          });
          res.status(200).json({
            message: 'User logged in successfully',
            data: { token }
          });
        } else {
          sendError('Incorrect password', 400);
        }
      } else {
        sendError('User not found.', 400);
      }
    } catch (err) {
      sendError(err, 404);
    }
  } else {
    sendError('Email, username and password cant be empty', 400);
  }
};

const sendError = (message, code) => {
  res.status(code).json({ message });
};
