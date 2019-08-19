import React from 'react';

const AccessDenied = () => {
    return (
        <div className="alert alert-danger" role="alert">
            <h1>Unauthorized</h1>
            <h3>You are not authorize to access this page</h3>
        </div>
    );
};

export default AccessDenied;
