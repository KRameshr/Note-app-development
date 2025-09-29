import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const Dashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user notes
  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  const handleNoteAdded = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  const handleNoteDeleted = (id) => {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-3">
        <h1
          className="text-center mb-4 fw-bold"
          style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
        >
          Welcome, {user?.username || "User"} 👋
        </h1>

        {/* Note Form */}
        <NoteForm onNoteAdded={handleNoteAdded} />

        {/* Notes */}
        {loading ? (
          <p className="text-center text-muted my-3">Loading notes...</p>
        ) : error ? (
          <p className="text-center text-danger my-3">{error}</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-muted my-3">No notes available</p>
        ) : (
          <div className="mb-5 mb-sm-4">
            <NoteList
              notes={notes}
              onNoteUpdated={handleNoteUpdated}
              onNoteDeleted={handleNoteDeleted}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
