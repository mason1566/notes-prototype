import * as fs from '@tauri-apps/plugin-fs';
import * as dialog from '@tauri-apps/plugin-dialog';
import * as storePlugin from '@tauri-apps/plugin-store';
import { DirEntry } from '@tauri-apps/plugin-fs';
import FileDescriptor from './file';

// Singleton
class FileSystem {
    protected static fileSystem: FileSystem | undefined;

    // The constructor creates or returns the singleton instance of the FileSystem class.
    private constructor() {
        if (!FileSystem.fileSystem) {
            FileSystem.fileSystem = this;
        }
        return FileSystem.fileSystem;
    }

    // This function returns the singleton instance of the FileSystem class
    public static getFileSystem(): FileSystem {
        if (!FileSystem.fileSystem) {
            FileSystem.fileSystem = new FileSystem();
        }
        return FileSystem.fileSystem;
    }

    // This function reads files from a target directory and returns an array of FileDescriptors
    public async getFiles(directory: string): Promise<FileDescriptor[]> {
        try {
            let entries = await fs.readDir(directory); // Get directory entries

            entries = entries.filter(entry => !entry.isDirectory); // Filter out non-files

            // Map the file entries to an array of FileDescriptors
            const files: FileDescriptor[] = entries.map((entry) => {
                let extension: string = entry.name.slice(entry.name.lastIndexOf("."))
                let name: string = entry.name.slice(0, entry.name.lastIndexOf("."));
                return new FileDescriptor(name, extension);
            });

            return files;
        }
        catch (err) {
            throw new Error(`Error in getFiles: ${err}`)
        }
    }

    // This function reads entries (files and directories) from a given directory.
    public async getEntries(directory: string): Promise<DirEntry[]> {
        try {
            const entries = await fs.readDir(directory);
            return entries;
        }
        catch (err) {
            throw new Error(`Error in getEntries: ${err}`)
        }
    }

    // This function reads entries from a directory and returns all the folders within the given parent directory. Returns the found directories as a DirEntry array.
    public async getDirectories(directory: string): Promise<DirEntry[]> {
        try {
            let entries = await fs.readDir(directory);
            entries = entries.filter(entry => entry.isDirectory); // Filter out non-folders
            return entries;
        }
        catch (err) {
            throw new Error(`Error in getEntries: ${err}`)
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

    // This function attempts to create a file
    public async createFile(directory: string, file: FileDescriptor): Promise<void> {
        try {
            await fs.create(`${directory}/${file.getFileName()}`);
        } 
        catch (error) {
            throw new Error(`Error in createFile: ${error}`)
        }
    }

    // This function sets the default directory for app files.
    public async setDefaultDirectory(directory: string) {
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
}

export default FileSystem;