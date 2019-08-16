import React from 'react';
import {NavLink} from "react-router-dom";
import "bootstrap/js/src/collapse.js";
const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Library Management System</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                    <NavLink className="nav-item nav-link" to="/books">Books</NavLink>
                    <NavLink className="nav-item nav-link" to="/category">Category</NavLink>
                    <NavLink className="nav-item nav-link" to="/authors">Author</NavLink>
                    <NavLink className="nav-item nav-link" to="/users">User</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
