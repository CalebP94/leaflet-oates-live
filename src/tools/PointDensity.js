import React, { useState, useEffect } from "react";
import './toolbox.css'

export default function PointDensity({renderPointDensity}){

    if(renderPointDensity){
        return(
        
            <div className="toolbox">
            <table>
                <tr>
                    <td><label for="radius">radius:</label></td>
                    <td><input id="radius" type="range" min="0" max="200" value="0"/></td>
                    <td><span id="radiusOut"></span> x</td>
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