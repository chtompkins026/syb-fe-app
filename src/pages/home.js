import React from "react";
// import Header from "../components/Header/Header";
// import Main from "../components/Homepage/Main";
import "./home.css";
// import background from '.../public/banner.jpg';
// import fitness from '.../public/fitness.jpg';


class Home extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="top" >
          <header className="hero">
            <h1>SYB Fitness </h1>
            <p> Much more than just a workout </p>
          </header>
        </div>

      <section className="features">
        <div className="feature">
          <span className="icon">🌮 </span> 
          <h3>Travel</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
        </div>
        <div className="feature">
          <span className="icon">🍺</span>
          <h3>Fitness</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
        </div>
        <div className="feature">
          <span className="icon">🍷</span>
          <h3>Beer</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
        </div>
        <div className="feature">
          <span className="icon">🎵</span>
          <h3>Fun</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
        </div>
      </section>

      <section className="about">
        <img src="https://source.unsplash.com/random/201x201" alt="" className="about__mockup" /> 
        <div class="about__details">
          <h2> About SurfYogaBeer </h2>
          <p>We run curated athletic adventures around the world</p>
          <p>Bringing people together through fitness and beer </p>
          <button>Learn More →</button>
        </div>
      </section>

      <section className="gallery">
        <h2>Instagram Photos </h2>
        <img src="https://source.unsplash.com/random/202x202" alt="" />
        <img src="https://source.unsplash.com/random/203x203" alt="" />
        <img src="https://source.unsplash.com/random/204x204" alt="" />
        <img src="https://source.unsplash.com/random/205x205" alt="" />
        <img src="https://source.unsplash.com/random/206x206" alt="" />
        <img src="https://source.unsplash.com/random/207x207" alt="" />
        <img src="https://source.unsplash.com/random/207x208" alt="" />
        <img src="https://source.unsplash.com/random/207x209" alt="" />
        <img src="https://source.unsplash.com/random/207x210" alt="" />
      </section>
    </div>
    );
  }
}


export default Home;
