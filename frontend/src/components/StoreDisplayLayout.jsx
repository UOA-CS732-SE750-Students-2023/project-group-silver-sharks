import React from 'react'; 
import { Link } from 'react-router-dom';
import Card from '../pages/ui/Card';

const StoreDisplayLayout = (props) => { 
    
    console.log(props.items)


    return (
        <div> 
           <h1>All items in store or filted by category</h1>
           
           <ul>
                {props.items.map((item) => (
                    <li key={item.pid}>
                        <Card>
                            <div >
                                <Link id="productLink" to={`/store/product/${item.pid}`}><h2>{item.name}</h2></Link>
                                <p>author: <Link id="authorLink" to={`/store/author/${item.aid}`}>{item.author}</Link></p>
                            </div>
                        </Card> 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StoreDisplayLayout;