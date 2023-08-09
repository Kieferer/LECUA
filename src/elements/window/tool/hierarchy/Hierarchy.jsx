import { useEffect, useState, useRef } from "react";
import { invoke } from '@tauri-apps/api/tauri';
import Folder from "./Folder";
import './hierarchy.css'

const Hierarchy = ({ updatedCode, filePath, setFilePath }) => {
  const [data, setData] = useState();
  const [url, setURL] = useState("");
  const urlInputRef = useRef(null);

  const loadRepository = (root) => {
    invoke("get_file_system_representation", { origin: root }).then(x => setData(JSON.parse(x)));
  }

  const loadFile = (path) => {
    setFilePath(path);
    invoke("load_file", { path: path }).then(data => updatedCode(data));
  }

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      setURL(urlInputRef.current.value);
      loadRepository(urlInputRef.current.value);
    }
  }
  
  useEffect(() => {
    invoke("get_running_location").then(location => {
      setURL(location);
      urlInputRef.current.value = location;
      loadRepository(location);
    });
  }, []);
  

  return (
    <div className={"hierarchyPanel"} id="hierarchy">
      <input ref={urlInputRef} className="urlInput" onKeyDown={handleKeyEnter} type="text" />
      <div className="folderContent">
        {data && <Folder name={data.name} children={data.children} loadFile={loadFile} />}
      </div>
    </div>
  )
};

export default Hierarchy;