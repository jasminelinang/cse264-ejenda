import React from "react";
import "./Home.css";
import heroImg from "../assets/free_girl.jpeg";
import aboutImg from "../assets/stretching_girl.png";
import stonesImg from "../assets/rocks.png";
import pastaImg from "../assets/protein_pasta.jpeg";



const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="logo">Ejenda</div>
        <nav className="nav">
          <a href="#">Log in / Sign Up</a>
          <a href="#about">About</a>
          <a href="#why">Why Ejenda</a>
        </nav>
      </header>

      {/* Hero section */}
      <section className="hero">
        <img src={heroImg} alt="Ejenda Hero" className="hero-img" /> 
        <div className="hero-overlay">
          <h1>Ejenda</h1>
          <p>Your day your way.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        {/* Image on the left */}
        <img src={aboutImg} alt="About Ejenda" className="about-img" />
        
        {/* Yellow container on the right */}
        <div className="content-wrapper yellow">
          <div className="about-inner">
            <div className="about-text">
              <h2>About Ejenda</h2>
              <p>
                Manage your calendar, personalized meal prep, create a gym routine!
              </p>
              <button>Sign up/Log-in</button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ejenda Section */}
      <section id="why" className="why">
        <div className="content-wrapper orange">
          <div className="why-inner">
            <div className="why-text">
              <h2>Why Ejenda?</h2>
              <p>
                Fuel your body. Shape your routine. Plan out your weekly
                meetings easier and hit your protein goals.
              </p>
            </div>
            <img src={stonesImg} alt="Balance stones" className="why-img" />
          </div>
        </div>
      </section>

      {/* Meal Prep Section */}
      <section className="meal-prep">
        <div className="content-wrapper green">
          <div className="meal-inner">
            <img src={pastaImg} alt="Meal Prep" className="meal-img" />
            <div className="meal-text">
              <h2>Meal Prep</h2>
              <p>
                Fuel your body. Shape your routine. Plan out your weekly
                meetings easier and hit your protein goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;