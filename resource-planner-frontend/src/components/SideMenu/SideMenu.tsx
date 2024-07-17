import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideMenu = () => {
  const linkStyle = "p-2 font-bold hover:bg-slate-700";
  const activeLinkStyle = `${linkStyle} border border-slate-700`;

  return (
    <div className="border border-black w-screen flex justify-around p-2 m-2 bg-slate-100">
      <NavLink
        to="/jobs"
        className={({ isActive, isPending }) =>
          isActive ? activeLinkStyle : linkStyle
        }
      >
        Jobs Dashboard
      </NavLink>
      <NavLink
        to="/resources"
        className={({ isActive, isPending }) =>
          isActive ? activeLinkStyle : linkStyle
        }
      >
        Team Dashboard
      </NavLink>
    </div>
  );
};

export default SideMenu;
