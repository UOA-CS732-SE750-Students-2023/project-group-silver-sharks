import React from 'react';



const ProductLayout = ({ product }) => { 

    // errorpage needs its own separate nav bar
    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.url} alt={product.name} />
            <p>{product.description}</p>
        </div>
    );
}

export default ProductLayout;