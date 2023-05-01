import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import Card from '../pages/ui/Card';
import { StarFill } from 'react-bootstrap-icons';
import classes from '../pages/ui/Card.module.css'
import './AuthorLayout.css'

const AuthorLayout = ({ author, userAccountType }) => { 

    // checking the account type of the author 
    const isAdmin = userAccountType === "admin";

    console.log(isAdmin, 14);

    // calculating assets sold and the average rating 
    let averageRatingTemp = 0;

    author.sellingProducts.forEach((item) => {
        averageRatingTemp += item.averageRating;
    }); 

    const averageRating = averageRatingTemp / author.sellingProducts.length;

    const totalItems = author.sellingProducts.length;
    const itemText = totalItems > 1 ? 'assets' : 'asset';

    const [a_title, setTitle] = useState('Sort by: Price: Low to High');
    const handleSelect = (eventKey) => {
        if (eventKey === 'plth') {
          setTitle('Sort by: Price: Low to High');
        } else {
          setTitle('Sort by: Price: High to Low');
        }
      };

    return (
        <div>
            <div className='a_firstdiv'>
                <h1 className='a_authorname'>{author.username}</h1>
                <div className='a_forcontainbutton'>
                    <div className='a_message'>
                        <Link to="../profile/messages">Message</Link>
                    </div>
                    
                    {/* <button className='a_message'>Message</button> */}
                </div>
                {/* 此处在另外一个页面删掉 */}
                {isAdmin && <div className='a_forcontainlink'>
                    <Link to="/Delete_account">Delete account</Link>
                </div>}
                {/* 结束删除 */}
            </div>
            <div className='a_tablecontainer'>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>Average Rating</td>
                            <td>{averageRating}</td>
                        </tr>
                        {/* 另外一个页面删除 */}
                        <tr>
                            <td>Assets Sold</td>
                            <td>{totalItems}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{author.email}</td>
                        </tr>
                        {/* 结束删除 */}
                    </tbody>
                </table>
            </div>
            <div className='a_cardpart d-flex justify-content-between'>
                <div>
                    <h2>Showing {totalItems}&nbsp;{itemText} for sale</h2>
                </div>
                <div>
                    <InputGroup>
                        <DropdownButton
                            variant="outline-secondary"
                            title={a_title}
                            id="sort-dropdown"
                            align="end"
                            onSelect={handleSelect}
                            className='a_dropdownbutton'
                        >
                            <Dropdown.Item href="#/price-asc" eventKey="plth">Price: Low to High</Dropdown.Item>
                            <Dropdown.Item href="#/price-desc" eventKey="phtl">Price: High to Low</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </div>
            </div>
            <div className='a_cardpart2'>
                <ul className="row list-unstyled" >
                    {author.sellingProducts.map((item) => (
                    <li key={item._id} className="col-sm-4">
                        <Card>
                            <div >
                                <div className={`${classes.imgcontainer}`}>
                                    <img src={'http://localhost:3000/uploads/' + item.coverImage}/>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div><Link id="productLink" to={`/store/product/${item._id}`}><h2>{item.name}</h2></Link></div>
                                    <div className={`${classes.price}`}  >
                                        <span className="fs-4">${Math.floor(item.price)}</span>
                                        <span className={`${classes.number}`}>{(item.price % 1).toFixed(2).split('.')[1]}</span>
                                    </div>
                                </div>

                                <p>{item.description}</p>
                                <div className="d-flex justify-content-between">
                                    <h5>{item.amountSold} Sold</h5>
                                    <h5 className="float-right"> <StarFill color="black" size={18} />&nbsp;{item.averageRating.toFixed(1)}</h5>
                                </div>
                            </div>
                        </Card> 
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default AuthorLayout;