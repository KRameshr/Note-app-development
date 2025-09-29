import React, { useState, useRef } from "react";
import API from "../api";

const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ref for file input to reset it
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("description", description);
      if (file) formData.append("file", file);

      const res = await API.post("/notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setTitle("");
      setSubject("");
      setDescription("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      if (onNoteAdded) onNoteAdded(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTitle("");
    setSubject("");
    setDescription("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-body">
        <h5 className="card-title text-center mb-4">Add a New Note</h5>
        <form onSubmit={handleSubmit}>
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
              rows={3}
            />
          </div>

          <div className="mb-4" style={{ maxWidth: "300px" }}>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileInputRef}
            />
          </div>

          <div className="d-flex flex-row gap-2 justify-content-start flex-wrap">
            <button
              type="submit"
              className="btn btn-primary text-center"
              disabled={loading}
              style={{
                height: "36px",
                flex: "1 1 auto",
                minWidth: "90px",
                maxWidth: "130px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
              }}
            >
              {loading ? "Saving..." : "Add Note"}
            </button>

            <button
              type="button"
              className="btn btn-secondary text-center"
              style={{
                height: "36px",
                flex: "1 1 auto",
                minWidth: "90px",
                maxWidth: "130px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
              }}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>

          {error && (
            <p className="text-danger mt-3 text-center small">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
