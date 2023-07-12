import React from 'react'
import './terminal.css';

function Terminal({output}) {
  return (
    <div className='terminal'>
      <pre>{output}</pre>
    </div>
  );
}

export default Terminal