const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler')

exports.getAllProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({success: true, products});
}

exports.getProductsDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    // if(!product) {
    //     return res.status(500).json({success: false, message: 'Product not found'});
    // }
    if(!product) {
        return next(new ErrorHandler);
    }

    res.status(200).json({success: true, product})
} 

// only ADMIN can create
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({success: true, product});
}

exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({success: false, message: 'Product not found'});
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true, useFindAndModify: false});

    res.status(200).json({success: true, product});
}

exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({success: false, message: 'Product not found'});
    }

    await product.remove();

    res.status(200).json({success: true, message: "Product Deleted Successfully"});
}