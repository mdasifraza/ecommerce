const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductsDetails } = require('../controllers/productController');
const { isAusthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/new').post(isAusthenticatedUser, authorizeRoles("admin"), createProduct);
router.route('/product/:id').put(isAusthenticatedUser, authorizeRoles("admin"), updateProduct).delete(isAusthenticatedUser, authorizeRoles("admin"), deleteProduct).get(getProductsDetails);

module.exports = router;