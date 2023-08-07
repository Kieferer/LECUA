import "./App.css";
import TitleBar from "./elements/window/title/TitleBar.jsx";
import Hierarchy from "./elements/window/tool/hierarchy/Hierarchy.jsx";
import CodeEditor from "./elements/window/tool/codeEditor/CodeEditor.jsx";
import Terminal from "./elements/window/tool/terminal/Terminal";
import { useState, useEffect } from "react";

function App() {
  const [code, setCode] = useState('');
  const [filePath, setFilePath] = useState('');
  const [outputLog, setOutputLog] = useState("");

  return (
    <div className="container">
      <TitleBar/>
      <Hierarchy updatedCode={setCode} filePath={filePath} setFilePath={setFilePath}/>
      <CodeEditor updatedCode={code} setOutputLog={setOutputLog} filePath={filePath} setFilePath={setFilePath}/>
      <Terminal output={outputLog} setOutputLog={setOutputLog}/>
    </div>
  );
}

export default App;
