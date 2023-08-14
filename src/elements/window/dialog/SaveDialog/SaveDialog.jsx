import React from 'react'
import { useRef } from 'react'
import { invoke } from '@tauri-apps/api/tauri';
import './saveDialog.css'
import Dialog from '../Dialog';

function SaveDialog({ isVisible, setVisable, filePath, code }) {
  useEffect(() => {
    if (isVisible && filePath !== "") {
      invoke("save_file", { path: filePath, content: code });
      setVisable(false);
    }
  }, [isVisible, filePath, code, setVisable]);
  

  const fileNameInputRef = useRef(null);
  const targetFolderInputRef = useRef(null);

  const handleClickSave = () => {
    const path = targetFolderInputRef.current.value + "/" + fileNameInputRef.current.value;
    invoke("save_file", { "path": path, "content": code });
  }

  const handleClickCancel = () => {
    setVisable(false);
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