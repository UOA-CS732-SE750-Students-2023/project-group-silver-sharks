import React, { useRef, useState, useEffect } from 'react';
import './PurchaseLayout.css';

const PurchaseLayout = () => {
  const [imageHeight, setImageHeight] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
      if (imageRef.current) {
          setImageHeight(imageRef.current.offsetHeight);
      }
  }, [imageRef]);

  const purchasedAssets = [
        {   
          pid: 5,
          aid: 2,
          name: 'sasuke',
          price:11.99,
          sold:23,
          like:5.0,
          category:'Image',
          url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
          author: 'bob',
          intro:'This is a brief introduction to the product.',
          description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
      },
      {   
        pid: 3,
        aid: 2,
        name: 'naruto',
        price:5.50,
        sold:8545,
        like:3.2,
        category:'Image',
        url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
        author: 'herobrine',
        intro:'This is a brief introduction to the product.',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {   
      pid: 1,
      aid: 2,
      name: 'goku',
      price:138912.00,
      sold:414,
      like:4.8,
      category:'Image',
      url: 'https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku-814x1024.jpg',
      author: 'steve',
      intro:'This is a brief introduction to the product.',
      description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
  ];

    return (
        <>
          <div className="purchase-layout">
            <div className="purchase-assets">
              <h2>Purchased Assets</h2>
              <div className="assets-container">
                <p>Showing {purchasedAssets.length} purchased assets</p>
                  {purchasedAssets.map((asset, index) => (
                      <div className="asset-item" key={index}>
                          <div className="asset-image" ref={imageRef}>
                              <img src={asset.url} alt={asset.name} />
                          </div>
                          <div className="asset-details" style={{ gap: imageHeight ? `${imageHeight * 0.02}px` : '1px' }}>
                              <h3>{asset.name}</h3>
                              <p>Price: ${asset.price.toFixed(2)}</p>
                              <p>Category: {asset.category}</p>
                              <a href={asset.url} download>Download</a>
                              <a href={`/review/${asset.pid}`}>Review</a>
                          </div>
                      </div>
                  ))}
              </div>
            </div>  
          </div>
        </>
    );
}

export default PurchaseLayout;
