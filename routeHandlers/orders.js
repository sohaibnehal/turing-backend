const logger = require('../config/Logger/logger');
const Order = require('../models/Order');

// Error handling
const sendError = (err, res) => {
  let response = { ...responseObj };
  response.status = 501;
  response.message = typeof err === 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let responseObj = {
  status: 200,
  data: [],
  message: null
};

exports.getAllOrders = async (req, res) => {
  let response = { ...responseObj };
  try {
    let orders = await Order.find({});
    response.data = orders;
    response.message = 'Orders have been fetched successfully';
    res.json(response);
  } catch (err) {
    sendError({ message: err }, res);
  }
};

exports.getOrderById = async (req, res) => {
  let response = { ...responseObj };
  if (req.params.id) {
    try {
      let order = await Order.findById(req.params.id);
      response.data = order;
      response.message = 'Order have been fetched successfully';
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'Order ID is required' }, res);
  }
};

exports.getOrdersByCustomerId = async (req, res) => {
  let response = { ...responseObj };
  if (req.params.id) {
    try {
      let order = await Order.find({ userId: req.params.id });
      response.data = order;
      response.message = 'Orders have been fetched successfully';
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'User ID is required' }, res);
  }
};

exports.deleteOrder = async (req, res) => {
  let response = { ...responseObj };
  if (req.params.id) {
    try {
      let order = await Order.deleteOne({ _id: req.params.id });
      res.message = 'Order has been deleted successfully';
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'Order ID is required' }, res);
  }
};

exports.createOrder = async (req, res) => {
  let response = { ...responseObj };
  if (req.body.items && req.body.shippingId) {
    try {
      let order = await new Order({
        totalAmount: req.body.totalAmount,
        shippedOn: new Date(),
        status: 'Pending',
        comments: req.body.comments || '',
        shippingId: req.body.shippingId,
        items: req.body.items
      }).save();
      res.message = 'Order has been created successfully';
      res.data = order;
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'Items or shipping cant be empty' }, res);
  }
};
