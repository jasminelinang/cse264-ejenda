import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Home.css";

import heroImg from "../assets/free_girl.jpeg";
import aboutImg from "../assets/stretching_girl.png";
import stonesImg from "../assets/rocks.png";
import pastaImg from "../assets/protein_pasta.jpeg";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);

  const goToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    // Animate only sections
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;

      const animElements = section.querySelectorAll(".anim-child");
      if (!animElements.length) return;

      const direction = i % 2 === 0 ? -80 : 80;

      gsap.fromTo(
        animElements,
        { opacity: 0, y: 80, x: direction },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Fix image load jump
    setTimeout(() => ScrollTrigger.refresh(), 300);
  }, []);

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="logo">Ejenda</div>
        <nav className="nav">
          <Link to="/login">Log in / Sign Up</Link>
          <a href="#about">About</a>
          <a href="#why">Why Ejenda</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" ref={(el) => (sectionsRef.current[0] = el)}>
        <img src={heroImg} alt="Ejenda Hero" className="hero-img" />
        <div className="hero-overlay anim-child">
          <h1 className="anim-child">Ejenda</h1>
          <p className="anim-child">Your day your way.</p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about" ref={(el) => (sectionsRef.current[1] = el)}>
        <img src={aboutImg} alt="About Ejenda" className="about-img anim-child" />
        <div className="content-wrapper yellow anim-child">
          <div className="about-inner">
            <div className="about-text anim-child">
              <h2 className="anim-child">About Ejenda</h2>
              <p className="anim-child">
                Manage your calendar, personalized meal prep, create a gym routine!
              </p>
              <button onClick={goToLogin} className="anim-child">
                Sign up / Log-in
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="why" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="content-wrapper orange anim-child">
          <div className="why-inner">
            <div className="why-text anim-child">
              <h2 className="anim-child">Why Ejenda?</h2>
              <p className="anim-child">
                Fuel your body. Shape your routine. Plan out your weekly meetings
                easier and hit your protein goals.
              </p>
            </div>
            <img src={stonesImg} alt="Balance stones" className="why-img anim-child" />
          </div>
        </div>
      </section>

      {/* Meal Prep */}
      <section className="meal-prep" ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="content-wrapper green anim-child">
          <div className="meal-inner">
            <img src={pastaImg} alt="Meal Prep" className="meal-img anim-child" />
            <div className="meal-text anim-child">
              <h2 className="anim-child">Meal Prep</h2>
              <p className="anim-child">
                Fuel your body. Shape your routine. Plan out your weekly meetings
                easier and hit your protein goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
