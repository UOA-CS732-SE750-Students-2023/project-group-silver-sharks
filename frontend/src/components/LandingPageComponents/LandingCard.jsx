import React from 'react';
import { Link } from 'react-router-dom';
import './LandingCard.css';

function CardItem(props) {
  return (
    <>
      <div className='cards-item'>
        <Link className='cards-item-link' to={props.path}>
            <img
                className='cards-item-img'
                alt='Digital Asset'
                src={props.src}
            />
            <div className='cards-item-info'>
                <h5 className='cards-item-title'><b>{props.title}</b></h5>
                <p className='cards-item-text'>{props.text}</p>
            </div>
        </Link>
      </div>
    </>
  );
}

export default CardItem;
