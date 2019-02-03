import React from "react";
import { NavLink } from "react-router-dom";
import './Header.css'
const Header = () => {
  return (
    <div className="menu">
      <NavLink
        exact to="/"
        activeStyle={{backgroundColor: "#007bff", color: "#fff", height: "40px"}}>
        Home
      </NavLink>
    </div>
  );
};

export default Header;