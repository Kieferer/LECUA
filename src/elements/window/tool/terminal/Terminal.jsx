import React, { useRef, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri';
import './terminal.css';

function Terminal({ output, setOutputLog }) {
  const [terminalInput, setTerminalInput] = useState("");
  const terminalRef = useRef(null);

  const sendCommand = (input) => {
    invoke("send_command_to_terminal", { command: input }).then(out => setOutputLog(output + "\n" + out));
  }

  const handleKeyDown = (event) => {
    console.log(event.key)
    if (event.key === "Backspace") {
      if (terminalInput.length > 0) {
        setOutputLog(prevText => prevText.slice(0, -1));
        setTerminalInput(prevText => prevText.slice(0, -1));
      }
    }
    if (event.key === "Enter") {
      sendCommand(terminalInput);
      setTerminalInput("");
    }
    if (event.key.length < 2) {
      event.preventDefault();
      setTerminalInput(prevInput => prevInput + event.key);
      setOutputLog(prevLog => prevLog + event.key);
    }
  };

  useEffect(() => {
    console.log(terminalInput)
  }, [terminalInput, output])

  useEffect(() => {
    invoke("send_command_to_terminal", { command: "powershell" }).then(out => setOutputLog(out));
  }, [])

  useEffect(() => {
    terminalRef.current.addEventListener('keydown', handleKeyDown);
    return () => {
      terminalRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  

  return (
    <div className='terminal' ref={terminalRef} tabIndex={0} id={'terminal'}>
      <pre>{output}</pre>
    </div>
  );
}

export default Terminal