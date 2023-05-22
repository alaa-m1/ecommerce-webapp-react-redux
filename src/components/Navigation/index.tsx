import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div style={{ backgroundColor: "blue" }}>navigation</div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
