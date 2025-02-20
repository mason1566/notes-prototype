import Note from "../system/note";
import NoteList from "./NoteList";

function SearchView({ notes, setCurrentNote }: { notes: Note[], setCurrentNote: (note: Note) => (void) }) {
    return (
        <>
            <h1>Search Notes:</h1>
            <input placeholder="Enter Note Title:" />
            <NoteList notes={notes} setCurrentNote={(note: Note) => setCurrentNote(note)} />
        </>
    )
}

export default SearchView;