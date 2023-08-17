import { useState } from "react";
import "./App.css";
import TitleBar from "./elements/window/title/TitleBar.jsx";
import Hierarchy from "./elements/window/tool/hierarchy/Hierarchy.jsx";
import CodeEditor from "./elements/window/tool/codeEditor/CodeEditor.jsx";
import Terminal from "./elements/window/tool/terminal/Terminal";
import SaveDialog from "./elements/window/dialog/SaveDialog/SaveDialog";

function App() {
  const [globalCode, setGlobalCode] = useState('');
  const [filePath, setFilePath] = useState('');
  const [outputLog, setOutputLog] = useState("");
  const [isSaveDialogVisible, setSaveDialogVisible] = useState(false);

  return (
    <div className="container">
      <TitleBar/>
      <Hierarchy setGlobalCode={setGlobalCode} filePath={filePath} setFilePath={setFilePath}/>
      <CodeEditor globalCode={globalCode} setGlobalCode={setGlobalCode} setOutputLog={setOutputLog} filePath={filePath} setFilePath={setFilePath} setSaveDialogVisable={setSaveDialogVisible}/>
      <Terminal output={outputLog} setOutputLog={setOutputLog}/>
      { isSaveDialogVisible && <SaveDialog setVisible={setSaveDialogVisible} filePath={filePath} globalCode={globalCode}/>}
    </div>
  );
}

export default App;
