// frontend/src/components/ProductNavBar.jsx
import React, { useState } from 'react';
import { Navbar, Button, Nav, Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import './ProductNavBar.css'; // 引入新的 CSS 文件

const ProductNavBar = ({ setSearchCategory, setFilter, setSearchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // const searchInputStyle = {
  //   borderRadius: '25px',
  //   border: '2px solid black',
  //   paddingRight: '40px',
  //   paddingLeft: '20px',
  //   backgroundColor:'#F1F1F1',
  // };

  const searchIconStyle = {
    position: 'absolute',
    right: '35px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    zIndex: 100,
  };

  const categoryHandler = (event) => {
    const buttonText = event.target.innerHTML;
    const formattedCategory = buttonText.charAt(0) + buttonText.slice(1).toLowerCase();
    setSearchCategory(formattedCategory);
    setSelectedCategory(formattedCategory);
  };

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  }

  const [p_title, setTitle] = useState('Sort by :\u00A0\u00A0\u00A0Default');

  const filterChangeHandler = (event) => {
    setFilter(event);
    setTitle(`Sort by: ${event}`);
  }
  

  return (
    <div className="gray-background-style">
      <>
        <Form className="d-flex justify-content-center mb-3" style={{ position: 'relative' }}>
          <div className="input-group container-of-input">
            <input
              type="search"
              className="form-control search-input-style"
              placeholder="Search for a digital asset"
              aria-label="Search"
              onChange={searchChangeHandler}
              // style={searchInputStyle}
            />
            <i className="bi bi-search" style={searchIconStyle}></i>
          </div>
        </Form>
        <Navbar expand="lg" className="gray-background-style">
          <Navbar.Toggle aria-controls="product-navbar-nav" />
          <Navbar.Collapse id="product-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Item className="mx-5">
                <Button
                  onClick={categoryHandler}
                  className={`nav-link nav-button-style ${
                    selectedCategory === 'Images' ? 'nav-button-selected-style' : ''
                  }`}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#348B81')}
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      selectedCategory === 'Images' ? 'transparent' : 'transparent')
                  }
                >
                  IMAGES
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-5">
                <Button
                  onClick={categoryHandler}
                  className={`nav-link nav-button-style ${
                    selectedCategory === 'Videos' ? 'nav-button-selected-style' : ''
                  }`}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#348B81')}
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      selectedCategory === 'Videos' ? 'transparent' : 'transparent')
                  }
                >
                  VIDEOS
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-5">
                <Button
                  onClick={categoryHandler}
                  className={`nav-link nav-button-style ${
                    selectedCategory === 'Music' ? 'nav-button-selected-style' : ''
                  }`}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#348B81')}
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      selectedCategory === 'Music' ? 'transparent' : 'transparent')
                  }
                >
                  MUSIC
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-5">
                <Button
                  onClick={categoryHandler}
                  className={`nav-link nav-button-style ${
                    selectedCategory === 'Services' ? 'nav-button-selected-style' : ''
                  }`}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#348B81')}
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      selectedCategory === 'Services' ? 'transparent' : 'transparent')
                  }
                >
                  SERVICES
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <div className="d-flex justify-content-start my-2 min-max-input-container-style">
          <div className="d-flex flex-column me-1">
            <label htmlFor="min-price" className="form-label">
              Min price
            </label>
            <input
              type="number"
              className="form-control min-max-input-style"
              id="min-price"
              aria-label="Min price"
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="max-price" className="form-label">
              Max price
            </label>
            <input
              type="number"
              className="form-control min-max-input-style"
              id="max-price"
              aria-label="Max price"
            />
          </div>
          <div className="d-flex align-items-end">
            <i className="bi bi-search ms-3" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center my-2 min-max-input-container-style">
          <div>
            <span>
              <h4 className="black-text-style">Showing 1,405 results</h4>
            </span>
          </div>
          <div className="drop-down-container-style">
            <InputGroup>
              <DropdownButton
                variant="outline-secondary"
                title={p_title}
                id="sort-dropdown"
                align="end"
                className="custom-dropdown-btn-style"
                onSelect={filterChangeHandler}
              >
                <Dropdown.Item eventKey="priceLowToHigh">Price: Low to High</Dropdown.Item>
                <Dropdown.Item eventKey="priceHighToLow">Price: High to Low</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductNavBar;

