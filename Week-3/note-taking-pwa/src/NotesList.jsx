import React from "react";

const NotesList = ({ notes }) => {
    return (
        <ul>
            {notes.map((note) => (
                <li key={note.id}>{note.text}</li>
            ))}
        </ul>
    );
};

export default NotesList;
