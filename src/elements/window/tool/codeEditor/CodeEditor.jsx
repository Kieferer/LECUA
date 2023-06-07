import React, {useEffect, useRef, useState} from 'react';
import Prism from 'prismjs';
import '../../../../../public/css/prism-synthwave84.css';
import 'prismjs/components/prism-javascript';
import {invoke} from '@tauri-apps/api/tauri';
import './codeEditor.css'


const CodeEditor = () => {
  const [cursorPos, setCursorPos] = useState(0);
  const [cursorPosX, setCursorPosX] = useState(0);
  const [cursorPosY, setCursorPosY] = useState(0);
  const [code, setCode] = useState('');
  const [visualizerCode, setVisualizerCode] = useState('')
  const editorRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.target.id === editorRef.current.id) {
      if (event.key === "ArrowRight") {
        setCursorPos((value) => Math.min(code.length, value + 1));
        /*invoke("adjust_cursor_x", {text: code, x: cursorPosX, y: cursorPosY, direction: 1}).then(([x, y]) => {
          setCursorPosX(x);
          setCursorPosY(y);
        });*/
      }
      if (event.key === "ArrowLeft") {
        setCursorPos((value) => Math.max(0, value - 1));
        //invoke("adjust_cursor_x", {text: code, x: cursorPosX, y: cursorPosY, direction: -1})
      }
      if (event.key === "ArrowUp") {
        //invoke("adjust_cursor_y", {text: code, y: cursorPosY, direction: -1}).then((value) => setCursorPosY(value));
        //invoke('get_length_of_lines', {text: code, y: cursorPosY}).then(y_length => setCursorPos((value) => value - y_length));
      }
      if (event.key === "ArrowDown") {
        //invoke("adjust_cursor_y", {text: code, y: cursorPosY, direction: 1}).then((value) => setCursorPosY(value));
        //invoke('get_length_of_lines', {text: code, y: cursorPosY}).then(y_length => setCursorPos((value) => value + y_length));
      }
      if (event.key === "Backspace") {
        setCode((prevText) => prevText.slice(0, -1));
        setCursorPos((value) => Math.max(0, value - 1));
        setCursorPosY((value) => Math.min(code.length, value + 1));
        return;
      }

      if (event.key === "Enter") {
        setCode((prevText) => prevText + "\n");
        setCursorPos((value) => value + 1);
      }

      if (event.ctrlKey) {
        if (event.key === "t")
          invoke("compile", {code: code});
        //invoke("adjust_cursor_y", {text: code, y: cursorPosY, direction: 0}).then(m => console.log(m))
        return;
      }
      if (event.key.length < 2) {
        setCode((prevText) => prevText + event.key);
        setCursorPos((value) => value + 1);
      }
    }
  };

  useEffect(() => {
    invoke('insert_cursor_symbol', {text: code, pos: Math.min(code.length, cursorPos)}).then((message => {
      setVisualizerCode(message);
    }));
    setCursorPos((value) => Math.min(code.length, value));
    setTimeout(Prism.highlightAll, 1);
  }, [visualizerCode, cursorPos]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [code, cursorPosY]);

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
