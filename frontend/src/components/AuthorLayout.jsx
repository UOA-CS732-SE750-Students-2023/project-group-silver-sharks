import React from 'react';

const AuthorLayout = ({ author }) => { 

    return (
        <div>
            <h1>{author.name}</h1>
            <img src={author.url} alt={author.name} />
            <p>{author.bio}</p>
        </div>
    );
}

export default AuthorLayout;