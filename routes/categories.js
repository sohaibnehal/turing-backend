const express = require('express');
const router = express.Router();
const categories = require('../routeHandlers/categories');

router.get('/', (req, res) => {
  categories.getAllCategories(req, res);
});
router.get('/:id', (req, res) => {
  categories.getCategoryById(req, res);
});
router.get('/department/:id', (req, res) => {
  categories.getCategoryByDepartmentId(req, res);
});

module.exports = router;
