import React, { useEffect, useRef, useState } from 'react';
import L, { point } from 'leaflet';
import "leaflet.browser.print/dist/leaflet.browser.print.js";
import "leaflet.markercluster/dist/leaflet.markercluster";

export default function InheritMap({map, base, index, clickCount, nameAndMapArr, geoJsonArr, heatLayerValue}){

    const [changerMap, setChangerMap] = useState(null);
    const tileRef = useRef(null);
    const intBase = parseInt(base);
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
                // pointsToAdd.bindPopup("help")
                map.addLayer(pointsToAdd)
            }
            else if(!nameAndMapArr[index].mapped){
                map.removeLayer(pointsToAdd)
            }
        }
    },[clickCount])
// useEffect(() => {

  
  //   // console.log(pointsRef)
  //   // console.log(mapLayer)
  //   if(mapLayer){
  //     pointsRef.current = L.geoJSON(data)
  //     map.addLayer(pointsRef.current)
  //   }
  //   else if(!mapLayer && pointsRef.current){
  //     map.removeLayer(pointsRef.current)
  //   }
  // },[pointLayerArr])

  // useEffect(() => {
    
  //   console.log(points)
  // },[mapLayer])

  // console.log(map._handlers);
  // // let backgroundStreets = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
  // // let topo = L.tileLayer("https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=syDzGMyNxJqfudLD0yI7")
  // // tileRef.current = L.tileLayer(
  // //   `https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=syDzGMyNxJqfudLD0yI7`
  // //   // {
  // //   //   attribution:
  // //   //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  // //   // }
  // // );
  // useEffect(() => {
  //   async function Baser(){
  //   const abortController = new AbortController();
  //   try{
  //     const num = base;
  //     if (!map && !num){
  //       tileRef.current = await L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, 
  //       {signal: abortController.signal});
  //       // //console.log(tileRef.current);
  //       // console.log(map)
  //       // map.addLayer(tileRef.current);
  //     }
  //     else if(intBase===1){
  //       // Set map instance to state:
  //       tileRef.current = await L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, 
  //                                           {signal: abortController.signal});
  //       // //console.log(tileRef.current);
  //       // console.log(map)
  //       // map.addLayer(tileRef.current);
  //     }
  //     // else if(intBase===2){
  //     //   map.removeLayer(tileRef.current)
  //     //   console.log(map)
  //     //   //lcontrol.removeLayer(backgroundStreets)
  //     //   //map.removeLayer(backgroundStreets);
  //     // }
  //     // if (map && !base || base==1) {
  //     //   //Add the base layer to the control:
  //     //   layerControlRef.current = L.control
  //     //     .layers({
  //     //       OpenStreetMap: tileRef.current,
  //     //     })
  //     //     .addTo(map);
  
  //     //   //
  //     //   //Add zoomControl:
  //     //   zoomControlRef.current = L.control
  //     //     .zoom({
  //     //       position: 'topright',
  //     //     })
  //     //     .addTo(map);
  
  //     //   setLayerControl(layerControlRef.current);
  //     //   setZoomControl(zoomControlRef.current);
  //     //}
  //   } catch(error){
  //     console.log(error.name)
  //     console.log(error)
  //   }
  //   }
  //   Baser();
  //   return () => {
  //     abortController.abort(); // Cancels any pending request or response
  //   };
  
  // }, [base]);
  // // // Map events:
  // useEffect(() => {
  //   if(map){
  //     console.log(tileRef.current);
  //   }
  // }, [tileRef])

  // useEffect(() => {
  //   if (!map) return;
  //   if (map) {
  //     map.on('zoomstart', () => {
  //       console.log('ZOOM STARTED');
  //       console.log(map.getZoom());
  //     });
  //   }
  // }, [tileRef]);

  // Create the layerGroup:
  
  // useEffect(() => {
  //   if (!map) return;
  //   if (map) {
  //     if (layerControl) {
  //       circleLayerRef.current = L.layerGroup().addTo(map);
  //       setCircleLayer(circleLayerRef.current);
  //     }
  //   }
  // }, [map, layerControl]);

  // // Add circle layer to the layer control:
  // useEffect(() => {
  //   if (!map) return;
  //   if (map) {
  //     if (layerControl && circleLayer) {
  //       layerControl.addOverlay(circleLayer, 'Circles');
  //     }
  //   }
  // }, [map, layerControl, circleLayer]);

  // // Add the city circles to the map:
  // useEffect(() => {
  //   if (!map) return;
  //   if (map) {
  //     if (circleLayer) {
  //       circleLayer.clearLayers();
  //       Array.from(cityData).forEach((city) => {
  //         L.circle(city.latLng, { radius: 100000 }).addTo(circleLayer);
  //       });
  //     }
  //   }
  // }, [map, cityData, circleLayer]);

  // return (
  //   <>
  //     <CSV mapLayer={mapLayer} pointsRef={pointsRef}/>
  //   </>
  // );
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