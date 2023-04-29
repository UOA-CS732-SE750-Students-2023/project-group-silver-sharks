import React from 'react';
import { Link } from 'react-router-dom';

const ProductLayout = ({ product, author }) => { 

    console.log("INSIDE PRODUCT LAYOUT")

    console.log(author)


    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{`Price: ${product.price}`}</p>
            <Link to={`/store/author/${author._id}`}><p style={{ color: '#000000' }}>{author.username}</p></Link>
        </div>
    );
}

export default ProductLayout;

// <Link to={`/store/author/${author._id}`}><p>{author.username}</p></Link>