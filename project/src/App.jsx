import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import NoPage from "../pages/NoPage";
import LineSelected from "../pages/LineSelected";


import colorOptions from '../../DB/colorOptions.json'
import { useState } from "react";



function App() {
  const [colors, setColors] = useState(colorOptions);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/line/:id" element={<LineSelected />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


