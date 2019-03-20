const express = require('express');
const router = express.Router();
const user = require('../routeHandlers/users');

router.post('/', (req, res) => {
  user.createUser(req, res);
});

router.post('/signin', (req, res) => {
  user.authenticate(req, res);
});

module.exports = router;
