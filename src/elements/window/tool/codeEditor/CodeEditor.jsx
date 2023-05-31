import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import '../../../../../public/css/prism-synthwave84.css';
import 'prismjs/components/prism-javascript';
import { invoke } from '@tauri-apps/api/tauri';
import './codeEditor.css'


const CodeEditor = () => {
  const [cursorPosX, setCursorPosX] = useState(0);
  const [cursorPosY, setCursorPosY] = useState(0);
  const [code, setCode] = useState('');
  const [visualizerCode, setVisualizerCode] = useState('')
  const editorRef = useRef(null);

  useEffect(() => {
    invoke('insert_cursor_symbol', { text: code, x: Math.min(cursorPosX, code.length), y: cursorPosY }).then((message => {setVisualizerCode(message);}));
    setTimeout(Prism.highlightAll, 1);
  }, [cursorPosX, cursorPosY]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleKeyDown = (event) => {
    if (event.target.id === editorRef.current.id) {
      if (event.key === "ArrowRight") {
        setCursorPosX((value) => value + 1);
      }
      if (event.key === "ArrowLeft") {
        setCursorPosX((value) => value - 1);
      }
      if (event.key === "ArrowUp") {
        setCursorPosY((value) => value + 1);
      }
      if (event.key === "ArrowDown") {
        setCursorPosY((value) => value - 1);
      }
      if (event.key === "Backspace") {
        setCode((prevText) => prevText.slice(0, -1));
        setCursorPosX((value) => value - 1);
        return;
      }

      if (event.key === "Enter"){
        setCode((prevText) => prevText + "\n");
      }

      if (event.ctrlKey) {
        return;
      }
      if (event.key.length < 2){
        setCode((prevText) => prevText + event.key);
        setCursorPosX((value) => value + 1);
      }
    }};

  return (
    <div className={"editorPanel"}>
      <pre className="language-javascript" ref={editorRef} id={"editor"}>
        <code className="language-javascript">
          {visualizerCode}
        </code>
      </pre>
    </div>
  )};
export default CodeEditor;
