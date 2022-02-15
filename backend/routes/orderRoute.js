const express = require('express');
const { isAusthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders } = require('../controllers/orderController');

const router = express.Router();

router.route('/order/new').post(isAusthenticatedUser, newOrder);
router.route('/order/me').get(isAusthenticatedUser, myOrders);
router.route('/order/:id').get(isAusthenticatedUser, authorizeRoles("admin"), getSingleOrder);

module.exports = router;