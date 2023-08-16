import React from 'react'
import { useRef, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri';
import './saveDialog.css'
import Dialog from '../Dialog';

function SaveDialog({ isVisible, setVisible, filePath, globalCode }) {
  
  if (!isVisible)
  return;
  const fileNameInputRef = useRef(null);
  const targetFolderInputRef = useRef(null);

  useEffect(() => {
    if (isVisible && filePath !== "") {
      saveFile(filePath);
    }
  }, [isVisible, filePath]);

  const handleClickSave = () => {
    const path = targetFolderInputRef.current.value + "/" + fileNameInputRef.current.value;
    saveFile(path);
  }
  
  const handleClickCancel = () => {
    setVisible(false);
  }
  
  const saveFile = (path) => {
    invoke("save_file", { path: path, content: globalCode });
    setVisible(false);
  }


  return (
    <Dialog>
      <div className='saveDialog'>
        <h2>Save</h2>
        <p>File name</p>
        <input ref={fileNameInputRef} type="text" />
        <p>Target folder</p>
        <input ref={targetFolderInputRef} type="text" />
        <div className="control-buttons">
          <button onClick={handleClickSave}>Save</button>
          <button onClick={handleClickCancel}>Cancel</button>
        </div>
      </div>
    </Dialog>
  )
}

export default SaveDialog