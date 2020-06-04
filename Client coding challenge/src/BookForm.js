import React from 'react';

function BookForm( props ){
    return(
        <div>
            <form onSubmit>
                <label htmlFor="search"> Hello</label>
                <input id="search" name="search" type="text" />
                <button type="submit">
                    Press to search
                </button>
            </form>
        </div>
    );
}

export default BookForm;