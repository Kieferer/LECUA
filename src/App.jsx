import "./App.css";
import TitleBar from "./elements/window/title/TitleBar.jsx";
import Hierarchy from "./elements/window/tool/hierarchy/Hierarchy.jsx";
import CodeEditor from "./elements/window/tool/codeEditor/CodeEditor.jsx";
import { useState } from "react";

function App() {
  const [code, setCode] = useState('');
  return (
    <div className="container">
      <TitleBar />
      <Hierarchy updatedCode={setCode}/>
      <CodeEditor updatedCode={code}/>
    </div>
  );
}

export default App;
