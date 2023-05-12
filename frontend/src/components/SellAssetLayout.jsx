import React, { useState } from "react";
import {
  useNavigate,
  useActionData,
  json,
  Link,
} from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./SellAssetLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const SellAssetLayout = ({ userId, userStripeId }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("Images");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(false);
  const [renderAddFiles, setRenderAddFiles] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const priorityPrice = [0, 1000, 3000]; // In cents
  const [submitting, setSubmitting] = useState(false);

  // Admin User
  const adminId = "109761511246582815438"; // SharketPlace Admin
  const adminStripeId = "acct_1N5lDnCYHACaDnCs";

  // Add for priority
  const [priority, setPriority] = useState(1);

  // data returned from the post request -> if there are any errors or a response it will be in here
  const data = useActionData();

  const navigate = useNavigate();

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const coverImageChangeHandler = (event) => {
    const coverImageFile = event.target.files[0];
    setCoverImage(coverImageFile);
  };

  
  const filesChangeHandler = (event) => {
    setFiles(event.target.files);
  };
  

  const priceChangeHandler = (event) => {
    const inputPrice = event.target.value;
    if (inputPrice >= 0) {
      setPrice(inputPrice);
    }
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);

    if (event.target.value === "Services") {
      setRenderAddFiles(false);
    } else {
      setRenderAddFiles(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // reset the error message
    setError(false);

    // enable the submitting state variable to disable the list asset button
    setSubmitting(true);

    const productData = {
      name: enteredTitle,
      description: enteredDescription,
      category: category,
      price: price,
      priority: priority,
    };

    // Stripe Payment
    if (priority !== 1) {
      if (!stripe || !elements) {
        return;
      }
      try {
        // Create a payment method for each object in cart
        // It has to be like this since if we use a single payment method for multiple
        // objects in cart, Stripe will throw customer detachment error.
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        const response = await axios.post("/create-payment-intent", {
          userId: adminId,
          amount: priorityPrice[priority - 1], // Dictate the price depending on priority value
          connectedAccountId: adminStripeId,
          paymentMethodId: paymentMethod.id,
        });

        const clientSecret = response.data;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (paymentResult.error) {
          console.error("[error]", paymentResult.error);
        } else {
          if (paymentResult.paymentIntent.status === "succeeded") {
            navigate("/store/product/" + newProduct._id);
          }
        }
      } catch (err) {
        console.error(err.message);
        setSubmitting(false);
      }
    }
    const textResponse = await fetch(
      "http://localhost:3000/products/sell/" + userId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    if (!textResponse.ok) {
      setSubmitting(false);
      throw json(
        {
          message:
            "Could not successfully submit the text data for the sell assets action.",
        },
        { status: 500 }
      );
    }

    const newProduct = await textResponse.json();

    if (category !== "Services") {
      // third post request to upload the actual art files
      const productFiles = document.getElementById("multiple-files");
      const productFilesFormData = new FormData();

      for (let i = 0; i < productFiles.files.length; i++) {
        productFilesFormData.append("files", productFiles.files[i]);
      }

      const fileResponse = await fetch(
        "http://localhost:3000/upload-downloadfiles/" + newProduct._id,
        {
          method: "POST",
          body: productFilesFormData,
        }
      );

      if (!fileResponse.ok) {
        if (fileResponse.status === 415){
          setError(true);
          setSubmitting(false);
          return;
        }
        setSubmitting(false);
        throw json(
          {
            message:
              "Could not successfully submit the product files for the sell assets action.",
          },
          { status: 500 }
        );
      }
    }

    // second post request to submit the cover image
    const coverImageFormData = new FormData();
    coverImageFormData.append("files", coverImage);

    const coverImageResponse = await fetch(
      "http://localhost:3000/upload-coverimage/" + newProduct._id,
      {
        method: "POST",
        body: coverImageFormData,
      }
    );

    if (!coverImageResponse.ok) {
      setSubmitting(false);
      throw json(
        {
          message:
            "Could not successfully submit the cover image for the sell assets action.",
        },
        { status: 500 }
      );
    }

    // disable the submitting state variable to enable the list asset button
    setSubmitting(false);

    navigate("/store/product/" + newProduct._id);
  };

  return (
    <Container fluid className="container-fluid">
      <Row className="mt-5"></Row>
      <Row>
        <Col className="sell-asset-title">
          <div>
            <h4>Sell an asset</h4>
          </div>
          <form
            className="sell-assets"
            enctype="multipart/form-data"
            onSubmit={submitHandler}
          >
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                className="styled-input"
                placeholder=""
                value={enteredTitle}
                onChange={titleChangeHandler}
                required
              />
              <span className="required-star">*</span>
            </div>
            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                className="styled-input"
                placeholder=""
                value={enteredDescription}
                onChange={descriptionChangeHandler}
                required
              />
              <span className="required-star-des">*</span>
            </div>
            {/* Error message */}
            {error && <div className="error-message">Incorrect File type being uploaded</div>}
            {/* Cover Image */}
            <div className="upload-container">
              <p>Add Cover image</p>
              <input
                type="file"
                name="cover-image"
                id="cover-image"
                onChange={coverImageChangeHandler}
                required
                className="file-input"
              />
            </div>
            {/* Product Files */}
            {renderAddFiles && (
              <div className="upload-container">
                <p>Add product files</p>
                <input
                  type="file"
                  name="files"
                  id="multiple-files"
                  onChange={filesChangeHandler}
                  multiple
                  className="file-input"
                  required
                />
              </div>
            )}
            {/* Price */}
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                name="price"
                className="styled-input"
                placeholder=""
                value={price}
                onChange={priceChangeHandler}
                required
                style={{ width: "8%", borderRadius: '10px' }}
                min="1"
              />
              <span className="required-star-price">*</span>
            </div>
            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <div className="select-container">
                <select
                  className="styled-select"
                  value={category}
                  onChange={categoryChangeHandler}
                >
                  <option value="Images">Images</option>
                  <option value="Videos">Videos</option>
                  <option value="Music">Music</option>
                  <option value="Services">Services</option>
                </select>
                <div className="select-chevron">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            </div>
            {/* Priority */}
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <div className="s_inputStyling row">
                <div className="col-sm-2">
                  <label htmlFor="normal">Normal (free)</label>
                  <input
                    type="radio"
                    id="normal"
                    name="priority"
                    value="1"
                    checked={priority === 1}
                    onChange={(e) => setPriority(Number(e.target.value))}
                  />
                </div>
                <div className="col-sm-2">
                  <label htmlFor="high">High ($10)</label>
                  <input
                    type="radio"
                    id="high"
                    name="priority"
                    value="2"
                    checked={priority === 2}
                    onChange={(e) => setPriority(Number(e.target.value))}
                  />
                </div>
                <div className="col-sm-8">
                  <label htmlFor="super">Super ($30)</label>
                  <input
                    type="radio"
                    id="super"
                    name="priority"
                    value="3"
                    checked={priority === 3}
                    onChange={(e) => setPriority(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            {priority === 1 ? (
              <></>
            ) : (
              <>
                Make your payment here.
                <div className="card-element-container">
                  <CardElement />
                </div>
              </>
            )}
            <div className="list-asset-wrapper">
              { userStripeId ? (
                <div>
                  <Button
                  variant="primary"
                  type="submit"
                  className="mt-4"
                  disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'List asset'}
                  </Button>
                </div>
              ) : (
                <div
                >
                  <div>
                  <Link to={'/store/profile'} style={{ color: "black" }}>
                    Stripe is not linked to your account! Please set up your
                    Stripe authentication.
                  </Link>
                  </div>
                  <Button
                    disabled
                    variant="primary"
                    type="submit"
                    className="mt-4"
                    style={{
                      backgroundColor: "#348B81",
                      border: "none",
                      borderRadius: "25px",
                      padding: "10px 30px",
                    }}
                  >
                    List asset
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default SellAssetLayout;
