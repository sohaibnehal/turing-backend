const express = require('express');
const router = express.Router();
const departments = require('../routeHandlers/departments');

router.get('/', (req, res) => {
  departments.getAllDepartments(req, res);
});
router.get('/:id', (req, res) => {
  departments.getDepartmentById(req, res);
});

module.exports = router;
