const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')('sk_test_51LheYxSJSo8OZyhVhUVpZ1RU80TlCW9l2oW4wRBDuKM6dSVMlvBsDiNossP6GsyA3EQP2kEIXfjqqfU0dMTQreWF002Z9V7tRB');;

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
    res.status(200).json({ stripeKey: process.env.STRIPE_API_KEY });
});