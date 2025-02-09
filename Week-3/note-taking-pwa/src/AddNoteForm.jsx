import React, { useState } from "react";

const AddNoteForm = ({ onAddNote }) => {
    const [text, setText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (text.trim()) {
            onAddNote(text);
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a note..."
            />
            <button type="submit">Add Note</button>
        </form>
    );
};

export default AddNoteForm;
