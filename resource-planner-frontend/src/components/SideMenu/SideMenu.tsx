import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const linkStyle = "font-bold hover:bg-slate-700";
  return (
    <div className="border border-black w-screen flex justify-around p-2 m-2 bg-slate-100">
      <Link className={linkStyle} to={"/jobs"}>
        Jobs Dashboard
      </Link>
      <Link className={linkStyle} to={"/resources"}>
        Team Dashboard
      </Link>
    </div>
  );
};

export default SideMenu;
