import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import NoPage from "../pages/NoPage";
import A111 from "../pages/A111";
import A11 from "../pages/A11";
import TB11 from "../pages/TB11";
import TM8 from "../pages/TM8";
import TM10 from "../pages/TM10";

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
          <Route path="/A111" element={<A111 transportData={transportData} colors={colors} />} />
          <Route path="/A11" element={<A11 transportData={transportData} colors={colors} />} />
          <Route path="/TB11" element={<TB11 transportData={transportData} colors={colors} />} />
          <Route path="/TM8" element={<TM8 transportData={transportData} colors={colors} />} />
          <Route path="/TM10" element={<TM10 transportData={transportData} colors={colors} />} />
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


