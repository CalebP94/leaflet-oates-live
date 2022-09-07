import React, {useEffect, useState} from "react";
import "../CSS/Layout.css"
import Map from "../Mapping/Map";
import Section from "./Section";

function SideBar({renderer, nameAndMapArr, toGeoJsonArr}) {
  const[base, setBase] = useState('1');
  const [index, setIndex] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [geoJsonArr, setGeoJsonArr] = useState([]);
  console.log(geoJsonArr)

   
 useEffect(()=>{
  if(toGeoJsonArr){
    console.log("CHANGED GEJSON ARR", toGeoJsonArr)
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
    //setChangedMap(!changeMapped)

/*
Comitted Out becuase redoing the geoJson for L.geoJson()
*/
    if(nameAndMapArr[indexSearch].mapped){
      nameAndMapArr[indexSearch].mapped = false
    }
    else{
      nameAndMapArr[indexSearch].mapped = true
    }
  };

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
                    <label key={index}>
                      <input value={index} key={index} type="checkbox" onChange={pointChange}/> {i.layerName}
                    </label>
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
          <Map base={base} index = {index} clickCount = {clickCount} nameAndMapArr={nameAndMapArr} geoJsonArr={geoJsonArr}/>
        </div>
      </>
    );
  }
}


export default SideBar;
