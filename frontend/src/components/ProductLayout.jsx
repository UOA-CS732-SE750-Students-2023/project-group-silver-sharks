import React from 'react';

const ProductLayout = ({ product }) => { 

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{`Price: ${product.price}`}</p>
        </div>
    );
}

export default ProductLayout;