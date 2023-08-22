import { appWindow } from '@tauri-apps/api/window';
import React, { useEffect, useState } from 'react';
import Button from "../../button/Button.jsx";
import NavigationMenu from "./navigationMenu/NavigationMenu.jsx";
import Menu from './menu/Menu';
import './titleBar.css';

const TitleBar = () => {
  const [menuContent, setMenuContent] = useState(null);

  useEffect(() => {
    const titlebar = document.getElementById("titlebar");
    titlebar.addEventListener("drag", appWindow.startDragging)
  }, [])

  /*-----------------------MenuContent
  |  MenuContent is the container which render the options of a menu in Titlebar.
  |  Template: const menuContentName = [ {label: text, action: function, xPos: `${number}px`} ]
  |  Action is optional, if its not set, the app going to throw an alert informing about the button
  |  has been not implemented yet.
  */

  const fileMenuContent = [
    {label: "Open file", xPos: "45px"},
    {label: "Open folder", xPos: "45px"},
    {label: "Open workspace", xPos: "45px"},
    {label: "Save file", xPos: "45px"},
    {label: "Exit", action: () => appWindow.close(), xPos: "45px"}
  ];
  const editMenuContent = [
    {label: "Undo", xPos: "125px"},
    {label: "Redo", xPos: "125px"},
    {label: "Cut", xPos: "125px"},
    {label: "Copy", xPos: "125px"},
    {label: "Paste", xPos: "125px"},
    {label: "Find", xPos: "125px"},
    {label: "Replace", xPos: "125px"}
  ];
  const viewMenuContent = [
    {label: "Terminal", xPos: "200px"},
    {label: "Hierarchy", xPos: "200px"},
    {label: "CodeEditor", xPos: "200px"},
    {label: "Zoom in", xPos: "200px"},
    {label: "Zoom out", xPos: "200px"}
  ];

  return (
    <div data-tauri-drag-region className="titlebar" id={"titlebar"}>
      <div className={"titlebar-left"}>
        <div className="titlebar-menu">
          <img src="/lecuaLogo.png" className="logoApp" alt="Vite logo" />
        </div>
        <div className="titlebar-menu">
          <Button label={"File"} action={() => setMenuContent(fileMenuContent)}/>
          <Button label={"Edit"} action={() => setMenuContent(editMenuContent)}/>
          <Button label={"View"} action={() => setMenuContent(viewMenuContent)}/>
          <Menu content={menuContent} setContent={setMenuContent}/>
        </div>
      </div>
      <div className={"titleName"}>LECUA</div>
      <NavigationMenu />
    </div>
  );
};

export default TitleBar;
