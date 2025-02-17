import FileDescriptor from "./file";

class Note extends FileDescriptor {
    protected creationDate: Date;

    constructor(title: string, extension: string) {
        super(title, extension);
        this.creationDate = new Date(Date.now());
    }

    public fetchNoteContents(): string {
        return "TODO";
    }

    public static fetchNoteContents(note: Note): string {
        return note.fetchNoteContents();
    }
}

export default Note;