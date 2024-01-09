import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="m-5">
        <Outlet />
      </div>
      <Footer></Footer>
    </>
  )
};

export default Layout;
