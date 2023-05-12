import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../pages/ui/Card";
import { StarFill } from "react-bootstrap-icons";
import classes from "../pages/ui/Card.module.css";
const StoreDisplayLayout = (props) => {
  const cardcon = {
    marginLeft: "10%",
    marginRight: "10%",
  };

  const noSearchResults = (
    <div>
      <h2>No search results found.</h2>
    </div>
  );

  // Convert priority value to corresponding color
  const priorityToColor = (priority) => {
    switch (priority) {
      case 3:
        return "#E2B0DD";
      case 2:
        return "#DDDEB1";
      case 1:
        return "white";
    }
  };

  const [authors, setAuthors] = useState({});

  useEffect(() => {
    // Fetch authors' data
    const fetchAuthors = async () => {
      const authorPromises = props.items.map(async (item) => {
        const response = await fetch(
          `http://localhost:3000/account/id/${item.author}`
        );
        const authorData = await response.json();
        return { id: item.author, username: authorData.username };
      });
      const authorDataList = await Promise.all(authorPromises);
      const newAuthors = {};
      for (const authorData of authorDataList) {
        newAuthors[authorData.id] = authorData.username;
      }
      setAuthors(newAuthors);
    };
    fetchAuthors();
  }, [props.items]);

  return (
    <div style={cardcon}>
      {/* Render search results if not empty */}
      {!props.notFound && (
        <ul className="row list-unstyled">
          {/* Iterate through items and render a card for each */}
          {props.items.map((item) => (
            <li key={item._id} className="col-sm-4">
              <Card priority={item.priority}>
                <div
                  className={`${classes.storepagecard}`}
                  style={{ backgroundColor: priorityToColor(item.priority) }}
                >
                  <div className={`${classes.storeimgcontainer}`}>
                    {
                      <img
                        src={"http://localhost:3000/uploads/" + item.coverImage}
                      />
                    }
                  </div>
                  <div className={`${classes.contentcontainer}`}>
                    <div className="row">
                      <div className={`${classes.productcontainer} col-md-8`}>
                        {/* Link to the product's details page */}
                        <Link
                          id="productLink"
                          to={`/store/product/${item._id}`}
                        >
                          <p
                            className="text-nowrap text-truncate"
                            style={{ margin: "0", padding: "0" }}
                          >
                            {item.name}
                          </p>
                        </Link>
                      </div>
                      <div className={`${classes.price} col-md-4`}>
                        <p>
                          ${Math.floor(item.price)}
                          <span>
                            {(item.price % 1).toFixed(2).split(".")[1]}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        {/* Link to the author's page */}
                        <Link
                          to={`/store/author/${item.author}`}
                          style={{ color: "black" }}
                        >
                          {authors[item.author]}
                        </Link>
                      </div>
                      <div>
                        <h5>{item.category}</h5>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between flex-wrap">
                      <h5>{item.amountSold} Sold</h5>
                      <h5 className="float-right">
                        <StarFill color="black" size={18} />
                        &nbsp;
                        {parseFloat(item.averageRating.$numberDecimal).toFixed(
                          1
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
      {props.notFound && noSearchResults}
    </div>
  );
};
export default StoreDisplayLayout;
