import React from 'react';


/*
    {   
        pid: Math.random().toString(),
        aid: Math.random().toString(),
        name: 'sasuke',
        url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
        author: 'lisa ann',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },

*/

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