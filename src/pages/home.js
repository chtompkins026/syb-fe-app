import React from "react";
import Header from "../components/Header/Header";
import Main from "../components/Homepage/Main";


class Home extends React.Component {
  render() {
    return (
      <div className="home-banner">
        <div className="header-banner">
          <Header tagline="Fitness - Detox To Retox" />
        </div>
        <Main/>
      </div>
    );
  }
}


export default Home;
