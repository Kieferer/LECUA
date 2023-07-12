import { useEffect, useState } from "react";
import {invoke} from '@tauri-apps/api/tauri';
import Folder from "./Folder";
import './hierarchy.css'

const Hierarchy = () => {
  const [isUpdated, setUpdated] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    invoke("get_file_system_representation", {origin: "D:\\SimCity"}).then(x => setData(JSON.parse(x), console.log(x)));
    setUpdated(false);
  }, [isUpdated])

  return (
    <div className={"hierarchyPanel"}>
      {data && <Folder name={data.name} children={data.children}/>}
    </div>
  )
};

export default Hierarchy;