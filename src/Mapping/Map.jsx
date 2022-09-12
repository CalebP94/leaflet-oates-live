import React, { useEffect, useRef, useState } from 'react';
import L, { point } from 'leaflet';
import easyPrint from 'leaflet-easyprint'
import "leaflet.browser.print/dist/leaflet.browser.print.js";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { data } from '../data/data';
import "../CSS/Map.css";
import CSV from "../CSV/CSV"
import InheritMap from './InheritMap';


const Map = ({base, index, clickCount, nameAndMapArr, toGeoJsonArr, geoJsonArr, heatLayerValue, renderCluster, clusterValue, clusterIndex, geoJsonObj}) => {

  //console.log(geoJsonObj)

// Map state:
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState(null)
  //console.log(markers)
  const [geoJsonCluster, setGeoJsonCluster] = useState(null)
  //console.log(geoJsonCluster)
  // const[featureLength, setFeatureLength0] = useState()
  // let featureLength=geoJsonObj['features'].length
  //console.log(geoJsonCluster)
  //console.log(markers, renderCluster)
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
    setMap(mapRef.current);
  }, []);

  useEffect(() => {
    setMarkers(L.markerClusterGroup({
      zoomToBoundsOnClick:true,
      spiderfyOnEveryZoom:true,
      spiderfyOnMaxZoom:true,
      maxClusterRadius:clusterValue
    }))
  }, [map, clusterValue, renderCluster])

  const geoJsonMarker = {
    radius:8,
    fillColor:"#ff7800",
    color:"#000",
    weight: 1,
    opacity:1,
    fillOpacity: 0.8
}

  // useEffect(() => {
  //   console.log("TEST")
  //   // L.geoJSON(geoJsonObj, {
  //   //   pointToLayer: function(feature, latlng){
  //   //     console.log(feature, latlng)
  //   //     return markers.addLayer(L.circleMarker(latlng, geoJsonMarker))
  //   //     //console.log(feature, latlng)
  //   //   }
  //   // })
  // },[renderCluster,renderCluster, clusterValue])



  return (
    <>
      <InheritMap map={map} base={base} index={index} clickCount={clickCount} nameAndMapArr ={nameAndMapArr} toGeoJsonArr={toGeoJsonArr}  geoJsonArr={geoJsonArr} heatLayerValue={heatLayerValue} markers={markers} renderCluster={renderCluster} clusterIndex={clusterIndex} geoJsonObj={geoJsonObj} clusterValue={clusterValue}/>
    </>
  );
};

export default Map;
