import React from 'react'
import './notification.css'


function Notification({imagePath, message}) {
  return (
    <div className='notificationBox'>
      <img src={imagePath}/>
      <p>{message}</p>
    </div>
  )
}

export default Notification