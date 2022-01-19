const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //mongodb error handler
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //duplicate key error message
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} entered already in use`;
        err = new ErrorHandler(message, 400);
    }

    //jwt error handler
    if (err.name === "JsonWebTokenError") {
        const message = `JsonWebToken is invalid, please try again`;
        err = new ErrorHandler(message, 400);
    }

    //jwt expire error handler
    if (err.name === "TokenExpiredError") {
        const message = `JsonWebToken is expired, please try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({ success: false, message: err.message });
}