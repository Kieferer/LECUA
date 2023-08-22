import React, { useEffect, useRef } from 'react';
import './menu.css';

const Menu = React.memo(({content, setContent}) => {
  const panelRef = useRef(null);

  const handleMouseLeave = () => {
    setContent(null);
  };

  const MenuButtonActionNotImplemented = (name) => {
    alert(`Action of ${name} menu button not implemented yet.`);
  }

  useEffect(() => {
    if (content && panelRef.current) {
      panelRef.current.style.left = content[0].xPos;
      panelRef.current.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        panelRef.current.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [content, setContent]);

  return (
    <div ref={panelRef} className='menuPanel'>
      {content && content.map((option) => 
        <div className='menuOption' key={option.label} onClick={option.action ? option.action : () => MenuButtonActionNotImplemented(`(${option.label})`)}>{option.label}</div>
      )}
    </div>
  )
})

export default Menu;