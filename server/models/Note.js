import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    subject: {
      type: String,
      required: [true, "Please add a subject"],
    },
    description: {
      type: String,
    },
    file: {
      type: String,
      required: [true, "Please upload a file"],
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
