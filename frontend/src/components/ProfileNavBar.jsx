import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const ProfileNavBar = () => {
  const location = useLocation();
  
  // Check if a nav link is active
  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  // Define the style for active and inactive nav links
  const navLinkStyle = (path) => {
    return isNavLinkActive(path) ? { fontWeight: 'bold', color: '#333' } : {color: '#555'};
  };

  // Define the style for the gray background
  const grayBackgroundStyle = {
    backgroundColor: '#F1F1F1',
  };

  // Define the base style for buttons
  const buttonBaseStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    padding: '8px 40px',
    fontSize: '24px',
    marginTop: '100px',
    marginBottom: '20px',
    transition: '0.1s',
  };

  // Define the style for buttons on hover
  const buttonHoverStyle = {
    backgroundColor: '#348B81',
    color: 'white',
  };

  return (
    <div style={grayBackgroundStyle}>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {['/store/profile', '/store/profile/purchase', '/store/profile/selling', '/store/profile/messages'].map(
              (path, index) => {
                const [hover, setHover] = useState(false);
                const buttonStyle = {
                  ...buttonBaseStyle,
                  ...navLinkStyle(path),
                  ...(hover ? buttonHoverStyle : {}),
                };

                const labels = ['DASHBOARD', 'PURCHASED', 'SELLING', 'MESSAGES'];

                return (
                  <Nav.Item className="mx-2" key={index}>
                    <Button
                      as="a"
                      href={path}
                      className="nav-link"
                      style={buttonStyle}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      {labels[index]}
                    </Button>
                  </Nav.Item>
                );
              }
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default ProfileNavBar;
