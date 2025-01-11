const express = require("express");
import { activateUser, registrationUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/registration", registrationUser);
router.post("/activation", activateUser);

export default router;
