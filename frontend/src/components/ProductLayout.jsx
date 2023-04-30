import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import ProductContext from '../store/product-context';

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

