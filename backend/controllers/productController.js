const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({success: true, products});
});

exports.getProductsDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler("Product Not Found",404));
    }

    res.status(200).json({success: true, product})
});

// only ADMIN can create
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({success: true, product});
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler("Product Not Found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true, useFindAndModify: false});

    res.status(200).json({success: true, product});
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler("Product Not Found",404));
    }

    await product.remove();

    res.status(200).json({success: true, message: "Product Deleted Successfully"});
});