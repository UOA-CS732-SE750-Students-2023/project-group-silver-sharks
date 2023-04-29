import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import ProductContext from '../store/product-context';

const ProductLayout = ({ product, author }) => { 
    const productCtx = useContext(ProductContext);

    const addReviewWindowHandler = () => {
        productCtx.showReview();
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{`Price: ${product.price}`}</p>
            <Link to={`/store/author/${author._id}`}><p style={{ color: '#000000' }}>{author.username}</p></Link>
            <img src={'http://localhost:3000/uploads/' + product.coverImage}/>
            <button onClick={addReviewWindowHandler}>Add Review</button>
        </div>
    );
}

export default ProductLayout;

// <Link to={`/store/author/${author._id}`}><p>{author.username}</p></Link>

