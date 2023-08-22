import React, { useRef, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './terminal.css';

const Terminal = React.memo(({ output, setOutputLog }) => {
  const [outputWithCommand, setOutputWithCommand] = useState("");
  const contentRef = useRef(null);
  const terminalRef = useRef(null);
  const [commandInput, setCommandInput] = useState("");

  const sendCommand = () => {
    invoke('send_command_to_terminal', { command: commandInput }).then((out) =>
      setOutputLog((prevOutput) => prevOutput + '\n' + removeEmptyLines(out))
    );
  };
  const scrollToBottom = () => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  };

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setOutputLog((out) => out + commandInput);
      if (commandInput == "clear") {
        setOutputLog("")
        contentRef.current.innerHTML = "";
      }
      sendCommand();
      setCommandInput("");
    }
    if (event.key === 'Backspace') {
      setCommandInput((text) => text.substring(0, text.length - 1));
    }
    if (event.key.length < 2) {
      setCommandInput((text) => text + event.key);
    }
  }

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
  }, [commandInput]);

  useEffect(() => {
    contentRef.current.innerHTML = output;
    scrollToBottom();
  }, [output]);

  useEffect(() => {
    setOutputWithCommand(output + commandInput);
  }, [commandInput]);

  return (
    <div className='terminal' ref={terminalRef}>
      <pre>
        <div className='content' ref={contentRef} id={'terminal'} tabIndex={0}>{outputWithCommand}</div>
      </pre>
    </div>
  );
})

export default Terminal;
