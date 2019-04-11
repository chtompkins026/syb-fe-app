import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
        <img className="nav-image" src={"favicon.png"} alt="SYB Logo" />
      <li className="navbar-menu">
        <ul className="navbar-link 1">
          <Link to="/" className="navlinks"> Home </Link>
        </ul>
        <ul className="navbar-link 2">
          <Link to="/about" className="navlinks"> About </Link>
        </ul>
        <ul className="navbar-link 3">
          <Link to="/workouts" className="navlinks"> Workouts </Link>
        </ul>
        <ul className="navbar-link 4">
          <Link to="/instructors" className="navlinks"> Instructors </Link>
        </ul>
        <ul className="navbar-link 5">
          <Link to="/profile" className="navlinks"> Profile </Link>
        </ul>
        <ul className="navbar-link 6">
          <Link to="/login" className="navlinks"> Login </Link>
        </ul>
        <ul className="navbar-link 7">
          <Link to="/signup" className="navlinks"> Sign Up </Link>
        </ul>
      </li>
    </div>
  );
};

export default NavBar;
