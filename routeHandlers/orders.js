const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
  try {
    let orders = await Order.find({});
    res.status(200).json({
      message: 'Orders have been fetched successfully',
      data: orders
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};

exports.getOrderById = async (req, res) => {
  if (req.params.id) {
    try {
      let order = await Order.findById(req.params.id);
      res.status(200).json({
        message: 'Order has been fetched successfully',
        data: order
      });
    } catch (err) {
      res.status(404).json({
        message: err
      });
    }
  } else {
    res.status(400).json({
      message: 'Order ID is required'
    });
  }
};

exports.getOrdersByCustomerId = async (req, res) => {
  if (req.params.id) {
    try {
      let orders = await Order.find({ userId: req.params.id });
      res.status(200).json({
        message: 'Orders have been fetched successfully',
        data: orders
      });
    } catch (err) {
      res.status(404).json({
        message: err
      });
    }
  } else {
    res.status(400).json({
      message: 'User ID is required'
    });
  }
};

exports.deleteOrder = async (req, res) => {
  if (req.params.id) {
    try {
      let order = await Order.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: 'Order has been deleted successfully'
      });
    } catch (err) {
      res.status(404).json({
        message: err
      });
    }
  } else {
    res.status(400).json({
      message: 'Order ID is required'
    });
  }
};

exports.createOrder = async (req, res) => {
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
      res.status(200).json({
        message: 'Order has been created successfully',
        data: order
      });
    } catch (err) {
      res.status(404).json({
        message: err
      });
    }
  } else {
    res.status(400).json({
      message: 'Items or shipping cant be empty'
    });
  }
};
