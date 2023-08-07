import { useEffect, useState } from "react";
import {invoke} from '@tauri-apps/api/tauri';
import Folder from "./Folder";
import './hierarchy.css'

const Hierarchy = ({updatedCode, filePath, setFilePath}) => {
  const [data, setData] = useState();
  
  const loadRepository = (root) => {
    invoke("get_file_system_representation", {origin: root}).then(x => setData(JSON.parse(x)));
  }

  const loadFile = (path) => {
    setFilePath(path);
    invoke("load_file", {path: path}).then(data => updatedCode(data));
  }

  return (
    <div className={"hierarchyPanel"}>
      {data && <Folder name={data.name} children={data.children} loadFile={loadFile}/>}
    </div>
  )
};

export default Hierarchy;