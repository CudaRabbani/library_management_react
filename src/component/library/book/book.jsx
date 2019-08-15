import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import ListGroup from "../../common/listgroup";
import BookTable from "./bookTable";
import AddBook from "./addBook";
import BookForm from "./bookForm";

class Book extends Component {

    state = {};

    handleSideBar = (item) => {
        this.setState({selectedSideBarItem: item});
        if (item.id === 0) {
            this.props.history.push('/books');
        }else {
            this.props.history.replace('/books/new');
        }

    };

    componentDidMount() {
        console.log('book component');
    }

    sidebarItems = [
        {id: 0, name: 'List Existing Books'},
        {id: 1, name: 'Add New Book'}
    ];

    render() {
        const {selectedSideBarItem} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col"><h2 className="text-center">Books Page</h2></div>
                </div>
                <div className="row m-2">
                    <div className="col-sm-3">
                        <ListGroup
                            listItems={this.sidebarItems}
                            selectedItem={selectedSideBarItem}
                            onHandleSideBar={this.handleSideBar}
                        />
                    </div>
                    <div className="col-sm-9">
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
