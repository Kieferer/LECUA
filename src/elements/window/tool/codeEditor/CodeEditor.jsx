import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import '../../../../../public/css/prism-synthwave84.css';
import 'prismjs/components/prism-javascript';
import { invoke } from '@tauri-apps/api/tauri';
import './codeEditor.css'

const CodeEditor = ({ updatedCode, setOutputLog }) => {
  const [code, setCode] = useState('');
  const editorRef = useRef(null);

  const handleKeyDown = (event) => {
    Prism.highlightAll();
    if (event.ctrlKey) {
      if (event.key === "t") {
        invoke("compile", { code: code }).then(output => setOutputLog(output));
      }
      return;
    }

    if (event.altKey) {
      switch (event.key) {
        case "s":
          if (code.includes("main.")) {
            let codeWithoutSpreadKeyWord = code.replace("main.", "");
            setCode(codeWithoutSpreadKeyWord +
              "pub fn main() {\n" +
              "    println!(\"Hello, World!\");\n" +
              "}");
          }
          return;

        case "c":
          setCode("");
          return;
      }
    }
  };

  useEffect(() => {
    if (updatedCode) {
      setCode(updatedCode);
    }
  }, [updatedCode]);

  useEffect(() => {
    editorRef.current.innerHTML = code;
  }, [code]);

  /*useEffect(() => {
    invoke('insert_cursor_symbol', { text: code, pos: Math.min(code.length, cursorPos) }).then((message => {
      setVisualizerCode(message);
    }));
    setCursorPos((value) => Math.min(code.length, value));
    Prism.highlightAll();
  }, [visualizerCode, cursorPos, code]);*/

  useEffect(() => {
    editorRef.current.addEventListener('keydown', handleKeyDown);
    return () => {
      editorRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="editorPanel">
      <pre className="language-javascript">
        <code className="language-javascript" ref={editorRef} id={"editor"} contentEditable>{}</code>
      </pre>
    </div>
  )
}

export default CodeEditor;