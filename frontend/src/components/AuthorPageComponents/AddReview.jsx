import React from 'react';
import { useNavigate, useNavigation, Form, useActionData } from "react-router-dom";
import ModalAddReview from '../modal/ModalAddReview';

const AddReview = (props) => { 
    // for data returned from our action 
    // to display if it was or wasnt successful
    const data = useActionData();

    const navigate = useNavigate();

    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <ModalAddReview onClose={props.closeReviewWindow}>
            <div>
                <Form method='POST'>
                    <div>
                        <label htmlFor="review">Review:</label>
                        <textarea id="review" name="review" rows="5" required /> 
                    </div>

                    <fieldset>
                        <legend>Rating</legend>
                        <br /><label htmlFor="rating1">1</label><br />
                        <input type="radio" id="rating1" name="rating" value="1" /> 
                        <br /><label htmlFor="rating2">2</label><br />  
                        <input type="radio" id="rating2"  name="rating" value="2" />
                        <br /><label htmlFor="rating3">3</label><br />
                        <input type="radio" id="rating3"  name="rating" value="3" /> 
                        <br /><label htmlFor="rating4">4</label><br />
                        <input type="radio" id="rating4"  name="rating" value="4" />
                        <br /><label htmlFor="rating5">5</label><br/>
                        <input type="radio" id="rating5"  name="rating" value="5" /> 
                    </fieldset>
                
                    <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
                </Form>  
            </div>       
        </ModalAddReview>
    );
}; 

export default AddReview;