import React, { useState } from "react";
import { useNavigate, useActionData, Form } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./SellAssetLayout.css";

const SellAssetLayout = () => {
  
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState(''); 
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
    const enteredFiles = Array.prototype.slice.call(event.target.files)
    setFiles(enteredFiles);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // print all the data returned from the form 
    console.log("after form submission !!!"); 
    console.log(enteredTitle, 56);
    console.log(enteredDescription, 56);
    console.log(price, 56);
    console.log(category, 56);
    console.log(coverImage, 56);
    console.log(files, 56);
    console.log("END")

  };

  return (
    <Container fluid className="container-fluid">
      <Row className="mt-5"></Row>
      <Row>
        <Col className="sell-asset-title">
          <div>
            <h4 className="mt-4">Sell an asset</h4>
          </div>
          <form enctype='multipart/form-data' onSubmit={submitHandler}>
            <div>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="title"
                value={enteredTitle}
                onChange={titleChangeHandler}
                required
              />
            </div>
            <div>
              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="description"
                value={enteredDescription}
                onChange={descriptionChangeHandler}
                required
              />
            </div>
            <div className="upload-container">
              <p>Add Cover image</p>
              <input
                type="file"
                name="cover-image"
                id="cover-image"
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
            <div>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Price"
                value={price}
                onChange={priceChangeHandler}
                required
                style={{ width: "10%" }}
              />
            </div>
            <div>
              <label htmlFor="category">Filter by year</label>
              <select
                id="category"
                name="category"
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
              <Button
                variant="secondary"
                type="button"
                className="mt-4 me-2"
                onClick={cancelHandler}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="mt-4"
                style={{ backgroundColor: "#348B81" }}
              >
                Submit
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
