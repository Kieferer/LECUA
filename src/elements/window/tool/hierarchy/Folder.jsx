import React, { useState } from 'react'
import File from './File';

function Folder({ name, path, children, loadFile }) {
  const [visable, setVisable] = useState(true);
  const handleClick = () => {
    setVisable(!visable);
  }
  return (
    <div>
      <div className='folderElement' onClick={handleClick}>
        {
          visable ? <img className='icon' placeholder='opened' src='./opened.png'/> :
          <img className='icon' placeholder='closed' src='./closed.png'/>
        }
        {name}
      </div>
      {visable && <ul>
        {children && children.map((element, id) => element.children ?
          <Folder key={id} name={element.name} children={element.children} path={element.path} loadFile={loadFile} /> :
          <File key={id} name={element.name} path={element.path} loadFile={loadFile} />)}
      </ul>
      }
    </div>

  )
}

export default Folder