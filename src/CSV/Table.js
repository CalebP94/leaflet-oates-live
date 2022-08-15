import React, { useState, useEffect } from "react";
import "./CSV.css"

export default function Table({array, header, displayTable}){
    //console.log(displayTable)

    if(displayTable){
        return(
            <>
                <div className="panel panel-default">                    
                    <table className="displayTable">
                        <thead>
                        <tr key={"header"}>
                            {header.map((key) => (
                            <th>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {array.map((item) => (
                            <tr key={item.id}>
                            {Object.values(item).map((val) => (
                                <td>{val}</td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    return(
        <>
        </>
    )
}