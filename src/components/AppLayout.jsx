import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <div id="main">
        <Outlet />
      </div>
    </>
  )
};

export default AppLayout