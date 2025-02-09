import React, { useEffect, useState } from "react";
import AddNoteForm from "./AddNoteForm";
import NotesList from "./NotesList";
import { getNotesFromDB, saveNoteToDB } from "./idb";

const App = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        async function fetchNotes() {
            const savedNotes = await getNotesFromDB();
            setNotes(savedNotes);
        }
        fetchNotes();
    }, []);

    const addNote = async (text) => {
        const newNote = { id: Date.now(), text };
        await saveNoteToDB(newNote);
        setNotes([...notes, newNote]);
    };

    return (
        <div className="App">
            <h1>Note-Taking PWA</h1>
            <AddNoteForm onAddNote={addNote} />
            <NotesList notes={notes} />
        </div>
    );
};

export default App;
