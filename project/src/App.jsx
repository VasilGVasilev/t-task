import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import A111 from "./pages/A111";
import A11 from "./pages/A11";
import TB11 from "./pages/TB11";
import TM8 from "./pages/TM8";
import TM10 from "./pages/TM10";





function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
