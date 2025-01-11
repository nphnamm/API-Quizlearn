const express = require("express");
import { registrationUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/registration", registrationUser);

export default router;
