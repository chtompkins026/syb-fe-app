import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <li className="navbar-menu">
        <ul className="navbar-link">
          <Link to="/home"> Home </Link>
        </ul>
        <ul className="navbar-link">
          <Link to="/instructors"> instructors </Link>
        </ul>
        <ul className="navbar-link">
          <Link to="/login"> LOGIN </Link>
        </ul>
        <ul className="navbar-link">
          <Link to="/signup"> SIGN UP </Link>
        </ul>
      </li>
    </div>
  );
};

export default NavBar;
