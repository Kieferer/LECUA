import React, { useRef, useEffect, useState, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './terminal.css';

function Terminal({ output, setOutputLog }) {
  const [commandInput, setCommandInput] = useState('');
  const contentRef = useRef(null);
  const terminalRef = useRef(null);

  const scrollToBottom = () => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  };

  const sendCommand = (input) => {
    invoke('send_command_to_terminal', { command: input }).then((out) =>
      setOutputLog((prevOutput) => prevOutput + '\n' + removeEmptyLines(out))
    );
  };

  const moveCursorToEnd = (inputField) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(inputField);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    inputField.focus();
  }

  const removeEmptyLines = (input) => {
    const lines = input.split("\n");
    let notEmptyLines = [];
    for (let line of lines) {
      if (line.trim().length >= 1) {
        notEmptyLines.push(line);
      }
    }
    return notEmptyLines.join('\n');
  }

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (commandInput == "clear") {
        setOutputLog("")
        contentRef.current.innerHTML = "";
      }
      sendCommand(commandInput);
      setCommandInput("");
    }
    if (event.key === 'Backspace') {
      if (commandInput.length <= 0) {
        event.preventDefault();
      } else {
        setCommandInput((text) => text.substring(0, text.length - 1));
      }
    }
    if (event.key.length < 2) {
      setCommandInput((text) => text + event.key);
    }

    if (event.key == "ArrowUp"){
      event.preventDefault();
      if (indexOfHistoryInput + 1 < inputHistory.length){
        indexOfHistoryInput++;
        setIndexOfHistoryInput((value) => value + 1);
        getCommandFromHistory();
      }
    }
    if (event.key == "ArrowDown") {
      event.preventDefault();
      if (indexOfHistoryInput - 1 >= 0){
        setIndexOfHistoryInput((value) => value - 1);
        getCommandFromHistory();
      }
    }
  },
    [commandInput]
  );

  useEffect(() => {
    invoke('send_command_to_terminal', { command: '' }).then((out) => {
      setOutputLog(out);
      contentRef.current.value = out;
    });
  }, []);

  useEffect(() => {
    contentRef.current.addEventListener('keydown', handleKeyDown);
    return () => {
      contentRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    contentRef.current.innerHTML = output;
    scrollToBottom();
    moveCursorToEnd(contentRef.current);
  }, [output]);

  return (
    <div className='terminal' ref={terminalRef}>
      <pre>
        <div className='content' ref={contentRef} id={'terminal'} contentEditable spellCheck="false"></div>
      </pre>
    </div>
  );
}

export default Terminal;
