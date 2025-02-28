import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import db from "../models/index";

const Folder = db.Folder;

// Create Folder
export const createFolder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, userId, isPublic } = req.body;

      if (!name) {
        return next(new ErrorHandler("Folder name is required", 400));
      }

      const newFolder = await Folder.create({
        name,
        description,
        userId,
        isPublic,
      });

      res.status(201).json({
        success: true,
        folder: newFolder,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get all Folders
export const getAllFolders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const folders = await Folder.findAll();
      res.status(200).json({ success: true, folders });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get Folder by ID
export const getFolderById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const folder = await Folder.findByPk(id);

      if (!folder) {
        return next(new ErrorHandler("Folder not found", 404));
      }

      res.status(200).json({ success: true, folder });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Update Folder
export const updateFolder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const folder = await Folder.findByPk(id);

      if (!folder) {
        return next(new ErrorHandler("Folder not found", 404));
      }

      folder.name = name || folder.name;
      await folder.save();

      res.status(200).json({ success: true, folder });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete Folder
export const deleteFolder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const folder = await Folder.findByPk(id);

      if (!folder) {
        return next(new ErrorHandler("Folder not found", 404));
      }

      await folder.destroy();

      res.status(200).json({ success: true, message: "Folder deleted" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
