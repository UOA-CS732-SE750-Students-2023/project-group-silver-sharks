import React from 'react';
import './SellingLayout.css';

const SellingLayout = () => {
  const sellingAssets = [
    {
      pid: 1,
      name: 'Naruto',
      price: 5.5,
      category: 'Image',
      url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
      sold: 8545,
    },
    {
      pid: 2,
      name: 'sasuke',
      price: 11.99,
      category: 'Image',
      url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
      sold: 2000,
    },
    // Add more assets here
  ];

  const totalEarnings = sellingAssets.reduce((acc, asset) => acc + asset.price * asset.sold, 0);

  return (
    <div className="selling-layout">
      <div className="selling-assets">
        <h2>Assets I'm selling</h2>
        <div className="assets-container">
          <p>Showing {sellingAssets.length} assets for sale</p>
          {sellingAssets.map((asset, index) => (
            <div className="asset-item" key={index}>
              <div className="asset-image">
                <img src={asset.url} alt={asset.name} />
              </div>
              <div className="asset-details">
                <h3>{asset.name}</h3>
                <p>Price: ${asset.price.toFixed(2)}</p>
                <p>Category: {asset.category}</p>
                <div className="asset-links">
                  <div>
                    <a href={asset.url} download>Download</a>
                  </div>
                  <div>
                    <button onClick={() => handleRemove(asset.id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="total-earnings">
        <h2>Total earnings</h2>
        <div className="assets-container">
          {sellingAssets.map((asset, index) => (
            <div className="asset-item" key={index}>
              <div className="asset-image">
                <img src={asset.url} alt={asset.name} />
              </div>
              <div className="asset-name-category">
                <h3>{asset.name}</h3>
                <p>Category: {asset.category}</p>
              </div>
              <div className="asset-price-sold">
                <p>Price: ${asset.price.toFixed(2)}</p>
                <p>{asset.sold} sold</p>
              </div>
              <div className="asset-total">
                <p>${(asset.price * asset.sold).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <hr></hr>
          <div className="total-earnings-sum">
            <p>Total: ${totalEarnings.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellingLayout;
