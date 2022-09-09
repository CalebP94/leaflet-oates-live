import React, { useState, useEffect } from "react";
import './toolbox.css'

export default function PointDensity({renderPointDensity}){

    console.log(renderPointDensity)
    const [value, setValue] = useState(0)
    console.log(value)

    const onChange = (e) => {
        console.log(e)
        setValue(e.target.value)
    }

    if(renderPointDensity){
        return(
        
            <div className="toolbox">
            <table>
                <tr>
                    <td><label htmlFor="radius">radius:</label></td>
                    <td><input onChange={onChange} id="radius" type="range" min="0" max="200" value={value}/></td>
                    <td><span id="radiusOut"></span> {value} x</td>
                </tr>
            </table>
        </div>
    )
    }
    else{
        return(
            <></>
        )
    }

   
}