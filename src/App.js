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

import {getUser} from "./util/getUser";


class App extends Component {
    state= {};
    componentDidMount() {
        try {
            const user = getUser();
            this.setState({user});
        }
        catch (ex) {

        }
    }

    render() {
        return (
            <div className="container-fluid">
                <NavBar user={this.state.user}/>
                <div className="m-3" key='routes'>
                    <Switch>
                        <Route path='/inventory' component={BookInventory}/>
                        <Route path='/books' component={Book}/>
                        <Route path='/users' component={User}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/authors' component={Author}/>
                        <Route path='/users/' component={Login}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/notfound' component={NotFound} />
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
