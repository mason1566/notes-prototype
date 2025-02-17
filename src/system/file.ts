class FileDescriptor {
    protected title: string;
    protected extension: string;
    
    constructor(title: string, extension: string) {
        this.title = title;
        this.extension = extension;
    }

    public getFileName(): string {
        return `${this.title}.${this.extension}`;
    }
}

export default FileDescriptor;