const express = require("express");

import { createOrResumeTestMode, getMultipleChoices, startOrResumeSession } from "../controllers/userSessions.controller";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/create-or-resume", isAuthenticated,startOrResumeSession);

router.get("/start-test/:setId", isAuthenticated,createOrResumeTestMode);

router.get("/get-multiple-choices/:setId/:cardId", isAuthenticated,getMultipleChoices);

export default router;
