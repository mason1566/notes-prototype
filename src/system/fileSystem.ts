// import { BaseDirectory, readDir } from '@tauri-apps/plugin-fs';

// Singleton
class FileSystem {
    protected static fileSystem: FileSystem | undefined;

    private constructor() {
        if (!FileSystem.fileSystem) {
            console.log("Creating a new FileSystem");
            FileSystem.fileSystem = this;
        }
        return FileSystem.fileSystem;
    }

    public static getFileSystem(): FileSystem {
        if (!FileSystem.fileSystem) {
            FileSystem.fileSystem = new FileSystem();
        }
        return FileSystem.fileSystem;
    }
}

export default FileSystem;