const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifeatures');
const cloudinary = require('cloudinary');

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    // return next (new ErrorHandler("this is temp check error",500));
    // console.log(req.query)
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeature.query.clone();

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });

    // const resultPerPage = 8;
    // const productsCount = await Product.countDocuments();
    // const apiFeature = new ApiFeatures(Product.find(), req.query)
    //     .search()
    //     .filter()
    //     .pagination(resultPerPage);
    // // const products = await Product.find();
    // const products = await apiFeature.query;
    // // console.log({apiFeature, products})
    // res.status(200).json({ success: true, products, productsCount });
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({ success: true, product })
});

exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }
        });
    } else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    })
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({ success: true })
});

exports.getProductReviews = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({ success: true, reviews: product.reviews })
});

exports.deleteProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.reviewId.toString());

    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating;
    });

    let ratings = 0;
    let numberOfReviews = 0;
    if (reviews.length !== 0) {
        ratings = avg / reviews.length;
        numberOfReviews = reviews.length;
    }

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numberOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );
    res.status(200).json({ success: true })
});


// only ADMIN can create, update and delete products all the below functions
exports.createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];

    if (typeof (req.body.images) === "string") {
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    //handling images
    let images = [];

    if (typeof (req.body.images) === "string") {
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    }

    if (images != undefined) {
        //deleting images from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(
                product.images[i].public_id
            );
        }

        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            })
        }
        req.body.images = imagesLink;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });

    res.status(200).json({ success: true, product });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    //deleting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(
            product.images[i].public_id
        );
    }

    await product.remove();

    res.status(200).json({ success: true, message: "Product Deleted Successfully" });
});

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
});