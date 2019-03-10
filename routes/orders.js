const express = require('express');
const router = express.Router();
const orders = require('../routeHandlers/orders');

router.get('/', (req, res) => {
  orders.getAllOrders(req, res);
});
router.get('/:id', (req, res) => {
  orders.getOrderById(req, res);
});
router.post('/', (req, res) => {
  orders.createOrder(req, res);
});
router.put('/:id', (req, res) => {
  orders.updateOrder(req, res);
});
router.delete('/:id', (req, res) => {
  orders.deleteOrder(req, res);
});
router.get('/customer/:id', (req, res) => {
  orders.getOrdersByCustomerId(req, res);
});

module.exports = router;
