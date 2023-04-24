import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import Card from '../pages/ui/Card';
import { StarFill } from 'react-bootstrap-icons';
import classes from '../pages/ui/Card.module.css'
import './AuthorLayout.css'

const AuthorLayout = ({ author }) => { 
    const DUMMY_DATA = [
        {   
            pid: 1,
            aid: 2,
            name: 'goku',
            price:138912.00,
            sold:414,
            like:4.8,
            category:'Image',
            url: 'https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku-814x1024.jpg',
            author: 'steve',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 3,
            aid: 2,
            name: 'naruto',
            price:5.50,
            sold:8545,
            like:3.2,
            category:'Image',
            url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
            author: 'herobrine',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 5,
            aid: 2,
            name: 'sasuke',
            price:11.99,
            sold:23,
            like:5.0,
            category:'Image',
            url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
            author: 'bob',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 8,
            aid: 2,
            name: 'goku',
            price:80.00,
            sold:414,
            like:4.8,
            category:'Image',
            url: 'https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku-814x1024.jpg',
            author: 'steve',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 9,
            aid: 2,
            name: 'naruto',
            price:5.50,
            sold:8545,
            like:3.2,
            category:'Image',
            url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
            author: 'herobrine',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 57,
            aid: 2,
            name: 'sasuke',
            price:11.99,
            sold:23,
            like:5.0,
            category:'Image',
            url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
            author: 'bob',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        
    ];
    
    const totalItems = DUMMY_DATA.length;
    const itemText = totalItems > 1 ? 'assets' : 'asset';

    const [a_title, setTitle] = useState('Sort by: Popularity');
    const handleSelect = (eventKey) => {
        if (eventKey === 'popu') {
          setTitle('Sort by: Popularity');
        } else if (eventKey === 'new') {
          setTitle('Sort by: Most recent');
        } else if (eventKey === 'plth') {
          setTitle('Sort by: Price: Low to High');
        } else if (eventKey === 'phtl') {
          setTitle('Sort by: Price: High to Low');
        }
      };


    return (
        <div>
            <div className='a_firstdiv'>
                <h1 className='a_authorname'>{author.name}</h1>
                <div className='a_forcontainbutton'>
                    <div className='a_message'>
                        <Link to="../profile/messages">Message</Link>
                    </div>
                    
                    {/* <button className='a_message'>Message</button> */}
                </div>
                {/* 此处在另外一个页面删掉 */}
                <div className='a_forcontainlink'>
                    <Link to="/Reset_password">Reset password</Link>
                    <Link to="/Delete_account">Delete account</Link>
                </div>
                {/* 结束删除 */}
            </div>
            <div className='a_tablecontainer'>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>Average rating</td>
                            <td>{author.average_rating}</td>
                        </tr>
                        <tr>
                            <td>Average response</td>
                            <td>{author.average_response}</td>
                        </tr>
                        <tr>
                            <td>Assets sold</td>
                            <td>{author.assets_sold}</td>
                        </tr>
                        {/* 另外一个页面删除 */}
                        <tr>
                            <td>Account type</td>
                            <td>{author.account_type}</td>
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
                            <Dropdown.Item href="#/popularity" eventKey="popu">Popularity</Dropdown.Item>
                            <Dropdown.Item href="#/newest" eventKey="new">Most recent</Dropdown.Item>
                            <Dropdown.Item href="#/price-asc" eventKey="plth">Price: Low to High</Dropdown.Item>
                            <Dropdown.Item href="#/price-desc" eventKey="phtl">Price: High to Low</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </div>
            </div>
            <div className='a_cardpart2'>
                <ul className="row list-unstyled" >
                    {DUMMY_DATA.map((item) => (
                    <li key={item.pid} className="col-sm-4">
                        <Card>
                            <div >
                                <div className={`${classes.imgcontainer}`}>
                                    <img src={item.url}/>
                                </div>
                                <div>
                                    <Link id="productLink" to={`/store/product/${item.pid}`}><h2>{item.name}</h2></Link>
                                    <div className={`d-flex justify-content-end ${classes.price}`}  >
                                        <span className="fs-4">${Math.floor(item.price)}</span>
                                        <span className={`${classes.number}`}>{(item.price % 1).toFixed(2).split('.')[1]}</span>
                                    </div>
                                </div>

                                <p>{item.intro}</p>
                                <div className="d-flex justify-content-between">
                                    <h5>{item.sold} Sold</h5>
                                    <h5 className="float-right"> <StarFill color="black" size={18} />&nbsp;{item.like.toFixed(1)}</h5>
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