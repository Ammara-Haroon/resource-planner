import React from "react";
import { Link, NavLink } from "react-router-dom";
import ComboBox from "../ComboBox/ComboBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTasks } from "@fortawesome/free-solid-svg-icons";
import { faTeamspeak } from "@fortawesome/free-brands-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons/faUserGroup";

const SideMenu = () => {
  const linkStyle =
    "p-2 md:hover:bg-slate-700 font-mono text-pink-500 uppercase flex items-center";
  const activeLinkStyle = `${linkStyle} text-pink-700`;

  return (
    <div className="border border-black bg-slate-900 flex md:flex-col flex-row justify-start md:m-1 text-sky-500 md:bg-gradient-to-b md:from-slate-900 md:to-sky-700 md:min-h-screen h-fit md:w-56 w-screen">
      <NavLink
        to="/"
        className="p-2 md:hover:bg-slate-700 font-mono text-xl  font-semibold  items-center text-pink-500 uppercase"
      >
        <FontAwesomeIcon className="p-1 " icon={faHome} />
        <span>Home</span>
      </NavLink>
      <div className="md:h-[calc(50vh)] flex md:flex-col flex-row justify-center">
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
