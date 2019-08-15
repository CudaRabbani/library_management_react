import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom";

import NavBar from './component/common/navbar';
import Book from "./component/library/book/book";
import BookList from "./component/library/booklist";
import UserInfo from "./component/user/userinfo";
import BookCategory from "./component/library/category/bookCategory";
import Category from "./component/library/category/category";
import NotFound from "./component/common/notFound";

function App() {
  return (
      <div className="container-fluid">
          <NavBar />
          <div className="m-3" key='routes'>
              <Switch>
                  <Route path='/books' component={Book}/>
                  <Route path='/user/:id' component={UserInfo}/>
                  <Route path='/category' component={Category}/>
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

export default App;
