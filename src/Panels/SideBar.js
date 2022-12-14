import React, {useEffect, useState, useCallback} from "react";
import "../CSS/Layout.css"
import Map from "../Mapping/Map";
import PointDensity from "../tools/PointDensity";
import Section from "./Section";
import DisplayIcons from "../img/DisplayIcons"

function SideBar({nameAndMapArr, geoJsonObj, nameAndMap}) {

//---------------------------------------------------------------------------------------------------------------------------------
  //STATE MANAGEMENT
//---------------------------------------------------------------------------------------------------------------------------------

  //RENDERING
  const[base, setBase] = useState('1');
  const [index, setIndex] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [renderer, setRenderer] = useState(false);

  //GEOJSON
  const [toGeoJsonArr, setToGeoJsonArr] = useState(null);
  const [geoJsonArr, setGeoJsonArr] = useState([]);

  //SYMBOLOGY
  const [renderSymbology, setRenderSymbology] = useState(false)
  const [symbologyObject, setSymbologyObject] = useState({})
  const [symbologyArr, setSymbologyArr] = useState([])
  const [clickedImage, setClickedImaged] = useState(null)

  // useEffect(() => {
  //   //console.log(geoJsonObj)
  // },[geoJsonObj.features])

   useEffect(()=>{
    //console.log(clickedImage)
    var geojsonMarkerOptions3 = {
      radius: 5,
      fillColor: "#33ccff",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.9
    };
    setTimeout(() => {
      if(nameAndMap.layerName != ''){
        //setNameAndMapArr(current => [...current, nameAndMap])
        setToGeoJsonArr(L.geoJSON(geoJsonObj, {
          pointToLayer: function(feature, latlng) {
            if(!clickedImage){
              return new L.CircleMarker(latlng, geojsonMarkerOptions3);
            }
          },
          onEachFeature: function(feature, layer){
            let formatPopup = (object) =>{
              let out = [];
                for(let objVal in object){
                  let string = objVal +': '+object[objVal]
                  out.push(string)
                }
                return out.join('<br>');
            }
            let callout = formatPopup(feature.properties)
            layer.bindPopup('<p>'+callout+'</p>')
          },

        }))
      }
    }, 500);
    setRenderer(true)
  },[geoJsonObj.features, clickedImage])

  // const [geoJsonOptions, setGeoJsonOptions] = useState(
  //   {
  //     pointToLayer: function(feature, latlng) {
  //       return new L.CircleMarker(latlng, geojsonMarkerOptions3);
  //     },
  //     onEachFeature: function(feature, layer){
  //       let formatPopup = (object) =>{
  //         let out = [];
  //           for(let objVal in object){
  //             let string = objVal +': '+object[objVal]
  //             out.push(string)
  //           }
  //           return out.join('<br>');
  //       }
  //       let callout = formatPopup(feature.properties)
  //       layer.bindPopup('<p>'+callout+'</p>')
  //     }})
  //console.log(geoJsonOptions);


  

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
  //Right Click Event
//---------------------------------------------------------------------------------------------------------------------------------

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault()
    if (e.type === "contextmenu") {
      setAnchorPoint({ x: e.pageX, y: e.pageY });
      setShow(!show)
      
    }
  };
  
//---------------------------------------------------------------------------------------------------------------------------------
  //POINT DENSITY
//---------------------------------------------------------------------------------------------------------------------------------

  const [renderPointDensity, setRenderPointDensity] = useState(false);
  const initiatePointDensity=()=>{
    console.log("Point Density")
    setShow(!show)
    setRenderPointDensity(!renderPointDensity)
    setRenderCluster(false)
    setRenderSymbology(false)
  }

//---------------------------------------------------------------------------------------------------------------------------------
  //CLUSTER
