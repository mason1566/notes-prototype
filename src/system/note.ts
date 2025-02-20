class Note {
    protected title: string;
    protected extension: string;
    
    constructor(title: string, extension: string) {
        this.title = title;
        this.extension = extension;
    }

    public getFileName(): string {
        return this.title + this.extension;
    }

    public getTitle(): string {
        return this.title;
    }

    public getExtension(): string {
        return this.extension;
    }
}

export default Note;