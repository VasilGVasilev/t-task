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
import { useState } from "react";

// MOCK FETCHING
// import { useQuery } from "react-query";
// import axios from 'axios';

// MOCK FETCHING
// const retrieveData = (url) => {
//   const response = await axios.get(url);
//   return response.data;
// };



function App() {
  const [transportData, setTransportData] = useState(data);
  
  // MOCK FETCHING
      // const { data: data, error, isLoading } = useQuery("postsData", retrieveData(url));
      // if (isLoading) return <div>Fetching data...</div>;
      // if (error) return <div>An error occurred: {error.message}</div>;


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home transportData={transportData} />} />
          <Route path="/A111" element={<A111 />} />
          <Route path="/A11" element={<A11 />} />
          <Route path="/TB11" element={<TB11 />} />
          <Route path="/TM8" element={<TM8 />} />
          <Route path="/TM10" element={<TM10 />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
