import Note from "../system/note";

function SearchView({ notes }: { notes: Note[] }) {
    return (
        <>
            {
                notes.map(note => <p key={note.getFileName()}>{note.getFileName()}</p>)
            }
        </>
    )
}

export default SearchView;