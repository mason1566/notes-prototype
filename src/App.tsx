import InvokeCommandButton from "./components/InvokeCommandButton.tsx"
import FileSystem from "./system/fileSystem.ts";
import { useState } from 'react';

function App() {
  const [fs, setFs] = useState(FileSystem.getFileSystem());

  async function button1() {
    try {
      console.log(await fs.getDefaultDirectory());
    } catch (err) { console.log(err) };
  }

  async function button2() {
    try {
      await fs.setDefaultDirectory(await fs.openDirectoryDialog());
      console.log(await fs.getDefaultDirectory());
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
