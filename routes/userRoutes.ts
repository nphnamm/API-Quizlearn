const express = require("express");
import { activateUser, loginUser, registrationUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/registration", registrationUser);
router.post("/activation", activateUser);


router.post('/login', loginUser);


export default router;
