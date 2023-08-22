import React from 'react';
import File from './File';
import Folder from './Folder';
import { block } from 'million';

const Element = block((children, loadFile) => {
  return (
    children.map((element) => element.children ? (
      <Folder
        key={element.path}
        name={element.name}
        children={element.children}
        path={element.path}
        loadFile={loadFile}
      />
    ) : (
      <File
        key={element.path}
        name={element.name}
        path={element.path}
        loadFile={loadFile}
      />
    )
    )
  )
}
)

export default Element;