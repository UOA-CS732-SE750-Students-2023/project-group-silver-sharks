// frontend/src/components/ProductNavBar.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Button, Nav, Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import './ProductNavBar.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ProductNavBar = ({ setSearchCategory, setFilter, setSearchTerm, notFound, displayCount, category }) => {
  const [selectedCategory, setSelectedCategory] = useState('Images');

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);
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

  const [p_title, setTitle] = useState('Sort by :\u00A0\u00A0\u00A0Featured');

  const filterChangeHandler = (event) => {
    setFilter(event);
    const ek=`${event}`
    if(ek==='priceLowToHigh'){
      setTitle(`Price: Low to High`);
    }
    if(ek==='priceHighToLow'){
      setTitle(`Price: High to Low`);
    }
    if(ek==='popularity'){
      setTitle(`Sort by :\u00A0\u00A0\u00A0Popularity`);
    }
    if(ek==='featured'){
      setTitle(`Sort by :\u00A0\u00A0\u00A0Featured`);
    }
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
            <FontAwesomeIcon icon={faMagnifyingGlass} style={searchIconStyle}/>
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
                    !notFound && selectedCategory === 'Images' ? 'nav-button-selected-style' : ''
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
                    !notFound && selectedCategory === 'Videos' ? 'nav-button-selected-style' : ''
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
                    !notFound && selectedCategory === 'Music' ? 'nav-button-selected-style' : ''
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
                    !notFound && selectedCategory === 'Services' ? 'nav-button-selected-style' : ''
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
            <div className="d-flex align-items-center">
              <input
                type="number"
                className="form-control min-max-input-style"
                id="max-price"
                aria-label="Max price"
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '1.5rem', marginLeft: '15px' }}/>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center my-2 min-max-input-container-style">
          <div>
            <span>
              <h4 className="black-text-style">{!notFound ? `Showing ${displayCount} results` : "Showing 0 results"}</h4>
            </span>
          </div>
          <div className="drop-down-container-style">
            <InputGroup>
              <DropdownButton
                variant="outline-secondary"
                title={
                  <>
                    {p_title}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="dropdown-chevron-icon"
                    />
                  </>
                } 
                id="sort-dropdown"
                align="end"
                className="custom-dropdown-btn-style dropdown-toggle"
                onSelect={filterChangeHandler}
              >
                <Dropdown.Item eventKey="priceLowToHigh">Price: Low to High</Dropdown.Item>
                <Dropdown.Item eventKey="priceHighToLow">Price: High to Low</Dropdown.Item>
                <Dropdown.Item eventKey="popularity">Popularity</Dropdown.Item>
                <Dropdown.Item eventKey="featured">Featured</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductNavBar;

