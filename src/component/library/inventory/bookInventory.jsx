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
                    <Route path="/inventory" exact render = { props => <InventoryTable {...props} user={this.props.user}/> } />
                    <Route path="/inventory/new" exact render = { props => <InventoryForm {...props} user={this.props.user}/> } />
                    <Route path="/inventory/edit/:id" exact render = { props => <InventoryForm {...props} user={this.props.user}/> } />
                </Switch>
            </div>
        );
    }
}

/*
<Route path="/inventory" exact render = { props => <InventoryTable {...props} user={this.props.user}/> } />
<Route path="/inventory/new" exact render = { props => <InventoryForm {...props} user={this.props.user}/> } />
<Route path="/inventory/edit/:id" exact render = { props => <InventoryForm {...props} user={this.props.user}/> } />
 */

export default BookInventory;
