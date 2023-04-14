import React, { useState } from 'react'; 
import ProductNavBar from '../components/ProductNavBar';
import StoreDisplayLayout from '../components/StoreDisplayLayout';


const DUMMY_DATA = [
    {   
        pid: 1,
        aid: 2,
        name: 'goku',
        price:80.00,
        sold:414,
        like:4.8,
        url: 'https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku-814x1024.jpg',
        author: 'steve',
        intro:'This is a brief introduction to the product.',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {   
        pid: 3,
        aid: 4,
        name: 'naruto',
        price:5.50,
        sold:8545,
        like:3.2,
        url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
        author: 'herobrine',
        intro:'This is a brief introduction to the product.',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {   
        pid: 5,
        aid: 6,
        name: 'sasuke',
        price:11.99,
        sold:23,
        like:5.0,
        url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
        author: 'bob',
        intro:'This is a brief introduction to the product.',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
];


const ProductSearchPage = () => { 

    const [products, setProducts] = useState(DUMMY_DATA);

    return (
        <>
            <ProductNavBar />
            <StoreDisplayLayout items={products} />
        </>
    );
}

export default ProductSearchPage;