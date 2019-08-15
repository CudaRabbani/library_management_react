import React, {Component} from 'react';
import {Redirect, Route, Switch, Link} from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';

import ListGroup from "../../common/listgroup";
import BookTable from "./bookTable";
import BookForm from "./bookForm";

class Book extends Component {

    state = {
        category:[]
    };

/*    async getCategory () {
        const {data} = await axios.get(category_api);
        //console.log(data);
        const categories = data.map(d=>_.pick(d,['_id','name']));
        const category = [{'_id': 0, 'name': 'All Categories'},...categories];
        this.setState({category});
    }*/

    handleSideBar = (item) => {
        this.setState({selectedSideBarItem: item});
        if (item.id === 0) {
            this.props.history.push('/books');
        }else {
            this.props.history.replace('/books/new');
        }

    };

/*    async componentDidMount() {
        console.log('book component');
        await this.getCategory();
    }*/

    sidebarItems = [
        {id: 0, name: 'List Existing Books'},
        {id: 1, name: 'Add New Book'}
    ];

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
                    <div className="col-sm-3">
                    </div>
                    <div className="col-sm-9">
                        <Link
                            to='/books/new'
                            className="btn btn-primary"
                            style={{marginBottom: 5}}
                        >New Book </Link>
                    </div>
                </div>
                <div className="row m-2">
{/*                    <div className="col-sm-3">
                        <ListGroup
                            listItems={this.sidebarItems}
                            selectedItem={selectedSideBarItem}
                            onHandleSideBar={this.handleSideBar}
                        />
                        <ul className="list-group">
                            {this.state.category.map(cat=>(
                                <li key={cat._id}
                                    className={selectedCategory === cat ? "list-group-item active" : "list-group-item"}
                                    onClick={()=>this.handleCategorySideBar(cat)}
                                >{cat.name}</li>
                            ))}
                        </ul>
                    </div>*/}
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
