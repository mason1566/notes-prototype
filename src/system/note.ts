import FileDescriptor from "./fileDescriptor";

class Note extends FileDescriptor {
    constructor(title: string, extension: string) {
        super(title, extension);
    }

    public fetchNoteContents(): string {
        return "TODO";
    }

    public static fetchNoteContents(note: Note): string {
        return note.fetchNoteContents();
    }
}

export default Note;