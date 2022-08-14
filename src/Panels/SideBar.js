import React, {useState} from "react";
import "../CSS/Layout.css"
import Map from "../Mapping/Map";
import Section from "./Section";
import CSV from "../CSV/CSV"

function SideBar() {

  const[base, setBase] = useState('1')
  const [mapLayer, setMapLayer] = useState(false)
  const handleChange = (e) => {
    const valueI = e.target.value
    setBase(preVal => valueI)
  }

  const pointChange = (e) => {
    console.log(e)
    setMapLayer(!mapLayer)
  }
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
                  <label>
                      <input type="checkbox" onChange={pointChange}/> Council Districts
                  </label>
                  <br></br>
                  {/* <label>
                      <input type="checkbox"/> Sample
                  </label> */}
                  <br/><br/>
              </Section>
              <Section title="Chloropleth">
                  {/* <label>
                      <input type="checkbox"/> Sample
                  </label> */}
                  <br/><br/>
              </Section>
              <Section title="Density" collapsedHeight="32">
              </Section>
        </div>
        </nav>
      </div>
      <div className="child">
        <Map base={base} mapLayer={mapLayer} />
      </div>
    </>
  );
}

export default SideBar;
