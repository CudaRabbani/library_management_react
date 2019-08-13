import React from 'react';

const AccessDenied = () => {
    return (
        <div className="alert alert-danger" role="alert">
            <h1>Error Occured</h1>
            <h3>You are not authorize to access this page</h3>
        </div>
    );
};

export default AccessDenied;
