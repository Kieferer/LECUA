import { useEffect, useState } from "react";
import {invoke} from '@tauri-apps/api/tauri';
import './hierarchy.css'
const Hierarchy = () => {
  const [a, setA] = useState();
  useEffect(() => {
    invoke("get_file_system_representation", {origin: "D:\\asd"}).then(x => console.log(x));
  }, [])
  

  return (
    <div className={"hierarchyPanel"} id="myResizableDiv">
      <p className={"hierarchyTitle"}>HIERARCHY</p>
    </div>
  )
};

export default Hierarchy;