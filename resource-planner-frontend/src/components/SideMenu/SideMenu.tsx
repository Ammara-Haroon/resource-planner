import React from "react";
import { Link, NavLink } from "react-router-dom";
import ComboBox from "../ComboBox/ComboBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTasks } from "@fortawesome/free-solid-svg-icons";
import { faTeamspeak } from "@fortawesome/free-brands-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons/faUserGroup";

const SideMenu = () => {
  const linkStyle =
    "p-2 hover:bg-slate-700 font-mono text-pink-500 uppercase flex items-center";
  const activeLinkStyle = `${linkStyle} border border-slate-700`;

  return (
    <div className="border border-black flex flex-col justify-start m-1 text-sky-500 bg-gradient-to-b from-slate-900 to-sky-700 min-h-screen w-56">
      <NavLink
        to="/"
        className="p-2 hover:bg-slate-700 font-mono text-xl  font-semibold flex items-center text-pink-500 uppercase"
      >
        <FontAwesomeIcon className="p-1 " icon={faHome} />
        <span>Home</span>
      </NavLink>
      <div className="h-[calc(50vh)] flex flex-col justify-center">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive ? activeLinkStyle : linkStyle
          }
        >
          <FontAwesomeIcon className="p-1" icon={faTasks} />
          Jobs Dashboard
        </NavLink>
        <NavLink
          to="/resources"
          className={({ isActive, isPending }) =>
            isActive ? activeLinkStyle : linkStyle
          }
        >
          <FontAwesomeIcon className="p-1" icon={faUserGroup} /> Team Dashboard
        </NavLink>
      </div>
    </div>
  );
};

export default SideMenu;
