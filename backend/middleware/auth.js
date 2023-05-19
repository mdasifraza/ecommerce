const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAusthenticatedUser = catchAsyncError(async (req, res, next) => {
    // const { token } = req.cookie;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(authHeader, token)
    if (!token) {
        return next(new ErrorHandler("Please Login To Access This Resource"), 401);
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not authorized to access this resource`, 403));
        }
        next();
    };
};
