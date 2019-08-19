import React, {Component} from 'react';
import {Route, Redirect, Switch} from "react-router-dom";

import AuthorForm from './authorForm';
import AuthorTable from './authorTable';
import NotFound from "../../common/notFound";

class Author extends Component {

    componentDidMount() {
        document.title="Author Page";
    }

    render() {
        return (
            <div className="container">
                <Switch>
                    <Route path="/authors" exact render={ props => <AuthorTable {...props} user={this.props.user}/>}/>
                    <Route path="/authors/new" exact render={ props => <AuthorForm {...props} user={this.props.user}/>}/>
                    <Route path="/authors/edit/:id" exact component={ props=><AuthorForm {...props} user={this.props.user}/>}/>
                    <Redirect to="/notfound" exact component={NotFound}/>
                </Switch>
            </div>
        );
    }
}
//<Route path="/authors" exact render={ props => <AuthorTable {...props} user={this.props.user}/>}/>

/*
<Route path="/authors" exact render={AuthorTable}/>
                    <Route path="/authors/new" exact component={AuthorForm}/>
                    <Route path="/authors/edit/:id" exact component={AuthorForm}/>
                    <Redirect to="/notfound" exact component={NotFound}/>
 */


export default Author;
