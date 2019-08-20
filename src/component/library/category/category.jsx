import React, {Component} from 'react';
import {Route, Switch, Redirect, Link} from 'react-router-dom';

import CatchError from "../../common/catcherror";
import CategoryTable from "./categoryTable";
import AddCategory from "./addCategory";
import ListGroup from "../../common/listgroup";
import {getRole} from "../../../util/currentUser";

class Category extends Component {
    state= {
        categories:[],
        errors: []
    };

    componentDidMount() {
        document.title = "Category Page";
    }


    render() {
        const {selectedSideBarItem} = this.state ;
        return (
            <div className="container">
                <div className="row">
                    <div className="col"><h2 className="text-center">Category List Page</h2></div>
                </div>
                <div className="row m-2">
                    <div className="col-sm-3">
                        {getRole() === 'admin' && (
                            <Link to="/category/add"
                                  className="btn btn-primary"
                            >New Category</Link>
                        )}
                    </div>
                    <div className="col-sm-9">
                        <Switch>
                            <Route path='/category' exact component={CategoryTable}/>
                            <Route path='/category/add' exact component={AddCategory}/>
                            <Route path='/category/edit/:id' exact component={AddCategory}/>
                            <Redirect to="/notfound"/>
                        </Switch>
                    </div>
                </div>
                {this.state.errors.length > 0 ? <CatchError errors={this.state.errors}/> : null}
            </div>
        );
    }
}


export default Category;
