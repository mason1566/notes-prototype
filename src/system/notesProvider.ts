import * as fs from '@tauri-apps/plugin-fs';
import * as storePlugin from '@tauri-apps/plugin-store';
import * as dialog from '@tauri-apps/plugin-dialog';
import { DirEntry } from '@tauri-apps/plugin-fs';
import Note from "./note";

// singleton
class NotesProvider {
    protected static notesProvider: NotesProvider | undefined;

    // Singleton pattern
    private constructor() {
        if (!NotesProvider.notesProvider) {
            NotesProvider.notesProvider = this;
        }
        return NotesProvider.notesProvider;
    }

    // This function fetches notes from the default directory.
    public async fetchNotes(extension: string=".md"): Promise<Note[]> {
        try {
            let entries: DirEntry[] = await fs.readDir(await this.getOrSetDefaultDirectoryPath()); // Get entries from the notes directory. Entries includes all notes and files within DefaultDirectoryPath.
            entries = entries.filter(entry => !entry.isDirectory); // use a filter to remove all directories.
            let notes: Note[] = entries.map(file => this.convertFileNameToNote(file.name)).filter(file => file.getExtension() === extension); // Convert the files to Note objects and filter out ones without the proper extension.
            return notes;
        }
        catch (err) {
            throw new Error(`Error in fetchNotes: ${err}`);
        }
    }

    // This function sets the default directory for app files.
    public async setDefaultDirectory(directory: string): Promise<void> {
        const store = await storePlugin.load('store.json', { autoSave: false });
        await store.set('default-dir', directory);

        await store.save();
    }

    // This function gets the default directory for app files from the plugin-store.
    public async getDefaultDirectory(): Promise<string> {
        const store = await storePlugin.load('store.json', { autoSave: false });
        let defaultDirectory = await store.get<string>('default-dir');

        if (!defaultDirectory) {
            throw new Error(`Error in getDefaultDirectory: No default directory is set.`)
        }
        return defaultDirectory;
    }

    // This function is used to test whether a default directory is set in the plugin-store api.
    public async isDefaultDirectorySet(): Promise<boolean> {
        const store = await storePlugin.load('store.json', { autoSave: false });
        let defaultDirectory = await store.get<string>('default-dir');

        if (defaultDirectory) {
            return true;
        }
        return false;
    }

    // This function gets the default notes directory. If this directory isn't set yet, set it and return the directory path
    public async getOrSetDefaultDirectoryPath(): Promise<string> {
        if (await this.isDefaultDirectorySet()) {
            return await this.getDefaultDirectory();
        }
        else {
            try {
                let directory: string = await this.openDirectoryDialog();
                await this.setDefaultDirectory(directory);
                return directory;
            }
            catch (error) {
                throw new Error(`Error in getOrSetDefaultDirectory: ${error}`);
            }
        }
    }

    // this function shows a dialogue to the user and gets them to select a folder. Returns the absolute path of the folder.
    public async openDirectoryDialog(): Promise<string> {
        const folder = await dialog.open({
            multiple: false,
            directory: true,
        });

        if (!folder) {
            throw new Error("Error in openDirectoryDialog");
        }

        return folder;
    }

    // This function takes in a conventional filename (hello.txt, note.md, theFile) and converts it into a note object.
    public convertFileNameToNote(fileName: string): Note {
        let indexOfLastSeparator: number = fileName.lastIndexOf("."); // Get the index of the rightmost period "."
        
        // The following case happens if there isn't a filetype
        if (indexOfLastSeparator === -1) {
            return new Note(fileName, "");
        }

        let title: string = fileName.slice(0, indexOfLastSeparator);
        let extension: string = fileName.slice(indexOfLastSeparator);
        return new Note(title, extension);
    }

    public async fetchNoteContents(note: Note): Promise<string> {
        try {
            const dir: string = await this.getDefaultDirectory();
            const noteContents = await fs.readTextFile(`${dir}/${note.getFileName()}`);
            return noteContents;
        }
        catch (err) {
            throw new Error(`Error in fetchNoteContents: ${err}`);
        }
    }

    public async writeNoteContents(note: Note, contents: string): Promise<void> {
        try {
            const dir: string = await this.getDefaultDirectory();
            await fs.writeTextFile(`${dir}/${note.getFileName()}`, contents);
        } 
        catch (err) {
            throw new Error(`Error in writeNoteContents: ${err}`);
        }
    }

    public async createNote(note: Note): Promise<void> {
        try {
            let dir: string = await this.getDefaultDirectory();
            await fs.create(`${dir}/${note.getFileName()}`); // create the note
        }
        catch (err) {
            throw new Error(`Error in createNote: ${err}`);
        }
    }
}