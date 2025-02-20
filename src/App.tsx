import { useState, useEffect } from 'react';
import NotesProvider from './system/notesProvider';
import Note from './system/note';

// Component imports
import SearchView from './components/SearchView';

function App() {
  const [notesProvider, setNotesProvider] = useState(NotesProvider.getNotesProvider());
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      let notes: Note[] = await notesProvider.fetchNotes();
      setNotes(notes);
    })();
  }, []);

  return (
    <>
      {
        (!currentNote)
        ? <SearchView notes={notes} setCurrentNote={(note: Note) => setCurrentNote(note)} />
        : <h1>{currentNote.getFileName()}</h1>
      }
    </>
  );
}

export default App;
