import React, {useEffect, useState, useCallback} from "react";
import "./images.css"
import imagesArr from "./leafletPinsIcons/ExportImages";

export default function DisplayIcons({symbologyImages, symbologyArr}){
    const [symbolObject, setSymbolObject] = useState({})
    const [pngKey, setPngKey] = useState(Object.keys(symbologyImages));
    console.log(pngKey, symbologyImages)
    


        return (
            <>
                <table>
                    <thead>
                    <tr>
                        <h5>Select Pin</h5>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td><img src={symbologyImages['a.png']} /></td>
                          <td><img src={symbologyImages['b.png']} /></td>
                          <td><img src={symbologyImages['c.png']} /></td>
                        </tr>
                        <tr>
                          <td><img src={symbologyImages['d.png']} /></td>
                          <td><img src={symbologyImages['e.png']} /></td>
                          <td><img src={symbologyImages['f.png']} /></td>
                        </tr>
                        <tr>
                          <td><img src={symbologyImages['g.png']} /></td>
                          <td><img src={symbologyImages['h.png']} /></td>
                          <td><img src={symbologyImages['i.png']} /></td>
                        </tr>
                        <tr>
                          <td><img src={symbologyImages['j.png']} /></td>
                        </tr>
                    </tbody>
                </table>
            </>
        )



}
// export default function DisplayIcons({symbologyImages}){
//     console.log(imagesArr)
//     const [arrImages, setArrImages] = useState([])
//     useEffect(() =>{
//         setArrImages(symbologyImages);
//     },[])
//     return (
//         <>
//             <div className='imageContainer'> 
//                 {imagesArr.map((item, index)=>{
//                     <img index={index} src={require('./' + item).default} alt="info"/>
//                 })}
//             </div>
//         </>
//     )
// }