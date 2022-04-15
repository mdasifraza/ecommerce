const express = require('express');
const { isAusthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.route('/order/new').post(isAusthenticatedUser, newOrder);
router.route('/orderdetail/:id').get(isAusthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAusthenticatedUser, myOrders);
router.route('/admin/orders').get(isAusthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route('/admin/order/:id')
    .put(isAusthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAusthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;