import React, {useState, useEffect} from "react";
import ListPointFeatures from "./ListPointFeatures";
/*
    file and array are accepted from CSV.js, and are established from changehandler from CSV input button... 
*/

export default function PointToggling({array, file}){


    const initialState = {
        layerName:"",
        layerArr:[]
    }
    const [pointLayerObj, setPointLayerObj] = useState({...initialState})
    const [pointLayerArr, setPointLayerArr] = useState([])

    useEffect(() => {
        if(file) {
            let name = file.name.split(".")[0]
            initialState.layerName = name;
            setPointLayerObj(initialState)
        }  
        if(array && array.length != 0){
          initialState.layerArr = array
          setPointLayerObj(initialState)
        }
    }, [array])
    
    useEffect(() => {
        let name = pointLayerObj.layerName
        if(name != ''){
            pointLayerArr.push(pointLayerObj)
            console.log(pointLayerArr.length, pointLayerArr)
            pointLayerArr.map((i) => {
                //console.log("INDEX",pointLayerArr.indexOf(i))
                console.log(i.layerName)
            })
        }
    }, [pointLayerObj])

    return(
        <>
            <ListPointFeatures pointLayerArr= {pointLayerArr} />
        </>
    )
}