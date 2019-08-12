import React from 'react';
import './App.css';

import NavBar from './component/common/navbar';
import Book from "./component/library/book/book";
import BookList from "./component/library/booklist";

function App() {
  return (
      <div className="container-fluid">
          <NavBar />
          <main role="main" className="container">
              <BookList />
          </main>
      </div>
  );
}

export default App;
