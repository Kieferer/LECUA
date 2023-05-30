import "./App.css";
import TitleBar from "./elements/window/title/TitleBar.jsx";
import Hierarchy from "./elements/window/tool/hierarchy/Hierarchy.jsx";
import CodeEditor from "./elements/window/tool/codeEditor/CodeEditor.jsx";

function App() {
  return (
    <div className="container">
      <TitleBar />
      <Hierarchy/>
      <CodeEditor/>
    </div>
  );
}

export default App;
