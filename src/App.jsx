import "./App.css";
import TitleBar from "./elements/window/title/TitleBar.jsx";
import Hierarchy from "./elements/window/tool/hierarchy/Hierarchy.jsx";
import CodeEditor from "./elements/window/tool/codeEditor/CodeEditor.jsx";
import { useState } from "react";

function App() {
  const [code, setCode] = useState('');
  const [filePath, setFilePath] = useState('');
  return (
    <div className="container">
      <TitleBar />
      <Hierarchy updatedCode={setCode} filePath={filePath} setFilePath={setFilePath}/>
      <CodeEditor updatedCode={code} filePath={filePath} setFilePath={setFilePath}/>
    </div>
  );
}

export default App;
