const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')('sk_test_51Kko5qSHCOf5EWCQLEgoW3RlQJYtKtBcvfgV93ANrnuj5VNAZ6FiruQG5eQNuOXp2mK8MMp30FO9lTw7NaSH0k5n00EUSb0oOR');

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "Ecommerce"
        }
    });
    
    res.status(200).json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});