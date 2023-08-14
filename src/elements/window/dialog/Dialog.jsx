import "./dialog.css"

function Dialog({children}) {
  return (
    <div className='dialog-background'>
      <div className='dialog-content'>
        {children}
      </div>
    </div>
  )
}

export default Dialog