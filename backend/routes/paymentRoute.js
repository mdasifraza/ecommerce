const express = require('express');
const { isAusthenticatedUser } = require('../middleware/auth');
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController')

const router = express.Router();

router.route("/payment/process").post(isAusthenticatedUser, processPayment);
router.route("/stripeapikey").post(isAusthenticatedUser, sendStripeApiKey);

module.exports = router;