import React, { useEffect, useState, useRef, useCallback } from "react";
import { invoke } from '@tauri-apps/api/tauri';
import Folder from "./Folder";
import './hierarchy.css'

const Hierarchy = React.memo(({ setGlobalCode, setFilePath }) => {
  const [data, setData] = useState();
  const [url, setURL] = useState("");
  const urlInputRef = useRef(null);

  const loadRepository = useCallback((root) => {
    invoke("get_file_system_representation", { origin: root }).then(x => setData(JSON.parse(x)));
  }, []);

  const loadFile = useCallback((path) => {
    console.log(path);
    setFilePath(path);
    invoke("load_file", { path: path }).then(data => setGlobalCode(data));
  }, [setFilePath, setGlobalCode]);

  const handleKeyEnter = useCallback((event) => {
    if (event.key === "Enter") {
      setURL(urlInputRef.current.value);
      loadRepository(urlInputRef.current.value);
    }
  }, [loadRepository]);

  useEffect(() => {
    invoke("get_running_location").then(location => {
      setURL(location);
      urlInputRef.current.value = location;
      loadRepository(location);
    });
  }, [loadRepository]);

  return (
    <div className={"hierarchyPanel"} id="hierarchy">
      <input ref={urlInputRef} className="urlInput" onKeyDown={handleKeyEnter} type="text" />
      <div className="folderContent">
        {data && <Folder name={data.name} children={data.children} loadFile={loadFile} />}
      </div>
    </div>
  )
});

export default Hierarchy;
