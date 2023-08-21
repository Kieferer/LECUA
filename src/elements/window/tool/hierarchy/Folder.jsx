import React, { useState } from 'react'
import Element from './Element';

const Folder = React.memo(({ name, path, children, loadFile }) => {
  const [visible, setVisable] = useState(false);
  const handleClick = () => {
    setVisable(!visible);
  }
  return (
    <div>
      <div className='folderElement' onClick={handleClick}>
        {
          visible ? <img className='icon' placeholder='opened' src='./opened.png'/> :
          <img className='icon' placeholder='closed' src='./closed.png'/>
        }
        {name}
      </div>
      {visible && <ul>{children && Element(children, loadFile)}</ul>}
    </div>

  )
})

export default Folder