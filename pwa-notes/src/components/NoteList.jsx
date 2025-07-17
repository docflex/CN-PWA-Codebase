import React from "react";

const NoteList = ({ notes }) => {
    return (
        <div className="note-list">
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div key={note.id} className="note">
                        {note.content}
                    </div>
                ))
            ) : (
                <p>No notes yet. Start writing!</p>
            )}
        </div>
    );
};

export default NoteList;
