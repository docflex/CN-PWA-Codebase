import React, { useState } from "react";
import { addNote } from "../utils/db";

const NoteForm = ({ onNoteAdded }) => {
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        const newNote = { id: Date.now(), content: text };
        await addNote(newNote);
        onNoteAdded(newNote);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a note..."
            />
            <button type="submit">Save Note</button>
        </form>
    );
};

export default NoteForm;
