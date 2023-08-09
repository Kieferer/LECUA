import React, { useEffect, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import Prism from 'prismjs';
import 'prismjs/components/prism-rust.js';
import './codeEditor.css'
import './code.css';

const CodeEditor = ({ updatedCode, setOutputLog }) => {
  const [code, setCode] = useState('');
  const editorRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.ctrlKey) {
      if (event.key == "h"){
        Prism.highlightAll();
      }
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
  }

  useEffect(() => {
    if (updatedCode) {
      setCode(updatedCode);
    }
  }, [updatedCode]);

  useEffect(() => {
    editorRef.current.innerHTML = code;
    Prism.highlightAll();
  }, [code]);

  useEffect(() => {
    editorRef.current.addEventListener('keydown', handleKeyDown);
    return () => {
      editorRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="editorPanel">
      <pre className="language-rust">
        <code className='content' ref={editorRef} id={"editor"} contentEditable spellCheck="false">{ }</code>
      </pre>
    </div>
  )
}

export default CodeEditor;