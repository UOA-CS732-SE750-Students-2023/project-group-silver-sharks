import React from 'react'; 
import { Link } from 'react-router-dom';
import Card from '../pages/ui/Card';
import { StarFill } from 'react-bootstrap-icons';
import classes from '../pages/ui/Card.module.css';
const StoreDisplayLayout = (props) => { 

    const minMaxInputContainerStyle = {
      marginLeft: '100px', 
    };

    const noSearchResults = (
        <div>
            <h2>No search results found.</h2>
        </div>
    );

    return (
        <div style={minMaxInputContainerStyle}> 
            <h1>All items in store or filted by category</h1>
            {!props.notFound && <ul className="row list-unstyled" >
                {props.items.map((item) => (
                    <li key={item._id} className="col-sm-4">
                        <Card>
                            <div >
                                <div className={`${classes.imgcontainer}`}>
                                    {<img src={'http://localhost:3000/uploads/' + item.coverImage}/>}
                                </div>
                                <div>
                                    <Link id="productLink" to={`/store/product/${item._id}`}><h2>{item.name}</h2></Link>
                                    <div className={`d-flex justify-content-end ${classes.price}`}  >
                                        <span className="fs-4">${Math.floor(item.price)}</span>
                                        <span className={`${classes.number}`}>{(item.price % 1).toFixed(2).split('.')[1]}</span>
                                    </div>
                                </div>
                                {/* <p>author: <Link id="authorLink" to={`/store/author/${item.aid}`}>{item.author}</Link></p> */}
                                <p>{item.description}</p>
                                <div className="d-flex justify-content-between">
                                    <h5>{item.amountSold} Sold</h5>
                                </div>
                            </div>
                        </Card> 
                    </li>
                ))}
            </ul>}
            {props.notFound && noSearchResults}
        </div>
    );
}
export default StoreDisplayLayout;