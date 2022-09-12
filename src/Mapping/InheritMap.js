import React, { useEffect, useRef, useState } from 'react';
import L, { point } from 'leaflet';
import "leaflet.browser.print/dist/leaflet.browser.print.js";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default function InheritMap({map, base, index, clickCount, nameAndMapArr, geoJsonArr, heatLayerValue, markers, renderCluster, clusterIndex,geoJsonObj,clusterValue}){

    //console.log(renderCluster)
    console.log(map)

    const [changerMap, setChangerMap] = useState(null);
    const tileRef = useRef(null);
    const intBase = parseInt(base);
    const [pointLayerKey, setPointLayerKey] = useState(null)
    useEffect(() => {
        async function mapAwait(){
            let mapper = await map
            let browserPrinter = L.control.browserPrint()
            browserPrinter.addTo(mapper)
        }
        mapAwait();
    },[map])

// Alternate base tile for the map:
    useEffect(() => {
        if(map && intBase ===1){
        tileRef.current = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
        map.addLayer(tileRef.current)
        setChangerMap(map);
        }
    },[map])

    useEffect(()=>{
        if(map&&intBase===3){
            map.removeLayer(tileRef.current);
            tileRef.current = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
                subdomains:['mt0','mt1','mt2','mt3']
            });
            //tileRef.current= L.tileLayer(``)
            map.addLayer(tileRef.current)
            }
            else if(map&&intBase===2){
            map.removeLayer(tileRef.current);
            tileRef.current = L.tileLayer("https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=syDzGMyNxJqfudLD0yI7",{
                attribution: '\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e'
            });
            // //tileRef.current= L.tileLayer(``)
            map.addLayer(tileRef.current)
            }
            else if (map && intBase===1){
            map.removeLayer(tileRef.current);
            tileRef.current = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
            map.addLayer(tileRef.current)
        }
    },[base])

    // useEffect(() => {
    //     function geoJsonSet(){
    //       if(clickCount){
    //         setToGeoJson(L.geoJSON(pointLayerArr[index]))
    //       }
    //     }
    //     geoJsonSet();
    //   },[index])
    
    //   useEffect(()=> {
    //     //console.log(toGeoJson)
    //     if(toGeoJson){
    //       setGeoJsonArr(current => [...current, toGeoJson])
    //     }
    //   }, [toGeoJson])

//GeoJSON Reading

    useEffect(()=>{
        if(index){
            let pointsToAdd = geoJsonArr[index]
            if(nameAndMapArr[index].mapped){
                map.addLayer(pointsToAdd)
            }
            else if(!nameAndMapArr[index].mapped){
                map.removeLayer(pointsToAdd)
            }
        }
    },[clickCount])



    useEffect(() => {

        if(clusterIndex){
            let clusterToAdd = geoJsonArr[clusterIndex]
            if(renderCluster){                
                markers.addLayer(clusterToAdd)
                map.addLayer(markers)
            }
            else{
                // markers.removeLayer(clusterToAdd)

                map.removeLayer(markers)
            }
        }
        
        //console.log(geoJsonArr[clusterIndex])
        // L.geoJSON(geoJsonObj, {
        //   pointToLayer: function(feature, latlng){
        //     console.log(feature, latlng)
        //     return markers.addLayer(L.circleMarker(latlng, geoJsonMarker))
        //     //console.log(feature, latlng)
        //   }
        // })
      },[renderCluster,clusterIndex])

//   useEffect(()=>{
    
//     if(renderCluster && markers){
//         let clusterToAdd = geoJsonArr[clusterIndex]
//         //console.log(clusterToAdd)
//     }
//     if(markers && !renderCluster){
//         //console.log("REMOVE", markers)
//     }
//   },[renderCluster])

  useEffect(() =>{
        if(heatLayerValue){
            let heatLayerGeo = geoJsonArr[index]
        }
    },[heatLayerValue])
return(
    <>
        <div id="map"/>
    </>
)
}