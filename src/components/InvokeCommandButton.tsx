import FileDescriptor from '../system/file';
import FileSystem from '../system/fileSystem'
import { useState } from 'react'


function InvokeCommandButton() {
    const [fs, setFs] = useState(FileSystem.getFileSystem());

    async function invokeCommand() {
        try {
            console.log(await fs.getDefaultDirectory());
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