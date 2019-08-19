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
import UserForm from "./component/user/userForm";
import UserPassword from "./component/user/userPassword";


class App extends Component {
    state= {};
    componentDidMount() {
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
                {/*<div className='row'>
          <div className="col-sm-3">
              <BookCategory />
          </div>
          <div className="col-sm-9">
              <Switch>
                  <Route path='/books' component={BookList}/>
                  <Route path='/book/:id' component={Book}/>
                  <Route path='/user/:id' component={UserInfo}/>
                  <Route path='/category' component={CategoryList}/>
                  <Route path='/notfound' component={NotFound} />
                  <Redirect from='/' to='/books'/>
                  <Redirect to='/notfound'/>
              </Switch>
          </div>
      </div>*/}
            </div>
        );
    }

}

export default App;
