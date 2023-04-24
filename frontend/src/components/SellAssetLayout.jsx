import React from 'react'; 
import { useActionData,useNavigation,useNavigate,Form,redirect,json } from 'react-router-dom';

const SellAssetLayout = () => { 

    // data returned from the post request -> if there are any errors or a response it will be in here
    const data = useActionData();

    const navigate = useNavigate();

    // return to previous page
    function cancelHandler() {
        navigate('..');
    }
    
    return (
        <div> 
           <Form method='POST' id='text-data'>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" required />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" rows="5" required />
                </div>
                <div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select id="category">
                            <option value='Images'>Images</option>
                            <option value='Videos'>Videos</option>
                            <option value='Services'>Services</option>
                            <option value='Music'>Music</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input id="price" type="number" name="title" required />
                </div>
                
                <div>
                    <button type="button" onClick={cancelHandler}>
                        Cancel
                    </button>
                    <button type="submit">Submit</button>
                </div>
            </Form>

            <Form method='POST' id='file-data'>
                <input type="file" id="file" accept=".jpg, .png, .mp3, .mp4, .gif" multiple></input>
                <button type="submit">Upload File</button>
            </Form>
           
        </div>
    );
}

export default SellAssetLayout;

export const action = async ({request,params}) => {
    
    console.log(request.id);

    /*
    // NEED THE USER ID HERE
    
    // getting the form data from request argument 
    const formData = await request.formData();
    const sellingProductData = {
        title: formData.get('title'),
        image: formData.get('image'),
        date: formData.get('date'),
        description: formData.get('description'),
    };
  
    // getting the http method from the request argument
    const method = request.method;
  
    let url = 'http://localhost:8080/events';
  
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(eventData)
    });
  
    if (!response.ok){
        // backend throws 422 when data entered in form is invalid
        if (response.status === 422){
            return response;
        }
  
        throw json({ message: "Could not save product."}, { status: 500 });
    }
  
    // redirect the user after submitting
    // this is another function provided by react router, heavy lifting done behind the scenes 
    // all you need to do is supply the url of the page you want to redirect to. 
    return redirect('/events');
    */

    return true;
};