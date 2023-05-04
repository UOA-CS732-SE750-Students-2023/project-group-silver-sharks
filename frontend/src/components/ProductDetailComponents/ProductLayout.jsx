import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useSubmit, useNavigation, useNavigate, Form, useActionData, json } from "react-router-dom";
import ProductContext from "../../store/product-context";
import { InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import "./ProductLayout.css";
import "./AddReviewForm.css";
import "./EditProductWindow.css";

const ProductLayout = ({ product, author, reviews, userType }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';

  // trigger an action programmatically
  const submit = useSubmit();
  const productCtx = useContext(ProductContext);
  const [ showReview, setShowReview ] = useState(false);

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();

  // show the review window or hide it
  const [showAddReviewWindow, setShowAddReviewWindow] = useState(false);

  // edit product details window
  const [editProductWindow, setEditProductWindow] = useState(false);

  const checkCanReview = async () => {

    console.log("can check review !!!");
    const response = await fetch('http://localhost:3000/products/pid/' + product._id  + '/can-review');
    
    // if this if statement triggers then the lines thereafter wont execute.
    if (!response.ok){
      throw new Error("Something went wrong!");
    }
    
    const canReview = await response.json();
    console.log(canReview)
    setShowReview(canReview);
  };

  // check that the user can actually post a review
  useEffect(() => {

    checkCanReview().catch((error) => {
      console.log(error);
    });
     
  },[]);


  //Calculate the number of reviews
  const totalAmount=reviews.length;
  const reviewnumber = totalAmount > 1 ? 'reviews' : 'review';

  // Calculate the average 
  const totalLike = reviews.reduce((acc, item) => acc + item.rating, 0);
  const avg_rating=totalLike/totalAmount;

  const addReviewWindowHandler = async () => {
    
    const response = await fetch('http://localhost:3000/products/pid/' + product._id  + '/can-review');
    
    // if this if statement triggers then the lines thereafter wont execute.
    if (!response.ok){
      throw new Error("Something went wrong!");
    }
    
    const canReview = await response.json();

    if (!canReview){
      setShowReview(canReview);
      return;
    }

    setShowAddReviewWindow(true);
  };

  const openEditWindowHandler = () => {
    setEditProductWindow(true);
  }

  const closeEditWindowHandler = () => {
    setEditProductWindow(false);
  }

  const editProductSubmitHandler = async (event) => {
    event.preventDefault(); 

    const name = nameInputRef.current.value; 
    const description = descriptionInputRef.current.value;
    const price = priceInputRef.current.value;

    console.log(name, 92)
    console.log(description, 93)
    console.log(price, 97)

    const formData = {
      name: name, 
      description: description, 
      price: price
    }

    const response = await fetch("http://localhost:3000/products/" + product._id, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok){
      throw json({ message: "Could not edit product"}, { status: 500 });
    }

    console.log("edit event is successful");

    navigate("/store/product-search");
  }


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
  const sold = product.amountSold; // Replace this variable with the actual number of sales

  const [role,setRole] = useState(userType);
  const [ifpurchased,setPurchased] = useState('purchased');
  
  const navigateRemoveListing = () => {
    
    // call the delete product endpoint 
    const proceed = window.confirm('Are you sure?');

    if (proceed){
        submit(null, { method: 'DELETE' });
    }
  }

  return (
    <div className="product-layout">
      {showAddReviewWindow && (
      <div className="add-review-window" onClick={closeAddReviewWindowHandler}>
        <div
          className="add-review-container"
          onClick={(e) => e.stopPropagation()}
        >
          <Form method='POST'>
            <h2>Add Review</h2>
            <textarea calssName="edit-review" rows="4" placeholder="Your review" id="review" name="review"></textarea>
            <div className="rating-container">
              <label htmlFor="rating">Rating</label>
              <div className="star-rating">
                <input type="radio" id="rating5" name="rating" value="5" />
                <label htmlFor="rating5"></label>
                
                <input type="radio" id="rating4" name="rating" value="4" />
                <label htmlFor="rating4"></label>
                
                <input type="radio" id="rating3" name="rating" value="3" />
                <label htmlFor="rating3"></label>
                
                <input type="radio" id="rating2" name="rating" value="2" />
                <label htmlFor="rating2"></label>
                
                <input type="radio" id="rating1" name="rating" value="1" />
                <label htmlFor="rating1"></label>
              </div>
            </div>
            <button className="add-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Add Review'}</button>
            <button className="cancel-button" onClick={closeAddReviewWindowHandler}>
              Cancel
            </button>
          </Form>
        </div>
      </div>
      )}
      {editProductWindow && (
      <div className="add-review-window" onClick={closeEditWindowHandler}>
        <div
          className="add-review-container"
          onClick={(e) => e.stopPropagation()}
        >
          <form method='POST' onSubmit={editProductSubmitHandler}>
            <h2>Edit Details</h2>
            <input className="edit-name" type="text" placeholder="Edit name" id="name" name="name" ref={nameInputRef}/>
            <textarea className="edit-description" rows="4" placeholder="Description..." id="description" name="description" ref={descriptionInputRef}></textarea>
            <input className="edit-input" id="price" placeholder="Price" type="number" ref={priceInputRef}/>
            <div>
              <button className="add-button" type="submit" disabled={isSubmitting}>Submit Changes</button>
              <button className="cancel-button" onClick={closeEditWindowHandler}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
      <div className="product-details">
        {role === 'admin' && 
                      <div className="p_btnstyling">
                          <button onClick={openEditWindowHandler}>Edit listing</button>
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
                &#x2605; {avg_rating}
              </p>
              <div className="product-buttons">
                <div className="d-flex justify-content-end align-items-center">
                  <button className="message-button">Message</button>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="product-price">
                    <h2>{`$ ${product.price.toFixed(0)}`}</h2>
                    <span>{`${product.price.toFixed(2).substr(-2)}`}</span>
                  </div>
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
              <div><button onClick={addReviewWindowHandler} disabled={!showReview} className="add-review-button">Add Review</button></div>}
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