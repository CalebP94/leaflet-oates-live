import React, { useEffect, useRef, useState } from 'react';
import L, { point } from 'leaflet';
import "leaflet.browser.print/dist/leaflet.browser.print.js";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default function InheritMap({map, base, index, clickCount, nameAndMapArr, geoJsonArr, heatLayerValue, markers, renderCluster, clusterIndex, clickedImage}){

    console.log(clusterIndex, renderCluster, console.log(index))

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

//GeoJSON Reading

    useEffect(()=>{
        if(index){
            let pointsToAdd = geoJsonArr[index]
            //console.log(pointsToAdd)
            if(nameAndMapArr[index].mapped){
                console.log(pointsToAdd)
                map.addLayer(pointsToAdd)
                console.log(map)
            }
            else if(!nameAndMapArr[index].mapped){
                map.removeLayer(pointsToAdd)
                console.log(map)
            }
        }
        // else if(clusterIndex && !index){
        //     let clusterToAdd = geoJsonArr[clusterIndex]
        //     let clusterID = geoJsonArr[clusterIndex]._leaflet_id
        //     console.log(clusterID, clusterToAdd)
        //     if(renderCluster){             
        //         markers.addLayer(clusterToAdd)
        //         map.addLayer(markers)
        //         console.log(map)
        //     }
            // else if(!renderCluster){
            //     console.log("REMOVE?")
            //     map.eachLayer((layer)=>{
            //         let obj = layer._eventParents

            //         for(let i in obj){
            //             if(i == clusterID){
            //                 map.removeLayer(layer)
            //             }
            //             else{
            //                 map.removeLayer(layer)
            //             }
            //         }
            //     })
            // }
    //}
    },[clickCount,clickedImage])

    useEffect(() => {
        if(clusterIndex || clusterIndex === 0){
            console.log(renderCluster, clusterIndex)
            let clusterToAdd = geoJsonArr[clusterIndex]
            let clusterID = geoJsonArr[clusterIndex]._leaflet_id
            console.log(clusterID, clusterToAdd)
            if(renderCluster){                
                markers.addLayer(clusterToAdd)
                map.addLayer(markers)
                console.log(map)
            }
            else if(!renderCluster){
                console.log("REMOVE?")
                map.eachLayer((layer)=>{
                    let obj = layer._eventParents
                    for(let i in obj){
                        if(i == clusterID){
                            map.removeLayer(layer)
                        }
                        else{
                            map.removeLayer(layer)
                        }
                    }
                })
                //map.removeLayer(markers)
            }
        }
    },[clusterIndex, renderCluster])

  useEffect(() =>{
        if(heatLayerValue){
            let heatLayerGeo = geoJsonArr[index]
        }
    },[heatLayerValue])

    return (
        <>
            <div id="map"/>
        </>
    )
}