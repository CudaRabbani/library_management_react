import React from 'react';

const AddSuccess = (props) => {
    return (
        <div className="alert alert-success m-5" role="alert">
            <h5>{props.message}</h5>
        </div>
    );
};

export default AddSuccess;
