import React from "react";
import "./Header.css";

// import logo from '.../public/syb_logo.png'

class Header extends React.Component {
  render() {
  const { tagline } = this.props;

  return (
    <header className="header-top">
      <img className="header-image" src={"favicon.png"} alt="SYB Logo" />
      <h3 className="tagline">
        <span> {tagline ? tagline : ""}</span>
      </h3>
    </header>
    );
  }
}

export default Header;
