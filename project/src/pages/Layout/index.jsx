import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="flex flex-row gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/A11">A11</Link>
          </li>
          <li>
            <Link to="/A111">A111</Link>
          </li>
          <li>
            <Link to="/TB11">TB11</Link>
          </li>
          <li>
            <Link to="/TM8">TM8</Link>
          </li>
          <li>
            <Link to="/TM10">TM10</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
