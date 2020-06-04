import React from 'react';

function Book( props ){
    return(
        <div>
            <h1>Results of your search</h1>
            <p>Title: {props.title}</p>
            <p>Author: {props.author}</p>
            <p>Image</p>
            <img src={props.thumbnail}></img>
            <p>TextSnippet: {props.textSnippet}</p>
        </div>
    );
}

export default Book;