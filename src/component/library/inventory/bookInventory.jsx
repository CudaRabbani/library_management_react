import React, {Component} from 'react';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import InventoryTable from "./inventoryTable";
import InventoryForm from "./inventoryForm";

class BookInventory extends Component {

    componentDidMount() {
        document.title="Book Inventory";
    }

    render() {
        return (
            <div className="container">
                <Switch>
                    <Route path="/inventory" exact component={InventoryTable}/>
                    <Route path="/inventory/new" exact component={InventoryForm}/>
                    <Route path="/inventory/edit/:id" exact component={InventoryForm}/>
                </Switch>
            </div>
        );
    }
}


export default BookInventory;
