import React from 'react'; 
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
/* const ProfileNavBar = () => { 
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/store/profile">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/store/profile/purchase">Purchase</NavLink>
                </li>
                <li>
                    <NavLink to="/store/profile/selling">Selling</NavLink>
                </li>
                <li>
                    <NavLink to="/store/profile/messages">Messages</NavLink>
                </li>
            </ul>
        </nav>
    );
} */
const ProfileNavBar = () => {
  const location = useLocation();

  const isNavLinkActive = (path) => {
      return location.pathname === path;
  };

  const navLinkStyle = (path) => {
      return isNavLinkActive(path) ? { fontWeight: 'bold' } : {};
  };

  const grayBackgroundStyle = {
    backgroundColor: '#F1F1F1',
  };

  return (
    <div style={grayBackgroundStyle}>
      <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                  <Nav.Item className="mx-2">
                      <NavLink
                          to="/store/profile"
                          className="nav-link"
                          style={navLinkStyle('/store/profile')}
                      >
                          Dashboard
                      </NavLink>
                  </Nav.Item>
                  <Nav.Item className="mx-2">
                      <NavLink
                          to="/store/profile/purchase"
                          className="nav-link"
                          style={navLinkStyle('/store/profile/purchase')}
                      >
                          Purchase
                      </NavLink>
                  </Nav.Item>
                  <Nav.Item className="mx-2">
                      <NavLink
                          to="/store/profile/selling"
                          className="nav-link"
                          style={navLinkStyle('/store/profile/selling')}
                      >
                          Selling
                      </NavLink>
                  </Nav.Item>
                  <Nav.Item className="mx-2">
                      <NavLink
                          to="/store/profile/messages"
                          className="nav-link"
                          style={navLinkStyle('/store/profile/messages')}
                      >
                          Messages
                      </NavLink>
                  </Nav.Item>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>  
  );
};

export default ProfileNavBar;