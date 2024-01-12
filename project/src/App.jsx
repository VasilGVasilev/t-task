import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import NoPage from "../pages/NoPage";
import LineSelected from "../pages/LineSelected";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/sliceData";
import { fetchColors } from "./store/sliceColor";



function App() {
  const dispatch = useDispatch()

  const dataStatus = useSelector(state => state.data.status)
  const colorsStatus = useSelector(state => state.colors.status)
  
  // Redux dispatch here, because it is main App

  useEffect(() => {
    if (dataStatus === 'idle') {
      dispatch(fetchData())
    }
  }, [dataStatus, dispatch])

  useEffect(() => {
    if (colorsStatus === 'idle') {
      dispatch(fetchColors())
    }
  }, [colorsStatus, dispatch])

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


