import React from 'react';
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

  const buttonStyle = {
    fontSize: '18px',
    padding: '8px 55px',
  };

  return (
    <div style={grayBackgroundStyle}>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Item className="mx-2">
              <Button
                as="a"
                href="/store/profile"
                className="nav-link"
                style={{ ...navLinkStyle('/store/profile'), ...buttonStyle }}
              >
                DASHBOARD
              </Button>
            </Nav.Item>
            <Nav.Item className="mx-2">
              <Button
                as="a"
                href="/store/profile/purchase"
                className="nav-link"
                style={{ ...navLinkStyle('/store/profile/purchase'), ...buttonStyle }}
              >
                PURCHASED
              </Button>
            </Nav.Item>
            <Nav.Item className="mx-2">
              <Button
                as="a"
                href="/store/profile/selling"
                className="nav-link"
                style={{ ...navLinkStyle('/store/profile/selling'), ...buttonStyle }}
              >
                SELLING
              </Button>
            </Nav.Item>
            <Nav.Item className="mx-2">
              <Button
                as="a"
                href="/store/profile/messages"
                className="nav-link"
                style={{ ...navLinkStyle('/store/profile/messages'), ...buttonStyle }}
              >
                MESSAGES
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default ProfileNavBar;
