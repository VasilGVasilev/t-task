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


