import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import NoPage from "../pages/NoPage";
import LineSelected from "../pages/LineSelected";


import data from '../../DB/data.json'
import colorOptions from '../../DB/colorOptions.json'
import { useState } from "react";



function App() {
  const [transportData, setTransportData] = useState(data);
  const [colors, setColors] = useState(colorOptions);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home transportData={transportData} colors={colors} />} />
          <Route path="/line/:id" element={<LineSelected transportData={transportData} colors={colors} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App



// possible merge of FE data and BE data into one state

  // function updateArray(element, transportData, setTransportData, colorOptions) {

  //   if (!element.hasOwnProperty('color')) {
  //     if (colorOptions.hasOwnProperty(element.line)) {
  
  //       const indexToUpdate = transportData.findIndex(obj => obj.line === element.line);
  
  //       const newTransportData = [...transportData];
  
  //       newTransportData[indexToUpdate] = {
  //         ...newTransportData[indexToUpdate],
  //         color: colorOptions[element.line],
  //       };
  
  //       setTransportData(newTransportData)
  //     }
  //   }
  // }


  // function App() {

    // const [transportData, setTransportData] = useState(data);
    // transportData.map(element => {
    //   updateArray(element, transportData, setTransportData, colorOptions)
    // })

  // }


