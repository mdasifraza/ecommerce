const express = require('express');
const { isAusthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { newOrder } = require('../controllers/orderController');

const router = express.Router();

router.route('/order/new').post(isAusthenticatedUser, newOrder);

module.exports = router;