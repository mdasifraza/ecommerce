const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsersForAdmin, getSingleUserDetailsForAdmin, updateUserRoleForAdmin, deleteUserForAdmin } = require('../controllers/userController');
const { isAusthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAusthenticatedUser, getUserDetails);
router.route("/password/update").put(isAusthenticatedUser, updatePassword);
router.route("/me/update").put(isAusthenticatedUser, updateProfile);
router.route("/admin/users").get(isAusthenticatedUser, authorizeRoles("admin"), getAllUsersForAdmin);
router.route("/admin/user/:id").get(isAusthenticatedUser, authorizeRoles("admin"), getSingleUserDetailsForAdmin).put(isAusthenticatedUser, authorizeRoles("admin"), updateUserRoleForAdmin).delete(isAusthenticatedUser, authorizeRoles("admin"), deleteUserForAdmin);

module.exports = router;