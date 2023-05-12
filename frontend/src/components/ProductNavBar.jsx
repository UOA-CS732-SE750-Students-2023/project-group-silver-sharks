import React, { useState, useEffect } from "react";
import {
  Navbar,
  Button,
  Nav,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "./ProductNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const ProductNavBar = ({
  setSearchCategory,
  setFilter,
  setSearchTerm,
  notFound,
  displayCount,
  category,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("Images");

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  const searchIconStyle = {
    position: "absolute",
    right: "35px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    zIndex: 100,
  };

  // Handle category selection
  const categoryHandler = (event) => {
    const buttonText = event.target.innerHTML;
    const formattedCategory =
      buttonText.charAt(0) + buttonText.slice(1).toLowerCase();
    setSearchCategory(formattedCategory);
    setSelectedCategory(formattedCategory);
  };

  // Handle search term change
  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const [p_title, setTitle] = useState("Sort by :\u00A0\u00A0\u00A0Featured");

  // Handle filter selection
  const filterChangeHandler = (event) => {
    setFilter(event);
    const ek = `${event}`;
    if (ek === "priceLowToHigh") {
      setTitle(`Price: Low to High`);
    }
    if (ek === "priceHighToLow") {
      setTitle(`Price: High to Low`);
    }
    if (ek === "popularity") {
      setTitle(`Sort by :\u00A0\u00A0\u00A0Popularity`);
    }
    if (ek === "rating") {
      setTitle(`Sort by :\u00A0\u00A0\u00A0Highest Rated`);
    }
    if (ek === "default") {
      setTitle(`Sort by :\u00A0\u00A0\u00A0Featured`);
    }
  };

  return (
    <div className="gray-background-style">
      <>
        <Form
          className="d-flex justify-content-center mb-3"
          style={{ position: "relative" }}
        >
          <div className="input-group container-of-input">
            <input
              type="search"
              className="form-control search-input-style"
              placeholder="Search for a digital asset"
              aria-label="Search"
              onChange={searchChangeHandler}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} style={searchIconStyle} />
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
                    !notFound && selectedCategory === "Images"
                      ? "nav-button-selected-style"
                      : ""
                  }`}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#348B81")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      selectedCategory === "Images"
                        ? "transparent"
                        : "transparent")
                  }
                >
                  IMAGES
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-5">
                <Button
                  onClick={categoryHandler}
                  className={`nav-link nav-button-style ${
                    !notFound && selectedCategory === "Videos"
                      ? "nav-button-selected-style"
                      : ""
                  }`}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#348B81")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      selectedCategory === "Videos"
                        ? "transparent"
                        : "transparent")
                  }
                >
                  VIDEOS
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-5">
                <Button
                  onClick={categoryHandler}
                  className={`nav-link nav-button-style ${
                    !notFound && selectedCategory === "Music"
                      ? "nav-button-selected-style"
                      : ""
                  }`}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#348B81")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      selectedCategory === "Music"
                        ? "transparent"
                        : "transparent")
                  }
                >
                  MUSIC
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-5">
                <Button
                  onClick={categoryHandler}
                  className={`nav-link nav-button-style ${
                    !notFound && selectedCategory === "Services"
                      ? "nav-button-selected-style"
                      : ""
                  }`}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#348B81")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      selectedCategory === "Services"
                        ? "transparent"
                        : "transparent")
                  }
                >
                  SERVICES
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="d-flex justify-content-between align-items-center my-2 min-max-input-container-style">
          <div>
            <span>
              <h4 className="black-text-style">
                {!notFound
                  ? `Showing ${displayCount} results`
                  : "Showing 0 results"}
              </h4>
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
                <Dropdown.Item eventKey="default">Featured</Dropdown.Item>
                <Dropdown.Item eventKey="popularity">Popularity</Dropdown.Item>
                <Dropdown.Item eventKey="priceLowToHigh">
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item eventKey="priceHighToLow">
                  Price: High to Low
                </Dropdown.Item>
                <Dropdown.Item eventKey="rating">Highest Rated</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductNavBar;
