import React, { useEffect, useRef, useState } from 'react';
import L, { point } from 'leaflet';
import easyPrint from 'leaflet-easyprint'
import "leaflet.browser.print/dist/leaflet.browser.print.js";
import { data } from '../data/data';
import "../CSS/Map.css";
import CSV from "../CSV/CSV"
import InheritMap from './InheritMap';

const Map = ({base, pointLayerArr, index, clickCount, nameAndMapArr}) => {
  console.log(pointLayerArr)
// Map state:
  const [toGeoJson, setToGeoJson] = useState(null);  
  const [geoJsonArr, setGeoJsonArr] = useState([])
  //console.log(toGeoJson)
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const mapParams = {
    center: [51.5072, 0.1276], // USA
    zoom: 8,
    zoomControl: true,
    zoomSnap: 0.75,
    maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    closePopupOnClick: false, // Start with just the base layer
  };
  useEffect(() => {
    mapRef.current = L.map('map', mapParams);
    //L.control.browserPrint().addTo(map.current);
    setMap(mapRef.current);
  }, []);

  useEffect(() => {
    function geoJsonSet(){
      if(clickCount){
        setToGeoJson(L.geoJSON(pointLayerArr[index]))
      }
    }
    geoJsonSet();
  },[index])

  useEffect(()=> {
    //console.log(toGeoJson)
    if(toGeoJson){
      setGeoJsonArr(current => [...current, toGeoJson])
    }
  }, [toGeoJson])

  return (
    <>
      <InheritMap map={map} base={base} toGeoJson={toGeoJson} pointLayerArr={pointLayerArr} index={index} clickCount={clickCount} nameAndMapArr ={nameAndMapArr} geoJsonArr = {geoJsonArr}/>
    </>
  );
};

export default Map;
