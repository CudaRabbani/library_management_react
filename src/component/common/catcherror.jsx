import React from 'react';

const CatchError = (props) => {

    return (
        <div className="alert alert-danger m-5" role="alert">
            <h5>Error Occured</h5>
            <p>{props.message}</p>
        </div>
    );
};

export default CatchError;
