import Note from "../system/note";

function NoteList({ notes, setCurrentNote }: { notes: Note[], setCurrentNote: (note: Note) => (void) }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Note:</th>
                </tr>
            </thead>
            <tbody>
                {
                    notes.map(note => <tr key={note.getFileName()} onClick={() => setCurrentNote(note)}><td>{note.getFileName()}</td></tr>)
                }
            </tbody>
        </table>
    )
}

export default NoteList;