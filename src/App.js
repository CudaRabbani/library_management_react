import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom";

import NavBar from './component/common/navbar';
import Book from "./component/library/book/book";
import BookList from "./component/library/booklist";
import UserInfo from "./component/user/userinfo";

function App() {
  return (
      <div className="container-fluid">
          <NavBar />
          <div className="container">
              <Switch>
                  <Route path='/books' component={BookList}/>
                  <Route path='/book/:id' component={Book}/>
                  <Route path='/user/:id' component={UserInfo}/>
                  <Redirect from='/' to='/books'/>
              </Switch>
          </div>
      </div>
  );
}

export default App;
