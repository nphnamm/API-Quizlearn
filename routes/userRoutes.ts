const express = require("express");
import {
  activateUser,
  forgotPassword,
  getUserInfo,
  loginUser,
  logoutUser,
  refreshToken,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  verifyForgotPassword,
  getAllUsers,
} from "../controllers/user.controller";
import { isAuthenticated, authorizeAdminRole } from "../middleware/auth";
const router = express.Router();

router.post("/sign-up", registrationUser);
router.post("/activation", activateUser);
router.post("/login", loginUser);
router.get("/logout", updateAccessToken, isAuthenticated, logoutUser);
router.get("/me", updateAccessToken, isAuthenticated, getUserInfo);
router.get("/refresh", refreshToken);

router.put(
  "/update-user-info",
  updateAccessToken,
  isAuthenticated,
  updateUserInfo
);
router.put(
  "/update-user-password",
  updateAccessToken,
  isAuthenticated,
  updatePassword
);
router.put(
  "/update-profile-picture",
  isAuthenticated,
  updateProfilePicture
);
router.post("/social-auth", socialAuth);

router.post("/forgot-password", forgotPassword);

router.post("/verify-forgot-password", verifyForgotPassword);

// Admin

//get all users
router.patch("/admin/users",  authorizeAdminRole, getAllUsers);

// update user role
// router.put(
//   "/admin/user/:id",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   updateUserRole
// );

// delete user
// router.delete(
//   "/admin/user/:id",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   deleteUser
// );



export default router;
