import React, { useEffect, useState, useCallback } from 'react';
import './LandingLayout.css';
import LandingCard from './LandingCard';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


const LandingLayout = () => {

  const navigateSignupHandler = () => {
    window.location.href = 'http://localhost:3000/account/sign-in';
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Define useEffect hook to update state variables on scroll
    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const newOpacity = Math.min(scrollTop / 750, 1);
      setOpacity(newOpacity);
      setScrollPosition(scrollTop);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Get Started section
  const translateYDown = scrollPosition * 0.8;
  const textOpacityGetStarted = 1 - scrollPosition / 800; // Text reveals fullly at 800 px down
  
  // Sell your talent section
  const translateYUp = Math.min(-scrollPosition * 0.2 + 900, 0);
  const textOpacitySellThese = (scrollPosition - 400) / 700; // Text only reveals if user has scrolled 400 px down, and maxes at 700 px

  // Initialise particle engine
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
      await loadFull(engine);
    }, []);

  const particlesLoaded = useCallback(async (container) => {
      await console.log(container);
  }, []);

  return (
    <>
      <div className="landing-page-container">
        <video className="video-background" autoPlay muted loop>
          <source src='/LandingPageImages/world.mp4' type='video/mp4' />
        </video>
        <div
          className="black-overlay"
          style={{ opacity: opacity }}
        ></div>
        <div
          className="landing-page-main-wrapper"
          style={{
            transform: `translateY(${translateYDown}px)`,
            opacity: `${Math.max(textOpacityGetStarted, 0)}`,
          }}
        >
          <div className="landing-page-logo">Welcome to <br/><b>SHARKET</b>PLACE</div>
          <button className="description-button" onClick={navigateSignupHandler}>Sign In</button>
        </div>
        <div className="landing-page-card-container">
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              fullScreen: { enable: false },
                background: {
                  opacity: 0,
                  color: {
                    value: "#000000",
                  },
                },
                fpsLimit: 120,
                interactivity: {
                  events: {
                    onClick: {
                      enable: false,
                      mode: "push",
                    },
                    onHover: {
                      enable: true,
                      mode: "repulse",
                    },
                    resize: true,
                  },
                  modes: {
                    push: {
                      quantity: 2,
                    },
                    repulse: {
                      distance: 50,
                      duration: 0.4,
                    },
                  },
               },
                particles: {
                  opacity: 0.1,
                  color: {
                    value: "#648962",
                  },
                  links: {
                    color: "#126a0a",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                  },
                  collisions: {
                    enable: true,
                  },
                  move: {
                    directions: "none",
                    enable: true,
                    outModes: {
                      default: "bounce",
                    },
                    random: false,
                    speed: 0.8,
                    straight: false,
                  },
                  number: {
                    density: {
                      enable: true,
                      area: 500, // Number of particles per area unit aka density
                    },
                    value: 20, // Number of particles per area
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    value: { min: 1, max: 5 },
                  },
                },
                detectRetina: true
            }}
          />
          <div
          className="landing-page-desc-wrapper"
          style={{
            transform: `translateY(${translateYUp}px)`,
            opacity: `${Math.max(textOpacitySellThese, 0)}`,
            }}
          > 
          <div className="landing-cycle-main-text-wrapper">
            <div className="landing-cycle-main-text">
              <span className="landing-animate-students">DISCOVER</span>
              <span className="landing-animate-employers">SHOW</span>
              <span className="landing-animate-industries">ACCELERATE</span>
              <span className="landing-animate-people">BUY</span>
              <div className="landing-page-desc-talent">YOUR TALENT</div>
            </div>
          </div>
          </div>
          <div className="landing-page-card-wrapper">
            <LandingCard
              src="/LandingPageImages/Images.png"
              title="Images"
              text="Elevate your digital projects with stunning images produced by talented artists."
            />
            <LandingCard
              src="/LandingPageImages/Videos.png"
              title="Videos"
              text="Find captivating content with ease in various formats and resolutions."
            />
            <LandingCard
              src="/LandingPageImages/Music.png"
              title="Music"
              text="Find the perfect soundtrack for your project from our wide range of music tracks."
            />
            <LandingCard
              src="/LandingPageImages/Services.png"
              title="Services"
              text="Find a wide range of professional services which are tailored to your needs."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingLayout;
