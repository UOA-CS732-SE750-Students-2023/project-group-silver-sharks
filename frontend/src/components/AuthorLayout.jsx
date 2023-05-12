import React, { useState } from "react";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import { InputGroup, DropdownButton, Dropdown } from "react-bootstrap";
import Card from "../pages/ui/Card";
import { StarFill } from "react-bootstrap-icons";
import classes from "../pages/ui/Card.module.css";
import "./AuthorLayout.css";

const AuthorLayout = ({
  author,
  userAccountType,
  authorPageId,
  userId,
  isOwnAccount,
}) => {
  const submit = useSubmit();
  const navigate = useNavigate();

  // checking the account type of the user
  const isAdmin = (userAccountType === "admin");

  let averageRatingTemp = 0;
  
  author.sellingProducts.forEach((item) => {
    const rating = parseFloat(item.averageRating.$numberDecimal);
    averageRatingTemp += rating;
});

const averageRating2 = (averageRatingTemp / author.sellingProducts.length).toFixed(1);

  // Calculating the total number of sellingProducts and assigning the appropriate text for the number of items
  const totalItems = author.sellingProducts.length;
  const itemText = totalItems > 1 ? "assets" : "asset";

  // Defining a function to handle the selection of the sorting option
  const [a_title, setTitle] = useState("Sort by: Price: Low to High");
  const handleSelect = (eventKey) => {
    if (eventKey === "plth") {
      setTitle("Sort by: Price: Low to High");
    } else {
      setTitle("Sort by: Price: High to Low");
    }
  };
  
  // Defining a function to handle the deletion of an account
  const deleteAccountHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit({ isAdmin: isAdmin, isOwnAccount: isOwnAccount }, { method: "DELETE" });
    }
  };

  const createNewChatWithUser = async () => {
    const chatData = {
      account1: userId,
      account2: authorPageId,
    };

    // post endpoint to create a new chat
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatData),
    });

    if (!response.ok) {
      throw json(
        {
          message:
            "Could not successfully create a new chat room with this user",
        },
        { status: 500 }
      );
    }

    const roomId = await response.json();

    

    // navigate to the messages page
    navigate("/store/profile/messages");
  };

  return (
    <div className="a_allcontainer">
      <div className="a_formargin">
        <div className="a_firstdiv">
          <h1 className="a_authorname">{author.username}</h1>
          <div className="a_forcontainbutton row">
            {!isOwnAccount && (
              <div className="a_message col-sm-2">
                <button className="a_message" onClick={createNewChatWithUser}>
                  Message
                </button>
              </div>
            )}
            {isAdmin && (
              <div className="a_forcontainlink col-sm-10">
                <button onClick={deleteAccountHandler}>Delete Account</button>
              </div>
            )}
            
          </div>
        </div>
        <div className="a_tablecontainer">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>Average Rating</td>
                <td>{averageRating2}</td>
              </tr>
              
              <tr>
                <td>Assets Sold</td>
                <td>{totalItems}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <p className="text-wrap">{author.email}</p>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div className="a_cardpart d-flex justify-content-between">
          <div>
            <h2>
              Showing {totalItems}&nbsp;{itemText} for sale
            </h2>
          </div>
        </div>
        <div className="a_cardpart2">
          <ul className="row list-unstyled">
            {author.sellingProducts.map((item) => (
              <li key={item._id} className="col-sm-4">
                <Card>
                  <div className={`${classes.authorpagecard}`}>
                    <div className={`${classes.authorimgcontainer}`}>
                      <img
                        src={"http://localhost:3000/uploads/" + item.coverImage}
                      />
                    </div>
                    <div className={`${classes.contentcontainer}`}>
                      <div className="row">
                        <div className={`${classes.productcontainer} col-md-8`}>
                          <Link
                            id="productLink"
                            to={`/store/product/${item._id}`}
                          >
                            <p className="text-nowrap text-truncate">
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
                          {parseFloat(
                            item.averageRating.$numberDecimal
                          ).toFixed(1)}
                        </h5>
                      </div>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthorLayout;

