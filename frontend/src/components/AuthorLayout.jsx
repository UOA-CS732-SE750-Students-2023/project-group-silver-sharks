import React from 'react';

const AuthorLayout = ({ author }) => { 

    return (
        <div>
            <h1>{author.username}</h1>
            <p>{author.email}</p>
            <p>{author.firstName}</p>
            <p>{author.lastName}</p>
            <p>{author.sellerRating}</p>
        </div>
    );
}

export default AuthorLayout;