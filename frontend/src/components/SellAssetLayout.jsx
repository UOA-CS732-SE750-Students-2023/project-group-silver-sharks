import React from 'react'; 
import { useNavigate, useActionData, Form as RouterForm } from 'react-router-dom';
import { Container, Row, Col, Button, FormGroup, FormControl, Form, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import './SellAssetLayout.css';

const SellAssetLayout = () => { 

    // data returned from the post request -> if there are any errors or a response it will be in here
    const data = useActionData();

    const navigate = useNavigate();

    // return to previous page
    function cancelHandler() {
        navigate('..');
    }

    return (
      <Container fluid className="container-fluid">
        <Row className="mt-5"></Row> 
        <Row>
          <Col className="sell-asset-title">
            <div>
              <h4 className="mt-4">Sell an asset</h4>
            </div>
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
          </Col>
        </Row>
      </Container>
    );
}

export default SellAssetLayout;

