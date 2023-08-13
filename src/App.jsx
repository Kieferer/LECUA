import "./App.css";
import TitleBar from "./elements/window/title/TitleBar.jsx";
import Hierarchy from "./elements/window/tool/hierarchy/Hierarchy.jsx";
import CodeEditor from "./elements/window/tool/codeEditor/CodeEditor.jsx";
import Terminal from "./elements/window/tool/terminal/Terminal";
import { useState } from "react";
import Dialog from "./elements/window/dialog/Dialog";
import SaveDialog from "./elements/window/dialog/SaveDialog/SaveDialog";

function App() {
  const [code, setCode] = useState('');
  const [filePath, setFilePath] = useState('');
  const [outputLog, setOutputLog] = useState("");
  const [isSaveDialogVisible, setSaveDialogVisible] = useState(false);

  return (
    <div className="container">
      <TitleBar/>
      <Hierarchy updatedCode={setCode} filePath={filePath} setFilePath={setFilePath}/>
      <CodeEditor updatedCode={code} setOutputLog={setOutputLog} filePath={filePath} setFilePath={setFilePath} setSaveDialogVisable={setSaveDialogVisible}/>
      <Terminal output={outputLog} setOutputLog={setOutputLog}/>
      <SaveDialog isVisable={isSaveDialogVisible} setVisable={setSaveDialogVisible} filePath={filePath} code={code}/>
    </div>
  );
}

export default App;
