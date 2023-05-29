import React, {useEffect} from "react";
import {appWindow} from "@tauri-apps/api/window";
import './navigationMenu.css';
import {Icon} from "@iconify/react";
const NavigationMenu = () => {
  useEffect(() => {
    const minimizeWindow = () => {
      appWindow.minimize();
    };

    const maximizeWindow = () => {
      appWindow.toggleMaximize();
    };

    const closeWindow = () => {
      appWindow.close();
    };

    const minimizeButton = document.getElementById('titlebar-minimize');
    const maximizeButton = document.getElementById('titlebar-maximize');
    const closeButton = document.getElementById('titlebar-close');

    minimizeButton.addEventListener('click', minimizeWindow);
    maximizeButton.addEventListener('click', maximizeWindow);
    closeButton.addEventListener('click', closeWindow);

    return () => {
      minimizeButton.removeEventListener('click', minimizeWindow);
      maximizeButton.removeEventListener('click', maximizeWindow);
      closeButton.removeEventListener('click', closeWindow);
    };
  }, []);

  return (
    <div className={"titlebar-navigationbar"}>
      <div className="titlebar-button" id="titlebar-minimize">
        <Icon icon="fluent:minimize-12-filled" color="white" />
      </div>
      <div className="titlebar-button" id="titlebar-maximize">
        <Icon icon="fluent:maximize-16-filled" color="white" />
      </div>
      <div className="titlebar-button" id="titlebar-close">
        <Icon icon="fluent:dismiss-12-regular" color="white" />
      </div>
    </div>
  )
}

export default NavigationMenu;