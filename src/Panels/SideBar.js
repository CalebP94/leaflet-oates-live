import React, {useEffect, useState, useCallback} from "react";
import "../CSS/Layout.css"
import Map from "../Mapping/Map";
import PointDensity from "../tools/PointDensity";
import Section from "./Section";

function SideBar({renderer, nameAndMapArr, toGeoJsonArr}) {
  const[base, setBase] = useState('1');
  const [index, setIndex] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [geoJsonArr, setGeoJsonArr] = useState([]);

//---------------------------------------------------------------------------------------------------------------------------------
  //GeoJson Array Creation
//---------------------------------------------------------------------------------------------------------------------------------
 useEffect(()=>{
  if(toGeoJsonArr){
    setGeoJsonArr(current => [...current, toGeoJsonArr])
  }
 },[toGeoJsonArr])
  const handleChange = (e) => {
    const valueI = e.target.value
    setBase(preVal => valueI)
  };
  const pointChange = (e) => {
    let indexSearch = e.target.value;
    setIndex(indexSearch)
    setClickCount( value => value+=1)
    if(nameAndMapArr[indexSearch].mapped){
      nameAndMapArr[indexSearch].mapped = false
    }
    else{
      nameAndMapArr[indexSearch].mapped = true
    }
  };

//---------------------------------------------------------------------------------------------------------------------------------
//  Right Click Event
//---------------------------------------------------------------------------------------------------------------------------------

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [renderPointDensity, setRenderPointDensity] = useState(false);
  console.log(renderPointDensity)
  const [renderCluster, setRenderCluster] = useState(false);
  

  const handleClick = (e) => {
    e.preventDefault()
    console.log(e.type)
    if (e.type === "contextmenu") {
      console.log(e)
      setAnchorPoint({ x: e.pageX, y: e.pageY });
      setShow(!show)
    }
  };
  const initiatePointDensity=() =>{
    console.log("Point Density")
    setShow(!show)
    setRenderPointDensity(!renderPointDensity)
    setRenderCluster(false)
  }
  const initiateCluster=() =>{
    console.log("Point Density")
    setShow(!show)
    setRenderPointDensity(false)
    setRenderCluster(!renderCluster)
  }
  const initiateSymbology=()=>{
    setShow(!show)
  }
  const initiateHover=()=>{
    setShow(!show)
  }
  const [heatLayerValue, setHeatLayerValue] = useState(0)
  const [clusterValue, setClusterValue] = useState(80)
  const onHeatRadiusChange = (e) => {
      setHeatLayerValue(e.target.value)
  }
  const onClusterChange = (e) => {
    setClusterValue(e.target.value)
}

  if(!renderer){
    return (
      <>
        <div className="wrapper">
          <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Control Panel</h3>
                <button id="toggle">
                  <span className="oi oi-chevron-left"></span>
                </button>
            </div>
            <ul className="list-unstyled components">
                <form>
                  <label htmlFor="baseLayer" className="ml-1">
                    Base Map
                  </label>
                  <select className="form-select p-2 h-15 w-75 ml-3" onChange={handleChange}>
                    <option value="1"> Open Street Map</option>
                    <option value="2"> Topographic </option>
                    <option value="3"> Google Hypbrid </option>
                  </select>
                </form>
            </ul>
            <div className="m-3">
                <Section title="Layers" defaultExpanded="true">
                <br/><br/>
                </Section>
                <Section title="Chloropleth">
                  <br/><br/>
                </Section>
                <Section title="Density" collapsedHeight="32">
                <br/><br/>
                </Section>
          </div>
          </nav>
        </div>
        <div className="child">
          <Map base={base} index={index} clickCount={clickCount} />
        </div>
      </>
    );
  }
  else{
    return (
      <>
        <div className="wrapper">
          <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Control Panel</h3>
                <button id="toggle">
                  <span className="oi oi-chevron-left"></span>
                </button>
            </div>
            <ul className="list-unstyled components">
                <form>
                  <label htmlFor="baseLayer" className="ml-1">
                    Base Map
                  </label>
                  <select className="form-select p-2 h-15 w-75 ml-3" onChange={handleChange}>
                    <option value="1"> Open Street Map</option>
                    <option value="2"> Topographic </option>
                    <option value="3"> Google Hypbrid </option>
                  </select>
                </form>
            </ul>
            <div className="m-3">
                <Section title="Layers" defaultExpanded="true">
                  {nameAndMapArr.map((i, index)=>
                  <div >
                    <label key={index} onContextMenu={handleClick}>
                      <input value={index} key={index} type="checkbox" onChange={pointChange} /> {i.layerName }
                    </label>
                    {show ? (
                      <ul
                        className="menu"
                        style={{
                          top: anchorPoint.y,
                          left: anchorPoint.x
                        }}
                      >
                      <li onClick={initiatePointDensity}>Point Density</li>
                      <li onClick={initiateCluster}>Cluster Layer</li>
                      <li onClick={initiateSymbology}>Symbology </li>
                      <li onClick={initiateHover}>Hover Callout</li>
                      </ul>):(<></>)}
                  </div>
                  )}
                <br/><br/>
                </Section>
                <Section title="Chloropleth">
                  <br/><br/>
                </Section>
                <Section title="Density" collapsedHeight="32">
                
                <br/><br/>
                </Section>
          </div>
          </nav>
        </div>
        <div className="child">
        <Map base={base} index = {index} clickCount = {clickCount} nameAndMapArr={nameAndMapArr} geoJsonArr={geoJsonArr} heatLayerValue={heatLayerValue}/>
        {renderPointDensity ? (
                <div className="toolbox">
                  <table>
                    <h5>Heat Analysis</h5>
                      <tr>
                          <td><label for="radius">radius:</label></td>
                          <td><input onChange={onHeatRadiusChange} id="radius" type="range" min="0" max="200" value={heatLayerValue}/></td>
                          <td><span id="radiusOut"></span> {heatLayerValue} x</td>
                      </tr>
                  </table>
              </div>
        ):<></>}
                {renderCluster ? (
                <div className="toolbox">
                  <table>
                      <tr>
                      <h5>Cluster Control</h5>
                      </tr>
                      <tr>
                          <td><label for="radius">radius:</label></td>
                          <td><input onChange={onClusterChange} id="radius" type="range" min="0" max="200" value={clusterValue}/></td>
                          <td><span id="radiusOut"></span> {heatLayerValue} x</td>
                      </tr>
                  </table>
              </div>
        ):<></>}
        </div>

      </>
    );
  }
}


export default SideBar;
