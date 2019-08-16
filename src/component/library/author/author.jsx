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
                    <Route path="/authors" exact component={AuthorTable}/>
                    <Route path="/authors/new" exact component={AuthorForm}/>
                    <Route path="/authors/edit/:id" exact component={AuthorForm}/>
                    <Redirect to="/notfound" exact component={NotFound}/>
                </Switch>
            </div>
        );
    }
}


export default Author;
