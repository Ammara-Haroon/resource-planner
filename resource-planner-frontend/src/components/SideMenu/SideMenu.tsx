import React from "react";
import { Link, NavLink } from "react-router-dom";
import ComboBox from "../ComboBox/ComboBox";

const SideMenu = () => {
  const linkStyle = "p-2 hover:bg-slate-700 font-mono text-pink-500 uppercase";
  const activeLinkStyle = `${linkStyle} border border-slate-700`;

  return (
    <div className="border border-black flex flex-col justify-start m-1 text-sky-500 bg-gradient-to-b from-slate-900 to-sky-700 min-h-screen w-56">
      <NavLink
        to="/"
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
