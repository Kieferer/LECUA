import { useEffect } from "react";
import './hierarchy.css'
const Hierarchy = () => {
  useEffect(() => {
    const resizableDiv = document.getElementById('myResizableDiv');
    let startX;
    let startWidth;

    const handleMouseDown = (event) => {
      startX = event.clientX;
      startWidth = parseInt(document.defaultView.getComputedStyle(resizableDiv).width, 10);

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (event) => {
      const width = startWidth + (event.clientX - startX);
      resizableDiv.style.width = `${width}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    resizableDiv.addEventListener('mousedown', handleMouseDown);

    return () => {
      resizableDiv.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className={"hierarchyPanel"} id="myResizableDiv">
      <p className={"hierarchyTitle"}>HIERARCHY</p>
    </div>
  )
};

export default Hierarchy;