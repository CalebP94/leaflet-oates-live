import React, {useState, useEffect} from "react";

export default function ListPointFeatures({pointLayerArr}){

    if(pointLayerArr){
        return(
            <>
                {pointLayerArr.map((i, index)=>
                    <label key={index}>
                        <input type="checkbox"/> {i.layerName}
                    </label>
                )}
            </>
        )
    }
    else{
        return(
            <>
            </>
        )
    }
}