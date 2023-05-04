import React, { useRef, useState, useEffect } from 'react';
import './PurchaseLayout.css';

const PurchaseLayout = ({ purchasedAssets }) => {
  const [imageHeight, setImageHeight] = useState(null);
  const imageRef = useRef();

  console.log("+++++++++++++++++++++++++++++++++++++++")
  console.log("purchased assets in purchase layout: " + purchasedAssets, 9)
  console.log("+++++++++++++++++++++++++++++++++++++++")

  useEffect(() => {
      if (imageRef.current) {
          setImageHeight(imageRef.current.offsetHeight);
      }
  }, [imageRef]);

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
                              <img src={'http://localhost:3000/uploads/' + asset.coverImage} alt={asset.name} />
                          </div>
                          <div className="asset-details" style={{ gap: imageHeight ? `${imageHeight * 0.02}px` : '1px' }}>
                              <h3>{asset.name}</h3>
                              <p>Price: ${asset.price.toFixed(2)}</p>
                              <p>Category: {asset.category}</p>
                              {asset.downloadFiles.map((fileName, i) => 
                                <a href={'http://localhost:3000/downloadFiles/' + fileName} download>{`Download item ${i}`}</a>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
            </div>  
          </div>
        </>
    );
}

//<a href={`/review/${asset.pid}`}>Review</a>

export default PurchaseLayout;
