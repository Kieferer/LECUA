import { appWindow } from '@tauri-apps/api/window';
import React, { useEffect } from 'react';
import './titleBar.css';
import Button from "../../button/Button.jsx";
import NavigationMenu from "./navigationMenu/NavigationMenu.jsx";

const TitleBar = () => {
  useEffect(() => {
    const titlebar = document.getElementById("titlebar");
    titlebar.addEventListener("drag", appWindow.startDragging)
  }, [])

  return (
    <div data-tauri-drag-region className="titlebar" id={"titlebar"}>
      <div className={"titlebar-left"}>
        <div className="titlebar-menu">
          <img src="/lecuaLogo.png" className="logoApp" alt="Vite logo" />
        </div>
        <div className="titlebar-menu">
            <Button label={"File"}/>
            <Button label={"Edit"}/>
            <Button label={"View"}/>
        </div>
      </div>
      <div className={"titleName"}>LECUA</div>
      <NavigationMenu/>
    </div>
  );
};

export default TitleBar;
