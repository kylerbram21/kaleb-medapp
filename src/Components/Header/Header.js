import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="headerMainContainer">
      <div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/goals"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Goals
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/workout"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Work Out
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/rest"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Rest
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/health"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Health
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
