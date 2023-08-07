import { useEffect, useState, useRef } from "react";
import {invoke} from '@tauri-apps/api/tauri';
import Folder from "./Folder";
import './hierarchy.css'

const Hierarchy = ({updatedCode, filePath, setFilePath, lastSelectedElement}) => {
  const [data, setData] = useState();
  const [url, setURL] = useState("");
  const urlInputRef = useRef(null);
  
  const loadRepository = (root) => {
    invoke("get_file_system_representation", {origin: root}).then(x => setData(JSON.parse(x)));
  }

  const loadFile = (path) => {
    setFilePath(path);
    invoke("load_file", {path: path}).then(data => updatedCode(data));
  }

  const handleKeyEnter = (event) => {
    console.log("asd");
    if (event.target.id === urlInputRef.current.id) {
      if (event.key === "Enter") {
        setURL(urlInputRef.current.value);
        loadRepository(url);
      }
    }
  }

  useEffect(() => {
    invoke("get_running_location").then(x => setURL(x)).then(urlInputRef.current.value = url);
    urlInputRef.current.value = url;
    url&&loadRepository(url);
  }, [url])
  
  useEffect(() => {
    document.addEventListener('keydown', console.log("asd"));
    return () => {
      document.removeEventListener('keydown', console.log("asd"));
    }
  }, [])

  return (
    <div className={"hierarchyPanel"} id="hierarchy">
      <input ref={urlInputRef} id="hierarchy" className="urlInput" type="text" onChange={handleKeyEnter} placeholder="C:\ ..."/>
      <div className="folderContent">
        {data && <Folder id="hierarchy" name={data.name} children={data.children} loadFile={loadFile}/>}
      </div>
    </div>
  )
};

export default Hierarchy;