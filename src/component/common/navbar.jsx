import React from 'react';
import {NavLink} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/js/src/collapse.js";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
const NavBar = (props) => {
    const {user} = props;
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Library Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="nav-item nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        <NavLink className="nav-item nav-link" to="/books">Books</NavLink>
                        {user && (
                            <React.Fragment>
                                <NavLink className="nav-item nav-link" to="/inventory">Inventory</NavLink>
                                <NavLink className="nav-item nav-link" to="/category">Category</NavLink>
                                <NavLink className="nav-item nav-link" to="/authors">Author</NavLink>
                                <NavDropdown title="User" id="collasible-nav-dropdown">
                                    <NavDropdown.Item><NavLink to="/users">Users</NavLink></NavDropdown.Item>
                                    <NavDropdown.Item><NavLink to="/users/password">Password Set</NavLink></NavDropdown.Item>
                                    <NavDropdown.Item><NavLink to="/password/reset">Password Reset</NavLink></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Will be added later</NavDropdown.Item>
                                </NavDropdown>
                            </React.Fragment>
                        )}
                    </Nav>
                    {!user && (
                        <React.Fragment>
                            <Nav>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav>
                        </React.Fragment>
                    )}
                    {user && (
                        <React.Fragment>
                            <Nav>
                                <Nav.Link eventKey={2} href={"/users/edit/"+user.info_id}>
                                    {user.email}
                                </Nav.Link>
                                <Nav.Link href="/logout">Logout</Nav.Link>
                            </Nav>
                        </React.Fragment>
                    )}
                </Navbar.Collapse>
            </Navbar>


{/*            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">Library Management System</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        <NavLink className="nav-item nav-link" to="/inventory">Inventory</NavLink>
                        <NavLink className="nav-item nav-link" to="/books">Books</NavLink>
                        <NavLink className="nav-item nav-link" to="/category">Category</NavLink>
                        <NavLink className="nav-item nav-link" to="/authors">Author</NavLink>
                        <NavLink className="nav-item nav-link" to="/users">User</NavLink>
                    </div>
                </div>
            </nav>*/}
        </div>
    );
};

export default NavBar;
