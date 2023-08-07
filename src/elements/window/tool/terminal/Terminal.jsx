import React, { useRef, useEffect, useState } from 'react'
import {invoke} from '@tauri-apps/api/tauri';
import './terminal.css';

function Terminal({output, setOutputLog}) {
  const [terminalInput, setTerminalInput] = useState("");
  const terminalRef = useRef(null);

  const sendCommand = (input) => {
    invoke("send_command_to_terminal", {command: input}).then(out => setOutputLog(output + "\n" + out));
  }

  const handleKeyDown = (event) => {
    if (event.target.id === terminalRef.current.id) {
      if (event.key === "Backspace") {
        if (terminalInput.length > 0) {
          setOutputLog((prevText) => prevText.slice(0, -1));
          setTerminalInput((prevText) => prevText.slice(0, -1));
        }
      }
      if (event.key === "Enter") {
        sendCommand(terminalInput);
        setTerminalInput("");
      }
      if (event.key.length < 2) {
        setTerminalInput((prevText) => prevText + event.key);
        setOutputLog((prevText) => prevText + event.key);
      }
    }
  };

  useEffect(() => {
    invoke("send_command_to_terminal", {command: "powershell"}).then(out => setOutputLog(out));
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [output, terminalInput]);

  return (
    <div className='terminal'>
      <pre ref={terminalRef}>{output}</pre>
    </div>
  );
}

export default Terminal