import React, { lazy, Suspense } from "react";
import { getNotes } from "./utils/db.js";

const NetworkStatus = lazy(() => import("./components/NetworkStatus.jsx"));
const NoteForm = lazy(() => import("./components/NoteForm.jsx"));
const NoteList = lazy(() => import("./components/NoteList.jsx"));

function App() {
    const [notes, setNotes] = React.useState([]);

    React.useEffect(() => {
        async function loadNotes() {
            const storedNotes = await getNotes();
            setNotes(storedNotes);
        }
        loadNotes();
    }, []);

    const handleNoteAdded = (newNote) => {
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NetworkStatus />
            <h1>PWA Notes App</h1>
            <NoteForm onNoteAdded={handleNoteAdded} />
            <NoteList notes={notes} />
        </Suspense>
    );
}

export default App;
