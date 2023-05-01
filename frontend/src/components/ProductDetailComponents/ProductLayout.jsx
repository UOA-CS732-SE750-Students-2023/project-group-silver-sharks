import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import "./ProductLayout.css";
import "./AddReviewForm.css"

const ProductLayout = ({ product, author, reviews }) => {
  const productCtx = useContext(ProductContext);

  //Calculate the number of reviews
  const totalAmount=reviews.length;
  const reviewnumber = totalAmount > 1 ? 'reviews' : 'review';

  // Calculate the average 
  const totalLike = reviews.reduce((acc, item) => acc + item.rating, 0);
  const avg_rating=totalLike/totalAmount;

  /* const addReviewWindowHandler = () => {
    // give the add review window the product id
    productCtx.showReview();
  }; */

  // Add Review Button - Newly added
  const [showAddReviewWindow, setShowAddReviewWindow] = useState(false);

  const addReviewWindowHandler = () => {
    setShowAddReviewWindow(true);
  };
  
  const closeAddReviewWindowHandler = () => {
    setShowAddReviewWindow(false);
  };

  const [a_title, setTitle] = useState('Sort by: Price: Low to High');
  const handleSelect = (eventKey) => {
      if (eventKey === 'plth') {
        setTitle('Sort by: Price: Low to High');
      } else {
        setTitle('Sort by: Price: High to Low');
      }
    };
  const sold = 100; // Replace this variable with the actual number of sales

  const [role,setRole] = useState('admin');
  const [ifpurchased,setPurchased] = useState('purchased');
  
  const navigateEditListing = () => {
    navigate('../author/2');
  }

  const navigateRemoveListing = () => {
      navigate('../author/2');
  }

  return (
    <div className="product-layout">
      {showAddReviewWindow && (
      <div className="add-review-window" onClick={closeAddReviewWindowHandler}>
        <div
          className="add-review-container"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Add Review</h2>
          <input type="text" placeholder="Review Title" />
          <textarea rows="4" placeholder="Your review"></textarea>
          <button className="add-button">Add Review</button>
          <button className="cancel-button" onClick={closeAddReviewWindowHandler}>
            Cancel
          </button>
        </div>
      </div>
      )}
      <div className="product-details">
        {role === 'admin' && 
                      <div className="p_btnstyling">
                          <button onClick={navigateEditListing}>Edit listing</button>
                          <button onClick={navigateRemoveListing}>Remove listing</button>
                      </div>}
        <h1>{product.name}</h1>
        <div className="product-info">
          <div className="product-left">
            <img
              src={"http://localhost:3000/uploads/" + product.coverImage}
              alt={product.name}
            />
            <div className="cardcontent_container">
              <div className="product-stats d-flex justify-content-between">
                <div><p>{`${sold} sold`}</p></div>
                <div><p><Link to={`/store/author/${author._id}`} style={{ color: "#000000" }}>{author.username}</Link></p></div>
              </div>
              <p>
                &#x2605; {product.averageRating}
              </p>
              <div className="product-buttons">
                <div className="d-flex justify-content-end align-items-center">
                  <button className="message-button">Message</button>
                </div>
                <div className="d-flex justify-content-between">
                  <div><h2>{`$ ${product.price.toFixed(0)}`}<span>{`${product.price.toFixed(2).substr(-2)}`}</span></h2></div>
                  <div><button>Add to cart</button></div>
                </div>
              </div>
            </div>
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
          <div className="p_headofreview d-flex justify-content-between">
            <div>
              <p>{totalAmount}&nbsp;{reviewnumber}</p>
              <h1>&#x2605; {avg_rating}</h1>
            </div>
            <div className="p_inline">
              {ifpurchased === 'purchased' && 
              <div><button onClick={addReviewWindowHandler} className="add-review-button">Add Review</button></div>}
              <div>
                <InputGroup>
                        <DropdownButton
                            variant="outline-secondary"
                            title={a_title}
                            id="sort-dropdown"
                            align="end"
                            onSelect={handleSelect}
                            className='p_dropdownbutton'
                        >
                            <Dropdown.Item href="#/price-asc" eventKey="plth">Sort by: Most recent</Dropdown.Item>
                            <Dropdown.Item href="#/price-desc" eventKey="phtl">Sort by: Highest rate</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </div>
            </div>
          </div>
          {reviews.map((review, index) => (
            <div key={review._id} className="review">
              <div className="review-info">
                {index !== 0 && <div className="border-top border-2"></div>}
                <div>
                  <div className="review-info-top row">
                    <div className="col-sm-2">
                      <Link to={"/store/author/" + review.account._id}><p>{review.account.username}</p></Link>
                    </div>
                    <div className="col-sm-1">
                      <p>&#x2605; {review.rating}</p>
                    </div>
                    <div className="col-sm-8">
                      <p>3 days ago</p>
                    </div>
                  </div>
                  
                </div>

                <div className="review-content">
                  <p>{review.text}</p>
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

/* import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import ProductContext from '../../store/product-context';

const ProductLayout = ({ product, author, reviews }) => { 
    const productCtx = useContext(ProductContext);

    const addReviewWindowHandler = () => {    
        // give the add review window the product id
        productCtx.showReview();
    }

    console.log("-----------------------------------------")
    console.log(reviews)
    console.log("-----------------------------------------")



    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{`Price: ${product.price}`}</p>
            <Link to={`/store/author/${author._id}`}><p style={{ color: '#000000' }}>{author.username}</p></Link>
            <img src={'http://localhost:3000/uploads/' + product.coverImage} width="100px" height="100px"/>
            {reviews.map((review) => (
            <li key={review._id} >
                    <span>
                        <h3>Review:</h3>
                        <p>{review.text}</p>
                    </span>
                    <br />
                    <span>
                        <h3>Rating:</h3>
                        <p>{review.rating}</p>
                    </span>
                    <br />
                    <span>
                        <h3>Review By</h3>
                        <Link to={"/store/author/" + review.account._id}><p style={{ color: '#000000' }}>{review.account.username}</p></Link>
                    </span>
                    <hr />
            </li>
            ))}

            <button onClick={addReviewWindowHandler}>Add Review</button>
        </div>
    );
}

export default ProductLayout;

// <Link to={`/store/author/${author._id}`}><p>{author.username}</p></Link>

 */