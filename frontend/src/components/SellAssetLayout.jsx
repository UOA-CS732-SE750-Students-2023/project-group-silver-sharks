import React, { useState } from "react";
import { useNavigate, useActionData, Form, json } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./SellAssetLayout.css";

const SellAssetLayout = ({ userId }) => {
  
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [files, setFiles] = useState('');
  const [category, setCategory] = useState('Images'); 
  const [price, setPrice] = useState(0);

  // data returned from the post request -> if there are any errors or a response it will be in here
  const data = useActionData();

  const navigate = useNavigate();

  // return to previous page
  function cancelHandler() {
    navigate("..");
  }

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
    //const enteredFiles = Array.prototype.slice.call(event.target.files)
    setFiles(event.target.files);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    console.log(event.target.value, 48)
    setCategory(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // print all the data returned from the form 
    console.log("after form submission !!!"); 
    console.log(enteredTitle, 56);
    console.log(enteredDescription, 57);
    console.log(price, 58);
    console.log(category, 59);
    console.log(coverImage, 60);
    console.log(files, 61);
    console.log("END");

    // print the user id that will be needed to create the product in the backend
    console.log(userId, 65);

    const productData = {
      name: enteredTitle, 
      description: enteredDescription, 
      category: category, 
      price: price
    }

    // print the user id that will be needed to create the product in the backend
    console.log(userId, 65);

    const textResponse = await fetch('http://localhost:3000/products/sell/' + userId, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',   // */*
        },
        body: JSON.stringify(productData)
    });
  
    if (!textResponse.ok){
        throw json({ message: "Could not successfully submit the text data for the sell assets action."}, { status: 500 });
    }

    const newProduct = await textResponse.json()

    console.log("***************************************************")
    console.log(newProduct._id);
    console.log(newProduct.name);
    console.log("***************************************************")

    // 

    // second post request to submit the cover image
    const coverImageFormData = new FormData();
    coverImageFormData.append("files", coverImage);

    const fileResponse = await fetch('http://localhost:3000/upload-coverimage/' + newProduct._id, {
        method: "POST",
        body: coverImageFormData
    });

    if (!fileResponse.ok){
        throw json({ message: "Could not successfully submit the cover image for the sell assets action."}, { status: 500 });
    }
    
    console.log("done")

  };

  return (
    <Container fluid className="container-fluid">
      <Row className="mt-5"></Row>
      <Row>
        <Col className="sell-asset-title">
          <div>
            {/* <h4 className="mt-4">Sell an asset</h4> */}
            <h4>Sell an asset</h4>
          </div>
          <form  className="sell-assets" enctype='multipart/form-data' onSubmit={submitHandler}>
            <div className="form-group">
              <input
                id="title"
                type="text"
                name="title"
                className="styled-input"
                placeholder="title"
                value={enteredTitle}
                onChange={titleChangeHandler}
                required
              />
              <span className="required-star">*</span>
            </div>
            <div className="form-group">
              <textarea
                id="description"
                name="description"
                rows="5"
                className="styled-input"
                placeholder="description"
                value={enteredDescription}
                onChange={descriptionChangeHandler}
                required
              />
              <span className="required-star-des">*</span>
            </div>
            <div className="upload-container">
              <p>Drag and drop file</p>
              <p>or</p>
              <input
                type="file"
                name="files"
                id="files"
                onChange={coverImageChangeHandler}
              />
            </div>
            <div className="upload-container">
              <p>Add product files</p>
              <input
                type="file"
                name="files"
                id="files"
                onChange={filesChangeHandler}
                multiple
              />
            </div>
            <div className="form-group">
              <input
                id="price"
                type="number"
                name="price"
                className="styled-input"
                placeholder="Price"
                value={price}
                onChange={priceChangeHandler}
                required
                style={{ width: "10%" }}
              />
              <span className="required-star-price">*</span>
            </div>
            <div>
              {/* <label htmlFor="category">Filter by year</label> */}
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
            </div>
            <div className="d-flex justify-content-center">
              {/* <Button
                variant="secondary"
                type="button"
                className="mt-4 me-2"
                onClick={cancelHandler}
              >
                Cancel
              </Button> */}
              <Button
                variant="primary"
                type="submit"
                className="mt-4"
                style={{ backgroundColor: "#348B81" }}
              >
                List asset
              </Button>
            </div>
          </form>
        </Col>        
      </Row>
    </Container>
  );
};

export default SellAssetLayout;

/*
  <RouterForm method="POST" action="/store/sell-asset" >
            <Form className="form-container">
              <FormGroup>
                <FormControl id="title" type="text" name="title" placeholder="Title" required />
              </FormGroup>
  
              <FormGroup className="mt-3">
                <FormControl as="textarea" id="description" name="description" placeholder="Description" rows={4} required />
              </FormGroup>
  
              <FormGroup className="mt-3">
                <div className="upload-container">
                  <p>Add Cover image</p>
                  <input type="file" name="cover-image" id="cover-image" />
                </div>
              </FormGroup>

              <FormGroup className="mt-3">
                <div className="upload-container">
                  <p>Add product files</p>
                  <input type="file" name="files" id="files" multiple/>
                </div>
              </FormGroup>
  
              <FormGroup className="mt-3">
                <FormControl id="price" type="number" name="price" placeholder="Price" required style={{ width: '10%' }} />
              </FormGroup>
  
              <FormGroup className="mt-3">
                <Form.Select id="category" name="category" style={{ width: '25%' }}>
                  <option value="Images">Category: Images</option>
                  <option value="Videos">Category: Videos</option>
                  <option value="Music">Category: Music</option>
                  <option value="Services">Category: Services</option>
                </Form.Select>
              </FormGroup>
  
              <div className="d-flex justify-content-center">
                <Button variant="secondary" type="button" className="mt-4 me-2" onClick={cancelHandler}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="mt-4" style={{ backgroundColor: '#348B81' }}>
                  Submit
                </Button>
              </div>
            </Form>
            </RouterForm>

*/
