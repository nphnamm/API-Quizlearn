const express = require("express");
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, updateAccessToken } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/sign-up", registrationUser);
router.post("/activation", activateUser);
router.post('/login', loginUser);
router.get(
    '/logout',
    updateAccessToken,
    isAuthenticated,
    logoutUser
);
router.get('/me', updateAccessToken,isAuthenticated, getUserInfo)


export default router;
