import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const ProfileNavBar = () => {
  const location = useLocation();

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  const navLinkStyle = (path) => {
    return isNavLinkActive(path) ? { fontWeight: 'bold', color: '#333' } : {color: '#555'};
  };

  const grayBackgroundStyle = {
    backgroundColor: '#F1F1F1',
  };

  const buttonBaseStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    padding: '8px 40px',
    fontSize: '24px',
    marginTop: '100px',
    marginBottom: '2px',
    transition: '0.1s',
  };

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
