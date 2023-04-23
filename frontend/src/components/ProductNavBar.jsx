import React, { useContext } from 'react';
import ProductContext from '../store/product-context';
import { NavLink } from 'react-router-dom';
import { Navbar, Button, Nav, Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

const ProductNavBar = ({ setSearchCategory, setFilter, selectedFilter }) => {
  
  const searchInputStyle = {
    borderRadius: '25px',
    border: '2px solid black',
    paddingRight: '40px',
    paddingLeft: '20px',
  };

  const searchIconStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    zIndex: 100,
  };

  const minMaxInputStyle = {
    borderRadius: '20px',
    border: '3px solid black',
    paddingRight: '5px',
    paddingLeft: '5px',
    maxWidth: '100px',
    width: '80px',
  };

  const customDropdownBtnStyle = {
    borderRadius: '30px',
  };
  
  const blackTextStyle = {
    color: 'black',
  };

  const grayBackgroundStyle = {
    backgroundColor: '#F1F1F1',
  };

  const minMaxInputContainerStyle = {
    marginLeft: '100px', // 可以根据需要调整此值
  };

  const dropDownContainerStyle = {
    marginRight: '100px',
  }

  // handler methods for the category buttons 

  const categoryHandler = (event) => {
    console.log(event.target.innerHTML);

  };
  
  const searchChangeHandler = (event) => {
    console.log(event.target.value);

  }

  const filterChangeHandler = (event) => { 
    console.log(event.target.value); 

  }



  return (
    <div style={grayBackgroundStyle}>
      <>
        <Form className="d-flex justify-content-center mb-3" style={{ position: 'relative' }}>
          <div className="input-group" style={{ width: '25%', margin: '35px', }}>
            <input
              type="search"
              className="form-control"
              placeholder="Search for a digital asset"
              aria-label="Search"
              onChange={searchChangeHandler}
              style={searchInputStyle}
            />
            <i className="bi bi-search" style={searchIconStyle}></i>
          </div>
        </Form>
        <Navbar expand="lg" style={grayBackgroundStyle}>
          <Navbar.Toggle aria-controls="product-navbar-nav" />
          <Navbar.Collapse id="product-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Item className="mx-5">
                <Button onClick={categoryHandler} className="nav-link">
                  Images
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-5">
                <Button onClick={categoryHandler} className="nav-link">
                  Videos
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-5">
                <Button onClick={categoryHandler} className="nav-link">
                  Music
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-5">
                <Button onClick={categoryHandler} className="nav-link">
                  Services
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        
        <div className="d-flex justify-content-start my-2" style={minMaxInputContainerStyle}>
          <div className="d-flex flex-column me-1">
            <label htmlFor="min-price" className="form-label">
              Min price
            </label>
            <input
              type="number"
              className="form-control"
              id="min-price"
              aria-label="Min price"
              style={minMaxInputStyle}
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="max-price" className="form-label">
              Max price
            </label>
            <input
              type="number"
              className="form-control"
              id="max-price"
              aria-label="Max price"
              style={minMaxInputStyle}
            />
          </div>
          <div className="d-flex align-items-end">
            <i className="bi bi-search ms-3" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center my-2" style={minMaxInputContainerStyle}>
          <div>
            <span>
              <h4 style={blackTextStyle}>Showing 1,405 results</h4>
            </span>
          </div>
          <div style={dropDownContainerStyle}>
            <InputGroup>
              <DropdownButton
                variant="outline-secondary"
                title="Sort by: Popularity"
                id="sort-dropdown"
                align="end"
                style={customDropdownBtnStyle}
                onChange={filterChangeHandler}
              >
                <Dropdown.Item href="#/popularity">Popularity</Dropdown.Item>
                <Dropdown.Item href="#/newest">Newest</Dropdown.Item>
                <Dropdown.Item href="#/price-asc">Price: Low to High</Dropdown.Item>
                <Dropdown.Item href="#/price-desc">Price: High to Low</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductNavBar;