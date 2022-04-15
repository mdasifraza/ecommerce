const Orders = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Orders.create({ shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id });
    
    res.status(200).json({ success: true, order });
});


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

    res.status(200).json({ success: true, order });
});

//for admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const order = await Orders.find();

    let toatalAmount = 0;
    order.forEach((odr) => {
        toatalAmount += odr.totalPrice;
    })

    res.status(200).json({ success: true, toatalAmount, order });
});

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Orders.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 404));
    }

    order.orderItems.forEach(async (odr) => {
        await updateStock(odr.product, odr.quantity);
    })

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
};

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Orders.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    await order.remove();

    res.status(200).json({ success: true });
});