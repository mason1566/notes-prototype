import FileDescriptor from '../system/file';
import FileSystem from '../system/fileSystem'
import { useState } from 'react'


function InvokeCommandButton() {
    const [fs, setFs] = useState(FileSystem.getFileSystem());

    async function invokeCommand() {
        try {
            const directory = await fs.openDirectoryDialog();
            await fs.createFile(directory, new FileDescriptor("hi", ".hi"));
            const files = await fs.getFiles(directory);
            console.log(files);
        } 
        catch (err) {
            console.log(err);
        }
    }

    return (
        <button type="button" onClick={invokeCommand}>INVOKE COMMAND</button>
    )
}

export default InvokeCommandButton;