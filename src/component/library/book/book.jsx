import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import BookTable from "./bookTable";
import BookForm from "./bookForm";

class Book extends Component {

    state = {
        category:[]
    };

    componentDidMount() {
        document.title="Book Page";
    }

    handleCategorySideBar = (category) => {
        console.log(category);
        this.setState({selectedCategory: category});
    };

    render() {
        const {selectedCategory} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col"><h2 className="text-center">Books Page</h2></div>
                </div>
                <div className="row m-2">
                    <div className="col">
                        <Switch>
                            <Route path='/books' exact component={BookTable}/>
                            <Route path='/books/new' exact component={BookForm}/>
                            <Route path='/books/edit/:id' exact component={BookForm}/>
                            <Redirect to="/notfound"/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}


export default Book;
