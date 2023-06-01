import React, {useEffect, useRef, useState} from 'react';
import Prism from 'prismjs';
import '../../../../../public/css/prism-synthwave84.css';
import 'prismjs/components/prism-javascript';
import {invoke} from '@tauri-apps/api/tauri';
import './codeEditor.css'


const CodeEditor = () => {
  const [cursorPosX, setCursorPosX] = useState(0);
  const [cursorPosY, setCursorPosY] = useState(1);
  const [code, setCode] = useState('');
  const [visualizerCode, setVisualizerCode] = useState('')
  const editorRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.target.id === editorRef.current.id) {
      if (event.key === "ArrowRight") {
        console.log(code.length)
        setCursorPosX((value) => Math.min(code.length, value + 1));
      }
      if (event.key === "ArrowLeft") {
        setCursorPosX((value) => Math.max(0, value - 1));
      }
      if (event.key === "ArrowUp") {
        setCursorPosY((value) => Math.min(1, value - 1));
      }
      if (event.key === "ArrowDown") {
        setCursorPosY((value) => Math.max(code.length, value + 1));
      }
      if (event.key === "Backspace") {
        setCode((prevText) => prevText.slice(0, -1));
        setCursorPosX((value) => Math.max(0, value - 1));
        return;
      }

      if (event.key === "Enter") {
        setCode((prevText) => prevText + "\n");
      }

      if (event.ctrlKey) {
        return;
      }
      if (event.key.length < 2) {
        setCode((prevText) => prevText + event.key);
        setCursorPosX((value) => value + 1);
      }
    }
  };

  useEffect(() => {
    invoke('insert_cursor_symbol', {text: code, x: cursorPosX, y: cursorPosY}).then((message => {
      setVisualizerCode(message);
    }));
    setCursorPosX((value) => Math.min(code.length, value));
    setTimeout(Prism.highlightAll, 1);
  }, [visualizerCode, cursorPosX, cursorPosY]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [code]);

  return (
    <div className={"editorPanel"}>
      <pre className="language-javascript" ref={editorRef} id={"editor"}>
        <code className="language-javascript">
          {visualizerCode}
        </code>
      </pre>
    </div>
  )
};
export default CodeEditor;