//---------------------------------------------------------------------------------------------------------------------------------
  
  const [clusterValue, setClusterValue] = useState(80)
  const [renderCluster, setRenderCluster] = useState(false);
  const [clusterIndex, setClusterIndex] = useState(null)
  console.log(clusterIndex)
  const [geoJsonCluster, setGeoJsonCluster] = useState(null)

  const initiateCluster=(e) =>{
    setShow(!show)
    setRenderPointDensity(false)
    setRenderCluster(!renderCluster)
    setRenderSymbology(false)
    if(nameAndMapArr[indexSearch].mapped){
      nameAndMapArr[indexSearch].mapped = false
    }
    setClusterIndex(e.target.value)
  }

  const onClusterChange = (e) => {
    setClusterValue(e.target.value)
  }

//---------------------------------------------------------------------------------------------------------------------------------
  //SYMBOLOGY
//---------------------------------------------------------------------------------------------------------------------------------



  const initiateSymbology=()=>{
      setShow(!show)
      setRenderCluster(false)
      setRenderPointDensity(false)
      setRenderSymbology(!renderSymbology)
    }

  useEffect(()=>{
    function importAll(r) {
      let images = {};
      r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
      return images
    }
    const images = importAll(require.context('../img/leafletPinsIcons', true, /\.(png|jpe?g|svg)$/))
    setSymbologyObject(images)
    setSymbologyArr(Object.keys(images))
  },[])

//--------------------------------------------------------------------------------------------------------------------------------
  // Image Setting
//--------------------------------------------------------------------------------------------------------------------------------


  //console.log(clickedImage)

  const onImageClick = (e) => {
    console.log(e.target.src)
    let myIcon = L.icon({
      iconUrl: e.target.src
    })
    setClickedImaged(myIcon)
  }

 //--------------------------------------------------------------------------------------------------------------------------------
//
  //INITIATE HOVER
//---------------------------------------------------------------------------------------------------------------------------------

  const initiateHover=()=>{
    setShow(!show)
  }
  const [heatLayerValue, setHeatLayerValue] = useState(0)
  const onHeatRadiusChange = (e) => {
      setHeatLayerValue(e.target.value)
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
                    {!renderCluster ?(
                    <label key={index} onContextMenu={handleClick}>
                      <input value={index} key={index} type="checkbox" onChange={pointChange} /> {i.layerName }
                    </label>  
                    ):(<>
                    <label key={index} onContextMenu={handleClick}>
                      <input value={index} key={index} type="checkbox" onChange={pointChange} disabled="disabled"/> {i.layerName }
                    </label>
                    
                    </>)}
                    
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
        <Map base={base} index = {index} clickCount = {clickCount} nameAndMapArr={nameAndMapArr} geoJsonArr={geoJsonArr} heatLayerValue={heatLayerValue} renderCluster={renderCluster} clusterValue={clusterValue} clusterIndex={clusterIndex} geoJsonObj={geoJsonObj} clickedImage={clickedImage}/>
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
                          <td><span id="radiusOut"></span> {clusterValue} x</td>
                      </tr>
                </table>
              </div>
        ):<></>}
        {renderSymbology ? (   
          <div className="toolbox">   
                <table>
                    <thead>
                    <tr>
                        <h5>Select Pin</h5>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td><input type="image" src={symbologyObject['a.png']} onClick={onImageClick} /> </td>
                          <td><input type="image" src={symbologyObject['b.png']} onClick={onImageClick} /> </td>
                          <td><input type="image" src={symbologyObject['c.png']} onClick={onImageClick} /> </td>
                        </tr>
                        <tr>
                          <td><input type="image" src={symbologyObject['d.png']} onClick={onImageClick} /> </td>
                          <td><input type="image" src={symbologyObject['e.png']} onClick={onImageClick} /> </td>
                          <td><input type="image" src={symbologyObject['f.png']} onClick={onImageClick} /> </td>
                        </tr>
                        <tr>
                          <td><input type="image" src={symbologyObject['g.png']} onClick={onImageClick} /> </td>
                          <td><input type="image" src={symbologyObject['h.png']} onClick={onImageClick} /> </td>
                          <td><input type="image" src={symbologyObject['i.png']} onClick={onImageClick} /> </td>
                        </tr>
                        <tr>
                          <td><input type="image" src={symbologyObject['j.png']} onClick={onImageClick}/> </td>
                        </tr>
                    </tbody>
                </table>
          </div>
        ):<></>}
        </div>
      </>
    );
  }
}


export default SideBar;
