import classes from './Card.module.css';
import React from 'react';


/* const Card = (props) => {
    return <div className={classes.card}>{props.children}</div>
};
 */

const Card = (props) => {
  return (
    <div className={classes.card}>
      {React.cloneElement(props.children, { priority: props.priority })}
    </div>
  );
};



export default Card;