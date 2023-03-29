import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductLayout from '../components/ProductLayout';

const DUMMY_DATA = [
    {   
        pid: 1,
        aid: 2,
        name: 'goku',
        url: 'https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku-814x1024.jpg',
        author: 'steve',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {   
        pid: 3,
        aid: 4,
        name: 'naruto',
        url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
        author: 'herobrine',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {   
        pid: 5,
        aid: 6,
        name: 'sasuke',
        url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
        author: 'bob',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
];

const ProductPage = () => { 
    const [items, setItems] = useState(DUMMY_DATA);

    const params = useParams()
    console.log(+params.productid)  

    let productDetails = {};

    items.forEach((item) => {
        if (+item.pid === +params.productid){
            productDetails = item;
        }
    })

    console.log(productDetails)
    return (
        <ProductLayout product={productDetails}/>
    );
}

export default ProductPage;

