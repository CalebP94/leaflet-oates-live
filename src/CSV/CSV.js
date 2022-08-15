import React, { useState, useEffect } from "react";
import "./CSV.css"
import Table from "./Table";

export default function CSV() {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const [displayTable, setDisplayTable] = useState(false)
    const [pointLayerArr, setPointLayerArr] = useState([]) 

    useEffect(() => {
      if(array.length != 0){
        pointLayerArr.push(array)
        console.log(pointLayerArr)
      }
    },[array])
    const fileReader = new FileReader();

    const handleOnChange = (e) => {
      setFile(e.target.files[0]);
    };
    const setTruthy = (e) =>{
      setDisplayTable(!displayTable)
    }
    const csvFileToArray = string => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
      const array = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
      setArray(array);
    };
    useEffect(() => {
      if (file) {
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
        };
        fileReader.readAsText(file);
      }
    }, [file])
    // const handleOnSubmit = (e) => {
    //   e.preventDefault();
  
    //   if (file) {
    //     fileReader.onload = function (event) {
    //       const text = event.target.result;
    //       csvFileToArray(text);
    //     };
  
    //     fileReader.readAsText(file);
    //   }
    // };
    const headerKeys = Object.keys(Object.assign({}, ...array));
  
    return (
      <>
        <div className="csv">
          {/* <button className="custom-file-upload"><i className="fa fa-home"></i></button> */}
            <label htmlFor="csvFileInput" className="custom-file-upload">
              <i className="fa fa-cloud-upload"></i>
            </label>
              <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
              />
          <br />
          <label htmlFor="table" className="custom-file-upload">
              <i className="fa fa-bars"></i>
              <input
                  type={"button"}
                  id={"table"}
                  onClick={setTruthy}
              />
          </label>
        </div> 
        <Table array={array} header={headerKeys} displayTable = {displayTable}/>
      </>
    );
  }