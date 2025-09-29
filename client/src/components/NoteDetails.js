import React, { useState } from "react";
import API from "../api";

const NoteDetails = ({ note, onNoteUpdated, onNoteDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [subject, setSubject] = useState(note.subject);
  const [description, setDescription] = useState(note.description);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("description", description);
      if (file) formData.append("file", file);

      const res = await API.put(`/notes/${note._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onNoteUpdated(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await API.delete(`/notes/${note._id}`);
      onNoteDeleted(note._id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/uploads/${fileName}`
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download file");
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      {isEditing ? (
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </div>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="d-flex flex-row gap-2 flex-wrap">
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={loading}
                style={{
                  flex: "1 1 auto", // allows shrinking
                  minWidth: "80px", // minimum width on small screens
                  maxWidth: "150px", // maximum width on large screens
                  height: "30px",
                  fontSize: "0.85rem", // slightly smaller text
                }}
              >
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{
                  flex: "1 1 auto",
                  minWidth: "80px",
                  maxWidth: "150px",
                  height: "30px",
                  fontSize: "0.85rem",
                }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-baseline mb-2">
            <h5 className="card-title text-truncate mb-1 mb-md-0">
              {note.title}
            </h5>
            <small className="text-muted mt-1 mt-md-0">
              {note.updatedAt
                ? `Updated: ${formatDate(note.updatedAt)}`
                : `Created: ${formatDate(note.createdAt)}`}
            </small>
          </div>
          <p className="mb-1">
            <strong>Subject:</strong> {note.subject}
          </p>
          <p>{note.description}</p>
          <div
            className="d-flex flex-row gap-2 mt-2"
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            {note.file && (
              <>
                <a
                  href={`${process.env.REACT_APP_API_BASE_URL}/uploads/${note.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary"
                  style={{
                    flex: "0 0 auto",
                    fontSize: "0.75rem",
                    width: "70px",
                    height: "28px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  View File
                </a>

                <button
                  className="btn btn-sm btn-primary"
                  style={{
                    flex: "0 0 auto",
                    width: "70px",
                    height: "28px",
                    fontSize: "0.7rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleDownload(note.file)}
                >
                  Download
                </button>
              </>
            )}

            <button
              className="btn btn-success btn-sm"
              style={{
                flex: "0 0 auto",
                width: "50px",
                height: "28px",
                fontSize: "0.7rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              style={{
                flex: "0 0 auto",
                width: "60px",
                height: "28px",
                fontSize: "0.7rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetails;
