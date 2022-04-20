const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteProductReviews, getProductReviews, getAdminProducts } = require('../controllers/productController');
const { isAusthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/products')
    .get(getAllProducts);

router.route('/products/:id')
    .get(getProductDetails);

router.route('/admin/product/new')
    .post(isAusthenticatedUser, authorizeRoles("admin"), createProduct);

router.route('/admin/product/:id')
    .put(isAusthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAusthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route('/review')
    .put(isAusthenticatedUser, createProductReview);

router.route('/reviews')
    .get(getProductReviews)
    .delete(isAusthenticatedUser, deleteProductReviews);

router.route('/admin/products').get(isAusthenticatedUser, authorizeRoles("admin"), getAdminProducts);

module.exports = router;