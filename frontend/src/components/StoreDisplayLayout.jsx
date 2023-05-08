import React from 'react'; 
import { Link } from 'react-router-dom';
import Card from '../pages/ui/Card';
import { StarFill } from 'react-bootstrap-icons';
import classes from '../pages/ui/Card.module.css';
const StoreDisplayLayout = (props) => { 

    const cardcon = {
      marginLeft: '10%', 
      marginRight: '10%',
    };

    const noSearchResults = (
        <div>
            <h2>No search results found.</h2>
        </div>
    );

    // Add for priority
    const priorityToColor = (priority) => {
      switch (priority) {
        case 3:
          return '#E2B0DD';
        case 2:
          return '#DDDEB1';
        case 1:
          return 'white';
      }
    };
    
    

    return (
        <div style={cardcon}> 
            {!props.notFound && <ul className="row list-unstyled" >
                {props.items.map((item) => (
                    <li key={item._id} className="col-sm-4">
                        <Card priority={item.priority}>
                            <div className={`${classes.storepagecard}`} style={{ backgroundColor: priorityToColor(item.priority) }}>
                                <div className={`${classes.storeimgcontainer}`}>
                                    {<img src={'http://localhost:3000/uploads/' + item.coverImage}/>}
                                </div>
                                <div className={`${classes.contentcontainer}`} >
                                    <div className="row">
                                        <div className={`${classes.productcontainer} col-md-8`}>
                                            <Link id="productLink" to={`/store/product/${item._id}`}>
                                                <p className="text-nowrap text-truncate">{item.name}</p>
                                            </Link>
                                        </div>
                                        <div className={`${classes.price} col-md-4`} >
                                            <p>${Math.floor(item.price)}
                                                <span>{(item.price % 1).toFixed(2).split('.')[1]}</span>
                                            </p>
                                        </div>
                                    </div>
                                    {/* <p>author: <Link id="authorLink" to={`/store/author/${item.aid}`}>{item.author}</Link></p> */}
                                    <div className="d-flex justify-content-between">
                                        <div>
                                        </div>
                                        <div>
                                            <h5>{item.category}</h5>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex justify-content-between flex-wrap">
                                        <h5>{item.amountSold} Sold</h5>
                                        <h5 className="float-right"> <StarFill color="black" size={18} />&nbsp;{item.averageRating.toFixed(1)}</h5>
                                    </div>
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