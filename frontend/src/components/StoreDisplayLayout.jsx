import React from 'react'; 
import { Link } from 'react-router-dom';
import Card from '../pages/ui/Card';
import { StarFill } from 'react-bootstrap-icons';
const StoreDisplayLayout = (props) => { 
    console.log(props.items)

    const minMaxInputContainerStyle = {
      marginLeft: '100px', // 可以根据需要调整此值
    };

    return (
        <div style={minMaxInputContainerStyle}> 
            <h1>All items in store or filted by category</h1>
            <ul className="row list-unstyled" >
                {props.items.map((item) => (
                    <li key={item._id} className="col-sm-4">
                        <Card>
                            <div >
                                <div>
                                    {/*<img src={item.imageURL} /> */}
                                </div>
                                <div>
                                    <Link id="productLink" to={`/store/product/${item._id}`}><h2>{item.name}</h2></Link>
                                    <h3>${Math.floor(item.price)}</h3>{(item.price % 1).toFixed(2).split('.')[1]}
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
            </ul>
        </div>
    );
}
export default StoreDisplayLayout;