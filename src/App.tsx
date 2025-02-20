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

  // let view = (currentNote == null) ? <SearchView notes={notes}/> : <h1>Hi</h1>
  return (
    <SearchView notes={notes}/>
  );
}

export default App;
