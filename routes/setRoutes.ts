const express = require("express");

import { createSet, getAllSets, getSetByFolderId, getSetByUserId } from "../controllers/set.controller";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/create-set", isAuthenticated,createSet);
router.get("/get-all-sets", isAuthenticated,getAllSets);
router.get("/get-sets-by-folderId/:id", isAuthenticated,getSetByFolderId);
router.get("/get-sets-by-userId",isAuthenticated,getSetByUserId);


export default router;
