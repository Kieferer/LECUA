import { useEffect, useState } from "react";
import {invoke} from '@tauri-apps/api/tauri';
import Folder from "./Folder";
import './hierarchy.css'

const Hierarchy = ({updatedCode}) => {
  const [isUpdated, setUpdated] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    invoke("get_file_system_representation", {origin: "C:\\Kieferer\\LECUA"}).then(x => setData(JSON.parse(x)));
    setUpdated(false);
  }, [isUpdated])

  const loadFile = (path) => {
    invoke("load_file", {path: path}).then(data => updatedCode(data));
  }

  return (
    <div className={"hierarchyPanel"}>
      {data && <Folder name={data.name} children={data.children} loadFile={loadFile}/>}
    </div>
  )
};

export default Hierarchy;