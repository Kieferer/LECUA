import React from 'react'

const File = React.memo(({name, path, loadFile}) => {
  const getIcon = () => {
    if (name.includes(".rs")){
      return './rustLogo.png';
    } else if (name.includes(".java")) {
      return './javaLogo.png';
    }
    return null;
  }

  const handleClick = () => {
    loadFile&&loadFile(path);
  }

  return (
    <div className='fileElement' onClick={handleClick}>
      {getIcon() && <img className='icon' src={getIcon()}/>}
      {name}
    </div>
  )
});

export default File