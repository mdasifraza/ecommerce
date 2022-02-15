const Orders = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Orders.create({ shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id });

    res.status(200).json({ success: true, order });
});

// admin only
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Orders.findById(req.params.id).populate("user", "name email");
    // const order = await Orders.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    res.status(200).json({ success: true, order });
});

//for user specific order details
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const order = await Orders.find({ user: req.user._id });

    // if (!order) {
    //     return next(new ErrorHandler("Order not found with this id", 404));
    // }

    res.status(200).json({ success: true, order });
})