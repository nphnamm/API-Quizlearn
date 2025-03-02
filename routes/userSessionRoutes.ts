const express = require("express");

import { startOrResumeSession } from "../controllers/userSessions.controller";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/create-or-resume", isAuthenticated,startOrResumeSession);


export default router;
