import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  downloadNoteFile,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("file"), createNote);
router.get("/", protect, getNotes);
router.get("/:id", getNoteById);
router.get("/:id/download", protect, downloadNoteFile);
router.put("/:id", protect, upload.single("file"), updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
