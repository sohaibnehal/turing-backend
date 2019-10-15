const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
process.env.MY_SECRET =
  process.env.MY_SECRET || '33FA3EF5ABD634AB4E12F95C49415';

exports.createUser = async (req, res) => {
  if (req.body.email && req.body.username && req.body.password) {
    try {
      const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      };
      try {
        let user = await new User(userData).save();
        const token = generateToken({ _id: user._id, ...userData });
        res.status(200).json({
          message: 'User logged in successfully',
          token
        });
      } catch (err) {
        res.status(404).json({
          message:
            'Email and username should be unique. We already have a user registered with same username/email'
        });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Email, username and password cant be empty' });
  }
};

exports.authenticate = async (req, res) => {
  if (req.body.username && req.body.password) {
    try {
      let user = await User.findOne({
        $or: [{ email: req.body.username }, { username: req.body.username }]
      }).exec();
      if (user) {
        let result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = generateToken({
            _id: user._id,
            email: user.email,
            username: user.username
          });
          res.status(200).json({
            message: 'User logged in successfully',
            token
          });
        } else {
          res.status(400).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(400).json({ message: 'User not found.' });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Email, username and password cant be empty' });
  }
};

const generateToken = user => {
  return jwt.sign({ ...user }, process.env.MY_SECRET, {
    expiresIn: '12h'
  });
};
