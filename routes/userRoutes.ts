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
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
import { upload } from "../middleware/multer";
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
  upload.single("avatar"),
  isAuthenticated,
  updateProfilePicture
);
router.post("/social-auth", socialAuth);

router.post("/forgot-password", forgotPassword);

router.post("/verify-forgot-password", verifyForgotPassword);

// Admin

// get all users
// router.get("/admin/users", isAuthenticated, authorizeRoles("admin"), getAllUsers);

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
