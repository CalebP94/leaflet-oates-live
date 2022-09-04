import React, { useState, useEffect } from "react";
import "./CSV.css"
import SideBar from "../Panels/SideBar";
import Table from "./Table";
import "../CSS/Map.css";

export default function CSV({mapLayer, pointsRef}) {
/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Beginning of CSV Portion
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const fileReader = new FileReader();
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  const setTruthy = (e) =>{
    setDisplayTable(!displayTable)
  };
    
  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setArray(array);
  };
    
    //when input, or file change handler ^^^ changes, the csvFileToArray runs and sets an array
  useEffect(() => {
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }
  }, [file]);
  const headerKeys = Object.keys(Object.assign({}, ...array));
/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
End of CSV Portion
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Beginning of Toggling Portion
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/*
Comitted Out becuase redoing the geoJson for L.geoJson()
*/
  const nameAndMapObject = {
    layerName:"",
    mapped:false,
  };
/*
Comitted Out becuase redoing the geoJson for L.geoJson()
*/
  const geoJSONState = {
    type: "FeatureCollection",
    features: []
  };

  const [pointLayerArr, setPointLayerArr] = useState([]);
  const [renderer, setRenderer] = useState(false);
  const [geoJson, setGeoJson] = useState({...geoJSONState});
  const [nameAndMap, setNameAndMap] = useState({...nameAndMapObject});
  const [nameAndMapArr, setNameAndMapArr] = useState([]);
  const [featuresArr, setFeaturesArr] = useState([]);

  useEffect(() => {
    if(file){
      let name = file.name.split(".")[0]
      nameAndMapObject.layerName = name;
      //setGeoJson(geoJSONState)
      setNameAndMap(nameAndMapObject)
    } 

    let toGeoJson = array.map((i) => {

      let lat = i[Object.keys(i)[Object.keys(i).length-1]]
      let lon = i[Object.keys(i)[Object.keys(i).length-2]]
      if(lat){ 
        let coordArr = [parseFloat(i[Object.keys(i)[Object.keys(i).length-1]]), parseFloat(i[Object.keys(i)[Object.keys(i).length-2]])];
        const featureObj = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: []
          },
          properties: {
          }
        }
        featureObj.geometry.coordinates = coordArr;
        featureObj.properties = i;
        return featureObj;  
      }
    })
    setFeaturesArr(toGeoJson);
  },[array]);

  useEffect(() => {
    let finalArr = []
    featuresArr.map((i) => {
      if(i){
        finalArr.push(i)
      }
    })
    geoJson.features = finalArr
    setGeoJson(geoJson)
  },[featuresArr]);

  useEffect(()=>{
    if(nameAndMap.layerName != ''){
      setNameAndMapArr(current => [...current, nameAndMap])
    }
    
  },[nameAndMap])

  useEffect(() => {
    //let name = geoJson.layerName;
      setPointLayerArr(current => [...current, geoJson])
      setRenderer(true)
    }, [geoJson]);

/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
End of Toggling Portion
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
    return (
      <>
        <SideBar renderer={renderer} pointLayerArr={pointLayerArr} featuresArr={featuresArr} nameAndMapArr={nameAndMapArr}/>
          <div className="csv">
              <label htmlFor="csvFileInput" className="custom-file-upload">
                <i className="fa fa-cloud-upload"></i>
              </label>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />
            <br />
            <label htmlFor="table" className="custom-file-upload">
                <i className="fa fa-bars"></i>
                <input
                    type={"button"}
                    id={"table"}
                    onClick={setTruthy}
            />
            </label>
          </div> 
          <Table array={array} header={headerKeys} displayTable = {displayTable} />
      </>
    );
  }