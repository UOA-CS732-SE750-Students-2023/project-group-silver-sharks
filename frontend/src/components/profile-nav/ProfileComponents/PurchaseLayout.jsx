import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PurchaseLayout.css";

const PurchaseLayout = ({ purchasedAssets }) => {
  const [imageHeight, setImageHeight] = useState(null);
  const imageRef = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.offsetHeight);
    }
  }, [imageRef]);

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

  return (
    <>
      <div className="purchase-layout">
        <div className="purchase-assets">
          <h2>Purchased Assets</h2>
          <div className="p-assets-container">
            <p style={{fontWeight: "600"}}>Showing {purchasedAssets.length} purchased assets</p>
            <div className="p-sco">
              {purchasedAssets.map((asset, index) => (
                <div className="asset-item" key={index}>
                  <div className="asset-image" ref={imageRef}>
                    <img
                      src={"http://localhost:3000/uploads/" + asset.coverImage}
                      alt={asset.name}
                    />
                  </div>
                  <div
                    className="asset-details"
                    style={{
                      gap: imageHeight ? `${imageHeight * 0.02}px` : "1px",
                    }}
                  >
                    
                    <button onClick={() => navigate(`/store/product/${asset._id}`)}>{asset.name}</button>
                    <p>Price: ${asset.price.toFixed(2)}</p>
                    <p>Category: {asset.category}</p>
                    {asset.category !== 'Services' && <button onClick={() => downloadFile(asset._id, asset.name)}>Download files</button>}
                    <button onClick={() => navigate(`/store/product/${asset._id}`)}>Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default PurchaseLayout;
