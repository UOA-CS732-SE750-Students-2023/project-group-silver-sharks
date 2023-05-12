import React from 'react';
import { useSubmit, useNavigate } from 'react-router-dom';
import './SellingLayout.css';

const SellingLayout = ({ sellingAssets }) => {
  const navigate = useNavigate();
  const submit = useSubmit();
  const downloadFile = async (productId, productname) => {
    try {
      const response = await fetch("http://localhost:3000/download/" + productId);

      const blob = await response.blob();

      // Create a Blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element and set the Blob URL as its href attribute
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = productname + '.zip';

      // Append the anchor to the document, trigger a click event, and remove it
      document.body.appendChild(anchor);
      anchor.click();
      setTimeout(() => {
        document.body.removeChild(anchor);
        URL.revokeObjectURL(blobUrl);
      }, 0);
      
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  }

  const removeListingHandler = async (productId) => {
    // call the delete product endpoint 
    const proceed = window.confirm('Are you sure?');

    if (proceed){
        submit({ id: productId }, { method: 'DELETE', action: '/store/profile/selling' });
    }
  }

  const totalEarnings = sellingAssets.reduce((acc, asset) => acc + asset.price * asset.amountSold, 0);

  return (
    <div className="selling-layout">
      <div className="selling-assets">
        <h2>Assets I'm selling</h2>
        <div className="assets-container">
          <p style={{fontWeight: "600"}}>Showing {sellingAssets.length} assets for sale</p>
          <div className='selling-scroll-container'>
            {sellingAssets.map((asset, index) => (
              <div className="asset-item" key={index}>
                <div className="asset-image">
                  <img src={"http://localhost:3000/uploads/" + asset.coverImage} alt={asset.name} />
                </div>
                <div className="asset-details">
                  
                  <button onClick={() => navigate(`/store/product/${asset._id}`)}>{asset.name}</button>
                  <p>Price: ${asset.price.toFixed(2)}</p>
                  <p>Category: {asset.category}</p>
                  <div className="asset-links">
                    <div>
                      {asset.category !== 'Services' && <button onClick={() => downloadFile(asset._id, asset.name)}>Download files</button>}
                    </div>
                    <div>
                      <button onClick={() => removeListingHandler(asset._id)}>Remove listing</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="total-earnings">
        <h2>Total earnings</h2>
        <div className="assets-container">
          <div className='earnings-scroll-container'>
            {sellingAssets.map((asset, index) => (
              <div className="asset-item" key={index}>
                <div className="asset-image">
                  <img src={"http://localhost:3000/uploads/" + asset.coverImage} alt={asset.name} />
                </div>
                <div className="asset-name-category">
                  <h6>{asset.name}</h6>
                  <p>Category: {asset.category}</p>
                </div>
                <div className="asset-price-sold">
                  <p>Price: ${asset.price.toFixed(2)}</p>
                  <p>{asset.amountSold} sold</p>
                </div>
                <div className="asset-total">
                  <p>${(asset.price * asset.amountSold).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
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
