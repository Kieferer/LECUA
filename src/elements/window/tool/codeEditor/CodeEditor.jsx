import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import '../../../../../public/css/prism-synthwave84.css';
import './codeEditor.css'

import 'prismjs/components/prism-javascript';

const CodeEditor = () => {
  const [cursorPosX, setCursorPosX] = useState(0);
  const [cursorPosY, setCursorPosY] = useState(0);
  const [code, setCode] = useState('');

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  React.useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const textareaRef = useRef(null);

  useEffect(() => {

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleKeyDown = (event) => {
    if (event.target.id === textareaRef.current.id) {
      console.log(event)

      //if (event.key === "ArrowRight")

      if (event.key === "Backspace") {
        setCode((prevText) => prevText.slice(0, -1));
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
      }
    }};

  return (
    <div className={"editorPanel"}>
      <pre className="language-javascript" ref={textareaRef} id={"field"}>
        <code className="language-javascript">
          {code}
        </code>
    </pre>
    </div>
  )};
export default CodeEditor;
