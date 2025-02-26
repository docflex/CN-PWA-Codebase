import { openDB } from "idb";

const dbPromise = openDB("pwa-notes-db", 1, {
    upgrade(db) {
        db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
    },
});

export const addNote = async (note) => {
    const db = await dbPromise;
    return db.put("notes", note);
};

export const getNotes = async () => {
    const db = await dbPromise;
    return db.getAll("notes");
};
