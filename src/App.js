import React from "react";
import Map from "./Mapping/Map";
import SideBar from "./Panels/SideBar";
import "./CSS/Layout.css"
import CSV from "./CSV/CSV"

export default function App() {
  return (
    <>

    <div className="parent">
      <SideBar />
    </div>
    
    </>
  );
}
