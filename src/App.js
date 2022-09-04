import React from "react";
import SideBar from "./Panels/SideBar";
import "./CSS/Layout.css"
import CSV from "./CSV/CSV";
import {BrowswerRouter as Router} from 'react-router-dom'

export default function App() {
  return (
    <>

    <div className="parent">
      <CSV />
      {/* <SideBar /> */}
    </div>
    
    </>
  );
}
