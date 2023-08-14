import React, { useEffect, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './codeEditor.css'
import CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { rust } from '@codemirror/lang-rust';
import { tags } from '@lezer/highlight';

const CodeEditor = ({ updatedCode, setOutputLog, setSaveDialogVisable }) => {
  const [code, setCode] = useState('');
  const editorRef = useRef(null);

  const syncroniseCode = () => {
    let content = editorRef.current.editor.textContent;
    setCode(content.substring(3, content.length));
  }

  const handleKeyDown = (event) => {
    const key = event.code;
    if (event.altKey){
      switch (key) {
        case "KeyT": {
          //syncroniseCode();
          invoke("compile", { code: code }).then(output => setOutputLog(output));
        } break;
      }
    }
    if (event.ctrlKey) {
      switch (key) {
        case "KeyS": {
          //syncroniseCode();
          console.log(code)
          setSaveDialogVisable(true);
        } break;
      }
    }
  }

  useEffect(() => {
    if (updatedCode) {
      setCode(updatedCode);
    }
  }, [updatedCode]);

  useEffect(() => {
    editorRef.current&&editorRef.current.editor.addEventListener('keydown', handleKeyDown);
    return () => {
      editorRef.current&&editorRef.current.editor.removeEventListener('keydown', handleKeyDown);
    };
  }, [code]);

  const rustTheme = createTheme({
    settings: {
      background: '#181818',
      foreground: '#E5E5E5',
      caret: '#FFFFFF',
      selection: '#0F236C',
      selectionMatch: '#333333',
      lineHighlight: '#0F0F0F',
      gutterBackground: '#262626',
      gutterForeground: '#8a919966',
      gutterBorder: '#181818',
    },
    styles: [
      { tag: tags.comment, color: '#6A737D' },
      { tag: tags.variableName, color: '#5A9BD5' },
      { tag: [tags.string, tags.special(tags.brace)], color: '#6D877B' },
      { tag: tags.number, color: '#B0856E' },
      { tag: tags.bool, color: '#B0856E' },
      { tag: tags.null, color: '#B0856E' },
      { tag: tags.keyword, color: '#C678DD' },
      { tag: tags.operator, color: '#D4D7D6' },
      { tag: tags.className, color: '#E5C07B' },
      { tag: tags.definition(tags.typeName), color: '#E06C75' },
      { tag: tags.typeName, color: '#E5C07B' },
      { tag: tags.angleBracket, color: '#D4D7D6' },
      { tag: tags.tagName, color: '#D4D7D6' },
      { tag: tags.attributeName, color: '#D4D7D6' },
      { tag: tags.operatorKeyword, color: '#61AFEF' }
    ],
  });

  return (
    <div className="editorPanel">
      <CodeMirror
        ref={editorRef}
        value={code}
        theme={rustTheme}
        extensions={[rust({})]}
        spellCheck='false'
        onChange={(current) => setCode(current)}
      />
    </div>
  )
}

export default CodeEditor;