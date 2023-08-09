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
      setOutputLog((prevOutput) => prevOutput + '\n' + out)
    );
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        console.log(event.key)
        event.preventDefault();
        if (commandInput == "clear"){
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
  }, [output]);

  return (
    <div className='terminal' ref={terminalRef}>
      <pre>
        <div className='content' ref={contentRef} id={'terminal'} contentEditable></div>
      </pre>
    </div>
  );
}

export default Terminal;
