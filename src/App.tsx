import InvokeCommandButton from "./components/InvokeCommandButton.tsx"
import FileSystem from "./system/fileSystem.ts";
import FileDescriptor from "./system/file.ts";
import { useState } from 'react';

function App() {
  const [fs, setFs] = useState(FileSystem.getFileSystem());

  async function button1() {
    try {
      console.log(await fs.getDefaultDirectory());
      console.log(await fs.getFiles());
    } catch (err) { console.log(err) };
  }

  async function button2() {
    try {
      console.log(await fs.fetchFileContents(new FileDescriptor("first_note", ".md")));
    } catch (err) { console.log(err) };
  }

  return (
    
    <>
      <InvokeCommandButton onClick={button1} />
      <InvokeCommandButton onClick={button2} />
    </>
  );
}

export default App;
