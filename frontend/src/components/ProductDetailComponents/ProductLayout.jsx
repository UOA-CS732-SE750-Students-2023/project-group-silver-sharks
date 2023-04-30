import React from 'react';
import './ProductLayout.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';

const ProductLayout = ({ product }) => {
  const sold = 100; // Replace this variable with the actual number of sales
  const rating = 4.5; // Replace this variable with the actual rating
  const seller = "DanThePhotographer"; // Replace this variable with the actual seller's name
  const reviews = [
    {
      reviewer: 'Admin2',
      rating: 5,
      time: '3 days ago',
      content: 'Great product! Highly recommended.',
    },
    {
      reviewer: 'Admin3',
      rating: 4,
      time: '7 days ago',
      content: 'Great product! Recommended.',
    },
    // ...Add more reviews...
  ];

  const filterChangeHandler = (eventKey) => {
    console.log(`Selected filter: ${eventKey}`);
  };

  return (
    <div className="product-layout">
      <div className="product-details">
        <h1>{product.name}</h1>
        <div className="product-info">
          <div className="product-left">
            <img src={product.image} alt={product.name} />
            <div className="product-stats">
              <p>{`${sold} sold`}</p>
              <p>Seller: {seller}</p>
            </div>
            <p>
              &#x2605; {rating}
            </p>
            <div className="product-buttons">
              <button className="message-button">Message</button>
              <button className="add-to-cart-button">Add to cart</button>
            </div>
            <h2>{`$ ${product.price.toFixed(0)}`}<span>{`${product.price.toFixed(2).substr(-2)}`}</span></h2>
          </div>
          <div className="product-right">
            <p>Description:</p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <div className="reviews-container">
        <h2>Reviews</h2> 
        <div className="product-reviews">          
          <p>{`${reviews.length} reviews`}</p>
          <div style={{ position: 'absolute', top: '50px', right: '500px'}}>
            <InputGroup>
              <DropdownButton
                variant="outline-secondary"
                title="Filter"
                id="sort-dropdown"
                align="end"
                onSelect={filterChangeHandler}
                className="filter-dropdown"
              >
                <Dropdown.Item eventKey="newest">Newest</Dropdown.Item>
                <Dropdown.Item eventKey="oldest">Oldest</Dropdown.Item>
                <Dropdown.Item eventKey="ratingHighToLow">Rating: High to Low</Dropdown.Item>
                <Dropdown.Item eventKey="ratingLowToHigh">Rating: Low to High</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </div>
          {reviews.map((review, index) => (
            <div className="review" key={index}>
              <div className="review-info">
                <div className="review-info-top">
                  <h3>{review.reviewer}</h3>
                  <p>{'⭐'.repeat(review.rating)} {review.rating}</p>
                  <p>{review.time}</p>
                </div>
                <div className="review-content">
                  <p>{review.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
