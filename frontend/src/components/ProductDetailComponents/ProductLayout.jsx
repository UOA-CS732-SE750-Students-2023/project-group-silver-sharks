import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Link,
  useSubmit,
  useNavigation,
  useNavigate,
  json,
  useActionData,
} from "react-router-dom";
import ProductContext from "../../store/product-context";
import { InputGroup, DropdownButton, Dropdown } from "react-bootstrap";
import moment from "moment";
import "./ProductLayout.css";
import "./AddReviewForm.css";
import "./EditProductWindow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ProductLayout = ({
  product,
  author,
  reviews,
  userType,
  userId,
  isOwnAccount,
  alreadyPurchased,
  productId,
  getReviewsByFilter,
  showReviewFilter,
}) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const [letAddToCart, setLetAddToCart] = useState(false);
  const [addToCartText, setAddToCartText] = useState("Add to cart");
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const submitData = useActionData();
  const [error, setError] = useState(false);

  // trigger an action programmatically
  const submit = useSubmit();
  const productCtx = useContext(ProductContext);
  const [showReview, setShowReview] = useState(false);

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();
  const textInputRef = useRef();
  const rating1Ref = useRef(null);
  const rating2Ref = useRef(null);
  const rating3Ref = useRef(null);
  const rating4Ref = useRef(null);
  const rating5Ref = useRef(null);

  // show the review window or hide it
  const [showAddReviewWindow, setShowAddReviewWindow] = useState(false);

  // edit product details window
  const [editProductWindow, setEditProductWindow] = useState(false);

  const openEditWindowHandler = () => {
    setEditProductWindow(true);
  };

  const closeEditWindowHandler = () => {
    setEditProductWindow(false);
  };

  const closeAddReviewWindowHandler = () => {
    setShowAddReviewWindow(false);
  };

  const checkCanReview = async () => {
    const response = await fetch(
      "http://localhost:3000/products/pid/" + product._id + "/can-review"
    );

    // if this if statement triggers then the lines thereafter wont execute.
    if (!response.ok) {
      setShowReview(false);
      setAlreadyReviewed(true);
      return;
    }

    setShowReview(true);
  };

  // check that the user can actually post a review
  useEffect(() => {
    checkCanReview().catch((error) => {
      console.log(error);
    });

    if (alreadyPurchased) {
      setAddToCartText("Purchased");
      setLetAddToCart(false);
    }

    if (isOwnAccount) {
      setAddToCartText("Listed by you");
      setLetAddToCart(false);
    }

    let inCart = false;

    checkItemInCart()
      .then((output) => {
        console.log("inside the return");

        if (output) {
          setAddToCartText("In Cart");
          setLetAddToCart(false);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    if (!inCart && !isOwnAccount && !alreadyPurchased) {
      setAddToCartText("Add to cart");
      setLetAddToCart(true);
    }
  }, []);


  //Calculate the number of reviews
  const totalAmount = reviews.length;
  const reviewnumber = totalAmount > 1 ? "reviews" : "review";

  // Calculate the average
  const totalLike = reviews.reduce((acc, item) => acc + item.rating, 0);
  const average_ra = totalLike / totalAmount;
  const avg_rating = totalAmount > 0 ? average_ra : "Not available";

  const addReviewWindowHandler = async () => {
    const response = await fetch(
      "http://localhost:3000/products/pid/" + product._id + "/can-review"
    );

    // if this if statement triggers then the lines thereafter wont execute.
    if (!response.ok) {
      setShowReview(false);
      setAlreadyReviewed(true);
      return;
    }

    setShowReview(true);

    setShowAddReviewWindow(true);
  };

  // returns a boolean: true or false if the item is already in cart
  const checkItemInCart = async () => {
    // /account/is-in-cart/pid/:pid
    const response = await fetch(
      "http://localhost:3000/account/is-in-cart/pid/" + product._id
    );

    if (!response.ok) {
      throw json(
        { message: "Incorrect Product id supplied" },
        {
          status: 500,
        }
      );
    }

    const responseData = await response.json();

  

    return responseData.inCart;
  };

  const addToCartHandler = async () => {

    // making the GET request to the backend to add to cart

    const response = await fetch(
      "http://localhost:3000/account/cart/pid/" + product._id
    );

    if (!response.ok) {
      throw json(
        { message: "Could not add item to cart." },
        {
          status: 500,
        }
      );
    }

    // reload the page so the cart gets updated
    window.location.reload();
  };

  const getSelectedValue = () => {
    const radioRefs = [
      rating1Ref,
      rating2Ref,
      rating3Ref,
      rating4Ref,
      rating5Ref,
    ];

    for (const radioRef of radioRefs) {
      if (radioRef.current.checked) {
        return radioRef.current.value;
      }
    }

    return null;
  };

  const addReviewSubmitHandler = async (event) => {
    event.preventDefault();
    // reset the error message
    setError(false);

    // get the form data
    const text = textInputRef.current.value;
    const rating = getSelectedValue();



    if (!rating) {
      // display error message
      setError(true);
      return;
    }

    const reviewData = {
      text: text,
      rating: +rating,
    };

    const url = "http://localhost:3000/products/pid/" + productId + "/review";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      // backend throws 422 when data entered in form is invalid
      if (response.status === 422) {
        return response;
      }

      throw json({ message: "Could not save review." }, { status: 500 });
    }

    // redirect the user after submitting
    getReviewsByFilter("most_recent");
    closeAddReviewWindowHandler();
  };

  const editProductSubmitHandler = async (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const price = priceInputRef.current.value;


    const formData = {
      name: name,
      description: description,
      price: price,
    };

    const response = await fetch(
      "http://localhost:3000/products/" + product._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not edit product" }, { status: 500 });
    }



    // reload the current page and close the modal
    navigate(".");
    closeEditWindowHandler();
  };

  const [a_title, setTitle] = useState("Sort by: Most recent");

  const handleSelect = (eventKey) => {
    if (eventKey === "most_recent") {
      setTitle("Sort by: Most recent");
    } else if (eventKey === "highest_rating") {
      setTitle("Sort by: Highest rating");
    } else if (eventKey === "lowest_rating") {
      setTitle("Sort by: Lowest rating");
    }

    getReviewsByFilter(eventKey);
  };
  const sold = product.amountSold; // Replace this variable with the actual number of sales

  const [role, setRole] = useState(userType);
  const [ifpurchased, setPurchased] = useState("purchased");

  const navigateRemoveListing = () => {
    // call the delete product endpoint
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  };

  const createNewChatHandler = async () => {
    const chatData = {
      account1: userId,
      account2: author._id,
    };

    // post endpoint to create a new chat
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatData),
    });

    if (!response.ok) {
      throw json(
        {
          message:
            "Could not successfully create a new chat room with this user",
        },
        { status: 500 }
      );
    }

    const roomId = await response.json();


    // navigate to the messages page
    navigate("/store/profile/messages");
  };

  const convertToDaysAgo = (isoDate) => {
    const date = moment(isoDate);
    const now = moment();
    const daysAgo = now.diff(date, "days");
    if (daysAgo === 0) {
      const hoursAgo = now.diff(date, "hours");
      if (hoursAgo === 0) {
        const minutesAgo = now.diff(date, "minutes");
        if (minutesAgo === 0) {
          return `now`;
        } else if (minutesAgo === 1) {
          return `1 minute ago`;
        }
        return `${minutesAgo} minutes ago`;
      } else if (hoursAgo === 1) {
        return `1 hour ago`;
      }
      return `${hoursAgo} hours ago`;
    } else if (daysAgo === 1) {
      return `1 day ago`;
    }
    return `${daysAgo} days ago`;
  };

  return (
    <div className="product-layout">
      {showAddReviewWindow && (
        <div
          className="add-review-window"
          onClick={closeAddReviewWindowHandler}
        >
          <div
            className="add-review-container"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={addReviewSubmitHandler}>
              <h2>Add Review</h2>
              {error && (
                <div>
                  <p style={{ color: "red" }}>
                    Please select a value for both fields.
                  </p>
                </div>
              )}
              <textarea
                calssName="edit-review"
                rows="4"
                placeholder="Your review"
                id="review"
                name="review"
                ref={textInputRef}
                required
              ></textarea>
              <div className="rating-container">
                <label htmlFor="rating">Rating</label>
                <div className="star-rating">
                  <input
                    type="radio"
                    id="rating5"
                    name="rating"
                    value="5"
                    ref={rating5Ref}
                  />
                  <label htmlFor="rating5"></label>

                  <input
                    type="radio"
                    id="rating4"
                    name="rating"
                    value="4"
                    ref={rating4Ref}
                  />
                  <label htmlFor="rating4"></label>

                  <input
                    type="radio"
                    id="rating3"
                    name="rating"
                    value="3"
                    ref={rating3Ref}
                  />
                  <label htmlFor="rating3"></label>

                  <input
                    type="radio"
                    id="rating2"
                    name="rating"
                    value="2"
                    ref={rating2Ref}
                  />
                  <label htmlFor="rating2"></label>

                  <input
                    type="radio"
                    id="rating1"
                    name="rating"
                    value="1"
                    ref={rating1Ref}
                  />
                  <label htmlFor="rating1"></label>
                </div>
              </div>
              <button
                className="add-button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Add Review"}
              </button>
              <button
                className="cancel-button"
                onClick={closeAddReviewWindowHandler}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {editProductWindow && (
        <div className="add-review-window" onClick={closeEditWindowHandler}>
          <div
            className="add-review-container"
            onClick={(e) => e.stopPropagation()}
          >
            <form method="POST" onSubmit={editProductSubmitHandler}>
              <h2>Edit Details</h2>
              <input
                className="edit-name"
                type="text"
                placeholder="Edit name"
                id="name"
                name="name"
                ref={nameInputRef}
              />
              <textarea
                className="edit-description"
                rows="4"
                placeholder="Description..."
                id="description"
                name="description"
                ref={descriptionInputRef}
              ></textarea>
              <input
                className="edit-input"
                id="price"
                placeholder="Price"
                type="number"
                ref={priceInputRef}
              />
              <div>
                <button
                  className="add-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit Changes
                </button>
                <button
                  className="cancel-button"
                  onClick={closeEditWindowHandler}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="product-details">
        {role === "admin" && (
          <div className="p_btnstyling">
            <button onClick={openEditWindowHandler}>Edit listing</button>
            <button onClick={navigateRemoveListing}>Remove listing</button>
          </div>
        )}
        <h1>{product.name}</h1>
        <div className="product-info">
          <div className="product-left">
            <img
              src={"http://localhost:3000/uploads/" + product.coverImage}
              alt={product.name}
            />
            <div className="cardcontent_container">
              <div className="product-stats d-flex justify-content-between">
                <div>
                  <p>{`${sold} sold`}</p>
                </div>
                <div>
                  <p>
                    Author:&nbsp;&nbsp;
                    <Link
                      to={`/store/author/${author._id}`}
                      style={{ color: "#000000" }}
                    >
                      {author.username}
                    </Link>
                  </p>
                </div>
              </div>
              <p>
                &#x2605;{" "}
                {totalAmount > 0 ? average_ra.toFixed(1) : "Not available"}
              </p>
              <div className="product-buttons">
                <div className="d-flex justify-content-between">
                  <div>
                    <p>{product.category}</p>
                  </div>
                  {!isOwnAccount && (
                    <button
                      onClick={createNewChatHandler}
                      className="message-button"
                    >
                      Message
                    </button>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <div className="product-price">
                    <h2>
                      {`$ ${product.price.toFixed(0)}`}
                      <span>{`${product.price.toFixed(2).substr(-2)}`}</span>
                    </h2>
                  </div>
                  <div>
                    <button onClick={addToCartHandler} disabled={!letAddToCart}>
                      {addToCartText}
                    </button>
                  </div>
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
        <div className="p-hint">
          {alreadyReviewed && (
            <div>
              <p style={{ color: "red" }}>You can't review this product.</p>
            </div>
          )}
        </div>
        <div className="product-reviews">
          <div className="p_headofreview d-flex justify-content-between">
            <div>
              <p>
                {totalAmount}&nbsp;{reviewnumber}
              </p>
              <h1>
                &#x2605;{" "}
                {totalAmount > 0 ? average_ra.toFixed(1) : "Not available"}
              </h1>
            </div>
            <div className="p_inline">
              {ifpurchased === "purchased" && (
                <div>
                  <button
                    onClick={addReviewWindowHandler}
                    disabled={!showReview}
                    className="add-review-button"
                  >
                    Add Review
                  </button>
                </div>
              )}
              {showReviewFilter && (
                <div>
                  <InputGroup>
                    <DropdownButton
                      variant="outline-secondary"
                      title={
                        <span className="dropdown-title">
                          {a_title}
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="dropdown-chevron-icon"
                          />
                        </span>
                      }
                      id="sort-dropdown"
                      align="end"
                      onSelect={handleSelect}
                      className="p_dropdownbutton dropdown-toggle"
                    >
                      <Dropdown.Item href="#/recent" eventKey="most_recent">
                        Most recent
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/highrate"
                        eventKey="highest_rating"
                      >
                        Highest rating
                      </Dropdown.Item>
                      <Dropdown.Item href="#/lowrate" eventKey="lowest_rating">
                        Lowest rating
                      </Dropdown.Item>
                    </DropdownButton>
                  </InputGroup>
                </div>
              )}
            </div>
          </div>
          {reviews.map((review, index) => (
            <div key={review._id} className="review">
              <div className="review-info">
                {index !== 0 && <div className="border-top border-2"></div>}
                <div>
                  <div className="review-info-top row">
                    <div className="col-sm-2">
                      <Link to={"/store/author/" + review.account._id}>
                        <p>{review.account.username}</p>
                      </Link>
                    </div>
                    <div className="col-sm-1">
                      <p>&#x2605; {review.rating}</p>
                    </div>
                    <div className="col-sm-8">
                      <p>{convertToDaysAgo(review.createdAt)}</p>
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
