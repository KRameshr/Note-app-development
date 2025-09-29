import React from "react";
import NoteDetails from "./NoteDetails";

const NoteList = ({ notes = [], onNoteUpdated, onNoteDeleted }) => {
  if (!notes.length)
    return <p className="text-center my-3">No notes available</p>;

  return (
    <div className="container">
      <div className="row g-3">
        {notes.map((note) => (
          <div key={note._id} className="col-12 col-md-12 col-lg-12">
            <NoteDetails
              note={note}
              onNoteUpdated={onNoteUpdated}
              onNoteDeleted={onNoteDeleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
