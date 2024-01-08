import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="m-5">
        <Outlet />
      </div>
    </>
  )
};

export default Layout;
