import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom";

import http from '../src/util/httpService';
import NavBar from './component/common/navbar';
import Book from "./component/library/book/book";
import User from "./component/user/user";
import Category from "./component/library/category/category";
import Author from "./component/library/author/author";
import NotFound from "./component/common/notFound";
import BookInventory from "./component/library/inventory/bookInventory";
import Login from "./component/user/login";
import Logout from "./component/user/logout";

import {CurrentUser} from "./util/currentUser";
import ProtectedRoute from "./component/common/protectedRoute";
import AccessDenied from "./component/common/accessDenied";
import AdminRoute from "./component/common/adminRoute";
import UserPassword from "./component/user/userPassword";
import UserForm from "./component/user/userForm";


class App extends Component {
    state= {};
    componentDidMount() {
        console.warn = console.error = () => {};
        try {
            const user = CurrentUser();
            this.setState({user});
        }
        catch (ex) {

        }
    }

    render() {
        const user=this.state.user;
        return (
            <div className="container-fluid">
                <NavBar user={user}/>
                <div className="m-3" key='routes'>
                    <Switch>
                        <AdminRoute path="/inventory" component={BookInventory}/>
                        <ProtectedRoute path='/books' component={Book}/>
                        <Route path="/me" exact component={UserForm}/>
                        <Route path="/users/new" exact component={UserForm}/>
                        <Route path='/users/password' component={UserPassword}/>
                        <AdminRoute path='/users' component={User}/>
                        <ProtectedRoute path='/category' component={Category}/>
                        <ProtectedRoute path='/authors' component={Author}/>
                        <Route path='/password/reset' component={UserPassword}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/notfound' component={NotFound} />
                        <Route path='/unauthorized' component={AccessDenied} />
                        <Redirect from='/' to='/books'/>
                        <Redirect to='/notfound'/>
                    </Switch>
                </div>
            </div>
        );
    }

}

export default App;
