import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create New Order
// @route POST/api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  // Get data from request body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  // Check if orderItems is empty
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }
  // Create new order
  else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Save order
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Get Logged in User Orders
// @route GET/api/orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  // Get all orders for logged in user
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc Get order by ID
// @route GET/api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  // Get order by ID
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  // If order found, send order data as response
  if (order) {
    res.status(200).json(order);
  }
  // If order not found, send error response
  else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
// @route PUT/api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Get order by ID
  const order = await Order.findById(req.params.id);

  // If order found, update order data with values from request body (if provided)
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  }
  // If order not found, send error response
  else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to Delivered
// @route PUT/api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // Get order by ID
   const order = await Order.findById(req.params.id);

   // If order found, update order data
   if (order) {
     order.isDelivered = true;
     order.deliveredAt = Date.now();

     // Save order
     const updatedOrder = await order.save();

     // Send updated order data as response
     res.status(200).json(updatedOrder);
   }
    // If order not found, send error response
    else {
     res.status(404);
     throw new Error("Order not found");
   }

});

// @desc Get all orders
// @route GET/api/orders
// @access Private/admin
const getOrders = asyncHandler(async (req, res) => {
  // Get all orders
  const orders = await Order.find({}).populate("user", "id name");
  // If orders found, send orders data as response
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
