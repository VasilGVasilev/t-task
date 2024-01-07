import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/A111" element={<Blogs />} />
          <Route path="/A11" element={<Blogs />} />
          <Route path="/TB11" element={<Blogs />} />
          <Route path="/TM8" element={<Blogs />} />
          <Route path="/TM10" element={<Blogs />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
