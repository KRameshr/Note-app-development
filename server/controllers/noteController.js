import Note from "../models/Note.js";
import fs from "fs";
import path from "path";

//  Create a note
export const createNote = async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    if (!req.file) return res.status(400).json({ message: "File is required" });
    console.log(
      "Saving file to:",
      path.join(path.resolve(), "uploads", req.file.filename)
    );
    const note = await Note.create({
      user: req.user.id,
      title,
      subject,
      description,
      file: req.file.filename,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Download note file
export const downloadNoteFile = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    const filePath = path.join(path.resolve(), "uploads", note.file);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found on server",
        file: note.file,
        path: filePath,
      });
    }
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    // Only owner can update
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const { title, subject, description } = req.body || {};
    note.title = title || note.title;
    note.subject = subject || note.subject;
    note.description = description || note.description;
    if (req.file) {
      const oldFilePath = path.join(path.resolve(), "uploads", note.file);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
      note.file = req.file.filename;
    }
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const filePath = path.join(path.resolve(), "uploads", note.file);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await note.deleteOne();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
