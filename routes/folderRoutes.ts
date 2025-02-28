const express = require("express");

import { createFolder, getAllFolders, getFolderByUserId } from "../controllers/folder.controller";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/create-folder", isAuthenticated,createFolder);
router.get("/get-all-folders", isAuthenticated,getAllFolders);
router.get("/get-folders-by-userId", isAuthenticated,getFolderByUserId);

export default router;
